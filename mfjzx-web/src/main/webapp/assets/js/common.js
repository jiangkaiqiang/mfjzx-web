var CommonObj = function () {
    
//倒计时
/*function resetCode(){
    $('#J_getCode').hide();
    $('#J_second').html('60');
    $('#J_resetCode').show();
    var second = 60;
    var timer = null;
    timer = setInterval(function(){
        second -= 1;
        if(second >0 ){
            $('#J_second').html(second);
        }else{
            clearInterval(timer);
            $('#J_getCode').show();
            $('#J_resetCode').hide();
        }
    },1000);
}*/
//屏幕高度
var broswerHeight = function(){
    var realityHeight = parseInt($("#base_content_container").outerHeight()); // 内容高度
    var bodyHeight = Math.max( window.innerHeight, document.body.clientHeight );
    if((bodyHeight - 80) > realityHeight){
    $("#base_content_container").css("height",(bodyHeight - 80));
    }
}

var handleActions = function(){
    $('body')
    /*计算内容高度*/
    .on('click', '#resume_cal_height', function(e) {
      broswerHeight();
    })
    /*倒计时*/
    .on('click', '#J_getCode', function(e) {
      resetCode();
    })
	.on('click', '#btn1', function(e) {
        broswerHeight();
    })
	.on('click', '#btn2', function(e) {
        broswerHeight();
    })
	.on('click', '#btn3', function(e) {
        broswerHeight();
    })
	.on('click', '#btn4', function(e) {
        broswerHeight();
    })
	.on('click', '#btn5', function(e) {
        broswerHeight();
    })
    /*注册 角色切换*/
    .on('click', '#company_gate', function(e) {
       $('#company_gate div').addClass("selected");
       $('#geek_gate div').removeClass("selected");
    }).on('click', '#geek_gate', function(e) {
       $('#geek_gate div').addClass("selected");
       $('#company_gate div').removeClass("selected");
    })
    /*咨询详情页 评论回复*/
    .on('click', '#input_comment1', function(e) { 
       $("#input_comment1").css("display","none");
       $("#input_comment2").css("display","");
    })
    /*.on('click', '#comment_btn', function(e) {
        $("#comment_alter").modal("show");
    })*/
    .on('click', '#reply', function(e) {
       var RHTML= ""
       RHTML += '<div class="form-group input-group padding-top-10"> ';
       RHTML += ' <input type="text" class="form-control" /> ';
       RHTML += ' <span class="input-group-btn"> <button class="btn btn-primary" type="button" id="reply_btn">回复</button> </span> ';
       RHTML += '</div> ';
       $("#reply_area").html(RHTML);
    })
   /* .on('click', '#reply_btn', function(e) {
        $("#reply_alter").modal("show");
    })*/
    .on('click', '#open_reple', function(e) { 
       $("#open_reple").css("display","none");
       $("#close_reple").css("display","");
       $("#comment_second").css("display","");
    })
    .on('click', '#close_reple', function(e) { 
       $("#close_reple").css("display","none");
       $("#open_reple").css("display","");
       $("#comment_second").css("display","none");
    })
    .on('click', '#reply_second', function(e) { 
       $("#reply_area_second").css("display","");
    })
    /*关注*/
    .on('click', '#unattention', function(e) {
    $('#unattention').hide();
    $('#attention').show();
    })
    .on('click', '#attention', function(e) {
    $('#unattention').show();
    $('#attention').hide();
    })
    /*私信*/
    .on('click', '#send_message', function(e) {
    $('#send-message').css("display","");
    })
    .on('click', '#colse_message', function(e) {
     $('#send-message').css("display","none");
    })
    /*基本信息*/
    .on('click', '#edit_info', function(e) {
        
       $("#edit_info_tab").css("display","none");
       $("#edit_info").css("display","none");
       $("#edit_info_save").css("display","");
       $("#edit_info_concel").css("display","");
       $("#edit_info_tab_edit").css("display","");
    })
    /*.on('click', '#edit_info_save', function(e) {
        
       $("#edit_info_tab").css("display","");
       $("#edit_info").css("display","");
       $("#edit_info_save").css("display","none");
       $("#edit_info_concel").css("display","none");
       $("#edit_info_tab_edit").css("display","none");
    })
    .on('click', '#edit_info_concel', function(e) {
        
       $("#edit_info_tab").css("display","");
       $("#edit_info").css("display","");
       $("#edit_info_save").css("display","none");
       $("#edit_info_concel").css("display","none");
       $("#edit_info_tab_edit").css("display","none");
    })*/
    /*简历*/
    .on('click', '#edit_education', function(e) {
        
       $("#edit_education").css("display","none");
       $("#cancel_education").css("display","");
       $("#save_education").css("display","");
       $("#resume").css("display","none");
       $("#resume_edit").css("display","");
    })
    .on('click', '#cancel_education', function(e) {
        
       $("#edit_education").css("display","");
       $("#cancel_education").css("display","none");
       $("#save_education").css("display","none");
       $("#resume").css("display","");
       $("#resume_edit").css("display","none");
    })
   /* .on('click', '#save_education', function(e) {
         $('#save_resume_alter').modal("show");
    })*/
    /*新增教育*/
    .on('click', '#add_education', function(e) {
        
       $("#education_form").css("display","");
    })
    .on('click', '#edit_edu', function(e) {
        
       $("#education_form").css("display","");
       $("#body_edu").css("display","none");
       $("#body_edu_icon").css("display","none");
    })
    .on('click', '#cancel_add_education', function(e) {
        
       $("#education_form").css("display","none");
       $("#body_edu").css("display","");
       $("#body_edu_icon").css("display","");
    })
        /*新增工作*/
        .on('click', '#add_work', function(e) {
        
       $("#work_form").css("display","");
    })
    .on('click', '#concel_add_work', function(e) {
        
       $("#work_form").css("display","none");
    })
        /*新增荣誉*/
        .on('click', '#add_honor', function(e) {
        
       $("#honor_form").css("display","");
    })
    .on('click', '#concel_add_honor', function(e) {
        
       $("#honor_form").css("display","none");
    })
    
        /*新增技能*/
        .on('click', '#add_skill', function(e) {
        
       $("#skill_form").css("display","");
    })
    .on('click', '#concel_add_skill', function(e) {
        
       $("#skill_form").css("display","none");
    })
     
    /*简历编辑保存*/
    .on('click', '#save_education', function(e) {
        $('#save_education_alter').modal("show");
    })
    /*我的消息 快速回复*/
    .on('click', '#quick_reply', function(e) {
        $("#input_quick_reply").css("display","");
    })
   /* .on('click', '#quick_reply_btn', function(e) {
        $("#quick_reply_alter").modal("show");
    })*/
    /*发帖 全选or校园频道*/
    .on('click', '#optionsRadios2', function(e) {
        $("#select_school").css("display","");
    })
    /*校验表单   login*/
    .on('click', '#reset_password', function(e) {
        var password1 = $("#password1").val();
        var password2 = $("#password2").val();
        if(password1=="" || password2=="" || password1 != password2){
            $("#password-error").css("display","");
            $("#rpassword-error").css("display","");
            return false;
        }
    })
    /*企业名片编辑*/
    .on('click', '#edit_card_btn', function(e) {
        $("#concel_card_btn").css("display","");
        $("#save_card_btn").css("display","");
        $("#edit_card_body").css("display","");
        $("#card_body").css("display","none");
        $("#edit_card_btn").css("display","none");
    })
    .on('click', '#concel_card_btn', function(e) {
        $("#concel_card_btn").css("display","none");
        $("#save_card_btn").css("display","none");
        $("#edit_card_body").css("display","none");
        $("#card_body").css("display","");
        $("#edit_card_btn").css("display","");
    })
    .on('click', '#save_card_btn', function(e) {
        $("#save_card_alter").modal("show");
    })
    .on('click', '#btn_edit_logo_com', function(e) {
        $("#edit_logo_com").modal("show");
    })
    .on('click', '#btn_edit_img_com', function(e) {
        $("#edit_img_com").modal("show");
    })
    .on('click', '#btn_edit_img', function(e) {
        $("#edit_img").modal("show");
    })
    .on('click', '#btn_edit_photo', function(e) {
        $("#edit_photo").modal("show");
    });
};

return {

        init: function() {
            handleActions();
            broswerHeight();
        }
    };

}();