$(function(){
  $(document).on('click', function() {   
    $('#hotkeyword').slideUp();
    $('#keyword-group').slideUp();
    $('.show-card-wrap').removeClass('in');
  });
    //顶部搜索
    $(".topSreach").click(function(){
        $(this).parent().parent().toggleClass("sH")
    });
    $(".topSreachTxt").keydown(function(event){
        if(event.keyCode == 13)
            sreachBtn($(this).val());
    });
  $(document).mousewheel(function(event, delta, deltaX, deltaY) {
      $('#hotkeyword').slideUp();
      $('#keyword-group').slideUp();
      $('.show-card-wrap').removeClass('in');
  });
  //弹出框显示后的一些操作
  $('.modal').on({
    'show.bs.modal': function (e) {
      $(this).children('.modal-dialog')
      .css('margin','0 auto')
      .wrap('<div class="wrap-modal-main"></div>')
      .wrap('<div class="wrap-modal-con"></div>');
      $('.wrap-modal-main').css({
        'display': 'table',
        'width': '100%',
        'height': '100%'
      });
      $('.wrap-modal-con').css({
        'display': 'table-cell',
        'width': '100%',
        'vertical-align': 'middle'
      });

    },
    'shown.bs.modal': function (e) {
      $(this).find('.form-control').first().focus();
    }
  })


  //Damon:load more
  $('#info_flows_next_link').live('click',function(event){
    event.preventDefault();
    var href = $('#info_flows_next_link').attr('href');

    $.ajax({
       url: href,
       type: 'GET',
       beforeSend:function(){
        $('#info_flows_next_link').addClass('loading');
       },
       success: function (data) {

        $('.item').parent().append(data);
        $('#info_flows_next_link').removeClass('loading');
        u_photo_btn_hover();

        
        var off = true;
        if(off) {
          $('#info_flows_next_link').remove();
          return false;
        }else{
          return true;
        }

       }
    });
  });




  //登陆
  $('#btnLogin').on('click', function () {
    $('#registerModal').modal('hide');
  })
  $('.show-card').on('click', function (event) {
    event.stopPropagation();
  })
  $('.top_user .sp').on('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $('.show-card-wrap').toggleClass('in');
  })

  //忘记密码
  $('#btnForgetpsw').on('click', function () {
    $('#loginModal').modal('hide');
  })

  //注册
  $('#btnRegister').on('click', function () {
    $('#loginModal').modal('hide');
    _trackData.push(['addaction','立即注册','来源'+location.pathname]);
  })



  //search
    var $keywordGroup = $("#keyword-group"),
        $careerCourses = $keywordGroup.find(".careercourses"),
        $courses = $keywordGroup.find(".courses"),
        isSearching = false,
        SEARCHING_PLACEHOLDER = "<div><a href='javascript:void(0);'>搜索中...</a></div>",
        EMPTY_PLACEHOLDER = "<div><a href='javascript:void(0);'>无</a></div>",
        FAIL_PLACEHOLDER = "<div><a href='javascript:void(0);'>搜索中...</a></div>";

    var creatCoursesHtml = function(courses, linkBaseUrl) {
        var html = "";
        if(linkBaseUrl == 'recent'){
            courses.forEach(function(course) {
              html += "<a style=background-color:"+course.course_color+" href="+_lps_site_url+"course/"+ course.id +"/recent/play/ >" + course.name + "</a>";
            });
        }else{
          courses.forEach(function(course) {
              html += "<a style=background-color:"+course.course_color+" href=/"+ linkBaseUrl + course.id +
                  ">" + course.name + "</a>";
          });
        }

        return html;
    };

    $('#search').on({
        click: function(event) {
            event.stopPropagation();
        },
        focus: function() {
            if($(this).val() == '') {
                $('#hotkeyword').show();
            } else {
                $('#keyword-group').show();
            }
        },
        keyup: function(event) {
            // var keycode = (event.keyCode ? event.keyCode : event.which);
            //   if(keycode == '13'){
            //     alert('wwwwww');
            //   }
            var $currTarget = $(event.currentTarget),
                keyword = $currTarget.val();
                def_search(keyword);



        },
        paste:function(event){
        	    $currTarget = $(event.currentTarget);
        		setTimeout(function(){
        			keyword = $currTarget.val();
        			def_search(keyword);
        		}, 100);


        }
    });



    $('.search-dp').click(function(event) {
        event.stopPropagation();
    });

    $('#hotkeyword').on("click", "a", function(event) {
        event.preventDefault();
        $('#search').val($(this).text());
        $('#search').trigger("keyup");
        $('#hotkeyword').hide();
        $('#keyword-group').show();
    });

    $('.keyword-group').jScrollPane({
      autoReinitialise: true
    });
  //点击收藏
  $('.house').on('click', function (event) {
    event.preventDefault();
    var _thisI = $(this).children('i');
    var _thisIclass = _thisI.hasClass('v5-icon-saved');
    _thisI.toggleClass('v5-icon-saved');
    var _text = (_thisIclass == true) ? '收藏' : '已收藏';
    $(this).children('span').text(_text);
  });
  
  $('.plan-tip').hover(function() {
    $('.plan-tip-box').addClass('show');
  }, function() {
    $('.plan-tip-box').removeClass('show');
  });
  
  $('.feedback-switch').click(function(){
    $(this).toggleClass('active');
    var _has_active = $(this).hasClass('active');
    if(_has_active){
      $(this).parent('.feedback').animate({
        bottom:0
      },500);
    }
    else{
      $(this).parent('.feedback').animate({
        bottom:'-300px'
      },500);
    }
  });
  
  $('img#viptips').hover(function(){
    $(this).tooltip({
      template: '<div class="tooltip tooltip-vip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
    $(this).tooltip('show');
  },function(){
    $(this).tooltip('hide');
  });
  
  $('[data-toggle="tooltip"]').hover(function(){
    $(this).tooltip('show');
  },function(){
    $(this).tooltip('hide');
  });
 
//搜索函数
 function def_search(keyword){


  	        if(typeof keyword === "undefined" || keyword.length < 1) {
            	$('#hotkeyword').show();
            	$('#keyword-group').hide();
                return;
            }
            if (isSearching === true) {
                return;
            }
            isSearching = true;

            $('#hotkeyword').hide();

            if (keyword === "") {
                $('#hotkeyword').show();
                $('#keyword-group').hide();
                isSearching = false;
                return;
            }

            $courses.html(SEARCHING_PLACEHOLDER);
            $careerCourses.html(SEARCHING_PLACEHOLDER);

            $.get(_lps_site_url+"common/course/search/", {keyword: keyword})
                .done(function(res) {
                    // refresh courses
                    if ("courses" in res && res["courses"].length > 0) {
                        $courses.html(creatCoursesHtml(res["courses"], "recent"));
                    } else {
                        $courses.html(EMPTY_PLACEHOLDER);
                    }

                    // refresh career courses
                    if ("career_courses" in res && res["career_courses"].length > 0) {
                        $careerCourses.html(creatCoursesHtml(res["career_courses"], "course/"));
                    } else {
                        $careerCourses.html(EMPTY_PLACEHOLDER);
                    }
                })
                .error(function(error) {
                    $courses.html(FAIL_PLACEHOLDER);
                    $careerCourses.html(FAIL_PLACEHOLDER);
                }).
                always(function() {
                    isSearching = false;
                    $('#keyword-group').show();
                });
  }

  //登录后
    function show_card(){
        if($('.top_user').length>0) {
            var _parent_left = $('.top_user').offset().left;
            var _parent_outw = $('.top_user').outerWidth();
            var _this_outw = $('.show-card').outerWidth();
            var _this_left = Math.abs(_parent_left - (_this_outw - _parent_outw));
            $('.show-card').css({
                'left': _this_left
            })
        }
    }
    show_card();
    $(window).resize(function(){
        show_card();
    })

    $(".zy_menu_D").hover(function(){
        $(".zy_menu_div2").html($("#zy_menu_div2_txt").val());
        $(this).children(".zy_menu_div2_arr").show();
        $(this).children(".zy_menu_div2").stop().slideDown();

    },function(){
         $(this).children(".zy_menu_div2_arr").hide();
        $(this).children(".zy_menu_div2").stop().slideUp();
    })

});
function sreachBtn(str){
    location.href=_lps_site_url+"course/list/?catagory="+str;
}
//Damon: 气泡
  function notice_message(){
      function notice_info(data){
        var Txt = '';
        Txt += '<li><a href="/chat/?type=system">系统消息&nbsp;<span>'+ (data.sys_msg_count == 0 ? '' : data.sys_msg_count) + '</sapn></a></li>';
        var uu="/common/dynmsg/";
        if(data.dyn_msg_count > 0){uu="/common/dynmsg/?unread=1&page=1";}
        Txt += '<li><a href="'+uu+'">动态&nbsp;<span>'+ (data.dyn_msg_count == 0 ? '' : data.dyn_msg_count) + '</sapn></a></li>';
        Txt += '<li><a href="/common/social/?list_type=fans">粉丝&nbsp;'+ (data.fan_msg_count == 0 ? '' : data.fan_msg_count) + '</sapn></a></li>';
        Txt += '<li><a href="/chat/?type=praise">赞&nbsp;'+ (data.praise_msg_count == 0 ? '' : data.praise_msg_count) + '</sapn></a></li>';
        Txt += '<li><a href="/chat/?type=at">@我&nbsp;'+ (data.at_msg_count == 0 ? '' : data.at_msg_count) + '</sapn></a></li>';
        return Txt;

      }

      var oUl = $('.bubble');
      $.ajax({
         url: '/chat/',
         type: 'POST',
         dataType: 'json',
         beforeSend:function(){
          oUl.addClass('loading');
         },
         success: function (data) {
            if(data.status == 'success') {
                var num = data.sys_msg_count + data.dyn_msg_count + data.fan_msg_count + data.praise_msg_count + data.at_msg_count;
                var html = notice_info(data);
                if(num){
                  $('.top_meg').addClass('top_megH');
                  $('.top_megH i.Arial').css('display','block').html(num);
                }
                oUl.html(html).removeClass('loading');
            };
         }
      });
  }
// Damon:mz_quan
  // function mz_quan(){
  //   var TOP = $(document.documentElement).scrollTop() || $(document.body).scrollTop();
  //   var zy_nn=$(".is_stuck_btn").offset().top;
  //   var zy_nnL=$(".is_stuck_btn").offset().left;
  //   var zy_nn2=$(".d_list-group").offset().top;
  //   var zy_nnL2=$(".d_list-group").offset().left;
  //   var targetWidth = $('.column-layout').outerWidth();
  //   var selfWidth = $('.is_stuck_tab').outerWidth();
  //   if ( TOP+65 > zy_nn) {
  //      $('#d_btn').css({
  //       'position':'fixed',
  //       'top':"66px",
  //       'background-color':'#fff',
  //       'margin-top':'0',
  //       'z-index':'10',
  //       'left':zy_nnL+'px'
  //      });
  //   }else {
  //      $('#d_btn').css({
  //       'position':'static',
  //       'background-color':'transparent'
  //     });
  //   };
  //   if ( TOP+65 > zy_nn2) {
  //      $('.d_list-tab').css({
  //       'position':'fixed',
  //       'top':"65px",
  //       'z-index':'10',
  //       'left':zy_nnL2+'px'
  //      }).stop().animate({width:targetWidth+'px'},50);
  //   }else {
  //      $('.d_list-tab').css({
  //       'position':'static',
  //     }).stop().animate({width:selfWidth+'px'},'fast');
  //   }
  // }
function v5_popover_tpl(tpl_class,elem,popover_container,popover_placement,popover_trigger){
  var elem_popover = document.getElementById(elem);
  var popover_c = $('.' + popover_container);
  popover_c.popover({
    content:elem_popover,
    container:'body',
    template:'<div class="popover ' + tpl_class + '" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
    placement:popover_placement,
    trigger:popover_trigger,
    html: true
  });
}

function v5_addplan(){
  var plan_len = $('.add-task').siblings('section').find('.plan-block').length;
  if(plan_len==0){
    $('.add-task').css('margin-left',0);
  }
  else{
    $('.add-task').css('margin-left','40px');
  }
}
v5_addplan();



function goPage(){
	var znn=$(".zypageTxt").val();;
	if(znn==undefined || znn=="")
		znn=1;
	else
		location.href='?page='+znn;

}

/*zhouyi*/
window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

window.cancelAnimFrame = function(){
    return (
        window.cancelAnimationFrame       ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame    ||
        window.oCancelAnimationFrame      ||
        window.msCancelAnimationFrame     ||
        function(id){
            window.clearTimeout(id);
        }
    );
}();
var sbo=true,zyTop=0;
function AnimFrame(){
    if(sbo){
        sbo=false;
        var newTop=$(window).scrollTop();
        if(zyTop==newTop){
            sbo=true;
        }
        else if(zyTop<newTop){
            $(".zy_foot_div").show(10,function(){sbo=true;});
        }
        else{
            $(".zy_foot_div").hide(10,function(){sbo=true;});
        }
        zyTop=newTop;
    }
    window.requestAnimFrame(function(){AnimFrame();});
}

$(function(){zyTop=$(window).scrollTop();
    $(window).scroll(function(e) {
        //var newtop = $(this).scrollTop();
        //if (newtop >= 90) {
        //    sbo = true;
        //}
        //else {
        //    $(".top2").slideUp();
        //    zyTop = newtop - 1;
        //    sbo = false;
        //}
    });
})

/*固定侧边栏筛选模块*/
var fixedSideFilter = function(){
  var TOP = $(document.documentElement).scrollTop() || $(document.body).scrollTop();
  if($('.fixed-filter').length>0){
    var fixedFilterTop = $('.fixed-filter').offset().top;
    var fixedFilterLeft = $('.fixed-filter').offset().left;
  }
  
  var hotTag = $('#hotTag');
  var oFixedBtn = $('.fixed-button');
  var oSideFixed = $('#side-fixed');
  var hotTagWidth = hotTag.outerWidth();
  var hotTagBox = $('.hot-tag-box');
  var oGroupBtn = $('.button-group');
  var selfHeight = hotTagBox.outerHeight() + 20;
      if((TOP + 65) > fixedFilterTop){
        hotTag.css('height',selfHeight);
        oSideFixed.append(oFixedBtn);
        
        oSideFixed.css({
          'position':'fixed',
          'top':'65px',
          'left':fixedFilterLeft + 'px',
          'width':hotTagWidth
        });


      }else{
        oSideFixed.css({
          'position':''
        });
        oGroupBtn.append(oFixedBtn);
      }
}

/*悬浮广告模块*/
var fixedAd = function(element){
  var TOP = $(document.documentElement).scrollTop() || $(document.body).scrollTop();
  if($('.fixed-filter').length>0){
    var fixedFilterTop = $('.fixed-filter').offset().top;
    var fixedFilterLeft = $('.fixed-filter').offset().left;
  }
  var oAd = $(element);
  if((TOP + 65) > fixedFilterTop){
    
    oAd.css({
      'position':'fixed',
      'top':'85px',
      'left':fixedFilterLeft + 'px',
      'transition': 'top .6s',
      '-moz-transition': 'top .6s',
      '-webkit-transition': 'top .6s',
      '-o-transition': 'top .6s',
      'z-index':'9999'
    });

  }else{
    oAd.css({
      'position':''
    });
  }
}

$(function(){
  $(window).scroll(function(){
      fixedSideFilter();
      fixedAd('.index-ad');
  });

  // 移动端分享交互
  if($(document).width()  <=767){
    var TOP = $(document.documentElement).scrollTop() || $(document.body).scrollTop();
    var share_Div = $('.show-mobile-share');
    $(window).scroll(function(){
      if( TOP + 48 < share_Div.offset().top ){
        share_Div.show().css({
          'position': 'fixed',
          'left':'0px',
          'top':'0px',
          'z-index':'9999'
        });
      }else{
        share_Div.hide();
      }
    });
  }

});

/*字符串长度截取*/
$.fn.limit = function(e,limit){ 
    var self = $(e); 
    self.each(function(){ 
        var objString = $(this).text(); 
        var objLength = $(this).text().length; 
        var num = $(this).attr(limit); 
        if(objLength > num){ 
            $(this).attr('title',objString); 
            objString = $(this).text(objString.substring(0,num) + '...'); 
        } 
    }) 
}