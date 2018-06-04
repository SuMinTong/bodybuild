<?php
namespace app\index\controller;
use think\Db;

/**
 * 门店管理类
 */
class Stores {

	// function __construct(argument)
	// {
	// 	# code...
	// }
	// 显示门店信息
	public function getStores() {
		$stores = Db::name('store_table')->field('id,thumb,store_name,latitude,longitude,addre')->select();
		if (!$stores) {
			$res['code'] = 0;
			$res['msg'] = 'fail';
			$res['data'] = '';
		} else {
			$res['code'] = 1;
			$res['msg'] = 'success';
			$res['data'] = $stores;
		}
		echo json_encode($res);
	}

// 通过门店id查看门店详情
	public function getStoreById() {
		$stores = Db::name('store_table')->where('id', $_GET['id'])->find();
		if (!$stores) {
			$res['code'] = 0;
			$res['msg'] = 'fail';
			$res['data'] = '';
		} else {
			$res['code'] = 1;
			$res['msg'] = 'success';
			$res['data'] = $stores;
		}
		echo json_encode($res);
	}

}

?>