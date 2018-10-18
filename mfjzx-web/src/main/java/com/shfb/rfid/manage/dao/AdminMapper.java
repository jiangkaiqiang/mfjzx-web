package com.shfb.rfid.manage.dao;

import com.shfb.rfid.manage.entity.AdminEntity;

import org.apache.ibatis.annotations.Param;

public interface AdminMapper {

	AdminEntity findAdmin(@Param("adminname") String adminname, @Param("adminpwd") String adminpwd);
	AdminEntity findAdminByName(@Param("adminname") String adminname);
}
