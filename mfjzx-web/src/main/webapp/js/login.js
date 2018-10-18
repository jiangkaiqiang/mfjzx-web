$(document).ready(function(){
		/*$.ajax({url: "/i/admin/findAdmin",async:false, cache: false}).success(function(data){
				if(data.success&&data.entity.id != 0){
				  window.location.href = "http://"+ window.location.host + "/#/home";
				}
			});*/
	window.localStorage.weburl = "";
		});
		
		function showErrorInfo(msg){
			var msgEl = $("#mention");
			if(msg == null || msg == ''){
                msgEl.hide();
                msgEl.html('');
			}else{
				msgEl.show();
    			msgEl.html(msg);
			}
		}
		function login() {
		          var me = "#submit";
			        if($(me).data('isLoading') === true)return;
					showErrorInfo("");
					if ($("#adminname").val() == '') {
						showErrorInfo("用户名不能为空！");
						return;
					} else if ($("#adminpwd").val() == '') {
						showErrorInfo("密码不能为空！");
						return;
					} 
					
					$(me).text("登录中...");
					$(me).data('isLoading',true);
					 var rds = document.getElementsByName("adminrole");
					var adminRole="";
					for ( var i = 0; i < rds.length; i++) {
						if (rds.item(i).checked) {
							adminRole = rds.item(i).getAttribute("value");
							break;
						} else {
							continue;
						}
					 }
					   $.ajax({
								type : 'POST',
								dataType : "json",
								url : window.localStorage.weburl+"/i/admin/login",
								data : {adminName : $("#adminname").val(),adminpwd : $("#adminpwd").val()},
								complete : function(e){
                                    $(me).text("登录");
                                    $(me).delay(500).data('isLoading',false);
								},
								success : function(data) {
									if (data.success) {
	                                    document.cookie = data.message;
										if (window.location.hash != "") {
											backUrl = window.location.hash;
										} else {
											backUrl = "#/home";
										}
										window.localStorage.lkuser = $("#adminname").val();
										window.location.href = "bgindex.html";
										window.Event.returnValue = false;
									} else {
									    $("#mention")[0].hidden = false;
										showErrorInfo(data.message);
									}
								}
							});
				};
			$(document).on({keyup : function(e) {if (e.keyCode == '13'){login();}}});
			