define(["jquery"],function($){
	return {
		setActive:function(active){
			$(".navs a[href='"+active+"']").addClass("active");
		},
		qs:function(key){
			//获取参数字符串
			var str=location.search;
			//截取掉?
			var newStr=str.slice(1);
			//已&切割字符串为数组
			var arrStr=newStr.split("&");
			//循环数组
			//定义空对象接受
			var o={};
			for(var i=0;i<arrStr.length;i++){
				var temp=arrStr[i].split("=");
				o[temp[0]]=temp[1];
			}
			return o[key];			
		}				
	}
})