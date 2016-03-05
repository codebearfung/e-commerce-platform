// 公开方法，外部调用
publicFunction = {};

var xiaomai_id = 40296;

// 鼠标经过用户头像，显示浮动层信息
/*
 * @parameter uBtn: Element Node // 用户头像元素
 * @parameter data: Object // 用户数据
 */

var cache = [];
publicFunction.userInfoLayer = function (uBtn, data, showOrHide){
	function uInfoHtml(data){
		var s = '';
		s += '<div class="u-info-plane" style="display:none">';
		s += '<img class="u-info-picbg" src="'+ data.imgBg +'" onerror="this.src=http://www.maiziedu.com/uploads/avatar/default_small.png" alt=""/>';
		s += '<div class="col-box">';
		s += '<div class="column-col">';
		s += '<div class="col-in" style="margin:0;">';
		s += '<span class="u-photo"><img src="'+ data.uImg +'" alt=""/></span>';
		s += '</div>';
		s += '</div>';
		s += '<div class="column-col column-full">';
		s += '<div class="col-in" style="margin-left:0;">';
		if( data.uStatusStyle == 2){
		s += '<span class="u-name" style="margin:0;">'+ data.uName +'</span><span class="u-status u-teacher-status"><span class="text">'+ data.uStatus +'</span></span>';
		}
		if( data.uStatusStyle == 1){
		s += '<span class="u-name" style="margin:0;">'+ data.uName +'</span><span class="u-status u-student-status"><span class="text">'+ data.uStatus +'</span></span>';
		}
		if( data.uStatusStyle == 0){
		s += '<span class="u-name" style="margin:0;">'+ data.uName +'</span>';
		}
		//s += '<span class="u-name">'+ data.uName +'</span><span class="u-status u-'+ (2 == data.uStatusStyle ? 'teacher' : 'student') +'-status"><span class="text">'+ data.uStatus +'</span></span>';
		s += '<span class="u-title">'+ data.uTitle +'</span>';
		s += '</div>';
		s += '</div>';
		s += '</div>';
		s += '<p class="u-introduction" style="margin:0;">'+ data.uIntr +'</p>';
		s += '<div class="row">';
		s += '<ul class="pull-left list-inline">';
		s += '<li><span class="i-num" style="width:auto;height:auto;">'+ data.wd +'</span><span class="i-type" style="width:auto;height:auto;">问答</span></li>';
		s += '<li><span class="i-num" style="width:auto;height:auto;">'+ data.wz +'</span><span class="i-type" style="width:auto;height:auto;">文章</span></li>';
		if(data.user_id!=data.xiaomai_id){
			s += '<li><span class="i-num" style="width:auto;height:auto;">'+ data.fs +'</span><span class="i-type" style="width:auto;height:auto;">粉丝</span></li>';
		}
		s += '</ul>';
		s += '<div class="pull-right">';
		s += '<div class="btn-box GZ" >';
		var hh1='',hh2='',ss1='',ss2='';
		if(data.is_self==false&&data.user_id!=data.xiaomai_id){
			if(data.is_bothgz == true){
				hh1='互相关注';
			}
			else{
				hh1='已关注';
			}
			if(data.is_login == false){
				hh2='onclick="login_popup()"'
			}
			else{
				hh2='onclick="guanzhu('+data.user_id+')"';
			}
			if(data.is_gz == true){

				ss1='';
				ss2='style="display:none"';
			}
			else{
				ss1='style="display:none"';
				ss2='';
			}
			s+='<div class="dropdown" '+ss1+'> <a data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">'+hh1+'<span class="caret"></span></a> <ul class="dropdown-menu" aria-labelledby=""> <li><a onclick="quxiaoguanzhu('+data.user_id+')">取消关注</a></li> </ul> </div>';
			s += '<span id="guan_zhu" class="btn" '+hh2+' '+ss2+'>+ 关注</span>';
		}
		s += '</div>';
		s += '</div>';
		s += '</div>';
		s += '</div>';
		return s;
	}

	function msOverFn(holder){
		//clearTimeout( uBtn[0]._uInfoLayer_timer );
		//uBtn[0]._uInfoLayer_timer = setTimeout(function(){
		//
		//}, 1);

		var uInfoLayer=$( uInfoHtml(data) );
		if( uInfoLayer[0].parentNode != document.body ){
			uInfoLayer.appendTo($(holder));
			uInfoLayer.hover(function(){
				//$(this).parent().parent().parent().parent().parent().unbind().click(function(){return false;})
			}, function(){
				//$(this).parent().parent().parent().parent().parent().unbind();
			});
		}
		if(holder){
			var other = $(holder);
			var offset = other.offset();
			var left = offset.left;
			var width = uInfoLayer.outerWidth(true);
			var bodyWidth = $('body').width();
			console.log(left + width+"==="+bodyWidth)
			if( left + width > bodyWidth ){
				left = -260;
			}
			else{
				left=0;
			}
			uInfoLayer.css({ left: left, top: other.height() });
		}
		uInfoLayer.show();
		$(".zyhideP").find(".u-info-plane").remove();
	}
	function msOutFn(holder){
		holder.children(".u-info-plane").remove();
	}

	var uInfoLayerIndex;
	uBtn = $(uBtn);
	uInforLayerIndex = uBtn.attr('info-layer-index');
	if( !uInforLayerIndex ){
		uInforLayerIndex = cache.length;
		uBtn.attr('info-layer-index', uInforLayerIndex);
	}
	//uInfoLayer = cache[ uInforLayerIndex ];
	//if( !uInfoLayer ){
	//	uInfoLayer = $( uInfoHtml(data) );
	//	cache[ uInforLayerIndex ] = uInfoLayer;
	//}
	if( null == showOrHide ){
		// 鼠标经过用户头像
		//uBtn.hover(function(){
		//	msOverFn( this );
		//}, function(){
		//	msOutFn();
		//});
	}else if( 'show' == showOrHide ){
		// 直接显示
		msOverFn( uBtn );

	}else if( 'hide' == showOrHide ){
		msOutFn(uBtn);
	}
}


