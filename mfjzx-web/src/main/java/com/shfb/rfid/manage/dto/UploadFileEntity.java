package com.shfb.rfid.manage.dto;

import java.io.InputStream;

/**
 * @author jiangkaiqiang
 * @date 2016-6-7 下午8:10:02
 * @Description: UploadFileEntity,used to upload file
 */
public class UploadFileEntity {
	private String name;// file name-->FTP client
	private InputStream inputStreamFile;// multipartFile-->user upload file
	//相对地址，不加 /
	private String remoteNewDir;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public InputStream getInputStreamFile() {
		return inputStreamFile;
	}

	public void setInputStreamFile(InputStream inputStreamFile) {
		this.inputStreamFile = inputStreamFile;
	}

	public String getRemoteNewDir() {
		return remoteNewDir;
	}

	public void setRemoteNewDir(String remoteNewDir) {
		this.remoteNewDir = remoteNewDir;
	}

	public UploadFileEntity(String name, InputStream inputStreamFile,
			String remoteNewDir) {
		super();
		this.name = name;
		this.inputStreamFile = inputStreamFile;
		this.remoteNewDir = remoteNewDir;
	}

	
}
