angular.module('app', ['ngFileUpload']).controller('index', function ($scope, Upload, $http) { 
	$scope.getZhuZhaiCases = function() {
		$http({
			method : 'POST',
			url : '/i/case/findCaseListForIndex',
			params : {
				topcategory : 1
			}
		}).success(function(data) {
			$scope.AllZhuZhaiCases = data;
		});
	};
	$scope.getZhuZhaiCases();
	$scope.getJiuDianCases = function() {
		$http({
			method : 'POST',
			url : '/i/case/findCaseListForIndex',
			params : {
				topcategory : 2
			}
		}).success(function(data) {
			$scope.AllJiuDianCases = data;
		});
	};
	$scope.getJiuDianCases();
	$scope.getShangYeCases = function() {
		$http({
			method : 'POST',
			url : '/i/case/findCaseListForIndex',
			params : {
				topcategory : 3
			}
		}).success(function(data) {
			$scope.AllShangYeCases = data;
		});
	};
	$scope.getShangYeCases();
	$scope.getShangWuCases = function() {
		$http({
			method : 'POST',
			url : '/i/case/findCaseListForIndex',
			params : {
				topcategory : 4
			}
		}).success(function(data) {
			$scope.AllShangWuCases = data;
		});
	};
	$scope.getShangWuCases();
	$scope.getGongGongCases = function() {
		$http({
			method : 'POST',
			url : '/i/case/findCaseListForIndex',
			params : {
				topcategory : 5
			}
		}).success(function(data) {
			$scope.AllGongGongCases = data;
		});
	};
	$scope.getGongGongCases();
});