function guanzhu(id) {

	var a = '<div class="dropdown"> <a id=""  data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">已关注<span class="caret"></span></a> <ul class="dropdown-menu" aria-labelledby=""> <li><a onclick="quxiaoguanzhu(' + id + ')">取消关注</a></li> </ul> </div>';
	$.ajax({
		url: "/common/ajax/usernetwork/" + id + "/?name=1",
		type: "Get",
		dataType: "json",
		async:false,
		success: function (data2) {
			if (data2.status == 'success') {

				var eq=$(".GZ").children();
				eq.eq(1).hide();
				eq.eq(0).show();
				console.log(eq.eq(1))
			}
		}
	});

}

function quxiaoguanzhu(id) {
var b = '<span id="guan_zhu" class="btn" onclick="guanzhu('+ id +')">+ 关注</span>';
	  $.ajax({
		url:"/common/ajax/usernetwork0/" + id + "/?name=1",
		type:"GET",
		dataType:"json",
		async:false,
		success:function(data3){
			if(data3.status == 'success'){
				var eq=$(".GZ").children();
				eq.eq(0).hide();
				eq.eq(1).show();
			}
		}
	  });
}

// 热门活动
publicFunction.activityHtml = function (data,tit){
	var s = '';
	s += '<div class="ibox-in">';
	s += '<div class="ibox-head">';
	s += '<div class="ibox-tit-text">'+ (null != tit ? tit : '热门活动') +'</div>';
	s += '</div>';
	s += '<div class="ibox-body">';
	s += '<div class="hot-activity-list">';
	for(var i=0,j=data.length; i<j; i++){
		var o = data[ i ];
		s += '<div class="item">';
		s += '<div class="column-col-l">';
		s += '<a class="col-in" href="'+ o.url +'" target="_blank">';
		s += '<img src="'+ o.img +'" alt=""/>';
		s += '</a>';
		s += '</div>';
		s += '<div class="column-col column-full">';
		s += '<div class="col-in">';
		s += '<h3><a href="'+ o.url +'" target="_blank">'+ o.text +'</a></h3>';
		s += '<p class="info-time">'+ o.datetime +'</p>';
		s += '</div>';
		s += '</div>';
		s += '</div>';
	}
	s += '</div>';
	s += '</div>';
	s += '</div>';
	return s;
};



// 热门标签
publicFunction.hotTagHtml = function (data){
	var s = '';
	s += '<div class="hot-tag-box">';
	s += '<div class="hot-tag-boxin">';
	for(var i=0,j=data.length;i<j;i++){
		var o = data[i];
		s += '<a class="hot-tag" href="'+ o.url +'">'+ o.name +'</a>';
	}
	s += '</div>';
	s += '</div>';
	return s;
};



// 热门文章
publicFunction.hotArticleHtml = function (data, tit){
	var s = '';
	s += '<div class="ibox-in">';
	s += '<div class="ibox-head">';
	s += '<div class="ibox-tit-text">'+ (null != tit ? tit : '热门文章') +'</div>';
	s += '</div>';
	s += '<div class="ibox-body">';
	s += '<ul class="hot-article-list">';
	for(var i=0,j=data.length; i<j; i++){
		var o = data[ i ];
		s += '<li class="item">';
		s += '<a href="'+ o.url +'" target="_blank">'+ o.text +'</a>';
		s += '</li>';
	}
	s += '</ul>';
	s += '</div>';
	s += '</div>';
	return s;
};

