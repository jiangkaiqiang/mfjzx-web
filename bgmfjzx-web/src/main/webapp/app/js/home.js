coldWeb.controller('home', function ($rootScope, $scope, $state, $cookies, $http, $location) {
	$scope.load = function(){
		 /*$.ajax({type: "GET",cache: false,dataType: 'json',url: 'http://localhost:8989/i/admin/findAdmin'}).success(function(data){
			   $rootScope.admin = data.entity;*/
		admin = window.localStorage.lkuser;
				if($rootScope.admin == null || $rootScope.admin.id == 0){
					url = "http://" + $location.host() + ":" + $location.port() + "/login.html";
					window.location.href = url;
				}
		 /*  });*/
	};
	$scope.load();
	// 显示最大页数
    $scope.maxSize = 10;
    // 总条目数(默认每页十条)
    $scope.bigTotalItems = 10;
    // 当前页
    $scope.bigCurrentPage = 1;
	$scope.Allusers = [];
	$scope.optAudit = '8';
	 // 获取当前冷库的列表

	  
    $scope.getUsers = function() {
		$http({
			method : 'POST',
			url : window.localStorage.weburl+'/i/case/findCaseListForBg',
			params : {
				pageNum : $scope.bigCurrentPage,
				pageSize : $scope.maxSize,
				keyword : encodeURI($scope.keyword,"UTF-8"),
			}
		}).success(function(data) {
			$scope.bigTotalItems = data.total;
			$scope.Allusers = data.list;
		});
	}

	$scope.pageChanged = function() {
		$scope.getUsers();
	}
	$scope.getUsers();
	// 获取当前冷库的列表
	$scope.auditChanged = function(optAudiet) {
		$scope.getUsers();
	}
    
	$scope.goSearch = function () {
		$scope.getUsers();
    }
	
	function delcfm() {
	        if (!confirm("确认要删除？")) {
	            return false;
	        }
	        return true;
	}
	
    $scope.goDeleteUser = function (caseID) {
    	if(delcfm()){
    	$http.get(window.localStorage.weburl+'/i/case/deleteCaseByID', {
            params: {
                "caseID": caseID
            }
        }).success(function (data) {
        });
    	$state.reload();
    	}
    }
    $scope.deleteUsers = function(){
    	if(delcfm()){
    	var userIDs = [];
    	for(i in $scope.selected){
    		userIDs.push($scope.selected[i].id);
    	}
    	if(userIDs.length >0 ){
    		$http({
    			method:'POST',
    			url:window.localStorage.weburl+'/i/case/deleteCaseByIDs',
    			params:{
    				'caseIDs': userIDs
    			}
    		}).success(function (data) {
            });
    	}
    	window.location.reload(); 
    	}
    }
   
    
    $scope.selected = [];
    $scope.toggle = function (user, list) {
		  var idx = list.indexOf(user);
		  if (idx > -1) {
		    list.splice(idx, 1);
		  }
		  else {
		    list.push(user);
		  }
    };
    $scope.exists = function (user, list) {
    	return list.indexOf(user) > -1;
    };
    $scope.isChecked = function() {
        return $scope.selected.length === $scope.Allusers.length;
    };
    $scope.toggleAll = function() {
        if ($scope.selected.length === $scope.Allusers.length) {
        	$scope.selected = [];
        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
        	$scope.selected = $scope.Allusers.slice(0);
        }
    };
    
    $scope.getUserIDsFromSelected = function(audit){
    	var userIDs = [];
    	for(i in $scope.selected){
    		if(audit != undefined)
    			$scope.selected[i].audit = audit;
    		userIDs.push($scope.selected[i].id);
    	}
    	return userIDs;
    }
    
    /*$scope.getAudit = function(i){
    	if(i==0)
    		return '待审核';
    	else if(i>0){
    		return '通过';
    	}else{
    		return '未通过';
    	}
    }*/
    
    /*$scope.changeAudit = function(user){
    	var r=confirm("通过审核？");
    	user.audit = r?1:-1;
    	$http({
    		'method':'POST',	
    		'url':window.localStorage.weburl+'/i/user/changeAudit',
    		'params':{
    			'userID':user.id,
    			'audit':user.audit
    		}
    	})
    }
    $scope.changeAudits = function(){
    	var r=confirm("通过审核？");
    	var audit = r?1:-1
    	var userIDs = $scope.getUserIDsFromSelected(audit);
    	if(userIDs.length >0 ){
    		$http({
    			method:'POST',
    			url:window.localStorage.weburl+'/i/user/changeAudits',
    			params:{
    				'userIDs': userIDs,
    				'audit':audit
    			}
    		});
    	}
    }*/
    
    
    function checkInput(){
        var flag = true;
        // 检查必须填写项
        if ($scope.username == undefined || $scope.username == '') {
            flag = false;
        }
        if ($scope.password == undefined || $scope.password == '') {
            flag = false;
        }
        if ($scope.telephone == undefined || $scope.telephone == '') {
            flag = false;
        }
        return flag;
    }

    $scope.goDetail = function(userID) {
    	$http.get(window.localStorage.weburl+'/i/case/findCaseByID', {
            params: {
                "caseID": userID
            }
        }).success(function(data){
		    if(data!=null&&data.id!=undefined){
				 $scope.userDetail = data;
		    }
	     });
		};
    
    $scope.submit = function(){
            $http({
            	method : 'GET', 
    			url:window.localStorage.weburl+'/i/case/updateCase',
    			params:{
    				'caseid':  $scope.userDetail.id,
    				'title':  $scope.userDetail.title,
    				'introduction':  $scope.userDetail.introduction,
    				'content' :  $scope.userDetail.content
    			}
    		}).then(function (resp) {
                alert("更新成功");
                window.location.reload(); 
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.name);
            });
    }
});
