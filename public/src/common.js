	//require定义了一个模块 或则是依赖了注入的模块 引用时就必须加载模块
	define(['jquery','template','cookie',],function(jquery,template){
		// NProgress.start();

		// NProgress.done();

		$('#courseToggle').on('click', function () {
			$(this).next().slideToggle();
		});
		// debugger;
		var str=location.href;
		//indexOf() 如果没有搜索到返回-1 如果搜索到返回该字符出现的首位子
		// console.log(str.indexOf("create"));
		 console.log(location.href);
		if(str.indexOf("course/create")||str.indexOf("course/list")||str.indexOf("course/topic")){
			// console.log(1);
			$("#courseToggle").next().css("display","block");
		}
		//设置和获取用户登录信息
		// console.log(str.indexOf("/login")==-1);
		// console.log(!$.cookie("PHPSESSID"));
		//等于-1说明是不在login页面 $.cookie("PHPSESSID")是null或则undefined都是跳转到login页面
		//在没有$.cookie("PHPSESSID")和login时 还是显示login页面
		if(str.indexOf("/login")==-1&&!$.cookie("PHPSESSID")){
			// console.log(1)
			location.href="/login";
		}

		// console.log(document.cookie);
		// cookie存在 和不存在login页面 添加模板
		if($.cookie("pInfor")&&str.indexOf("/login")==-1){
			// console.log(1);
			var pInfor=JSON.parse($.cookie("pInfor"));
			// console.log(pInfor);
			var html=template("asideTemp",{pInfor:pInfor});
			// console.log(html);
			$(".aside .profile").html(html);		
		}
		//退出清除cookie
		$("#exit").on("click",function(){
			alert(1);
			// console.log(document.cookie);
			// 直接删除cookie配上路径
			// 推出登录也是需要调用接口的
			$.removeCookie("pInfor",{path:"/"});
			$.removeCookie("PHPSESSID",{path:"/"}); 
		})

	})
