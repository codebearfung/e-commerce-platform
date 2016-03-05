/***
*banner切换
* Version:V1.0.0.0
* author：ZhouYi
* */
;(function($){
	var defaults = {
		model:"overlying"
		,"adaptiveHeightSpeed":500
		,"startSlide":0
		,onSliderLoad:function(){}
		,onSlideBefore:function(){}
		,onSlideAfter:function(){}
		,onSlideNext:function(){}
		,onSlidePrev:function(){}
	}
	$.fn.superposition=function(options){
		if(this.length == 0) return this;
		if(this.length > 1){
			this.each(function(){$(this).superposition(options)});
			return this;
		}

		var slider = {};
		var el = this;

		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		var childNum=el.children().length;

		var init=function(){
			slider.settings = $.extend({}, defaults, options);
			slider.viewport=$(el);
			slider.oldIndex=slider.settings.startSlide;
			el.css({"position":"relative","overflow":"hidden"})
			var childEle=el.children();
			childEle.each(function(ele,i){
				$(this).css({"position":"absolute","top":"0","left":"0","z-index":1});
			});
			childEle.eq(0).css("z-index","2");
			overlyingLoad();
			slider.settings.onSliderLoad(slider.oldIndex);
			$(window).bind('resize',resizeWindow);
		}
		el.goToSlideN=function(slideIndex){
			goToSlide(slideIndex,"next");
		}
		el.goToSlideNnext=function(){
			goToSlide(slider.oldIndex+1,"next");
		}
		el.goToSlideNprev=function(){
			goToSlide(slider.oldIndex-1,"prev");
		}
		//---------------FUNTION------------------
		var goToSlide=function(slideIndex, direction){
			if(slider.oldIndex==slideIndex){return;}
			if(slideIndex>=childNum){slideIndex=0}
			else if(slideIndex<0){slideIndex=childNum-1}
			var sObj=slider.viewport.children().eq(slideIndex);
			slider.settings.onSlideBefore(sObj,slider.oldIndex,slideIndex);
			if(direction=="next"){
				slider.settings.onSlideNext(sObj,slider.oldIndex,slideIndex);
			}else if(direction=="prev"){
				slider.settings.onSlidePrev(sObj,slider.oldIndex,slideIndex);
			}
			slider.viewport.children().css({"z-index":1}).eq(slider.oldIndex).css({"z-index":2});
			sObj.css({"top":el.height()+"px","z-index":3}).stop().animate({"top":"0"},slider.settings.adaptiveHeightSpeed,function(){
				slider.settings.onSlideAfter(sObj,slider.oldIndex,slideIndex);
			});
			slider.oldIndex=slideIndex;
		}
		var overlyingLoad=function(){
			var sObj=slider.viewport.children().eq(slider.settings.startSlide);
			sObj.css({"z-index":3});
			loadImage(sObj.children("img").attr("src"),function(){
				$(el).height($(el).width()*(this.height/this.width));
				slider.vImg=this;
			});
		}
		var resizeWindow=function(e){
			$(el).height($(el).width()*(slider.vImg.height/slider.vImg.width));
		}
		var loadImage=function(url, callb){
			var img = new Image();
			img.src = url;
			if(img.complete){
				callb.call(img);
				return;
			}
			img.onload=function(){
				callb.call(img);//将回调函数的this替换为Image对象
			};
		};
		init();
		//返回jQuery对象
		return this;
	}
})(jQuery)



var winWidth,winHeight;
function findDimensions() //函数：获取尺寸
{
	//获取窗口宽度	
	if(window.innerWidth)	
		winWidth = window.innerWidth;	
	else if ((document.body) && (document.body.clientWidth))
		winWidth = document.body.clientWidth;	
	//获取窗口高度	
	if (window.innerHeight)	
		winHeight = window.innerHeight;	
	else if ((document.body) && (document.body.clientHeight))	
		winHeight = document.body.clientHeight;	
	//通过深入Document内部对body进行检测，获取窗口大小	
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
	{
		winHeight = document.documentElement.clientHeight;	
	}
	var stObj=document.getElementById("section1");
	(stObj)&&(stObj.style.height=winHeight+"px");
	var vbg=document.getElementById("videobg");
	if(stObj&&vbg){
		if(winWidth/winHeight<1920/1078){vbg.style.height=winHeight+"px";
			var wwg=winHeight*(1920/1078);
			vbg.style.width=wwg+"px";
			vbg.style.left=-(wwg-winWidth)/2+"px";vbg.style.top="0px";
		}
		else{
			vbg.style.height=winWidth*(1078/1920)+"px"
			vbg.style.width="100%";
			vbg.style.left="0px";vbg.style.top="-10px";
		}
	}
}


