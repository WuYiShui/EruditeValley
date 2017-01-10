define(['jquery','template',"src/until",'ckeditor','validate','form'],function($,template,until,CKEDITOR){
	// var cs_id=until.qs("cs_id");
	// console.log(cs_id);
	$.ajax({
		url:"/api/course/basic?cs_id="+until.qs("cs_id"),
		type:"get",
		success:function(basicFor){
			console.log(basicFor);
			var html=template("step1Temp",basicFor.result);
			$("#steps1").html(html);
			//调用富文本编辑器
			CKEDITOR.replace("textAreaContent");

			//提交表单保存信息
			//
			$("#basicForm").validate({
				sendForm:false,
				valid:function(){
					// 更新富文本编辑器
					for(instance in CKEDITOR.instances) {
						CKEDITOR.instances[instance].updateElement();
					}
					$(this).ajaxSubmit({
						url:"/api/course/update/basic",
						type:"post",
						success:function(data){
							if(data.code==200){
								console.log(data);
								location.href="/course/step2?cs_id="+data.result.cs_id;
							}	
						}
					})
				}
			})
		}
	})
	//二级分类的变化 是随着顶级分类的变化而变化的 所以一般是以顶级分类的id为参数到后台拿数据 
	// 参数是二级分类的顶级分类
	$("#steps1").on("change","#twoCategory",function(){
		var _this=$(this);
		var cg_id=_this.val();
		$.ajax({
			url:"/api/category/child",
			type:"get",
			data:{
				cg_id:cg_id
			},
			success:function(ifor){
				if(ifor.code==200){
					console.log(ifor);
					// 模板的compile函数可以出现变量 也就是小部分的出现在脚本1中的一种解决方法
					var str="{{each list}}\
					 	<option value='{{ $value.cg_id }}'>{{ $value.cg_name }}</option>\
					 {{/each}}";
					 var render=template.compile(str);
					 var html=render({list:ifor.result});
					 _this.next().html(html);
				}	
			}
		})
	})
})