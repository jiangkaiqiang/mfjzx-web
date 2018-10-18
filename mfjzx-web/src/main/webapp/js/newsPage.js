angular.module('app', ['ngFileUpload']).controller('newsPage', function ($scope, Upload, $http) { 
	$scope.getNewsCases = function() {
		$http({
			method : 'POST',
			url : '/i/case/findCaseList',
			params : {
				topcategory : 6
			}
		}).success(function(data) {
			$scope.AllNewsCases = data;
		});
	};
	$scope.getNewsCases();
});
