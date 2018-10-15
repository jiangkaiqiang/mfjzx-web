angular.module('app', ['ngFileUpload']).controller('jiuDianPage', function ($scope, Upload, $http) { 
	$scope.getJiuDianCases = function() {
		$http({
			method : 'POST',
			url : '/i/case/findCaseList',
			params : {
				topcategory : 2
			}
		}).success(function(data) {
			$scope.AllJiuDianCases = data;
		});
	};
	$scope.getJiuDianCases();
});
