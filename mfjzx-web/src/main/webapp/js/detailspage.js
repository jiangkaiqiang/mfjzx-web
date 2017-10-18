angular.module('app', ['ngFileUpload']).controller('detailspage', function ($scope, Upload, $http) { 
	$scope.getCases = function() {
		$http({
			method : 'POST',
			url : '/i/case/findCaseByID',
			params : {
				caseID : getQueryString("id")
			}
		}).success(function(data) {
			$scope.Case = data;
			document.getElementById("content2").innerHTML=$scope.Case.content;
		});
	};
	$scope.getCases();
	function getQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return unescape(r[2]); return null; 
		} 
});
