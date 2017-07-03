package com.shfb.rfid.manage.entity;

import java.util.Date;

public class Cases {
    private Integer id;

    private Integer topcategory;

    private Integer subcategory;

    private String title;

    private String introduction;

    private String img;

    private Date addtime;

    private String content;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTopcategory() {
        return topcategory;
    }

    public void setTopcategory(Integer topcategory) {
        this.topcategory = topcategory;
    }

    public Integer getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(Integer subcategory) {
        this.subcategory = subcategory;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction == null ? null : introduction.trim();
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img == null ? null : img.trim();
    }

    public Date getAddtime() {
        return addtime;
    }

    public void setAddtime(Date addtime) {
        this.addtime = addtime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }
}