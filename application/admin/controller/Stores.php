<?php

namespace app\admin\controller;
use think\Controller;
use think\Db;

/**
 * 课程管理控制器类
 */
class Stores extends controller {

	public function storelist() {
		$stores = Db::name('store_table')->select();
		$this->assign('store_list', $stores);
		return $this->fetch();
	}

	public function storeEdit() {

		return $this->fetch();
	}
}