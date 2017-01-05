define(['jquery','datepicker','zhCN'],function($){
	$("#teacherAddForm").on("submit",function(){
		// alert(1);
		var formData=$(this).serialize();
		console.log(formData);
		$.ajax({
			type:"post",
			url:"/api/teacher/add",
			data:formData,
			success:function(addData){
				console.log(addData);
				if(addData.code==200){
					location.href="/teacher/list";
				}	
			}
		})
		return false;
	})
})