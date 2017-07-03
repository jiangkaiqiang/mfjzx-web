angular.module('app', ['ngFileUpload']).controller('index', function ($scope, Upload, $http) { 
	$scope.getCases = function() {
		$http({
			method : 'POST',
			url : '/i/case/findCaseList',
			params : {
				topcategory : 1,
				subcategory : 1
			}
		}).success(function(data) {
			$scope.Allcases = data;
		});
	};
	$scope.getCases();
});
