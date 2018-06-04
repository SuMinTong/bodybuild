<?php
/**
 * | AndPHP框架[基于ThinkPHP5开发]
 * +----------------------------------------------------------------------
 * | Copyright (c) 2017-2019 http://www.andphp.com
 * +----------------------------------------------------------------------
 * | AndPHP承诺基础框架永久免费开源，您可用于学习和商用，但必须保留软件版权信息。
 * +----------------------------------------------------------------------
 * | author    :BabySeeME <417170808@qq.com>
 * +----------------------------------------------------------------------
 * | createTime :2018/4/19 001915:31
 * +----------------------------------------------------------------------
 */

namespace app\admin\controller;

use app\common\controller\AdminController;
use think\Db;
use think\Request;

/**
 * 课程管理控制器类
 * +----------------------------------------------------------------------
 * Class Index
 * @package app\admin\controller
 * +----------------------------------------------------------------------
 * | author     :BabySeeME <417170808@qq.com>
 * +----------------------------------------------------------------------
 * | createTime :2018-04-27 20:29
 */
class Course extends AdminController {

	// 添加课程   非提交操作
	public function addCourse() {
		$store = Db::name('store_table')->field('store_name,id')->select();
		$teacher = Db::name('teacher_table')->field('name,id')->select();
		$data['store'] = $store;
		$data['teacher'] = $teacher;
		$this->assign('store', $store);
		$this->assign('teacher', $teacher);
		return $this->fetch('add');

	}

	public function save_course() {
		$post = $this->request->post();
		$data['store_id'] = $post['store_id'];
		$data['teacher_id'] = $post['teacher_id'];
		$data['class_number'] = $post['class_number'];
		$data['course_name'] = $post['course_name'];
		$data['course_describe'] = $post['course_describe'];
		$data['start_time'] = $post['start_time'];
		$data['over_time'] = $post['over_time'];
		$data['notice_matter'] = $post['notice_matter'];
		$data['luggage'] = $post['luggage'];
		$data['class_fee'] = $post['class_fee'];
		$data['on_date'] = $post['on_date'];
		$data['on_week'] = $post['on_week'];
		$data['boundary_moment'] = $post['boundary_moment'];
		$data['url'] = $post['url'];
		$data['swiper'] = $post['swiper'];
		$data['status'] = 1;
		$data['appoinTime'] = $post['appoinTime'];
		$data['now_class_num'] = 0;
		$data['calorie'] = $post['calorie'];
		$data['muscular_strength'] = $post['muscular_strength'];
		$data['muscular_endurance'] = $post['muscular_endurance'];
		$data['harmony'] = $post['harmony'];
		$data['cardiopulmonary'] = $post['cardiopulmonary'];
		$data['suppleness'] = $post['suppleness'];
		$data['degree'] = $post['degree'];
		$course = Db::name('course_table')->insert($data);
		if ($course) {
			$res['code'] = 200;
			$res['msg'] = '添加成功';
			$res['data'] = $course;
		} else {
			$res['code'] = 201;
			$res['msg'] = '添加失败';
		}
		
		exit(json_encode($res));
	}

// 课程列表
	public function courseList() {
		$result = Db::name('course_table')->select();
		for ($i = 0; $i < Db::name('course_table')->count(); $i++) {
			$res = Db::name('course_table')->where('status', 1)->field('teacher_id')->select();
			$result[$i]['teacher_name'] = Db::name('teacher_table')->where('id', $res[$i]['teacher_id'])->value('name');

			$res = Db::name('course_table')->where('status', 1)->field('store_id')->select();
			$result[$i]['store_name'] = Db::name('store_table')->where('id', $res[$i]['store_id'])->value('store_name');

			$result[$i]['swiper'] = explode(",", $result[$i]['swiper']);
		}

		$this->assign('course_list', $result);
		return $this->fetch();
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
		if (Db::name('course_table')->where('id', $get['id'])->update(['status' => $get['status']]) !== false) {
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
		$user_info = Db::name('course_table')->where('id', $id)->find();
		$this->assign('user_info', $user_info);
		return $this->fetch();
	}
	// 修改预约时间
	public function editAppiontTime() {
		$post = $this->request->post();

		$data['appoinTime'] = $post['appoinTime'];
		$course = Db::name('course_table')->where('id', $post['id'])->update($data);
		if ($course) {
			$res['code'] = 200;
			$res['msg'] = '修改成功';
			$res['data'] = $course;
		} else {
			$res['code'] = 201;
			$res['msg'] = '修改失败';
		}
		echo json_encode($res);
	}

	public function edit_course() {
		$post = $this->request->post();
		$data['store_id'] = $post['store_id'];
		$data['teacher_id'] = $post['teacher_id'];
		$data['class_number'] = $post['class_number'];
		$data['course_name'] = $post['course_name'];
		$data['course_describe'] = $post['course_describe'];
		$data['start_time'] = $post['start_time'];
		$data['over_time'] = $post['over_time'];
		$data['notice_matter'] = $post['notice_matter'];
		$data['luggage'] = $post['luggage'];
		$data['class_fee'] = $post['class_fee'];
		$data['on_date'] = $post['on_date'];
		$data['on_week'] = $post['on_week'];
		$data['boundary_moment'] = $post['boundary_moment'];
		$data['now_class_num'] = 0;
		$data['appoinTime'] = $post['appoinTime'];

		$data['calorie'] = $post['calorie'];
		$data['muscular_strength'] = $post['muscular_strength'];
		$data['muscular_endurance'] = $post['muscular_endurance'];
		$data['harmony'] = $post['harmony'];
		$data['cardiopulmonary'] = $post['cardiopulmonary'];
		$data['suppleness'] = $post['suppleness'];
		$data['degree'] = $post['degree'];
		$course = Db::name('course_table')->where('id', $post['id'])->update($data);
		if ($course) {
			$res['code'] = 200;
			$res['msg'] = '修改成功';
			$res['data'] = $course;
		} else {
			$res['code'] = 201;
			$res['msg'] = '修改失败';
		}
		exit(json_encode($res));
	}

}