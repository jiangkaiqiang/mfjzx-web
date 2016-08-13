coldWeb.controller('personalShare', function ($rootScope, $scope, $state, $cookies, $http, $location) {
	$scope.load = function(){
		 $.ajax({type: "GET",cache: false,dataType: 'json',url: '/i/user/findUser'}).success(function(data,status,config,headers){
			$rootScope.user = data;
			if($rootScope.user == undefined || $rootScope.user.id == 0){
				url = "http://" + $location.host() + ":" + $location.port();
				window.location.href = url;
			}
	    })
    }
    $scope.load();
	 // 显示最大页数
    $scope.maxSize = 12;
    // 总条目数(默认每页十条)
    $scope.bigTotalItems = 12;
    // 当前页
    $scope.bigCurrentPage = 1;
	$scope.getShares = function() {
    	$http.get('/i/ShareRdcController/getSEListByUID', {
            params: {
                "userID": $rootScope.user.id
            }
        }).success(function (data) {
        	$scope.sharesDto = data.data;
        	$scope.bigTotalItems = data.total;
        });
	}
	$scope.pageChanged = function() {
		$scope.getShares();
	}
	$scope.getShares();
	
	$scope.goDeleteShare = function(shareID){
    	var r=confirm("删除订单？");
    	if(r){
    		$http({
    			url:'/i/ShareRdcController/delShareInfoByUid',
    			params:{
    				'id':shareID,
    				'uid':$rootScope.user.id
    			}
    		}).success(function (data) {
    				alert("删除成功");
    				$state.reload(); 
            });
    	}
    }
});

