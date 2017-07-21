package com.shfb.rfid.manage.controller;
import java.util.ArrayList;
import java.util.Date;
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
import com.shfb.rfid.manage.util.Word07ToHtml;

@Controller
@RequestMapping(value = "/case")
public class CaseController extends BaseController {
	@Autowired
	private CasesMapper casesDao;
	
	@RequestMapping(value = "/findCaseListForIndex", method = RequestMethod.POST)
	@ResponseBody
	public Object findCaseListForIndex(@RequestParam(value="topcategory",required=false) Integer topcategory,
			@RequestParam(value="subcategory",required=false) Integer subcategory) {
		List<Cases> cases = casesDao.findAllCases(topcategory, subcategory);
		List<Cases> indexCases = new ArrayList<Cases>();
		if (cases.size()>8) {
			for (int i = 0; i < 8; i++) {
				indexCases.add(cases.get(i));
			}
		}
		else {
			indexCases = cases;
		}
		return indexCases;
		
	}
	
	@RequestMapping(value = "/findCaseList", method = RequestMethod.POST)
	@ResponseBody
	public Object findCaseList(@RequestParam(value="topcategory",required=false) Integer topcategory,
			@RequestParam(value="subcategory",required=false) Integer subcategory) {
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
		Word07ToHtml word07ToHtml = new Word07ToHtml();
		word07ToHtml.convertToHtml(appendix0);
		word07ToHtml.getWordInfo(appendix0);
		word07ToHtml.parserHtml();
		if (title!=null&&!title.equals("")) {
			cases.setTitle(title);
		}
		else {
			cases.setTitle(word07ToHtml.getTitle());
		}
		if (introduction!=null&&introduction.equals("")) {
			cases.setIntroduction(introduction);
		}
		else {
			cases.setIntroduction(word07ToHtml.getIntroduce());
		}
		cases.setTopcategory(topcategory);
		cases.setSubcategory(subcategory);
		cases.setAddtime(new Date());
		cases.setContent(word07ToHtml.getHtml());
		cases.setImg(word07ToHtml.getCover());//该图片为列表图片，不需要加彩印
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
