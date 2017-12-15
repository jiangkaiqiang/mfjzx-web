coldWeb.controller('infoManage', function($rootScope, $scope, $state, $cookies,
		$http, $location, Upload) {
	$scope.maxSize = 10;
	// 总条目数(默认每页十条)
	$scope.bigTotalItems = 10;
	// 当前页
	$scope.bigCurrentPage = 1;
	$scope.optAudit = 100;
	$scope.AllInformation = [];
	// 获取资讯列表
	$scope.getAllInformation = function() {
		$http({
			method : 'POST',
			url : window.localStorage.weburl+'/i/information/findAllInformation',
			params : {
				pageNum : $scope.bigCurrentPage,
				pageSize : $scope.maxSize,
				audit : $scope.optAudit,
				keyword : encodeURI($scope.keyword,"UTF-8"),
			}
		}).success(function(data) {
			$scope.bigTotalItems = data.total;
			$scope.AllInformation = data.list;
		});
	};

	$scope.getAllInformation();

	$scope.pageChanged = function() {
		$scope.getAllInformation();
	};

	$scope.goSearch = function() {
		$scope.getAllInformation();
	};
	
	
	$scope.goDetail = function(inforID) {
		  $http.get(window.localStorage.weburl+'/i/information/findInformationByID', {
					params : {
						"inforID" : inforID
					}
				}).success(function(data) {
					$scope.informationDetail = data;
					document.getElementById("content").innerHTML=$scope.informationDetail.content;
				});
		};

	function delcfm() {
		if (!confirm("确认要删除？")) {
			return false;
		}
		return true;
	}

	 $scope.goDeleteInfo = function (infoID) {
	    	if(delcfm()){
	    	$http.get(window.localStorage.weburl+'/i/information/deleteInfo', {
	            params: {
	                "inforID": infoID
	            }
	        }).success(function (data) {
	        });
	    	$state.reload();
	    	}
	    };
	    $scope.deleteInfos = function(){
	    	if(delcfm()){
	    	var infoIDs = [];
	    	for(i in $scope.selected){
	    		infoIDs.push($scope.selected[i].id);
	    	}
	    	if(infoIDs.length >0 ){
	    		$http({
	    			method:'POST',
	    			url:window.localStorage.weburl+'/i/information/deleteByInfoIDs',
	    			params:{
	    				'inforIDs': infoIDs
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
	        return $scope.selected.length === $scope.AllInformation.length;
	    };
	    $scope.toggleAll = function() {
	        if ($scope.selected.length === $scope.AllInformation.length) {
	        	$scope.selected = [];
	        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
	        	$scope.selected = $scope.AllInformation.slice(0);
	        }
	    };
});
