/**
 * 冷库列表
 */
$().ready(function() { 
	  var maxSize=10;
      var totalPages=  currentPage=  1;  // 当前页
      var isLoadRB=false;  
	  var ul_select=$("#ul_rdcsL_list");
	  var flag = document.getElementById('dataType').value;
      gosharedile=function(sharid){
    	  if(flag==3)
    	      window.location.href ="releasestoragedetail.html?id="+sharid; 
    	  else if(flag==1)
    		  window.location.href ="releasegoodsedetail.html?id="+sharid; 
    	  else if(flag==2)
    		  window.location.href ="releasehavecar.html?id="+sharid; 
      };
      initevg=function(){
   	    $(window).scroll(function(){
     	    var scrollTop = $(this).scrollTop();
	     	var scrollHeight = $(document).height();
	     	var windowHeight = $(this).height();
	     	if(scrollTop + windowHeight > scrollHeight-30){
	     		if(isLoadRB==false&&currentPage<totalPages){
	     		   getPageData();
	     		}
	     	};
     	});
     };

  	function gethtml(rdc){
  		  var score=['<li class="imgCell" ><a href="releasestorage.html?id='+rdc.id+'"><img class="fl" src="'+rdc.logo+'"><div><p class="ellipsis">'+rdc.name+'</p><p class="position omg"><i class="iconfont">&#xe66e;</i>'+rdc.address+'</p><ul class="star" value="'+rdc.score+'">'];
  		  for ( var i = 0; i < 5; i++) { score.push(i<=rdc.score?'<li class="filled">★</li>':"<li>★</li>"); }
  		  score.push('</ul></div></a><button class="grab" onclick="gosharedile('+rdc.id+');" >发布</button></li>');
  		  return score.join("");
  	}
  	function getPageData(){//启用无限加载
  		   isLoadRB=true;
  		  $.post(ER.root+"/i/rdc/findRDCDTOByUserId", {
  			   userID: window.user.id,
               keyword:"",
               pageNum: currentPage,
               pageSize:maxSize},  function(data) {	
  	   	          if(data.success&&data.data.length>0){
  	   	        	  totalPages=data.totalPages;
  	   	         	  currentPage++; var html=[];var   rdcsList = data.data;//
  	   	              $.each(rdcsList, function(index, item) {html.push( gethtml(item)); });
  	   	              ul_select.append(html.join(""));
  	   	              $(".nodata").hide();
  	   	          }else{
  	   	              $(".nodata").show();
  	   	          }
  	   	     isLoadRB=false;
  		    });
  	};
  	getPageData();
  	initevg();
});	
