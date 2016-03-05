/**
 * Created by Administrator on 2015/7/28.
 */
/**
 * 右侧边栏加载的所有方法
 */
//加载最近访问模块
function loadRecentVisitors(currentUser){
    /*
        数据格式：
        [{"id":"","url":"", "photo":"","uName":"","user":{"imgBg":"","uImg":"","uName":"","uStatus":"","uStatusStyle":1,"uTitle":"","uIntr":"","wd":21,"wz":0,"fs":117}}]

     */
    var EX_recentVisitors = $('#EX_recentVisitors,#EX_recentVisitors2');

    var findUserData = function(data, uid){
        for(var i=0;i<data.length;i++){
            if(data[i].id == uid){
                return data[i].user;
            }
        }
        return {};
    };

    $.ajax({
        url:'/common/ajax/visitors/'+currentUser,
        type: 'GET',
        dataType: 'json',
        success: function(data){

            if(data.status == 'success') {
                var html = publicFunction.userGroupHtml(data.data, '最近访客');
                EX_recentVisitors.html(html);
                // 显示用户浮层信息
                EX_recentVisitors.find('.u-photo-btn').parent().hover(function () {
                    $(this).removeClass("zyhideP");
                    var uid = $(this).children(".u-photo-btn").attr('data-uid');
                    if(uid) uid = parseInt(uid);
                    //var backData = findUserData(data.data, uid);
                    var hovered_user=this;
                    $(this).removeClass("zyhideP");
                    $.ajax({
                        url: '/common/ajax/userinfo/' + uid,
                        type: 'GET',
                        dataType: 'json',
                        success: function(data) {
                          if (data.status == 'success') {
                              publicFunction.userInfoLayer(hovered_user, data.data, 'show');
                          }
                        }
                      });

                }, function () {
                    $(this).addClass("zyhideP");
                    var uid = $(this).children(".u-photo-btn").attr('data-uid');
                    if(uid) uid = parseInt(uid);
                    $(this).addClass("zyhideP");
                    var backData = findUserData(data.data, uid);

                    publicFunction.userInfoLayer(this, null, 'hide');
                });
            }
        }
    });
}

//问答页面右侧栏用户信息
function loadUserInfo(currentUser){

    function uInfoHtml(data){
        var s = '';
        s += '<div class="ibox-in">';
        s += '<div class="u-info">';
        s += '<div class="col-left">';
        s += '<div class="col-in">';
        s += '<span class="u-photo">';
        s += ' <a href="/common/course/" target="_blank">';
        // <!-- 鼠标经过 .u-photo-btn 显示用户信息层 .u-info-layer -->
        s += '<img src="'+ data.uImg +'" width="64" height="64"  alt=""/>';
        s += '</a>';
        s += '</span>';
        s += '</div>';
        s += '</div>';
        s += '<div class="col-right">';
        s += '<div class="col-in">';
        s += '<span class="u-name">'+ data.uName +'</span>';
        s += '<ul class="list-inline">';
        s += '<li><a href="/common/ask/all/" target="_blank"><span class="i-num">'+ data.wd +'</span><span class="i-type">问答</span></a></li>';
        s += '<li><a href="/common/article/" target="_blank"><span class="i-num">'+ data.wz +'</span><span class="i-type">文章</span></a></li>';
        s += '<li><a href="/common/social/?list_type=fans" target="_blank"><span class="i-num">'+ data.fs +'</span><span class="i-type">粉丝</span></a></li>';
        s += '</ul>';
        s += '</div>';
        s += '</div>';
        s += '</div>';
        s += '</div>';
        return s;
    }

    var uInfo = $('#uInfo');

    $.ajax({
        url:'/common/ajax/userinfo/'+currentUser,
        type: 'GET',
        dataType: 'json',
        success: function(data){

            if(data.status == 'success') {
                var html = uInfoHtml(data.data); // data = ajaxDataExample
                uInfo.html(html);
                // 鼠标经过头像".u-photo-btn"
                // type-01: publicFunction.userInfoLayer( uInfo.find('.u-photo-btn') , ajaxDataExample ); // 用户头像box， 用户信息
                // type-02:
                //uInfo.find('.u-photo-btn').hover(function () {
                    //publicFunction.userInfoLayer(this, data.data, 'show');
                //}, function () {
                    //publicFunction.userInfoLayer(this, null, 'hide');
                //});
            }
        }
    });
}

//热门问答标签
function loadHotTag(){
    var hotTag = $('#hotTag');

    $.ajax({
        url: '/common/ajax/hottags/', // url
        type: 'GET',
        dataType: 'json',
        success: function(data){

            if(data.status == 'success'){
                var html = publicFunction.hotTagHtml(data.data); // data = ajaxDataExample
                hotTag.html( html );
            }
        }
    });
}

