package com.shfb.rfid.manage.entity;

import java.util.Date;
/**
 * cookie 实体类
 * @author jiangkaiqiang
 * @version 创建时间：2016-10-21 下午2:08:26 
 *
 */
public class CookieEntity {

	private int id;

	private String cookie;

	private String username;

	private int expireTime;

	private Date addTime;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCookie() {
		return cookie;
	}

	public void setCookie(String cookie) {
		this.cookie = cookie;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getExpireTime() {
		return expireTime;
	}

	public void setExpireTime(int expireTime) {
		this.expireTime = expireTime;
	}

	public Date getAddTime() {
		return addTime;
	}

	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}
}
