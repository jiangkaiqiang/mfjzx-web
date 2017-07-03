angular.module('app', ['ngFileUpload']).controller('post-message', function ($scope, Upload, $http) { 
    $scope.totalAppendixs = [];
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
		                url: '/i/publish/addPublish',
		                headers :{ 'Content-Transfer-Encoding': 'utf-8' },
		                data: data
		            }).success(function (data) {
	            if(data.success){
	            	alert("发布成功");
	            	window.location.href="#/post-bar";
	            }
	        });
    	}
    	else{
    		alert("请选择分类");
    	}
	};
});
