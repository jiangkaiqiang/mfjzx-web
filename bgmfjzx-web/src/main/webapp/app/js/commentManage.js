coldWeb.controller('commentManage', function($rootScope, $scope, $state, $cookies,
		$http, $location, Upload) {
	$scope.maxSize = 10;
	// 总条目数(默认每页十条)
	$scope.bigTotalItems = 10;
	// 当前页
	$scope.bigCurrentPage = 1;
	$scope.optAudit = 100;
	$scope.AllComment = [];
	// 获取资讯列表
	$scope.getAllComment = function() {
		$http({
			method : 'POST',
			url : window.localStorage.weburl+'/i/comment/findCommentList',
			params : {
				pageNum : $scope.bigCurrentPage,
				pageSize : $scope.maxSize,
				keyword : encodeURI($scope.keyword,"UTF-8")
			}
		}).success(function(data) {
			$scope.bigTotalItems = data.total;
			$scope.AllComment = data.list;
		});
	};

	$scope.getAllComment();

	$scope.pageChanged = function() {
		$scope.getAllComment();
	};

	$scope.goSearch = function() {
		$scope.getAllComment();
	};
	

	function delcfm() {
		if (!confirm("确认要删除？")) {
			return false;
		}
		return true;
	}

	 $scope.goDeleteCom = function (infoID) {
	    	if(delcfm()){
	    	$http.get(window.localStorage.weburl+'/i/comment/deleteComment', {
	            params: {
	                "commentID": infoID
	            }
	        }).success(function (data) {
	        });
	    	$state.reload();
	    	}
	    };
	    $scope.deleteComs = function(){
	    	if(delcfm()){
	    	var infoIDs = [];
	    	for(i in $scope.selected){
	    		infoIDs.push($scope.selected[i].id);
	    	}
	    	if(infoIDs.length >0 ){
	    		$http({
	    			method:'POST',
	    			url:window.localStorage.weburl+'/i/comment/deleteByCommentIDs',
	    			params:{
	    				'commentIDs': infoIDs
	    			}
	    		}).success(function (data) {
	            });
	    	}
	    	$state.reload();
	    	}
	    };
	   
	    
	    $scope.selected = [];
	    $scope.toggle = function (info, list) {
			  var idx = list.indexOf(info);
			  if (idx > -1) {
			    list.splice(idx, 1);
			  }
			  else {
			    list.push(info);
			  }
	    };
	    $scope.exists = function (info, list) {
	    	return list.indexOf(info) > -1;
	    };
	    $scope.isChecked = function() {
	        return $scope.selected.length === $scope.AllComment.length;
	    };
	    $scope.toggleAll = function() {
	        if ($scope.selected.length === $scope.AllComment.length) {
	        	$scope.selected = [];
	        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
	        	$scope.selected = $scope.AllComment.slice(0);
	        }
	    };
});
