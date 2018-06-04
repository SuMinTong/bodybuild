<?php
namespace app\index\controller;
use think\Db;

class Swiper {
	public function index() {
		$where['store_id'] = 0;
		$where['course_id'] = 0;
		$where['status'] = 1;
		$swiper = Db::name('swiper_table')->where($where)->select();
		echo json_encode($swiper);

	}
}