//热门文章标签
function loadArticleHotTag(){
    var hotTag = $('#hotTag');

    $.ajax({
        url: '/common/ajax/articlehottags/', // url
        type: 'GET',
        dataType: 'json',
        success: function(data){

            if(data.status == 'success'){
                var html = publicFunction.hotTagHtml(data.data); // data = ajaxDataExample
                hotTag.html( html );
            }
        }
    });
}


//热门回答
function loadHotAsk(){
    var hotQA = $('#hotQA');
    $.ajax({
        url: '/common/ajax/hotasks/',
        type: 'GET',
        dataType: 'json',
        success: function(data){

            if(data.status == 'success'){
                var html = publicFunction.hotQAHtml( data.data, '一周热门问答'); // data = ajaxDataExample
                // function(){return '<span class="i-ico">?</span>'}
                hotQA.html( html );
            }
        }
    });
}

// 右边栏-热门文章
function loadHotArticle(){
    var hotArticle = $('#hotArticle');
    $.ajax({
        url: '/common/ajax/hotarticle/', // url
        type: 'GET',
        dataType: 'json',
        success: function(data){
            if(data.status == 'success'){
                var html = publicFunction.hotArticleHtml( data.data, '热门文章' ); // data = ajaxDataExample
                hotArticle.html( html );
            }

        }
    });
}

// 右边栏-相关文章
function loadRelatedArticle(articleId){
    var hotArticle = $('#hotArticle');
    $.ajax({
        url: '/common/ajax/relatedarticle/'+ articleId, // url
        type: 'GET',
        dataType: 'json',
        success: function(data){
            if(data.status == 'success'){
                var html = publicFunction.hotArticleHtml( data.data, '相关文章' ); // data = ajaxDataExample
                hotArticle.html( html );
            }

        }
    });
}

function loadauthorElseArticle(currentUser){
    var authorElseArticle = $('#authorElseArticle');
    $.ajax({
        url: '/common/ajax/userarticle/' + currentUser, // url
        type: 'GET',
        dataType: 'json',
        success: function(data){
            if(data.status == 'success'){
                var html = publicFunction.hotArticleHtml( data.data, '作者的其他文章' ); // data = ajaxDataExample
                authorElseArticle.html( html );
            }

        }
    });
}

//相关回答 加载相关askId的回答
function loadRelatedAsk(askId){
    var hotQA = $('#hotQA');

    $.ajax({
        url: '/common/ajax/relatedasks/'+askId, // url
        type: 'GET',
        dataType: 'json',
        success: function(data){

            if(data.status == 'success'){
                var html = publicFunction.hotQAHtml( data.data, '相关问答', function(){return '<span class="i-ico">?</span>'}); // data = ajaxDataExample
                hotQA.html( html );
            }
        }
    });
}


// 右边栏-用户信息统计
function loadNumInfo(currentUser) {

        var Ex_el = $('#EX_teacherStatistics,#studentStatistics');
        $.ajax({
            url :'/common/ajax/numinfo/' + currentUser,
            dataType:'json',
            success:function(data){
                // {"status":"success","type":"teacher/student","data":[]}   {"status":"fail", "message":""}

                if(data.status == 'success'){
                    if(data.type == 'teacher'){
                        var html_teacher = publicFunction.userStatisticsHtml('teacher', data.data);
                        Ex_el.html(html_teacher);
                    }else{
                        var html_student = publicFunction.userStatisticsHtml('student', data.data);
                        Ex_el.html(html_student);
                    }
                }
            }
        });
}

// 右边栏-我的学生 EX_myStudents
function loadMyStudents(currentUser) {
    var EX_myStudents = $('#EX_myStudents');
    //var ajaxDataExample = [{"url":"","photo":"/static/mzq/images/002.png","uName":"姚先生"},{"url":"","photo":"/static/mzq/images/002.png","uName":"姚先生"},{"url":"","photo":"/static/mzq/images/002.png","uName":"姚先生"},{"url":"","photo":"/static/mzq/images/002.png","uName":"姚先生"},{"url":"","photo":"/static/mzq/images/002.png","uName":"姚先生"},{"url":"","photo":"/static/mzq/images/002.png","uName":"姚先生"},{"url":"","photo":"/static/mzq/images/002.png","uName":"姚先生"},{"url":"","photo":"/static/mzq/images/002.png","uName":"姚先生"},{"url":"","photo":"/static/mzq/images/002.png","uName":"姚先生"},{"url":"","photo":"/static/mzq/images/002.png","uName":"姚先生"}];
    var findUserData = function (data, uid) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == uid) {
                return data[i].user;
            }
        }
        return {};
    };
    $.ajax({
        url: '/common/ajax/mystudents/' + currentUser,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.status == 'success') {

                var html = publicFunction.userGroupHtml(data.data, '我的学生');
                EX_myStudents.html(html);
                // 显示用户浮层信息
                EX_myStudents.find('.u-photo-btn').parent().hover(function () {
                    var uid = $(this).children(".u-photo-btn").attr('data-uid');
                    if (uid) uid = parseInt(uid);
                    var backData = findUserData(data.data, uid);
                    publicFunction.userInfoLayer(this, backData, 'show');
                }, function () {
                    var uid = $(this).children(".u-photo-btn").attr('data-uid');
                    if (uid) uid = parseInt(uid);
                    var backData = findUserData(data.data, uid);
                    publicFunction.userInfoLayer(this, null, 'hide');
                });
            }
        }
    });
}

