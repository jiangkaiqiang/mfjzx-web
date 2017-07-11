angular.module('app', ['ngFileUpload']).controller('shangYePage', function ($scope, Upload, $http) { 
	$scope.getShangYeCases = function() {
		$http({
			method : 'POST',
			url : '/i/case/findCaseList',
			params : {
				topcategory : 3
			}
		}).success(function(data) {
			$scope.AllShangYeCases = data;
		});
	};
	$scope.getShangYeCases();
});
