define(["jquery","template"],function($,template){
	$.ajax({
		url:"/api/course",
		type:"get",
		success:function(data){
			console.log(data);
			if(data.code==200){
				//模板的compile方法配合主模板使用
				var str='{{each list}} \
				<div class="course"  data-cs_id="{{ $value.cs_id }}">\
			        <div class="pic">\
			            <img src="{{ $value.cs_cover }}" alt="">\
			        </div>\
			        <div class="info">\
			            <a href="javascript:;">{{ $value.cg_name }}</a>\
			            <ul class="list-unstyled">\
			                <li>\
			                    <span>讲师:{{ $value.tc_name }}</span>\
			                    <span>类别：{{ $value.cs_name }}</span>\
			                </li>\
			                <li>\
			                    <span>课时：32</span>\
			                    <span>学员：9823</span>\
			                </li>\
			                <li>\
			                    <span>浏览：11313</span>\
			                    <span></span>\
			                </li>\
			            </ul>\
			        </div>\
				</div>\
				{{ /each }}';
				var render=template.compile(str);		
				var html=render({list:data.result});
				console.log(html);
				$("#courses").append(html);
			}
		}
	})
})