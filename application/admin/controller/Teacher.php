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
class Teacher extends AdminController {

	// 老师列表

	public function teacherList() {
		$res = Db::name('teacher_table')->select();
		$this->assign('teacher_list', $res);
		return $this->fetch();
	}

	// 添加老师   非提交

	public function addTeacher() {
		return $this->fetch();
	}

	public function addTeacherInfo() {
		$post = $this->request->post();
		$data['phone'] = $post['phone'];
		$data['name'] = $post['name'];
		$data['user_name'] = $post['user_name'];
		$data['age'] = $post['age'];
		$data['sex'] = $post['sex'];
		$data['birth_time'] = $post['birth_time'];
		$data['speciality'] = $post['speciality'];
		$data['birth_time'] = $post['birth_time'];
		$data['professional'] = $post['professional'];
		$data['coach_said'] = $post['coach_said'];
		$data['url'] = $post['url'];
		$data['status'] = 0;
		$stores = Db::name('teacher_table')->insert($data);

		if ($stores) {
			$res['code'] = 200;
			$res['msg'] = "添加成功";
			$res['data'] = $stores;
		} else {
			$res['code'] = 200;
			$res['msg'] = "添加失败";
		}
		echo json_encode($res);
	}

	public function updateTeacherInfo() {
		$post = $this->request->post();
		$data['phone'] = $post['phone'];
		$data['name'] = $post['name'];
		$data['user_name'] = $post['user_name'];
		$data['age'] = $post['age'];
		$data['sex'] = $post['sex'];
		$data['birth_time'] = $post['birth_time'];
		$data['speciality'] = $post['speciality'];
		$data['birth_time'] = $post['birth_time'];
		$data['professional'] = $post['professional'];
		$data['coach_said'] = $post['coach_said'];
		$data['url'] = $post['url'];
		$stores = Db::name('teacher_table')->where('id', $post['id'])->update($data);

		if ($stores) {
			$res['code'] = 200;
			$res['msg'] = "添加成功";
			$res['data'] = $stores;
		} else {
			$res['code'] = 200;
			$res['msg'] = "添加失败";
		}
		echo json_encode($res);
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
		if (Db::name('teacher_table')->where('id', $get['id'])->update(['status' => $get['status']]) !== false) {
			//记录日志
			//$this->add_log($this->userSession['id'],$this->userSession['username'],'更新ID:'.$get['id'].'账户状态');
			//  $this->success('更新成功');
			return json(array('code' => 200, 'msg' => '更新成功'));
		}
		// $this->error('更新失败');
		return json(array('code' => 0, 'msg' => '更新失败'));
	}

	/**
	 * 编辑基本信息  //非提交操作
	 * @return mixed
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-03-05 22:31
	 */
	public function edit($id = 0) {
		//获取用户id
		$id = $this->request->has('id') ? $this->request->param('id', 0, 'intval') : $id;
		if ($id == 0) {
			$this->error('id不能为空');
		}
		$user_info = Db::name('teacher_table')->where('id', $id)->find();
		$this->assign('user_info', $user_info);
		return $this->fetch();
	}

}