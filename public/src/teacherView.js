define(["jquery","template"],function($,template){
	// alert(1);
	$("#teacherTbody").on("click","#lookTeachers",function(){
		var id=$(this).parent("td").data("id");
		$.ajax({
			type:"get",
			url:"/api/teacher/view?tc_id="+id,
			dataType:"json",
			success:function(dataViews){
				console.log(dataViews);
				if(dataViews.code==200){
					var hometown=dataViews.result.tc_hometown;
					dataViews.result.tc_hometown=hometown.split("|").join(" ");
					var html=template("teacherView",dataViews.result);
					$("#showTeacherViews").html(html);
					//点击调用模态窗口的modal();
					$("#teacherModal").modal();
				}
			}
		})
	})
})