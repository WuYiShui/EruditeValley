<?php
// var_dump($_SERVER);
//
// 。。。。。。。。。

//在我的分支上工作
// $_SERVER 数组 可以获得服务器信息
// 其中PATH_INFO是地址部分信息

// 获取路径信息
// 格式为 /index/login
$pathinfo = $_SERVER['PATH_INFO'];
// echo ($pathinfo);
// echo substr($pathinfo, 1);
// 将路径进行拆分
$pathinfo = explode('/', substr($pathinfo, 1));
// var_dump($pathinfo);

// 格式为 /user/user_list 时
// 去加载 ./views/user/user_list.html
$path = $pathinfo[0]; // 目录名称
$filename = $pathinfo[1]; // 文件名称

// 路径简化
if(count($pathinfo) == 1) {
	// 格式为 / 时
	// 去加载 ./views/index/index.html
	if(!$path) {
		$path = 'index';
		$filename = 'index';
	} else { 
		// 格式为 /login 时
		// 去加载 ./views/index/login.html
		$path = 'index';
		$filename = $pathinfo[0];		
	}
}
include('./views/' . $path . '/' . $filename . '.html'); 
