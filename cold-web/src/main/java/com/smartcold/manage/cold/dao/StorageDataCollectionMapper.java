package com.smartcold.manage.cold.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.smartcold.manage.cold.entity.StorageDataCollectionEntity;

public interface StorageDataCollectionMapper {

	void batchInsert(List<StorageDataCollectionEntity> batchEntity);

	List<StorageDataCollectionEntity> findLastNPoint(@Param("apid") String apid, @Param("limit") int limit);
}
