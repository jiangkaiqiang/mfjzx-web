var coldWeb = angular.module('ColdWeb', ['ui.bootstrap', 'ui.router', 'ui.checkbox',
    'ngCookies', 'xeditable', 'isteven-multi-select', 'angucomplete', 'angular-table','ngFileUpload','remoteValidation']);
angular.element(document).ready(function ($ngCookies, $http, $rootScope) {
	angular.bootstrap(document, ['ColdWeb']);
});
coldWeb.run(function (editableOptions, adminService, $location,$http) {
	$http.defaults.withCredentials = true;
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    /*$.ajax({type: "GET",cache: false,dataType: 'json',url: weburl+'/i/admin/findAdmin'}).success(function(data){
      	admin = data.entity;*/
        window.localStorage.weburl = "http://localhost:8989";
        admin = window.localStorage.lkuser;
      	if(admin == null || admin==''||admin==undefined){
  			url = "login.html";
  			window.location.href = url;
  		}
  		adminService.setAdmin(admin);
      /*});*/
});


coldWeb.factory('adminService',['$rootScope','$http', function($rootScope,$http){
	return {
		setAdmin: function(admin){
	    	$rootScope.admin = admin;
	    	$rootScope.logout = function () {
		            window.localStorage.lkuser ='';
	        	    window.location.reload();
	        };
	    },
	};
}]);


coldWeb.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    //index
    $stateProvider.state('login', {
        url: '/login',
        controller: 'login',
        templateUrl: 'login.html'
    }).state('home', {
        url: '/home',
        controller: 'home',
        templateUrl: 'app/template/home.html'
    }).state('publishManage', {
        url: '/publishManage',
        controller: 'publishManage',
        templateUrl: 'app/template/publishManage.html'
    }).state('commentManage', {
        url: '/commentManage',
        controller: 'commentManage',
        templateUrl: 'app/template/commentManage.html'
    }).state('infoManage', {
        url: '/infoManage',
        controller: 'infoManage',
        templateUrl: 'app/template/infoManage.html'
    }).state('schoolManage', {
        url: '/schoolManage',
        controller: 'schoolManage',
        templateUrl: 'app/template/schoolManage.html'
    }).state('operatinLog',{
    	url: '/operationLog',
    	controller: 'operationLog',
    	templateUrl: 'app/template/operationLog.html'
    }).state('responseManage', {
        url: '/responseManage',
        controller: 'responseManage',
        templateUrl: 'app/template/responseManage.html'
    });
});