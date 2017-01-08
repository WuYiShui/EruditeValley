define(["jquery","template","ckeditor","datepicker","form","region","zhCN","uploadify"],function($,template,CKEDITOR){
	console.log(CKEDITOR);
	//个人资料处理
	$.ajax({
		url:"/api/teacher/profile",
		type:"get",
		success:function(singleData){
			// console.log(singleData);
			if(singleData.code==200){
				 var html=template("singleFile",singleData.result);
				 $("#singleForm").html(html);
				 $(".hometown").region({
				 	url:'/public/assets/jquery-region/region.json'
				 });
				 CKEDITOR.replace("contentArea");
				 //图片上传
				$("#upfile").uploadify({
					//图片宽度
					width:120,
					//图片高度
					height:120,
					//默认btn的文本
					buttonText:"",
					//什么方式传输数据
					method:"post",
					//图片上传的key值
					fileObjName:"tc_avatar",
					//取消上传进度
					itemTemplate:"<span></span>",
					//插件flash的地址
					swf:"/public/assets/uploadify/uploadify.swf",
					//上传的后台路径
					uploader:"/api/uploader/avatar",
					onUploadSuccess:function(file,data){
						//data返回的是一个字符串 
						var data=JSON.parse(data);
						if(data.code==200){
							//返回上传成功
							console.log(data);
							$(".preview img").attr("src",data.result.path);						
						}
					}
				})				 
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
				tc_hometown:privp+"|"+privc+"|"+privd
			},
			success:function(infor){
				console.log(infor);
			}
		})
		return false;
	})
})