define(['jquery','template',"src/until","uploadify","Jcrop","form"],function($,template,until){
	var cs_id=until.qs("cs_id");
	$.ajax({
		url:"/api/course/picture",
		type:"get",
		//参数是课程分类id
		data:{cs_id:cs_id},
		success:function(data){
			console.log(data);
			var html=template("step2Temp",data.result);
			$("#step2").html(html);
			//上传图片
			$("#upFile").uploadify({
				//提交地址
				uploader:"/api/uploader/cover",
				//文件格式 替代图片
				swf:"/public/assets/uploadify/uploadify.swf",
				//提交方式
				method:"post",
				//fileObjName文件名称 代替了图片名称
				fileObjName:"cs_cover_original",
				//formData形式替代参数
				formData:{cs_id:cs_id},
				//文件大小
				fileSizeLimit:"2MB",
				//文件格式
				fileTypeExts:"*.jpg; *.png; *.gif",
				//进度条
				itemTemplate:"<span></span>",
				//样式
				buttonText:"选择图片",
				buttonClass:"btn btn-success btn-sm",
				width:70,
				height:"auto",
				onUploadSuccess:function(form,data){
					console.log(data);
					 var data=JSON.parse(data);
					 if(data.code==200){
					 	//真实的图片会在视图下面的img里面
					 	$(".preview img").attr("src",data.result.path);
					 	//裁切图片
					 	// // 根据有没有图片来判断是禁用按钮
					 	//一种是已经有图片裁切点击按钮裁切 还有就是刚刚添加后裁切
					 	$("#save").removeAttr("disabled")
						.attr('data-status', 'save')
						.val('保存图片');
					 	JcropImg();
					 }
				}

			})
			//获缩略图的坐标
			$(".preview").on("cropmove cropend",function(a,b,c){
				$("x").val(c.x);
				$("y").val(c.y);
				$("w").val(c.w);
				$("h").val(c.h);
			})
			var jcrop_api;
			$("#save").on("click",function(){
				// 点击按钮就保存裁切保存图片
				var _this=$(this);
				if(_this.attr("disabled")){
					return false;
				}
				if(_this.attr("data-save")=="save"){
					$("#coords").ajaxSubmit({
						url:"/api/course/update/picture",
						type:"post",
						data:{cs_id:cs_id},
						success:function(infor){
							console.log(infor)
							if(infor.code == 200) {
								// 跳转下一步
								location.href = '/course/step3?cs_id=' + infor.result.cs_id;
							}								
						}
					})
				}else{
					_this.text("保存图片");
					_this.attr("data-save","save");
					JcropImg();					
				}

			})
			function JcropImg(){
				//每一次调用之前要销毁一次对象
				jcrop_api&&jcrop_api.destroy();
				$(".preview img").Jcrop({
					boxWidth:400,
					aspectRatio:2
				},function(){
					jcrop_api=this;
					//真实图片的宽度
					var width=this.ui.stage.width;
					//真实图片的高度
					var height=this.ui.stage.height;
					//缩略图位置
					var w=width;
					var h=width/2;
					var x=0
					var y=(height-h)/2;
					this.newSelection();
					this.setSelect([x,y,w,h])
					console.log(this);
					//缩略图大小
					//.thumb制定缩略图的盒子
					thumbnail = this.initComponent('Thumbnailer', {
						width: 240,
						height: 120,
						thumb: '.thumb'
					});	
					// 调整缩略图定位坐标
					$('.jcrop-thumb').css({
						left: 0,
						top: 0
					});									
				});		
			}
		}
	})
})