// 右边栏-图片广告
function loadAd(typeId){
    var EX_barAdPic = $('#EX_barAdPic,#EX_barAdPic2');

    $.ajax({
        url: '/common/ajax/ad/' + typeId,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.status == 'success') {
            var html = publicFunction.barAdPicHtml( data.data );
            EX_barAdPic.html( html );
            }
        }
    });
}


// 右边栏-课程推荐
function loadCourse(){
    var EX_courseRecommendation = $('#EX_courseRecommendation');
    //var ajaxDataExample = [{"url":"","img":"/static/mzq/images/001.png","tearcher":"姚先生","courseName":"Redis入门"},{"url":"","img":"/static/mzq/images/001.png","tearcher":"姚先生","courseName":"django进阶"},{"url":"","img":"/static/mzq/images/001.png","tearcher":"姚先生","courseName":"Bottle Web开发（更新中）"}];

    $.ajax({
        url: '/common/ajax/course/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.status == 'success') {
                var html = publicFunction.courseRecommendationHtml(data.data, '课程推荐');
                EX_courseRecommendation.html(html);
            }
        }
    });
}

// 右边栏-活动推荐
function loadActive(){
    var EX_activityRecommendation = $('#EX_activityRecommendation');
     $.ajax({
        url: '/common/ajax/active/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.status == 'success') {
                var html = publicFunction.activityHtml(data.data, '活动推荐');
                EX_activityRecommendation.html(html);
            }
        }
    });
}

// 名师推荐
function loadTeacher() {
    var EX_famousTeacher = $('#EX_famousTeacher');
    //var ajaxDataExample = [{"url":"javascript:;","img":"/static/mzq/images/002.png","uName":"姚先生","intro":"10年软件开发经验，从事过通信协议分析、Java，Web，Android系统、公司，从事移动端开发与项目管理"},{"url":"javascript:;","img":"/static/mzq/images/002.png","uName":"姚先生","intro":"10年信系统、应用等项目职于移动端开发与项目管理"},{"url":"javascript:;","img":"/static/mzq/images/002.png","uName":"姚先生","intro":"10年软件开发经验，从事过通信协议分析、Java，Web，Android系统、应用等项目开发，现供职于某创业公司，从事移动端开发与项目管理"},{"url":"javascript:;","img":"/static/mzq/images/002.png","uName":"姚先生","intro":"10年软件开发经验，从事过通信协议分析、Java，Web，Android系于某创业公司，从事移动端开发与项目管理"}];

    $.ajax({
        url: '/common/ajax/teacher/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.status == 'success') {
                var html = publicFunction.carouselHtml(data.data, '名师推荐');
                EX_famousTeacher.html(html);
                EX_famousTeacher.find('.carousel').carousel();
            }
        }
    });
}

// 右边栏热门活动
function loadHotActivity(){
    var hotActivity = $('#hotActivity');

    $.ajax({
        url: '/common/ajax/hotactivity/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.status == 'success') {
                var html = publicFunction.activityHtml(data.data, '热门活动'); // data = ajaxDataExample
                hotActivity.html(html);
            }
        }
    });

}

// 回复事件
function rec_keyup(e){
    if($(this).val().indexOf($(this).attr("vu"))!=0)
        $(this).val($(this).attr("vu"));
    if(e.keyCode== 46||e.keyCode== 8){
        if($(this).attr("vu").length>=$(this).val().length||!($(this).val().indexOf($(this).attr("vu"))>-1)){
            $(this).val($(this).attr("vu"));
        }
    }
}

// 右边栏-活跃度
function loadActiveRank(){
    var Ex_activateRank = $('#activateRank')
    $.ajax({
       url: '/common/ajax/activaterank',
       type: 'GET',
       dataType: 'json',
       success: function (data) {
            if (data.status == 'success') {
                console.log(data.data)
                var html = publicFunction.activationRankHtml(data.data);
                Ex_activateRank.html(html);
                setInterval(zytimer,10000);
                //var html = publicFunction.carouselHtml(data.data, '名师推荐');
                //EX_famousTeacher.html(html);
                //EX_famousTeacher.find('.carousel').carousel();
            }
       }
    });
}