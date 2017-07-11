angular.module('app', ['ngFileUpload']).controller('post-message', function ($scope, Upload, $http) { 
    $scope.totalAppendixs = [];
    $scope.topcategory = "1";
    $scope.subcategory = "1";
    $scope.allSubCategory = [];
    $scope.addAppendixs = function () {
		if($scope.appendixs.length==0){return;};
		var allfiles = $scope.totalAppendixs.concat($scope.appendixs);
		if(allfiles.length>1){alert("最多选择1个！");return;}
        $scope.totalAppendixs=allfiles; 
    };
    $scope.dropAppendixFile = function(file){
        angular.forEach($scope.totalAppendixs,function(item, key){
            if(item == file){
                $scope.totalAppendixs.splice(key,1); return false;
            }
        });
    };
    $scope.topCatSelected = function(topcategory){
    	if(topcategory=="1"){
    		$scope.allSubCategory = $scope.allSubCategory1;
    	}
    	if(topcategory=="2"){
    		$scope.allSubCategory = $scope.allSubCategory2;
    	}
    	if(topcategory=="3"){
    		$scope.allSubCategory = $scope.allSubCategory3;
    	}
    	if(topcategory=="4"){
    		$scope.allSubCategory = $scope.allSubCategory4;
    	}
    	if(topcategory=="5"){
    		$scope.allSubCategory = $scope.allSubCategory5;
    	}
    };
    $scope.allTopCategory = [
	                      {id:"1",name:"住宅家居类"},
	                      {id:"2",name:"酒店民宿类"},
	                      {id:"3",name:"商业展示类"},
	                      {id:"4",name:"商务办公类"},
	                      {id:"5",name:"公共空间类"}
	                      
	];
    $scope.allSubCategory1 = [
   	                      {id:"1",name:"集装箱住宅"},
   	                      {id:"2",name:"集装箱公寓"},
   	                      {id:"3",name:"集装箱别墅"},
   	                      {id:"4",name:"集装箱度假屋"}
   	];
    $scope.allSubCategory2 = [
        	                      {id:"1",name:"集装箱酒店"},
        	                      {id:"2",name:"集装箱宾馆"},
        	                      {id:"3",name:"集装箱民宿"},
        	                      {id:"4",name:"集装箱房车"}
        	];
    $scope.allSubCategory3 = [
        	                      {id:"1",name:"集装箱展示厅"},
        	                      {id:"2",name:"集装箱咖啡馆"},
        	                      {id:"3",name:"集装箱餐厅"},
        	                      {id:"4",name:"集装箱专卖店"}
        	];
    $scope.allSubCategory4 = [
        	                      {id:"1",name:"集装箱办公楼"},
        	                      {id:"2",name:"集装箱工作间"},
        	                      {id:"3",name:"集装箱厂房"},
        	                      {id:"4",name:"集装箱仓储"}
        	];
    $scope.allSubCategory5 = [
        	                      {id:"1",name:"集装箱学校"},
        	                      {id:"2",name:"集装箱图书馆"},
        	                      {id:"3",name:"集装箱艺术馆"},
        	                      {id:"4",name:"集装箱健身房"}
        	];
    function checkInput() {
		var flag = true;
		// 检查必须填写项
		if ($scope.topcategory == undefined || $scope.topcategory == '') {
			flag = false;
		}
		if ($scope.subcategory == undefined || $scope.subcategory == '') {
			flag = false;
		}
		return flag;
	}
    $scope.pubSubmit = function() {
    	if(checkInput()){
			   data = {
					    'title' : $scope.title,
		            	'introduction' : $scope.describe,
						'topcategory' : $scope.topcategory,
		            	'subcategory' : $scope.subcategory
		            };
		            for(var i = 0; i < $scope.totalAppendixs.length; i++){
		                data["appendix" + i] = $scope.totalAppendixs[i];
		            }
		       Upload.upload({
		                url: '/i/case/addCase',
		                headers :{ 'Content-Transfer-Encoding': 'utf-8' },
		                data: data
		            }).success(function (data) {
	            if(data){
	            	alert("发布成功");
	            	window.location.href="../index.html";
	            }
	        });
    	}
    	else{
    		alert("请选择分类");
    	}
	};
});
