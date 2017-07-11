angular.module('app', ['ngFileUpload']).controller('zhuZhaiPage', function ($scope, Upload, $http) { 
	$scope.getZhuZhaiCases = function() {
		$http({
			method : 'POST',
			url : '/i/case/findCaseList',
			params : {
				topcategory : 1
			}
		}).success(function(data) {
			$scope.AllZhuZhaiCases = data;
		});
	};
	$scope.getZhuZhaiCases();
});
