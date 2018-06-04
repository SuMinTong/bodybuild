<?php
namespace app\admin\controller;

use app\common\controller\AdminController;
use think\Db;
use think\Request;

/**
 * 门店控制器类
 * +----------------------------------------------------------------------
 * Class Site
 * @package app\admin\controller
 * +----------------------------------------------------------------------
 * | author     :BabySeeME <417170808@qq.com>
 * +----------------------------------------------------------------------
 * | createTime :2018-04-27 20:31
 */
class Site extends AdminController {

	/**
	 * 站点配置信息提交更新
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-04-27 20:19
	 */
	public function config_add() {
		//新增操作
		if ($this->request->isPost()) {
			$post = $this->request->post();
			$model = new SystemConfigModel();
			if ($model->_update_all($post) > 0) {
				\think\facade\Cache::clear();
				$this->success('修改成功');
			} else {
				$this->error('修改失败');
			}
		} else {
			$this->error('失败:非法提交！');
		}
	}

	/**
	 * 门店列表
	 */
	public function storelist() {
		$stores = Db::name('store_table')->select();
		for ($i = 0; $i < count($stores); $i++) {
			$stores[$i]['swiper'] = explode(",", $stores[$i]['swiper']);
		}
		$this->assign('store_list', $stores);
		return $this->fetch();
	}
	// 添加门店
	public function storeedit() {
		return $this->fetch();
	}
// 添加门店
	public function store_save() {

		$post = $this->request->post();
		$data['store_name'] = $post['store_name'];
		$data['support'] = $post['support'];
		$data['no_support'] = $post['no_support'];
		$data['address'] = $post['address'];
		$data['metro_name'] = $post['metro_name'];
		$data['metro_details'] = $post['metro_details'];
		$data['metro_distance'] = $post['metro_distance'];
		$data['transit_name'] = $post['transit_name'];
		$data['transit_details'] = $post['transit_details'];
		$data['transit_distance'] = $post['transit_distance'];
		$data['driving_details'] = $post['driving_details'];
		$data['recommend'] = $post['recommend'];
		$data['longitude'] = $post['longitude'];
		$data['latitude'] = $post['latitude'];
		$data['latitude'] = $post['latitude'];
		$data['thumb'] = $post['thumb'];
		$data['swiper'] = $post['swiper'];
		$data['addre'] = $post['addre'];

		$data['status'] = 1;

		$stores = Db::name('store_table')->insert($data);
		if ($stores) {
			$res['code'] = 200;
			$res['msg'] = '添加成功';
			$res['data'] = $stores;
		} else {
			$res['code'] = 201;
			$res['msg'] = '添加失败';
		}
		exit(json_encode($res));
	}

	/**
	 * 编辑门店基本信息  //非提交操作
	 * @return mixed
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-03-05 22:31
	 */
	public function edit($id = 0) {
		//获取用户id
		$id = $this->request->has('id') ? $this->request->param('id', 0, 'intval') : $id;
		if ($id == 0) {
			$this->error('id不正能为空');
		}
		//实例化管理员模型
		// $model = new AdminUserModel();
		$store_info = Db::name('store_table')->where('id', $id)->find();
		$this->assign('store_info', $store_info);
		return $this->fetch();
	}

/**
 * 更新门店基本信息  //提交操作
 * @return mixed
 * @company    :WuYuZhong Co. Ltd
 * @author     :BabySeeME <417170808@qq.com>
 * @createTime :2018-03-05 22:31
 */

	public function update() {

		$post = $this->request->post();

		$data['store_name'] = $post['store_name'];
		$data['support'] = $post['support'];
		$data['no_support'] = $post['no_support'];
		$data['address'] = $post['address'];
		$data['metro_name'] = $post['metro_name'];
		$data['metro_details'] = $post['metro_details'];
		$data['metro_distance'] = $post['metro_distance'];
		$data['transit_name'] = $post['transit_name'];
		$data['transit_details'] = $post['transit_details'];
		$data['transit_distance'] = $post['transit_distance'];
		$data['driving_details'] = $post['driving_details'];
		$data['recommend'] = $post['recommend'];
		$data['longitude'] = $post['longitude'];
		$data['latitude'] = $post['latitude'];
		$data['latitude'] = $post['latitude'];
		$data['thumb'] = $post['thumb'];
		$data['swiper'] = $post['swiper'];
		$stores = Db::name('store_table')->where('id', $post['id'])->update($data);
		if ($stores) {
			$res['code'] = 200;
			$res['msg'] = '修改成功';
			$res['data'] = $stores;

		} else {
			$res['code'] = 201;
			$res['msg'] = '修改失败';

		}
		echo json_encode($res);
		// exit(json_encode($res));
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
		if (Db::name('store_table')->where('id', $get['id'])->update(['status' => $get['status']]) !== false) {
			//记录日志
			//$this->add_log($this->userSession['id'],$this->userSession['username'],'更新ID:'.$get['id'].'账户状态');
			//  $this->success('更新成功');
			return json(array('code' => 200, 'msg' => '更新成功'));
		}
		// $this->error('更新失败');
		return json(array('code' => 0, 'msg' => '更新失败'));
	}

}