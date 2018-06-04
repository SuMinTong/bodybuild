<?php
namespace app\index\controller;
use think\Db;

/**
 * 门店管理类
 */
class Message {

	// 显示消息信息
	public function getMessage() {
		$article = Db::name('article_table')->select();
		if (!$article) {
			$res['code'] = 0;
			$res['msg'] = 'fail';
			$res['data'] = '';
		} else {
			$res['code'] = 1;
			$res['msg'] = 'success';
			$res['data'] = $article;
		}
		echo json_encode($res);
	}

	public function getMessageDetailById() {
		$article = Db::name('article_table')->where('id', $_GET['id'])->find();
		if (!$article) {
			$res['code'] = 0;
			$res['msg'] = 'fail';
			$res['data'] = '';
		} else {
			$res['code'] = 1;
			$res['msg'] = 'success';
			$res['data'] = $article;
		}
		echo json_encode($res);

	}

}

?>