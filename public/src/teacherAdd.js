define(['jquery','src/until','template','validate','form','zhCN','datepicker'],function($,until,template){
	//区别添加页面和编辑页面
	var tc_id=until.qs("tc_id");
	if(tc_id){
		//如果存在tc_id那就是编辑页面
		$.ajax({
			url:"/api/teacher/edit?tc_id="+tc_id,
			type:"get",
			dataType:"json",
			success:function(edtData){
				console.log(edtData);
				if(edtData.code==200){
					edtData.result.title="讲师编辑";
					edtData.result.btn="编 辑"
					var html=template("edtTemp",edtData.result);
					$("#edtTeacher").html(html);
					addOrEct("/api/teacher/update");
				}
			}
		})
	}else{
		//否则就是添加页面
		var html=template("edtTemp",{
			title:"讲师添加",
			tc_name:"请输入讲师名称",
			tc_pass:"请输入密码",
			tc_join_date:"2012-12-12",
			tc_gender:0,
			btn:"添 加"
		});
		$("#edtTeacher").html(html);
		//讲师添加
		addOrEct("/api/teacher/add");
	}
	function addOrEct(url){
		$("#teacherAddForm").validate({
			//sendForm 不通过form提交表单
			sendForm:false,
			onBlur:true,
			valid:function(){
				//ajaxSubmit提交表单
				$(this).ajaxSubmit({
					url:url,
					type:"post",
					success:function(infor){
						console.log(infor);
					}
				})
			},
			eachInvalidField:function(){
				$(this).parents(".form-group")
				.removeClass("has-success")
				.addClass('has-error');
			},
			eachValidField:function(){
				$(this).parents(".form-group")
				.removeClass("has-error")
				.addClass('has-success');
			},
			description:{
				show:{
					required:"请输入讲师名称",
					pattern:"输入格式不正确"
				},
				show2:{
					required:"请输入密码",
					pattern:"密码格式不正确"					
				},
				show3:{
					required:"请输入日期"				
				}				
			}
		})
	}	
})
// $("#teacherAddForm").on("submit",function(){
// 	var formData=$(this).serialize();
// 	console.log(formData);
// 	$.ajax({
// 		type:"post",
// 		url:"/api/teacher/add",
// 		data:formData,
// 		success:function(addData){
// 			console.log(addData);
// 			if(addData.code==200){
// 				// location.href="/teacher/list";
// 			}	
// 		}
// 	})
// 	return false;
// })	