// 热门问答
publicFunction.hotQAHtml = function (data, tit, preFn){
	var s = '';
	s += '<div class="ibox-in">';
	s += '<div class="ibox-head">';
	s += '<div class="ibox-tit-text">'+ (null != tit ? tit : '热门问答') +'</div>';
	s += '</div>';
	s += '<div class="ibox-body">';
	s += '<ul class="hot-QA-list">';
	for(var i=0,j=data.length; i<j; i++){
		var o = data[ i ];
		s += '<li class="item">';
		if(preFn){
			s += preFn(i);
		}else{
			s += '<span class="i-index">'+ (i+1) +'</span>';
		}
		s += '<a href="'+ o.url +'" target="_blank">'+ o.text +'<span>'+o.QANum+'&nbsp;&nbsp;回答</span></a>';
		s += '</li>';
	}
	s += '</ul>';
	s += '</div>';
	s += '</div>';
	return s;
};



// 个人中心-个人信息统计
// 老师： 带班数、好评度
// 学生： 学力值、学习天数、麦子圈排名
publicFunction.userStatisticsHtml = function (type,data){
	var s = '', o;
	s += '<div class="ibox-in">';
	s += '<ul class="statistics-list">';
	if('teacher' == type){
		s += '<li><i class="ico ico-man"></i><span class="ico-label-text">'+ data[0].text +'</span><span class="value">'+ data[0].value +'</span></li>';
		//s += '<li><i class="ico ico-heart"></i><span class="ico-label-text">'+ data[1].text +'</span><span class="value em-text">'+ data[1].value +'</span></li>';
	}else if('student' == type){
		s += '<li><i class="ico ico-books"></i><span class="ico-label-text">'+ data[0].text +'</span><span class="value">'+ data[0].value +'</span></li>';
		//s += '<li><i class="ico ico-day"></i><span class="ico-label-text">'+ data[1].text +'</span><span class="value">'+ data[1].value +'</span></li>';
		s += '<li><i class="ico ico-chart"></i><span class="ico-label-text">'+ data[2].text +'</span><span class="value em-text">'+ data[2].value +'</span></li>';
	}
	s += '</ul>';
	s += '</div>';
	return s;
};




// 用户组
// 老师： 我的学生
// 学生： 最近访客
publicFunction.userGroupHtml = function (data,tit){
	var s = '', o;
	s += '<div class="ibox-in">';
	s += '<div class="ibox-head">';
	s += '<div class="ibox-tit-text">'+ (null != tit ? tit : '--') +'</div>';
	s += '</div>';
	s += '<div class="ibox-body">';
	s += '<ul class="row user-group-list">';
	for(var i=0,j=data.length; i<j; i++){
		var o = data[ i ];
		s += '<li>';
		if(o.uStatusStyle==2) {
		s += '<div class="u-photo-box" style="position:relative;" ><a class="u-photo u-photo-btn" target="_blank" href="'+ (o.url||'javascript:;') +'" data-uid="'+ o.id+'"><img src="'+ o.photo +'" alt="" width="50" height="50" /></a><span class="u-name">'+ o.uName +'</span><i class="ico ico-umark-2" style="bottom:auto; top:34px;"></i></div>';
		}
		else if(o.uStatusStyle==1){
		s += '<div class="u-photo-box" style="position:relative;" href="'+ (o.url||'javascript:;') +'"><a href="'+ (o.url||'javascript:;') +'" class="u-photo u-photo-btn" data-uid="'+ o.id+'" target="_blank"><img src="'+ o.photo +'" alt="" width="50" height="50" /></a><span class="u-name">'+ o.uName +'</span><i class="ico ico-umark-1" style="bottom:auto; top:34px;"></i></div>';
		}
		else{
		s += '<div class="u-photo-box" ><a target="_blank" href="'+ (o.url||'javascript:;') +'" class="u-photo u-photo-btn" data-uid="'+ o.id+'"><img src="'+ o.photo +'" alt="" width="50" height="50" /></a><span class="u-name">'+ o.uName +'</span></div>';
		}
		s += '</li>';
	}
	s += '</ul>';
	s += '</div>';
	s += '</div>';
	return s;
};


