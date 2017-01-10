define(["jquery","template","src/until","form"],function($,template,until){
	// alert(1);
	// 加载默认数据
	var cs_id=until.qs("cs_id");
	$.ajax({
		url:"/api/course/lesson",
		type:"get",
		data:{cs_id:cs_id},
		success:function(inFor){			
			if(inFor.code==200){
				console.log(inFor);
				var html=template("step3Temp",inFor.result);
				$("#step3").html(html);
			}
		}
	})
	//添加和编辑模板 公用一个模板
	$("#step3").on("click",".add",function(){;
		var html=template("formTemp",{
			title:"添加课时",
			ct_cs_id:cs_id,
			btnText:"添 加",
			action:"/api/course/chapter/add"
		});
		$("#lesson").html(html);
		$("#lesson").modal();
	})

	$("#step3").on("click",".edit",function(){
			var ct_id=$(this).parent().attr("data-ct_id");
		$.ajax({
			url:"/api/course/chapter/edit",
			type:"get",
			data:{ct_id:ct_id},
			success:function(dataFor){
				if(dataFor.code==200){
					console.log(dataFor);
					dataFor.result.title="编辑课时";
					dataFor.result.btnText="编 辑";
					dataFor.result.action="/api/course/chapter/modify";
					var html=template("formTemp",dataFor.result);
					$("#lesson").html(html);
					$("#lesson").modal();					
				}
			}
		})
	})
	$("#lesson").on("submit","#step3Form",function(){
		var free=$(this).find("#free")[0].checked?1:0;
		$(this).ajaxSubmit({
			type:"post",
			data:{
				ct_is_free:free
			},
			success:function(infor){
				console.log(infor);
				$("#lesson").modal("hide");	
				location.reload();
			}
		})
		return false;
	})
})