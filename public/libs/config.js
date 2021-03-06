require.config({
	baseUrl:"/public",
	paths:{
		jquery:"assets/jquery/jquery.min",
		bootstrap:"assets/bootstrap/js/bootstrap.min",
		validate:"assets/jquery-validate/jquery-validate",
		form:"assets/jquery-form/jquery.form",
		uploadify:"assets/uploadify/jquery.uploadify.min",
		Jcrop:"assets/Jcrop/js/Jcrop",
		ckeditor:"assets/ckeditor/ckeditor",
		region:"assets/jquery-region/jquery.region",
		datepicker:"assets/bootstrap-datepicker/js/bootstrap-datepicker.min",
		zhCN:"assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
		nprogress:"assets/nprogress/nprogress",
		template:"assets/artTemplate/template",
		cookie:"assets/jquery-cookie/jquery.cookie"
	},
	//shim 配置依赖和返回值
	//exports 需要用到返回值的话就要用到
	//deps 创建依赖
	shim:{
		bootstrap:{
			deps:["jquery"]
		},
		zhCN:{
			deps:["jquery","datepicker"]
		},
		validate:{
			deps:["jquery",]
		},
		ckeditor:{
			exports:"CKEDITOR"
		},
		uploadify:{
			deps:['jquery']
		},
		Jcrop:{
			deps:['jquery']
		}
	}
})