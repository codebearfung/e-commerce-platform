function introduce_message(){

	var arrIntroduceMessage=[], i=0;

    $.ajax({
        type:"GET",
        url:"/chat/introduce_info/",
        dataType:"JSON",
        success: function(data){
            if(data.status){
                i = 0;
                arrIntroduceMessage = data.data;
                //$("#own-center-tips").html(arrIntroduceMessage[i]);
                //$("#own-center-tips").modal('show');
                globalIntroduceMessage();
            }
        }
    });

    var globalIntroduceMessage = function(){
        if(arrIntroduceMessage.length<=i){
            $("#own-center-tips").modal('hide');
            return;
        }
        $("#own-center-tips").html(arrIntroduceMessage[i]);
        $("#own-center-tips").modal('show');
        i++;
        var oClose = $('.own-center-close');
        oClose.live('click',function(){
            $(this).parent().parent().remove();
            setTimeout(globalIntroduceMessage,200);
        });
    }
}