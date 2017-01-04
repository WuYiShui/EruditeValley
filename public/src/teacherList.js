define(['jquery','template'],function($,template){
	$.ajax({
		type:"get",
		url:"/api/teacher",
		dataType:"json",
		success:function(teacherInfor){
			// console.log(teacherInfor);
			var html=template("teacherList",{teacherList:teacherInfor.result});
			console.log(html);
			$("#teacherTbody").html(html);
		}
	})
})