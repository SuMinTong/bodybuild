<?php
namespace app\admin\controller;

use app\common\controller\AdminController;
use think\Db;

/**老师管理控制器类
 * +----------------------------------------------------------------------
 * Class Score
 * @package app\admin\controller
 * +----------------------------------------------------------------------
 * | author     :BabySeeME <417170808@qq.com>
 * +----------------------------------------------------------------------
 * | createTime :2018-04-27 20:31
 */
class Swiper extends AdminController {

	public function add() {
		return $this->fetch();
	}

	public function saveSwiper() {
		// $post = $this->request();
		$data['path'] = $_POST['path'];
		$data['store_id'] = 0;
		$data['course_id'] = 0;
		$data['status'] = 0;
		$res = Db::name('swiper_table')->insert($data);
		if ($res) {
			$data['code'] = 200;
			$data['msg'] = "添加成功";
			$data['data'] = $res;
		} else {
			$data['code'] = 200;
			$data['msg'] = "添加成功";
			$data['data'] = $res;
		}
		exit(json_encode($data));
	}

	public function _list() {
		$data['store_id'] = 0;
		$data['course_id'] = 0;
		$res = Db::name('swiper_table')->where($data)->select();
		for ($i = 0; $i < count($res); $i++) {
			$res[$i]['path'] = explode(",", $res[$i]['path']);
		}
		$this->assign('swiper_list', $res);
		return $this->fetch();
	}

	/**
	 * 更新轮播图状态
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
		if (Db::name('swiper_table')->where('id', $get['id'])->update(['status' => $get['status']]) !== false) {
			//记录日志
			//$this->add_log($this->userSession['id'],$this->userSession['username'],'更新ID:'.$get['id'].'账户状态');
			//  $this->success('更新成功');
			return json(array('code' => 200, 'msg' => '更新成功'));
		}
		// $this->error('更新失败');
		return json(array('code' => 0, 'msg' => '更新失败'));
	}

}