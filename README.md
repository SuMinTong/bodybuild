
一、门店
1.获取门店详情
	http://127.0.0.1/bodyBuild/public/index.php/index/store/getStores
2.根据门店id获取门店详情
	http://127.0.0.1/bodyBuild/public/index.php/index/store/getStoreById
	参数 id
二、老师
	根据老师id获取门店详情
	http://127.0.0.1/bodyBuild/public/index.php/index/teacher/getTeacherById
	参数：id=2
三、课程

	http://192.168.1.108/bodyBuild/public/index.php/index/Course/

		1.getTime：获取时间以及星期
		2.getCourseById：通过星期以及门店id获取课程内容
			参数on_week
			store_id
		3.getCourseByCourseId：通过课程id获取当前课程的详情
