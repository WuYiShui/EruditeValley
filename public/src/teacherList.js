define(['jquery','template'],function($,template){
	$.ajax({
		type:"get",
		url:"/api/teacher",
		dataType:"json",
		success:function(teacherInfor){
			 console.log(teacherInfor);
			var html=template("teacherList",{teacherList:teacherInfor.result});
			// console.log(html);
			$("#teacherTbody").html(html);
		}
	})
	$("#teacherTbody").on("click",".handle",function(){
		var _this=$(this);
		var tc_id=_this.parent("td").data("id");
		var tc_status=_this.parent("td").data("status");
		$.ajax({
			type:"get",
			url:"/api/teacher/handle?tc_id="+tc_id+"&tc_status="+tc_status,
			dataType:"json",
			success:function(dataStatus){
				 console.log(dataStatus);
				if(dataStatus.code==200){
					if(tc_status==0){
						_this.text("启 用");
					}else{
						_this.text("注 销");
					}
					_this.parent("td").data("status",dataStatus.result.tc_status);					
				}

			}
		})

	})
})