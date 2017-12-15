coldWeb.controller('publishManage', function($rootScope, $scope, $state, $cookies,
		$http, $location, Upload) {
	$scope.maxSize = 10;
	// 总条目数(默认每页十条)
	$scope.bigTotalItems = 10;
	// 当前页
	$scope.bigCurrentPage = 1;
	$scope.optAudit = 100;
	$scope.AllPublish = [];
	// 获取资讯列表
	$scope.getAllPublish = function() {
		$http({
			method : 'POST',
			url : window.localStorage.weburl+'/i/publish/findPublishList',
			params : {
				pageNum : $scope.bigCurrentPage,
				pageSize : $scope.maxSize,
				audit : $scope.optAudit,
				keyword : encodeURI($scope.keyword,"UTF-8"),
			}
		}).success(function(data) {
			$scope.bigTotalItems = data.total;
			$scope.AllPublish = data.list;
		});
	};

	$scope.getAllPublish();

	$scope.pageChanged = function() {
		$scope.getAllPublish();
	};

	$scope.goSearch = function() {
		$scope.getAllPublish();
	};
	
	
	$scope.goDetail = function(publishID) {
		  $http.get(window.localStorage.weburl+'/i/publish/findPublishByID', {
					params : {
						"publishID" : publishID
					}
				}).success(function(data) {
					$scope.publish = data;
					document.getElementById("pubContent").innerHTML=$scope.publish.content;
				});
		};

	function delcfm() {
		if (!confirm("确认要删除？")) {
			return false;
		}
		return true;
	}

	 $scope.goDeletePub = function (infoID) {
	    	if(delcfm()){
	    	$http.get(window.localStorage.weburl+'/i/publish/deletePublishForBg', {
	            params: {
	                "publishID": infoID
	            }
	        }).success(function (data) {
	        });
	    	$state.reload();
	    	}
	    };
	    $scope.deletePubs = function(){
	    	if(delcfm()){
	    	var infoIDs = [];
	    	for(i in $scope.selected){
	    		infoIDs.push($scope.selected[i].id);
	    	}
	    	if(infoIDs.length >0 ){
	    		$http({
	    			method:'POST',
	    			url:window.localStorage.weburl+'/i/publish/deleteByPublishIDs',
	    			params:{
	    				'publishIDs': infoIDs
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
	        return $scope.selected.length === $scope.AllPublish.length;
	    };
	    $scope.toggleAll = function() {
	        if ($scope.selected.length === $scope.AllPublish.length) {
	        	$scope.selected = [];
	        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
	        	$scope.selected = $scope.AllPublish.slice(0);
	        }
	    };
});
