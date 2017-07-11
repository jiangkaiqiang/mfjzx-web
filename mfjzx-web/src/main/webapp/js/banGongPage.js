angular.module('app', ['ngFileUpload']).controller('banGongPage', function ($scope, Upload, $http) { 
	$scope.getBanGongCases = function() {
		$http({
			method : 'POST',
			url : '/i/case/findCaseList',
			params : {
				topcategory : 4
			}
		}).success(function(data) {
			$scope.AllBanGongCases = data;
		});
	};
	$scope.getBanGongCases();
});
