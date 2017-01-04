define(['jquery'],function(){
    $("#loginForm").on("submit",function(){
      var formData=$(this).serialize();
        $.ajax({
            type:"post",
            url:"/api/login",
            data:formData,
            success:function(data){
                if(data.code==200){
                    alert(data.msg);
                    console.log(data);
                    //把cookie存在根目录去也就是
                    $.cookie("pInfor",JSON.stringify(data.result),{expires:7,path:"/"});
                    // $.cookie("name",decodeURIComponent("伍文浩"));
                    location.href="/";
                    // console.log(document.cookie);
                }
            }
        })
        return false;
    })	
})