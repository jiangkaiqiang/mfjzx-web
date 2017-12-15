coldWeb.controller('responseManage', function($rootScope, $scope, $state, $cookies,
		$http, $location, Upload) {
	$scope.maxSize = 10;
	// 总条目数(默认每页十条)
	$scope.bigTotalItems = 10;
	// 当前页
	$scope.bigCurrentPage = 1;
	$scope.optAudit = 100;
	$scope.AllResponse = [];
	// 获取资讯列表
	$scope.getAllResponse = function() {
		$http({
			method : 'POST',
			url : window.localStorage.weburl+'/i/response/findResponseList',
			params : {
				pageNum : $scope.bigCurrentPage,
				pageSize : $scope.maxSize,
				keyword : encodeURI($scope.keyword,"UTF-8")
			}
		}).success(function(data) {
			$scope.bigTotalItems = data.total;
			$scope.AllResponse = data.list;
		});
	};

	$scope.getAllResponse();

	$scope.pageChanged = function() {
		$scope.getAllResponse();
	};

	$scope.goSearch = function() {
		$scope.getAllResponse();
	};
	

	function delcfm() {
		if (!confirm("确认要删除？")) {
			return false;
		}
		return true;
	}

	 $scope.goDeleteRes = function (infoID) {
	    	if(delcfm()){
	    	$http.get(window.localStorage.weburl+'/i/response/deleteResponse', {
	            params: {
	                "responseID": infoID
	            }
	        }).success(function (data) {
	        });
	    	$state.reload();
	    	}
	    };
	    $scope.deleteRess = function(){
	    	if(delcfm()){
	    	var infoIDs = [];
	    	for(i in $scope.selected){
	    		infoIDs.push($scope.selected[i].id);
	    	}
	    	if(infoIDs.length >0 ){
	    		$http({
	    			method:'POST',
	    			url:window.localStorage.weburl+'/i/response/deleteByResponseIDs',
	    			params:{
	    				'responseIDs': infoIDs
	    			}
	    		}).success(function (data) {
	            });
	    	}
	    	$state.reload();
	    	}
	    };
	   
	    
	    $scope.selected = [];
	    $scope.toggle = function (info, list) {
			  var idx = list.indexOf(info);
			  if (idx > -1) {
			    list.splice(idx, 1);
			  }
			  else {
			    list.push(info);
			  }
	    };
	    $scope.exists = function (info, list) {
	    	return list.indexOf(info) > -1;
	    };
	    $scope.isChecked = function() {
	        return $scope.selected.length === $scope.AllResponse.length;
	    };
	    $scope.toggleAll = function() {
	        if ($scope.selected.length === $scope.AllResponse.length) {
	        	$scope.selected = [];
	        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
	        	$scope.selected = $scope.AllResponse.slice(0);
	        }
	    };
});