// 图片广告
// barAdPic
publicFunction.barAdPicHtml = function (data){
	var s = '';
	s += '<div class="bar-ad-pic">';
	for(var i=0,j=data.length; i<j; i++) {
		var o = data[ i ];
		s += '<a class="" href="' + o.url + '" target="_blank">';
		s += '<img src="' + o.img + '" alt="" width="300" height="170"/>';
		s += '</a>';
	}
	s += '</div>';
	return s;
};


// 课程推荐
publicFunction.courseRecommendationHtml = function(data,tit){
	var s = '', o;
	s += '<div class="ibox-in">';
	s += '<div class="ibox-head">';
	s += '<div class="ibox-tit-text">'+ (null != tit ? tit : '--') +'</div>';
	s += '</div>';
	s += '<div class="ibox-body">';
	s += '<ul class="row course-recom-list">';
	for(var i=0,j=data.length; i<j; i++){
		var o = data[ i ];
		s += '<div class="item">';
		s += '<div class="column-col-l">';
		s += '<a class="col-in" href="'+ o.url +'" target="_blank">';
		s += '<img src="'+ o.img +'" alt=""/>';
		s += '</a>';
		s += '</div>';
		s += '<div class="column-col column-full">';
		s += '<div class="col-in">';
		s += '<h3><a href="'+ o.url +'" target="_blank">'+ o.courseName +'</a></h3>';
		s += '<p class="tearcher-name">'+ o.tearcher +'</p>';
		s += '</div>';
		s += '</div>';
		s += '</div>';
	}
	s += '</ul>';
	s += '</div>';
	s += '</div>';
	return s;
};


// 名师推荐
publicFunction.carouselHtml = function(data,tit){
	var s = '', numStr='', itemStr='';
	var randomNum = Math.round(Math.random()*1000);
	s += '<div class="ibox-in">';
	s += '<div class="ibox-head"><div class="ibox-tit-text">'+ (null != tit ? tit : '名师推荐') +'</div></div>';
	s += '<div class="ibox-body famous-teacher-list">';
	s += '<div id="bar_carousel'+ randomNum +'" class="carousel slide" data-ride="carousel">';
	s += '<div class="carousel-curindex-totle">';
	s += '<ol class="carousel-indicators">';
	for(var i=0,j=data.length;i<j;i++){
		var o = data[i];

		numStr += '<li data-target="#bar_carousel'+ randomNum +'" data-slide-to="' + i + '" class="'+ (0===i?'active':'') +'">'+ (i+1) +'</li>';

		itemStr += '<div class="item '+ (0===i?'active':'') +'"><a href="'+ o.url +'" target="_blank">';
		itemStr += '<span class="column-col-l">';
		itemStr += '<span class="u-photo u-photo-btn"><img src="'+ o.img +'" alt=""/></span>';
		itemStr += '</span>';
		itemStr += '<span class="column-col column-full">';
		itemStr += '<span class="u-name">'+ secureHTML(o.uName) +'</span>';
		itemStr += '<span class="u-introduction">'+ secureHTML(o.intro) +'</span>';
		itemStr += '</span>';
		itemStr += '</a></div>';
	}
	s += numStr
	s += '</ol>\/'+ data.length;
	s += '</div>';
	s += '<div class="carousel-inner" role="listbox">';
	s += itemStr;
	s += '</div>';
	s += '<div class="carousel-trun">';
	s += '<a class="carousel-control" href="#bar_carousel'+ randomNum +'" role="button"';
	s += 'data-slide="prev">&lt;</a>';
	s += '<a class="carousel-control" href="#bar_carousel'+ randomNum +'" role="button"';
	s += 'data-slide="next">&gt;</a>';
	s += '</div>';
	s += '</div>';
	s += '</div>';
	s += '</div>';
	return s;
};

// 活跃度
publicFunction.activationRankHtml = function(data){
	var s = '';
	s += '<p class="huoBox_tit"><span>一周问答活跃榜</span><a id="timer" style="color:#999999;"></a>&nbsp;&nbsp;<a href="/ask/7802/">规则</a></p> <ul class="huoBox_ul">'
	for(var i=0, j=data.length; i<j; i++){
		var o = data[i];
		s += '<li> <div class="huoBox_ul_img"><a href="' + o.url + '"><img src="' + o.avar + '"></a>'
		if (o.is_paied){
			s += '<i class="ico ico-umark-1"></i>'
		}
		s += '</div><div class="huoBox_ul_font"><p><a class="a1" href="' + o.url + '">' + o.nickname + '</a></p><p class="a2">' + o.des + '</p></div>'
        s += '<div class="huoBox_ul_font2">' + o.activation +'<br>问答</div></li>';
	}
	return s;
}