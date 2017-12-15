coldWeb.controller('schoolManage', function ($rootScope, $scope, $state, $cookies, $http, $location) {
	// 显示最大页数
    $scope.maxSize = 10;
    // 总条目数(默认每页十条)
    $scope.bigTotalItems = 10;
    // 当前页
    $scope.bigCurrentPage = 1;
	$scope.AllSchool = [];
	 // 获取当前冷库的列表

	  
    $scope.getSchools = function() {
		$http({
			method : 'POST',
			url : window.localStorage.weburl+'/i/city/findSchoolListForBg',
			params : {
				pageNum : $scope.bigCurrentPage,
				pageSize : $scope.maxSize,
				keyword : encodeURI($scope.keyword,"UTF-8"),
			}
		}).success(function(data) {
			$scope.bigTotalItems = data.total;
			$scope.AllSchool = data.list;
		});
	}
    
    $scope.searchCity = function(cityname){
    	if(cityname==''){
    		$("#CityUl").css("display","none");
    		$scope.cityid = -1;
    	}
    	else{
    		 $http.get(window.localStorage.weburl+'/i/city/findCityByNameAndProvinceId', {
    	            params: {
    	                "cityName": cityname,
    	                "provinceID": -1
    	            }
    	        }).success(function (data) {
     	    	$scope.totalCitys = data;
     	    	$("#CityUl").css("display","");
     	    });
    	}
    };
    $scope.chooseCity = function(city){
    	$scope.cityname = city.ci_city;
    	$("#CityUl").css("display","none");
    	$scope.cityid = city.ci_id;
    };
    
	$scope.pageChanged = function() {
		$scope.getSchools();
	}
	$scope.getSchools();
	// 获取当前冷库的列表
	$scope.auditChanged = function(optAudiet) {
		$scope.getSchools();
	}
    
	$scope.goSearch = function () {
		$scope.getSchools();
    }
	
	function delcfm() {
	        if (!confirm("确认要删除？")) {
	            return false;
	        }
	        return true;
	}
	
    $scope.goDeleteSchool = function (schoolID) {
    	if(delcfm()){
    	$http.get(window.localStorage.weburl+'/i/city/deleteSchool', {
            params: {
                "schoolID": schoolID
            }
        }).success(function (data) {
        });
    	$state.reload();
    	}
    }
    $scope.deleteSchools = function(){
    	if(delcfm()){
    	var schoolIDs = [];
    	for(i in $scope.selected){
    		schoolIDs.push($scope.selected[i].sh_id);
    	}
    	if(schoolIDs.length >0 ){
    		$http({
    			method:'POST',
    			url:window.localStorage.weburl+'/i/city/deleteBySchoolIDs',
    			params:{
    				'schoolIDs': schoolIDs
    			}
    		}).success(function (data) {
            });
    	}
    	window.location.reload(); 
    	}
    }
   
    
    $scope.selected = [];
    $scope.toggle = function (school, list) {
		  var idx = list.indexOf(school);
		  if (idx > -1) {
		    list.splice(idx, 1);
		  }
		  else {
		    list.push(school);
		  }
    };
    $scope.exists = function (school, list) {
    	return list.indexOf(school) > -1;
    };
    $scope.isChecked = function() {
        return $scope.selected.length === $scope.AllSchool.length;
    };
    $scope.toggleAll = function() {
        if ($scope.selected.length === $scope.AllSchool.length) {
        	$scope.selected = [];
        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
        	$scope.selected = $scope.AllSchool.slice(0);
        }
    };
    
    
    $scope.submit = function(){
            $http({
            	method : 'GET', 
    			url:window.localStorage.weburl+'/i/city/addSchool',
    			params:{
    				'sh_shool': encodeURI($scope.schoolname,"UTF-8"),
    				'sh_city': $scope.cityid
    			}
    		}).then(function (resp) {
                alert("添加成功");
                window.location.reload(); 
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.name);
            });
    }
});
