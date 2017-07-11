angular.module('app', ['ngFileUpload']).controller('zongHePage', function ($scope, Upload, $http) { 
	$scope.getZongHeCases = function() {
		$http({
			method : 'POST',
			url : '/i/case/findCaseList',
			params : {
				topcategory : 5
			}
		}).success(function(data) {
			$scope.AllZongHeCases = data;
		});
	};
	$scope.getZongHeCases();
});