var Load=function(){
	var cacheModel=[];
	this.init=function(){
		$(".modal").on("show.bs.modal", function(){
			//$(".modal").modal('hide');
//			if($(".modal-backdrop").length>0){
//				$(".modal-backdrop").remove();
//			}
			for(var i=0;i<cacheModel.length;i++){
				if(cacheModel[i]){
				cacheModel[i].modal('hide');
				cacheModel[i]=null;
				}
			}
			cacheModel.push($(this));
			var $this = $(this);
			var $modal_dialog = $this.find(".modal-dialog");
			var div=$('<div style="display:table; width:100%; height:100%;"></div>')
			div.html('<div style="vertical-align:middle; display:table-cell;"></div>');
			div.children("div").html($modal_dialog);
			$this.html(div);

		});		
		//兼容IE9下placeholder不显示问题
		$('input, textarea').placeholder();
		//登录全局
		$('.top_user .sp').on('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			$('.show-card-wrap').toggleClass('in');
		});	
		$(document).on('click', function() {
			$('.show-card-wrap').removeClass('in');
		});		
		show_card();	
		$(window).resize(function(){
			show_card();
		});
		$(".top_meg").hover(function(){
			$(this).children(".bubble").show()
		},function(){
			$(this).children(".bubble").hide()
		});
		$(".topRight .a").eq(0).click(topRightRegister);
		$(".topRight .a").eq(1).click(topRightLogin);
		//顶部搜索
		$(".topSreach").click(function(){
			$(this).parent().parent().toggleClass("sH")
		});
		$(".topSreachTxt,.sreachBBoxTxt").keydown(function(event){
			if(event.keyCode == 13)
				sreachBtn($(this).val());
		});
		$(".sreachBBoxBtn").click(function(){sreachBtn($(".sreachBBoxTxt").val());});
		$(".class53").click(function(){
			$("#KFLOGO .Lelem").eq(0).trigger("click");
		});
		//新春报名关闭
		$(".zy_activityDemo > a").click(function(){
			$("#activityDemo").modal("hide");
		});
		if($("#activityDemo").attr("p1")){setTimeout(function(){$("#activityDemo").modal('show');},2000)}
		//------------OLD-----------------------------
		$(".toolbar-item-weibo>div").hover(function(){
		},function(){
			$(this).stop().hide("fast");
		});
		$(".toolbar-item-weibo").click(function(){
			$(".lixianB").show();
		});
		$(".toolbar-item-weixin").unbind().click(function(){
			$("#KFLOGO .Lelem").eq(0).trigger("click");
		});
		//注册刷新验证码点击事件
		$('#email_register_form .captcha-refresh').click({'form_id':'email_register_form'},refresh_captcha);
		$('#email_register_form .captcha').click({'form_id':'email_register_form'},refresh_captcha);
		$('#mobile_register_form .captcha-refresh').click({'form_id':'mobile_register_form'},refresh_captcha);
		$('#mobile_register_form .captcha').click({'form_id':'mobile_register_form'},refresh_captcha);
		$('#find_password_form .captcha-refresh').click({'form_id':'find_password_form'},refresh_captcha);
		$('#find_password_form .captcha').click({'form_id':'find_password_form'},refresh_captcha);
	
		//登录表单键盘事件
		$("#login_form").keydown(function(event){
			if(event.keyCode == 13)
				login_form_submit("login-form-tips");
		});
		//注册表单键盘事件
		$("#email_register_form").keydown(function(event){
			if(event.keyCode == 13)
				register_form_submit();
		});
		$("#email_register_form").keydown(function(event){
			if(event.keyCode == 13)
				register_form_submit();
		});
		//首页-忘记密码表单键盘事件
		$("#find_password_form").keydown(function(event){
			if(event.keyCode == 13)
				find_password_form_submit();
		});
		//zhouyi:7-30 发送验证邮件事件
		$(".sendE a").click(function(){
			$(".zy_success").removeClass("upmove");
			$(this).parent().hide();
			$(".sendE2").show().find("span").html("60s");	
			$.ajax({
				 type: "GET",
				 url: "/user/send_again_email",
				 data: {username:zyUname},
				 dataType: "html",
				 success: function(data){
					 zy_str="验证邮件发送成功";
					 //console.log(data)
					 if(data)
						zy_Countdown();
				 },
				error:function(){
					zy_str="验证邮件发送失败";
				}
	
			 });
		});
		notice_message();
		//------------OLDEND-----------------------------
	}
	function sreachBtn(str){
		location.href="/course/list/?catagory="+str;
	}
	function topRightLogin(){
		login_popup();
	}
	function topRightRegister(){
		$('#registerModal').modal('show');
	}	
	function show_card(){
		if($('.top_user').length>0){
		var _parent_left = $('.top_user').offset().left;
		var _parent_outw = $('.top_user').outerWidth();
		var _this_outw = $('.show-card').outerWidth();
		var _this_left = Math.abs(_parent_left - (_this_outw - _parent_outw));
		$('.show-card').css({
			'left': _this_left
		});
		}
	}
	this.openVideo=function(url){
		url||(url="http://ocsource.maiziedu.com/lps_intro.mp4");
		$("#microohvideo").children().attr("src",url);
		$('#VideoDemo').modal('show');
	}
	this.openVideo2=function(url){
		url||(url="http://ocsource.maiziedu.com/lps_intro.mp4");
		$("#microohvideo2").children().attr("src",url);
		console.log(url)
		$('.teacherVideo').fadeIn();
	}
	//Damon: 喇叭气泡
	function notice_message(){
	  function notice_info(data){
		var Txt = '';
		Txt += '<li><a href="/group/chat/?type=system">系统消息&nbsp;<span>'+ (data.sys_msg_count == 0 ? '' : data.sys_msg_count) + '</sapn></a></li>';
		var uu="/group/common/dynmsg/";
        if(data.dyn_msg_count > 0){uu="/group/common/dynmsg/?unread=1&page=1";}
		Txt += '<li><a href="'+uu+'">动态&nbsp;<span>'+ (data.dyn_msg_count == 0 ? '' : data.dyn_msg_count) + '</sapn></a></li>';
		Txt += '<li><a href="/group/common/social/?list_type=fans">粉丝&nbsp;'+ (data.fan_msg_count == 0 ? '' : data.fan_msg_count) + '</sapn></a></li>';
		Txt += '<li><a href="/group/chat/?type=praise">赞&nbsp;'+ (data.praise_msg_count == 0 ? '' : data.praise_msg_count) + '</sapn></a></li>';
		Txt += '<li><a href="/group/chat/?type=at">@我&nbsp;'+ (data.at_msg_count == 0 ? '' : data.at_msg_count) + '</sapn></a></li>';
		return Txt;

	  }

	  var oUl = $('.bubble');
	  $.ajax({
		 url: '/group/chat/',
		 type: 'POST',
		 dataType: 'json',
		 success: function (data) {
			if(data.status == 'success') {
				var num = data.sys_msg_count + data.dyn_msg_count + data.fan_msg_count + data.praise_msg_count + data.at_msg_count;
				var html = notice_info(data);
				if(num){
				  $('.top_meg').addClass('top_megH');
				  $('.top_megH i.Arial').css('display','block').html(num);
				}
				oUl.html(html).removeClass('loading');
			}
		 }
	  });

	  console.log("\u0026\u006c\u0074\u003b\u0021\u002d\u002d\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u003a\u003a\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u003a\u003b\u004a\u0037\u002c\u0020\u003a\u002c\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u003a\u003a\u003b\u0037\u003a\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u0069\u0076\u0059\u0069\u002c\u0020\u002c\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u003b\u004c\u004c\u004c\u0046\u0053\u003a\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u003a\u0069\u0076\u0037\u0059\u0069\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u003a\u0037\u0072\u0069\u003b\u006a\u0035\u0050\u004c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u003a\u0069\u0076\u0059\u004c\u0076\u0072\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u0069\u0076\u0072\u0072\u0069\u0072\u0072\u0059\u0032\u0058\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u003a\u003b\u0072\u0040\u0057\u0077\u007a\u002e\u0037\u0072\u003a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u003a\u0069\u0076\u0075\u0040\u006b\u0065\u0078\u0069\u0061\u006e\u006c\u0069\u002e\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u003a\u0069\u004c\u0037\u003a\u003a\u002c\u003a\u003a\u003a\u0069\u0069\u0069\u0072\u0069\u0069\u003a\u0069\u0069\u003b\u003a\u003a\u003a\u003a\u002c\u002c\u0069\u0072\u0076\u0046\u0037\u0072\u0076\u0076\u004c\u0075\u006a\u004c\u0037\u0075\u0072\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0072\u0069\u003a\u003a\u002c\u003a\u002c\u003a\u003a\u0069\u003a\u0069\u0069\u0069\u0069\u0069\u0069\u0069\u003a\u0069\u003a\u0069\u0072\u0072\u0076\u0031\u0037\u0037\u004a\u0058\u0037\u0072\u0059\u0058\u0071\u005a\u0045\u006b\u0076\u0076\u0031\u0037\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u003b\u0069\u003a\u002c\u0020\u002c\u0020\u003a\u003a\u003a\u003a\u0069\u0069\u0072\u0072\u0072\u0069\u0072\u0069\u0069\u003a\u0069\u003a\u003a\u003a\u0069\u0069\u0069\u0072\u0032\u0058\u0058\u0076\u0069\u0069\u003b\u004c\u0038\u004f\u0047\u004a\u0072\u0037\u0031\u0069\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u003a\u002c\u002c\u0020\u002c\u002c\u003a\u0020\u0020\u0020\u002c\u003a\u003a\u0069\u0072\u0040\u006d\u0069\u006e\u0067\u0079\u0069\u002e\u0069\u0072\u0069\u0069\u003a\u0069\u003a\u003a\u003a\u006a\u0031\u006a\u0072\u0069\u0037\u005a\u0042\u004f\u0053\u0037\u0069\u0076\u0076\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u003a\u003a\u002c\u0020\u0020\u0020\u0020\u003a\u003a\u0072\u0076\u0037\u0037\u0069\u0069\u0069\u0072\u0069\u0069\u0069\u003a\u0069\u0069\u0069\u003a\u0069\u003a\u003a\u002c\u0072\u0076\u004c\u0071\u0040\u0068\u0075\u0068\u0061\u006f\u002e\u004c\u0069\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u002c\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u002c\u0020\u002c\u003a\u0069\u0072\u0037\u0069\u0072\u003a\u003a\u002c\u003a\u003a\u003a\u0069\u003b\u0069\u0072\u003a\u003a\u003a\u0069\u003a\u0069\u003a\u003a\u0072\u0053\u0047\u0047\u0059\u0072\u0069\u0037\u0031\u0032\u003a\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u003a\u003a\u003a\u0020\u0020\u002c\u0076\u0037\u0072\u003a\u003a\u0020\u003a\u003a\u0072\u0072\u0076\u0037\u0037\u003a\u002c\u0020\u002c\u002c\u0020\u002c\u003a\u0069\u0037\u0072\u0072\u0069\u0069\u003a\u003a\u003a\u003a\u003a\u002c\u0020\u0069\u0072\u0037\u0072\u0069\u0037\u004c\u0072\u0069\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u0020\u0020\u0020\u0020\u0020\u0032\u004f\u0042\u0042\u004f\u0069\u002c\u0069\u0069\u0069\u0072\u003b\u0072\u003a\u003a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u0069\u0072\u0072\u0069\u0069\u0069\u0069\u003a\u003a\u002c\u002c\u0020\u002c\u0069\u0076\u0037\u004c\u0075\u0075\u0072\u003a\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u002c\u0020\u0020\u0020\u0020\u0020\u0069\u0037\u0038\u004d\u0042\u0042\u0069\u002c\u003a\u002c\u003a\u003a\u003a\u002c\u003a\u002c\u0020\u0020\u003a\u0037\u0046\u0053\u004c\u003a\u0020\u002c\u0069\u0072\u0069\u0069\u0069\u003a\u003a\u003a\u0069\u003a\u003a\u002c\u002c\u003a\u0072\u004c\u0071\u0058\u0076\u003a\u003a\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u003a\u0020\u0020\u0020\u0020\u0020\u0020\u0069\u0075\u004d\u004d\u0050\u003a\u0020\u003a\u002c\u003a\u003a\u003a\u002c\u003a\u0069\u0069\u003b\u0032\u0047\u0059\u0037\u004f\u0042\u0042\u0030\u0076\u0069\u0069\u0069\u0069\u003a\u0069\u003a\u0069\u0069\u0069\u003a\u0069\u003a\u003a\u003a\u0069\u004a\u0071\u004c\u003b\u003a\u003a\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u0020\u0020\u0020\u0020\u0020\u003a\u003a\u003a\u003a\u0069\u0020\u0020\u0020\u002c\u002c\u002c\u002c\u002c\u0020\u003a\u003a\u004c\u0075\u0042\u0042\u0075\u0020\u0042\u0042\u0042\u0042\u0042\u0045\u0072\u0069\u0069\u003a\u0069\u003a\u0069\u003a\u0069\u003a\u0069\u003a\u0069\u003a\u0069\u003a\u0072\u0037\u0037\u0069\u0069\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u003a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u0020\u002c\u002c\u003a\u003a\u003a\u0072\u0072\u0075\u0042\u005a\u0031\u004d\u0042\u0042\u0071\u0069\u002c\u0020\u003a\u002c\u002c\u002c\u003a\u003a\u003a\u002c\u003a\u003a\u003a\u003a\u003a\u003a\u0069\u0069\u0072\u0069\u0072\u0069\u003a\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u002c\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u002c\u002c\u002c\u003a\u003a\u003a\u003a\u0069\u003a\u0020\u0020\u0040\u0061\u0072\u0071\u0069\u0061\u006f\u002e\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u003a\u002c\u002c\u0020\u002c\u003a\u003a\u003a\u0069\u0069\u003b\u0069\u0037\u003a\u000d\u000a\u0020\u0020\u0020\u0020\u003a\u002c\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0072\u006a\u0075\u006a\u004c\u0059\u004c\u0069\u0020\u0020\u0020\u002c\u002c\u003a\u003a\u003a\u003a\u003a\u002c\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u002c\u002c\u0020\u0020\u0020\u002c\u003a\u0069\u002c\u003a\u002c\u002c\u002c\u002c\u002c\u003a\u003a\u0069\u003a\u0069\u0069\u0069\u000d\u000a\u0020\u0020\u0020\u0020\u003a\u003a\u0020\u0020\u0020\u0020\u0020\u0020\u0042\u0042\u0042\u0042\u0042\u0042\u0042\u0042\u0042\u0030\u002c\u0020\u0020\u0020\u0020\u002c\u002c\u003a\u003a\u003a\u0020\u002c\u0020\u002c\u003a\u003a\u003a\u003a\u003a\u003a\u0020\u002c\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u002c\u002c\u002c\u0020\u002c\u002c\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u000d\u000a\u0020\u0020\u0020\u0020\u0069\u002c\u0020\u0020\u002c\u0020\u0020\u002c\u0038\u0042\u004d\u004d\u0042\u0042\u0042\u0042\u0042\u0042\u0069\u0020\u0020\u0020\u0020\u0020\u002c\u002c\u003a\u002c\u002c\u0020\u0020\u0020\u0020\u0020\u002c\u002c\u002c\u0020\u002c\u0020\u002c\u0020\u0020\u0020\u002c\u0020\u002c\u0020\u002c\u0020\u003a\u002c\u003a\u003a\u0069\u0069\u003a\u003a\u0069\u003a\u003a\u000d\u000a\u0020\u0020\u0020\u0020\u003a\u0020\u0020\u0020\u0020\u0020\u0020\u0069\u005a\u004d\u004f\u004d\u004f\u004d\u0042\u0042\u004d\u0032\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u002c\u002c\u002c\u002c\u0020\u0020\u0020\u0020\u0020\u002c\u002c\u002c\u002c\u002c\u002c\u003a\u002c\u002c\u002c\u003a\u003a\u003a\u003a\u0069\u003a\u0069\u0072\u0072\u003a\u0069\u003a\u003a\u003a\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0069\u0020\u0020\u0020\u002c\u002c\u003a\u003b\u0075\u0030\u004d\u0042\u004d\u004f\u0047\u0031\u004c\u003a\u003a\u003a\u0069\u003a\u003a\u003a\u003a\u003a\u003a\u0020\u0020\u002c\u002c\u002c\u003a\u003a\u002c\u0020\u0020\u0020\u002c\u002c\u002c\u0020\u003a\u003a\u003a\u003a\u003a\u003a\u0069\u003a\u0069\u003a\u0069\u0069\u0072\u0069\u0069\u003a\u0069\u003a\u0069\u003a\u000d\u000a\u0020\u0020\u0020\u0020\u003a\u0020\u0020\u0020\u0020\u002c\u0069\u0075\u0055\u0075\u0075\u0058\u0055\u006b\u0046\u0075\u0037\u0069\u003a\u0069\u0069\u0069\u003a\u0069\u003a\u003a\u003a\u002c\u0020\u003a\u002c\u003a\u002c\u003a\u0020\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u0069\u003a\u0069\u003a\u003a\u003a\u003a\u003a\u0069\u0069\u0072\u0072\u0037\u0069\u0069\u0072\u0069\u003a\u003a\u000d\u000a\u0020\u0020\u0020\u0020\u003a\u0020\u0020\u0020\u0020\u0020\u003a\u0072\u006b\u0040\u0059\u0069\u007a\u0065\u0072\u006f\u002e\u0069\u003a\u003a\u003a\u003a\u003a\u002c\u0020\u002c\u003a\u0069\u0069\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u0069\u003a\u003a\u003a\u003a\u003a\u0069\u003a\u003a\u002c\u003a\u003a\u003a\u003a\u0069\u0069\u0072\u0072\u0072\u0069\u0069\u0069\u0072\u0069\u003a\u003a\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u003a\u0020\u0020\u0020\u0020\u0020\u0020\u0035\u0042\u004d\u0042\u0042\u0042\u0042\u0042\u0042\u0053\u0072\u003a\u002c\u003a\u003a\u0072\u0076\u0032\u006b\u0075\u0069\u0069\u003a\u003a\u003a\u0069\u0069\u0069\u003a\u003a\u002c\u003a\u0069\u003a\u002c\u002c\u0020\u002c\u0020\u002c\u002c\u003a\u002c\u003a\u0069\u0040\u0070\u0065\u0074\u0065\u0072\u006d\u0075\u002e\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u0020\u003a\u0072\u0035\u0030\u0045\u005a\u0038\u004d\u0042\u0042\u0042\u0042\u0047\u004f\u0042\u0042\u0042\u005a\u0050\u0037\u003a\u003a\u003a\u003a\u0069\u003a\u003a\u002c\u003a\u003a\u003a\u003a\u003a\u002c\u003a\u0020\u003a\u002c\u003a\u002c\u003a\u003a\u0069\u003b\u0072\u0072\u0072\u0069\u0072\u0069\u0069\u0069\u0069\u003a\u003a\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u003a\u006a\u0075\u006a\u0059\u0059\u0037\u004c\u0053\u0030\u0075\u006a\u004a\u004c\u0037\u0072\u003a\u003a\u002c\u003a\u003a\u0069\u003a\u003a\u002c\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u0069\u0069\u0072\u0069\u0072\u0072\u0072\u0072\u0072\u0072\u0072\u003a\u0069\u0069\u003a\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u003a\u0020\u0020\u003a\u0040\u006b\u0065\u0076\u0065\u006e\u0073\u0075\u006e\u002e\u003a\u002c\u003a\u002c\u002c\u002c\u003a\u003a\u003a\u003a\u0069\u003a\u0069\u003a\u003a\u003a\u003a\u003a\u002c\u002c\u003a\u003a\u003a\u003a\u003a\u003a\u0069\u0069\u0072\u003b\u0069\u0069\u003b\u0037\u0076\u0037\u0037\u003b\u0069\u0069\u003b\u0069\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u002c\u002c\u0020\u0020\u0020\u0020\u0020\u002c\u002c\u003a\u002c\u003a\u003a\u003a\u003a\u003a\u003a\u0069\u003a\u0069\u0069\u0069\u0069\u0069\u003a\u0069\u003a\u003a\u003a\u003a\u002c\u002c\u0020\u003a\u003a\u003a\u003a\u0069\u0069\u0069\u0069\u0072\u0040\u0078\u0069\u006e\u0067\u006a\u0069\u0065\u0066\u002e\u0072\u003b\u0037\u003a\u0069\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u002c\u0020\u002c\u0020\u002c\u002c\u002c\u003a\u002c\u002c\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u0069\u0069\u0069\u0069\u0069\u0069\u0069\u0069\u0069\u0069\u003a\u002c\u003a\u002c\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u0069\u0069\u0069\u0072\u003b\u0072\u0069\u0037\u0076\u004c\u0037\u0037\u0072\u0072\u0069\u0072\u0072\u0069\u003a\u003a\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u003a\u002c\u002c\u0020\u002c\u0020\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u003a\u0069\u003a\u003a\u003a\u0069\u003a\u003a\u003a\u0069\u003a\u0069\u003a\u003a\u002c\u002c\u002c\u002c\u002c\u003a\u002c\u003a\u003a\u0069\u003a\u0069\u003a\u003a\u003a\u0069\u0069\u0072\u003b\u0040\u0053\u0065\u0063\u0062\u006f\u006e\u0065\u002e\u0069\u0069\u003a\u003a\u003a\u000d\u000a\u000d\u000a\u002d\u002d\u0026\u0067\u0074\u003b")
	}
}
//首页JS
var myIndex=function(){
	Load.call(this);
	var th
	this.indexInit=function(){
		window.onresize=function(){findDimensions();}
		th=this;
		th.init();
		$(".section1_menu li").hover(menu2HoverGO,menu2HoverTO);
		$('.bxslider').bxSlider({
			"mode":"fade",
			"onSlideAfter":SlideAfter,
			"onSliderLoad":SliderLoad
		});		
		$(window).bind("scroll", windowscroll);		
				
		//video
		player = videojs("microohvideo", {
			controls: true,
			playbackRates: [1, 1.25, 1.5, 2]
		});
		player2 = videojs("microohvideo2", {
			controls: true,
			playbackRates: [1, 1.25, 1.5, 2]
		});

		$(".zy_VideoDemo .close").unbind().click(closeEvent);
		$('#VideoDemo').on('hide.bs.modal', closeEventING);				
		//头像切换
		bxslider2=$(".bxslider2").superposition({
			"mode":"overlying"
			,"onSlideAfter":SlideAfter2
			,"onSliderLoad":SliderLoad2
		});
		$(".section5_bottom a").click(section5_bottomAGO);
		$(".topHead").hover(function(){
			//$(this).parent().addClass("poTop");
		},function(){
			if(srocllTop==0){
				$(this).parent().removeClass("poTop");
			}
		});		
		onload();
		$(window).scroll(function(){
			onload();
		});
		$(".videoArrow").unbind().click(function(){th.openVideo2($(this).parent().attr("hp"));
			$(".section5_bottom").addClass("lookVideo");player2.play();
		});
		//$(".section5 .div .videoArrow").unbind().click(function(){th.openVideo($(this).parent().attr("hp"));});
		$(".jobs_list li > div .p2 a").unbind().click(function(){th.openVideo($(this).attr("pt"));player.play();});
		var zzyypic= 0,zzyyStr='';
		$(".zy_pingce_con").css({scrollLeft:0});
		$(".zy_pingce_btn").click(function(){
			zzyypic++;
			if(zzyypic==5){
				if(!$(".zy_pingce_con ul li").eq(zzyypic-1).find(".cl").length){
					$(".zyred").show();zzyypic--;return false;
				}
				$(".zy_pingce_con ul li").each(function(){
					if($(this).find(".cl").length)
						zzyyStr+=$(this).find(".cl").children("input").val();
					else
						zzyyStr+=0;
				});
				var ss=askArr[zzyyStr.substr(2,5)]
				var hh='';
				for(var s in ss){
					hh+='<dd><a href="'+ss[s]+'" target="_blank">'+s+'</a></dd>';
				}
				$(".zy_pingce_dl").html(hh);
				$('#pingce').modal('hide');
				console.log("zhouyi")
				$('#pingceSuccess').modal('show');
				zzyypic=0;zzyyStr='';
			}
			else{
				if(!$(".zy_pingce_con ul li").eq(zzyypic-1).find(".cl").length){
					$(".zyred").show();zzyypic--;return false;
				}
				$(".zyred").hide();
			}
			if(zzyypic>4){
				zzyypic=4;
			}
			$(".zy_pingce_con ul").stop().animate({'left': -(zzyypic*453)+'px'}, 300);

		});
		$('#pingce').on('hide.bs.modal', function () {
        	zzyypic=0;$(".zyred").hide();
		});
		$(".zy_radioNew input").click(function(){
			if($(this).parent().hasClass("cl")){
				$(this).parent().removeClass("cl");
			}
			else{
				$(this).parent().parent().parent().find(".zy_radioNew").removeClass("cl");
				$(this).parent().addClass("cl");
			}
		});
		$(".zy_pingce .close").click(function(){
			$('#pingce').modal('hide');
			$('#pingceSuccess').modal('hide');
		});
		$(".teacherVideoClose").click(section5_bottomAGO);
	};
	var srocllTop=0;
	function onload(){
		srocllTop=$(window).scrollTop();
		if(srocllTop>0){
			$(".section1").addClass("poTop");
		}
		else{
			$(".section1").removeClass("poTop");
		}
	}
	var bxslider2;
	function section5_bottomAGO(){
		var n=parseInt($(this).attr("n"));
		$(".teacherVideoClose").attr("n",n);
		bxslider2.goToSlideN(n);
		$(this).addClass("aH").siblings().removeClass("aH");
		$(".section5_bottom").removeClass("lookVideo")
		$(".teacherVideo").fadeOut();
		player2.pause();
	}
	function slideDiv(obj){
		$(".section5 .div>p").eq(0).html(obj.attr("pt"));
		$(".section5 .div>p").eq(1).html(obj.attr("en"));
		$(".section5 .div>p").eq(2).html(obj.attr("pc"));
		$(".section5 .div>p").eq(3).attr("hp",obj.attr("hp"));
	}
	function SlideAfter2($slideElement, oldIndex, newIndex){
		slideDiv($slideElement)			
	}
	function SliderLoad2(currentIndex){
		slideDiv($(".bxslider2>li").eq(0));
	}
	var player,player2;
	function closeEvent(){//关闭播放窗口
		player.pause();
		$('#VideoDemo').modal('hide');
	}
	function closeEventING(){//关闭播放窗口的事件
		player.pause();
	}
	
	var scrollBO=true,scrollBO2=true;
	var funFall = function(ball,b,c) {			
		var start = 0, during = 60;
		var _run = function() {
			start++;
			var top = Tween.Quad.easeOut(start, b, c, during);
			ball.css("bottom", top);
			if (start < during) requestAnimationFrame(_run);
		};
		_run();
	};
	var windowscroll=function(event){
		//窗口的高度+看不见的顶部的高度=屏幕低部距离最顶部的高度  
		var thisButtomTop = parseInt($(this).height()) + parseInt($(this).scrollTop());  
		var thisTop = parseInt($(this).scrollTop()); //屏幕顶部距离最顶部的高度  
		var PictureTop = parseInt($(".section3").offset().top)+500;
		var PictureTop2 = parseInt($(".section7").offset().top)+500;
		if (PictureTop >= thisTop && PictureTop <= thisButtomTop &&scrollBO) {
			scrollBO=false;
			new funFall($(".section3>img").eq(2),-686,476);
			setTimeout(function(){new funFall($(".section3>img").eq(1),-676,466);},500)	
			setTimeout(function(){new funFall($(".section3>img").eq(0),-666,500);},1000)	
		}
		if (PictureTop2 >= thisTop && PictureTop2 <= thisButtomTop &&scrollBO2) {
			scrollBO2=false;
			$(".section7 .img1").removeClass("moveL");
			$(".section7 .img2").removeClass("moveL");
		}
	}
	var menu2HoverGO=function(){
		$(this).children(".menu2").stop().css("height","auto").slideDown();
	};
	var menu2HoverTO=function(){
		$(this).children(".menu2").stop().css("height","auto").slideUp();
	};
	var SliderLoad=function(currentIndex){
		$(".bxslider>li").eq(currentIndex).children("div").removeClass("moveLeft")
	};
	var SlideAfter=function($slideElement, oldIndex, newIndex){
		$slideElement.children("div").removeClass("moveLeft");
		setTimeout(function(){$slideElement.parent().children().eq(oldIndex).children("div").addClass("moveLeft")},1000);			
	};
	
}
//介绍页
var myaLesson=function(){
	Load.call(this);
	var th;
	this.indexInit=function(){
		th=this;
		th.init();
		//头像切换
		bxslider2=$('.bxslider2').bxSlider({
			"mode":"horizontal",
			"pager":false,
			"controls":false,
			"onSlideAfter":SlideAfter2,
			"onSliderLoad":SliderLoad2,
			"infiniteLoop":false
		}); 
		$(".section5_bottom a").hover(section5_bottomAGO,function(){});
		$(window).bind("scroll", windowscroll);
		if(!$(".aboutlessonBox4 .poster-list").attr("ppt")) {
			$(".aboutlessonBox4 .poster-item").css({"marginLeft":"-329px","width":"658px"});
		}
		$(".section5 .div .videoArrow").unbind().click(function(){th.openVideo($(this).parent().attr("hp"));});
		$(".aboutlessonFoot > div > a").click(function(){
			var goID=$(this).attr("href");
			$('html,body').stop().animate({scrollTop: $(goID).offset().top+'px'}, 800);
			return false;
		});
		$(".toolbar-item-gotop").click(function(){
			$('html,body').stop().animate({scrollTop: '0px'}, 800);
		});
		$(".footNewBox2").css("marginBottom","80px");
	}
	var bxslider2,scrollBO=true;
	function section5_bottomAGO(){
		var n=parseInt($(this).attr("n"))
		bxslider2.goToSlide(n);
		$(this).addClass("aH").siblings().removeClass("aH")
	}
	function slideDiv(obj){
		$(".section5 .div>p").eq(0).html(obj.attr("pt"));
		$(".section5 .div>p").eq(1).html(obj.attr("en"));
		$(".section5 .div>p").eq(2).html(obj.attr("pc"));
		$(".section5 .div>p").eq(3).attr("hp",obj.attr("hp"));
	}
	function SlideAfter2($slideElement, oldIndex, newIndex){
		slideDiv($slideElement)			
	}
	function SliderLoad2(currentIndex){
		slideDiv($(".bxslider2>li").eq(0));
	}
	var windowscroll=function(event){
		//窗口的高度+看不见的顶部的高度=屏幕低部距离最顶部的高度  
		var thisButtomTop = parseInt($(this).height()) + parseInt($(this).scrollTop());  
		var thisTop = parseInt($(this).scrollTop()); //屏幕顶部距离最顶部的高度  
		var PictureTop = parseInt($(".aboutlessonBox4").offset().top)+500;  
		if (PictureTop >= thisTop && PictureTop <= thisButtomTop &&scrollBO) {
			scrollBO=false;
			if(!$(".aboutlessonBox4").hasClass("original")) {
				if ($(".aboutlessonBox4 .poster-list").attr("ppt")) {
					$(".aboutlessonBox4Div").PicCarousel({
						"width": 1000,
						"height": 560,
						"posterWidth": 304,
						"posterHeight": 540,
						"scale": 0.8,
						"speed": 500,
						"autoPlay": false,
						"delay": 1000,
						"verticalAlign": "middle"
					});
				}
				else {
					$(".aboutlessonBox4Div").PicCarousel({
						"width": 1200,
						"height": 450,
						"posterWidth": 680,
						"posterHeight": 430,
						"scale": 0.9,
						"speed": 500,
						"autoPlay": false,
						"delay": 1000,
						"verticalAlign": "bottom"
					});
				}
			}
			else{
				$(".aBox4Div").addClass("HH");
			}
		}
	}


}

