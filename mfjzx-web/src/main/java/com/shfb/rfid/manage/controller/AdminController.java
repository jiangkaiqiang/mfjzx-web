package com.shfb.rfid.manage.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.shfb.rfid.manage.dao.AdminMapper;
import com.shfb.rfid.manage.entity.AdminEntity;
import com.shfb.rfid.manage.entity.CookieEntity;
import com.shfb.rfid.manage.service.CookieService;
import com.shfb.rfid.manage.util.ResponseData;
import com.shfb.rfid.manage.util.StringUtil;

@Controller
@RequestMapping(value = "/admin")
public class AdminController extends BaseController {
	@Autowired
	private AdminMapper adminDao;
	@Autowired
	private CookieService cookieService;
	@RequestMapping(value = "/login")
	@ResponseBody
	public Object login(HttpServletRequest request, String adminName, String adminpwd) {
		if(StringUtil.isnotNull(adminName)&&StringUtil.isnotNull(adminpwd)){
			AdminEntity admin = adminDao.findAdmin(adminName, adminpwd);
			if (admin != null) {
				String cookie = cookieService.insertCookie(adminName);
				admin.setAdminpwd("********");
				request.getSession().setAttribute("admin", admin);
	            return  ResponseData.newSuccess(String.format("token=%s", cookie));
			}
			return ResponseData.newFailure("用户名或者密码不正确~");
		}else{
			return ResponseData.newFailure("用户名和密码不能为空~");
		}
	}	
	@RequestMapping(value = "/logout")
	@ResponseBody
	public Object logout(HttpServletRequest request) {
		request.getSession().removeAttribute("admin");
		Cookie[] cookies = request.getCookies();
		if(cookies!=null&&cookies.length>0){
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals("token")) {
					cookieService.deleteCookie(cookie.getValue());
				}
			}
		}
		return true;
	}
	@RequestMapping(value = "/findAdmin")
	@ResponseBody
	public Object findUser(HttpServletRequest request,String token) {
		AdminEntity admin = (AdminEntity)request.getSession().getAttribute("admin");
		if(admin!=null){return admin;}
		if(StringUtil.isNull(token)){
			Cookie[] cookies = request.getCookies();
			if(cookies!=null&&cookies.length>0){
				for (Cookie cookie : cookies) {
					if (cookie.getName().equals("token")) {token=	cookie.getValue();break;}
				}
			}
		}
		if(StringUtil.isnotNull(token)){
			CookieEntity effectiveCookie = cookieService.findEffectiveCookie(token);
			if (effectiveCookie != null) {
				admin = adminDao.findAdminByName(effectiveCookie.getUsername());
				if(admin!=null){
					admin.setAdminpwd("********");
					request.getSession().setAttribute("admin", admin);
					return admin;
				}
			}
		}
		admin = new AdminEntity();
		return admin;
	}
}
