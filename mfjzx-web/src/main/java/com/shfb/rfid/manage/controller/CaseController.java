package com.shfb.rfid.manage.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.shfb.rfid.manage.dao.CasesMapper;
import com.shfb.rfid.manage.dto.BaseDto;
import com.shfb.rfid.manage.entity.Cases;

@Controller
@RequestMapping(value = "/case")
public class CaseController extends BaseController {
	@Autowired
	private CasesMapper casesDao;
	
	@RequestMapping(value = "/findCaseList", method = RequestMethod.POST)
	@ResponseBody
	public Object findCaseList(@RequestParam(value="topcategory",required=false) Integer topcategory,
			@RequestParam(value="subcategory") Integer subcategory) {
		List<Cases> cases = casesDao.findAllCases(topcategory, subcategory);
		return cases;
		
	}
	
	/**
	 * 增加案例发布
	 * @param message
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/addCase")
	@ResponseBody
	public Object addCase(@RequestParam(required = false) String title,//标题
			@RequestParam(required = false) String introduction,
			@RequestParam(required = false) Integer topcategory,
			@RequestParam(required = false) Integer subcategory,
			@RequestParam(required = false) MultipartFile appendix0
			){
		Cases cases = new Cases();
		if (title!=null&&!title.equals("")) {
			cases.setTitle(title);
		}
		else {
			cases.setTitle("取到文件的标题");
		}
		if (introduction!=null&&introduction.equals("")) {
			cases.setIntroduction(introduction);
		}
		else {
			cases.setIntroduction("取到文件的前一段文字，大约20个汉字");
		}
		cases.setTopcategory(topcategory);
		cases.setSubcategory(subcategory);
		cases.setContent("取到文件的内容转成html");
		cases.setImg("取到文件的第一张照片");//该图片为列表图片，不需要加彩印
		{
			//第一张图片不加彩印先存储一遍，然后将图片加彩印之后存储到当前工程的img/casePic目录下保存
		}
		casesDao.insert(cases);
		return true;
	}
	
	@RequestMapping(value = "/updateCase")
	@ResponseBody
	public Object updateCase(Cases cases){
		casesDao.updateByPrimaryKey(cases);
		return new BaseDto(0);
	}
	
	
	@RequestMapping(value = "/findCaseByID")
	@ResponseBody
	public Object findCaseByID(Integer caseID) {
		Cases project = casesDao.selectByPrimaryKey(caseID);
		return project;
	}
	
	@RequestMapping(value = "/deleteCaseByID")
	@ResponseBody
	public Object deleteCaseByID(Integer caseID) {
		 casesDao.deleteByPrimaryKey(caseID);
		 return new BaseDto(0);
	}
	
	@RequestMapping(value = "/deleteCaseByIDs")
	@ResponseBody
	public Object deleteCaseByIDs(Integer[] caseIDs) {
		for(Integer caseID:caseIDs){
			casesDao.deleteByPrimaryKey(caseID);
		}
		return new BaseDto(0);
	}
		
}