//----------------------OLD---------------------
//刷新验证码
function refresh_captcha(event){
    $.get("/captcha/refresh/?"+Math.random(), function(result){
        $('#'+event.data.form_id+' .captcha').attr("src",result.image_url);
        $('#'+event.data.form_id+' .form-control-captcha[type="hidden"]').attr("value",result.key);
    });
    return false;
}
// 弹出登陆框
function login_popup(msg){
    $('#id_account_l').val("");
    $('#id_password_l').val("");
    $('#id_email').val("");
    $('#id_password').val("");
    $('#id_captcha_1').val("");
    $('#id_mobile').val("");
    $('#id_mobile_code').val("");
    $('#id_password_m').val("");
    $('#id_captcha_m_1').val("");
    $('#id_captcha_1').val("");
    $('#login-form-tips').hide();
    $('#findpassword-tips').hide();
    $('#mobile_code_password-tips').hide();
    $('#register-tips').hide();
    refresh_captcha({"data":{"form_id":"email_register_form"}});
    refresh_captcha({"data":{"form_id":"mobile_register_form"}});
    refresh_captcha({"data":{"form_id":"find_password_form"}});
    $('#loginModal').modal('show');
    // alert(msg);
    if(typeof(msg) != 'undefined'){
        $('#loginModal #login-form-tips').show().html(msg);
    }
}
//注册提交
function register_form_submit(){
    if(current_register_form == "email_register_form"){
        $.ajax({
            cache: false,
            type: "POST",
            url:"/user/register/email/",
            data:$('#email_register_form').serialize(),
            async: true,
            beforeSend:function(XMLHttpRequest){
                $("#register_btn").html("注册中...");
                $("#register_btn").attr("disabled","disabled");
            },
            success: function(data) {
                //console.log(data)
                if(data.email){
                    $("#register-tips").html(data.email).show(500);
                    $("#id_email").focus();
                }else if(data.password){
                    $("#register-tips").html(data.password).show(500);
                    $("#id_password").focus();
                }else if(data.captcha){
                    $("#register-tips").html(data.captcha).show(500);
                    $("#id_captcha_1").focus();
                    if(data.captcha == "验证码错误")
                        refresh_captcha({"data":{"form_id":"email_register_form"}});
                }else{
                    $("#register_btn").html("登录中...");
                    $("#id_account_l").val($("#id_email").val());
                    $("#id_password_l").val($("#id_password").val());
                    zyemail=$("#id_email").val();
                    var ebo=zy_validate_Email(false,zyemail,$("#id_password").val());
                    zyUname=$("#id_email").val();
                    ebo&&login_form_submit("register-tips");
                    _trackData.push(['addaction','完成邮件注册','来源'+location.pathname]);
                    return;
                }
            },
            complete: function(XMLHttpRequest){
                $("#register_btn").html("注册并登录");
                $("#register_btn").removeAttr("disabled");
            }
        });
    }else if(current_register_form == "mobile_register_form"){
        $.ajax({
            cache: false,
            type: "POST",
            url:"/user/register/mobile/",
            data:$('#mobile_register_form').serialize(),
            async: true,
            beforeSend:function(XMLHttpRequest){
                $("#register_btn").html("注册中...");
                $("#register_btn").attr("disabled","disabled");
            },
            success: function(data) {
                if(data.mobile){
                    $("#register-tips").html(data.mobile).show(500);
                    $("#id_mobile").focus();
                }else if(data.mobile_code){
                    $("#register-tips").html(data.mobile_code).show(500);
                    $("#id_mobile_code").focus();
                }else if(data.password_m){
                    $("#register-tips").html(data.password_m).show(500);
                    $("#id_password_m").focus();
                }else if(data.captcha_m){
                    $("#register-tips").html(data.captcha_m).show(500);
                    $("#id_captcha_m_1").focus();
                    if(data.captcha_m == "验证码错误")
                        refresh_captcha({"data":{"form_id":"mobile_register_form"}});
                }else{
                    $("#register_btn").html("登录中...")
                    $("#id_account_l").val($("#id_mobile").val());
                    $("#id_password_l").val($("#id_password_m").val());
                    login_form_submit("register-tips");
                    return;
                }
            },
            complete: function(XMLHttpRequest){
                $("#register_btn").html("注册并登录");
                $("#register_btn").removeAttr("disabled");
            }
        });
    }
}
//找回密码表单提交
function find_password_form_submit(){
    $.ajax({
        cache: false,
        type: "POST",
        url:"/user/password/find/",
        data:$('#find_password_form').serialize(),
        async: true,
        beforeSend:function(XMLHttpRequest){
            $("#findpassword_btn").html("提交中...")
            $("#findpassword_btn").attr("disabled","disabled")
        },
        success: function(data) {
            if(data.account){
                $("#findpassword-tips").html(data.account).show(500);
                $("#id_account").focus();
            }else if(data.captcha_f){
                $("#findpassword-tips").html(data.captcha_f).show(500);
                $("#id_captcha_f_1").focus();
                if(data.captcha_f == "验证码错误")
                    refresh_captcha({"data":{"form_id":"find_password_form"}});
            }else{
                if($("#id_account").val().indexOf("@") > 0 ){
                    $("#findpassword-tips").html("找回密码邮件已发送").show(500);
                }else{
                    if(data.status == 'success'){
                        $('#mobile_code_password_form_message').html("手机短信验证码已发送，请查收！");
                    }else if(data.status == 'failure'){
                        $('#mobile_code_password_form_message').html("手机短信验证码发送失败！");
                    }
                    $('#id_mobile_f').val($("#id_account").val());
                    $('#forgetpswModal').modal('hide');
                    $('#forgetpswMobileModal').modal('show');
                }
                refresh_captcha({"data":{"form_id":"find_password_form"}});
            }
        },
        complete: function(XMLHttpRequest){
            $("#findpassword_btn").html("提交");
            $("#findpassword_btn").removeAttr("disabled");
        }
    });
}

