<?php
namespace app\admin\controller;

use app\common\controller\AdminController;
use think\Db;
use think\Request;

/**老师管理控制器类
 * +----------------------------------------------------------------------
 * Class Score
 * @package app\admin\controller
 * +----------------------------------------------------------------------
 * | author     :BabySeeME <417170808@qq.com>
 * +----------------------------------------------------------------------
 * | createTime :2018-04-27 20:31
 */
class Message extends AdminController {

	public function _list() {
		$res = Db::name('article_table')->select();
		$this->assign('article_list', $res);
		return $this->fetch();
	}

	public function add() {
		$res = Db::name('store_table')->select();
		$this->assign('store_list', $res);
		return $this->fetch();
	}

	public function saveMess() {
		$post = $this->request->post();
		$data['keywords'] = $post['keywords'];
		$data['title'] = $post['title'];
		$data['introduction'] = $post['introduction'];
		$data['cid'] = $post['cid'];
		$data['content'] = $post['content'];
		$data['thumb'] = $post['thumb'];
		$data['publish_time'] = time();
		$data['status'] = 0;
		$res = Db::name('article_table')->insert($data);
		if($res){
			$re['code']=200;
			$re['msg']='保存成功';
			
		}else{
			$re['code']=201;
			$re['msg']='保存失败';
		}
		echo json_encode($res);
		// var_dump($data);

	}

	/**
	 * 更新老师状态
	 * @return \think\response\Json
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-03-05 15:33
	 */
	public function update_status() {
		if ($this->request->isGet() == false) {
			return json(array('code' => 0, 'msg' => '更新失败'));
		}
		$get = $this->request->get();
		if (Db::name('article_table')->where('id', $get['id'])->update(['status' => $get['status']]) !== false) {
			//记录日志
			//$this->add_log($this->userSession['id'],$this->userSession['username'],'更新ID:'.$get['id'].'账户状态');
			//  $this->success('更新成功');
			return json(array('code' => 200, 'msg' => '更新成功'));
		}
		// $this->error('更新失败');
		return json(array('code' => 0, 'msg' => '更新失败'));
	}

}