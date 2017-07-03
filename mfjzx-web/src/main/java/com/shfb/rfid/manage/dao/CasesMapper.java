package com.shfb.rfid.manage.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.shfb.rfid.manage.entity.Cases;

public interface CasesMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Cases record);

    int insertSelective(Cases record);

    Cases selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Cases record);

    int updateByPrimaryKeyWithBLOBs(Cases record);

    int updateByPrimaryKey(Cases record);
    
    List<Cases> findAllCases(@Param("topcategory")Integer topcategory, @Param("subcategory")Integer subcategory);
}