//手机验证码表单验证
function mobile_code_password_form_submit(){
    $.ajax({
        cache: false,
        type: "POST",
        url:"/user/password/find/mobile/",
        data:$('#mobile_code_password_form').serialize(),
        async: true,
        beforeSend:function(XMLHttpRequest){
            $("#mobile_code_password_btn").html("提交中...")
            $("#mobile_code_password_btn").attr("disabled","disabled")
        },
        success: function(data) {
            if(data.mobile_code_f){
                $("#mobile_code_password-tips").html(data.mobile_code_f).show(500);
                $("#id_mobile_code_f").focus();
            }else if(data.status == "success"){
                //忘记密码跳转到修改密码的界面前的合法性验证
                account = $("#id_account").val();
                code = $("#id_mobile_code_f").val();
                location.href="/user/password/reset/"+account+"/"+code;
            }
        },
        complete: function(XMLHttpRequest){
            $("#mobile_code_password_btn").html("提交");
            $("#mobile_code_password_btn").removeAttr("disabled");
        }
    });
}
//重发送短信验证码计时
function show_send_sms(time){
    $("#send_sms_btn").html(time+"秒后重发");
    if(time<=0){
        clearTimeout(send_sms_time);
        $("#register-tips").hide(500);
        $("#send_sms_btn").html("发送验证码").removeAttr("disabled");
        return;
    }
    time--;
    send_sms_time = setTimeout("show_send_sms("+time+")", 1000);
}

