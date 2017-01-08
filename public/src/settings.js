define(["jquery","template","ckeditor","datepicker","form","region","zhCN"],function($,template,CKEDITOR){
	console.log(CKEDITOR);
	//个人资料处理
	$.ajax({
		url:"/api/teacher/profile",
		type:"get",
		success:function(singleData){
			console.log(singleData);
			if(singleData.code==200){
			 var html=template("singleFile",singleData.result);
			 $("#singleForm").html(html);
			 $(".hometown").region({
			 	url:'/public/assets/jquery-region/region.json'
			 });
			 CKEDITOR.replace("contentArea");
			}
		}
	})
	$("#singleForm").on("submit","#form",function(){
		var privp=$("#p").find("option:selected").text();
		var privc=$("#c").find("option:selected").text();
		var privd=$("#d").find("option:selected").text();
		$(this).ajaxSubmit({
			url:"/api/teacher/modify",
			type:"post",
			data:{
				hometown:privp+"|"+privc+"|"+privd
			},
			success:function(infor){
				console.log(infor);
			}
		})
		return false;
	})
})