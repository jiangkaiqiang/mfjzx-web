package com.wls.manage.crawler.jinritoutiao.sci;

import java.io.IOException;
import java.util.logging.Logger;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import com.wls.manage.crawler.general.BasicCrawler;

/**
 * Created by haolidong on 2016/11/14.
 */
public class PageCrawJobDigitech {
    private static Logger logger = Logger.getLogger(PageCrawJobDigitech.class.getName());
    
    public static void craw(String url,String time,String title){
        try{
            Thread.sleep(1000);
//            PageParseJobEdu crawler =new PageParseJobEdu();
            PageParseJobDigitech.parse(url,time,title);
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