//发送手机验证码
function send_sms_code(form_id,tips_id){
    //hash_key,code
    if($("#id_captcha_m_1").val()==''){
        $("#"+tips_id).html("图片验证码不能为空").show(500); return;
    }
    $.ajax({
        cache: false,
        type: "POST",
        url:"/user/register/mobile/sendsms_signup/",
        data:$('#'+form_id).serialize(),
        async: true,
        beforeSend:function(XMLHttpRequest){
            $("#register_btn").html("发送中...");
            $("#register_btn").attr("disabled","disabled");
        },
        success: function(data){
            if(data.mobile){
                $("#"+tips_id).html(data.mobile).show(500);
                refresh_captcha({"data":{"form_id":form_id}});
                $("#id_mobile").focus();
            }else if(data.captcha){
                $("#"+tips_id).html(data.captcha).show(500);
                $("#id_captcha_m_1").focus();
                if(data.captcha_m == "验证码错误，请重新输入")
                    refresh_captcha({"data":{"form_id":"mobile_register_form"}});
            }else if(data.status == 'success'){
                $("#"+tips_id).html("短信验证码已发送").show(500);
                $("#send_sms_btn").attr("disabled","disabled");
                show_send_sms(60);
                refresh_captcha({"data":{"form_id":form_id}});
            }else if(data.status == 'failure'){
                $("#"+tips_id).html("短信验证码发送失败").show(500);
                refresh_captcha({"data":{"form_id":form_id}});
            }
        },
        complete: function(XMLHttpRequest){
            $("#register_btn").html("注册并登录");
            $("#register_btn").removeAttr("disabled");
        }
    });
}
//登录表单提交
function login_form_submit(tips_id){

    $.ajax({
        cache: false,
        type: "POST",
        url:"/user/login/",
        data:$('#login_form').serialize(),
        async: true,
        beforeSend:function(XMLHttpRequest){
            $("#login_btn").html("登录中...");
            $("#login_btn").attr("disabled","disabled");
        },
        success: function(data) {
            if(data.account_l){
                $("#login-form-tips").html(data.account_l).show(500);
                $("#id_account_l").focus();
            }else if(data.password_l){
                $("#login-form-tips").html(data.password_l).show(500);
                $("#id_password_l").focus();
            }else{
                if(data.status == "success"){
					if(data.onepay_status == 'True'){
						window.location.replace('/');
					}else {
						window.location.replace(data.url);
					}
                    if(detect_ie() !== false) {
                        window.location.reload();
                    }
                    //window.location.href = "/user/center";
                    return;
                }else if(data.status == "failure"){
                    if(data.msg=='no_active'){
                        zyemail=$("#id_account_l").val();
                        zyUname=zyemail;
                        zy_validate_Email(false,zyemail,$("#id_password_l").val());

                    }
                    else
                        $("#login-form-tips").html("账号或者密码错误，请重新输入").show(500);
                }
            }
        },
        complete: function(XMLHttpRequest){
            $("#login_btn").html("登录");
            $("#login_btn").removeAttr("disabled");
        }
    });

}
//注册表单提交
var current_register_form = "email_register_form";
function change_form(to_form_id){
    $("#register-tips").hide()
    current_register_form = to_form_id;
}
//zhouyi
var zyemail="";
var zyUname="";
var hash={
    'qq.com': 'http://mail.qq.com',
    'gmail.com': 'http://mail.google.com',
    'sina.com': 'http://mail.sina.com.cn',
    '163.com': 'http://mail.163.com',
    '126.com': 'http://mail.126.com',
    'yeah.net': 'http://www.yeah.net/',
    'sohu.com': 'http://mail.sohu.com/',
    'tom.com': 'http://mail.tom.com/',
    'sogou.com': 'http://mail.sogou.com/',
    '139.com': 'http://mail.10086.cn/',
    'hotmail.com': 'http://www.hotmail.com',
    'live.com': 'http://login.live.com/',
    'live.cn': 'http://login.live.cn/',
    'live.com.cn': 'http://login.live.com.cn',
    '189.com': 'http://webmail16.189.cn/webmail/',
    'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
    'yahoo.cn': 'http://mail.cn.yahoo.com/',
    'eyou.com': 'http://www.eyou.com/',
    '21cn.com': 'http://mail.21cn.com/',
    '188.com': 'http://www.188.com/',
    'foxmail.coom': 'http://www.foxmail.com'
};
function zy_validate_Email(bo,zyem,upwd){
    var zybo1=true;
    if(!bo) {
        $("#emailValidate .close").unbind().click(function(){
            $('#emailValidate').modal('hide');
            login_form_ajax(zyem,upwd);
        })
        $('#registerModal').modal('hide');
        $('#addemailModal').modal('hide');
        $('#emailValidate').modal('show');
        var zya=$(".zy_email .a>a");
        var url = zyem.split('@')[1];
        zya.attr("href",hash[url]);
        $("#emailValidateEE span").html(zyem);
        if(undefined==hash[url] || hash[url]==null){
            zya.parent().hide();
        }
        zybo1=false;
    }
    else{
        zybo1=true;
    }
    return zybo1;
}
//zhouyi:7-30  验证邮件倒计时
var zy_c_num=60;
var zy_str="";
function zy_Countdown(){
    zy_c_num--;
    $(".sendE2 span").html(zy_c_num+"s");
    $(".zy_success span").html(zy_str);
    (zy_c_num<58)&&$(".zy_success").addClass("upmove");
    if(zy_c_num<=0){
        zy_c_num=60;
        $(".sendE2").hide();
        $(".sendE").show()
        return false;
    }
    setTimeout("zy_Countdown()",1000);
}
var askArr={"aaa":{"嵌入式驱动开发":"/course/qrsqd-px/","物联网开发":"/course/iot-px/"},
    "aab":{"产品经理":"/course/pm-px/"},
    "aba":{"Python Web开发":"/course/python-px/","PHP Web开发":"/course/php-px/","Java Web开发":"/course/java-px/"},
    "aab":{"产品经理":"/course/pm-px/"},
    "abb":{"软件测试":"/course/te-px/"},
    "baa":{"Cocos2d-x手游开发":"/course/cocos2d-x-px/"},
    "bab":{"Android应用开发":"/course/android-px/","iOS应用开发":"/course/ios-px/"},
    "bba":{"游戏原画设计":"/course/yuanhua-px/"},
    "bbb":{"Web前端开发":"/course/web-px/"}
}
function openpingce(){
    $('#pingce').modal('show');
    $(".zy_pingce_con ul").css("left","0px");
    $(".zy_pingce_con ul .cl").removeClass("cl");
}
function scrollGO(){
    $('#pingceSuccess').modal('hide');
    $('html,body').stop().animate({scrollTop: '10000px'}, 800);
}