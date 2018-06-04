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
 * | createTime :2018/3/5 00059:20
 * +----------------------------------------------------------------------
 */

namespace app\admin\controller;

use app\admin\validate\AdminUser as AdminUserValidate;
use app\common\controller\AdminController;
use app\common\model\AdminUser as AdminUserModel;
use app\common\model\AuthGroup as AuthGroupModel;
use think\Db;
use think\Request;

/**
 * 后台管理员控制器类
 * +----------------------------------------------------------------------
 * Class AdminUser
 * @package app\admin\controller
 * +----------------------------------------------------------------------
 * | author     :BabySeeME <417170808@qq.com>
 * +----------------------------------------------------------------------
 * | createTime :2018-04-27 20:26
 */
class User extends AdminController {

	/**
	 * 渲染输出管理员列表
	 * @return mixed
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-03-05 13:19
	 */

	public function _list() {
		$res = Db::name('user_table')->select();
		$this->assign('user_list', $res);
		return $this->fetch();

	}
	// 会员订单管理

	public function order() {
		$res = Db::name('payment_table')->select(); //获取订单表里面的信息

		for ($i = 0; $i < count($res); $i++) {
			$res[$i]['user_name'] = Db::name('user_table')->where('id', $res[$i]['user_id'])->value('user_name'); //通过订单表中的用户id获取用户表中的用户名
			$res[$i]['course_name'] = Db::name('course_table')->where('id', $res[$i]['course_id'])->value('course_name'); //通过订单表中的用户id获取课程表中的课程名

			$res[$i]['start_time'] = Db::name('course_table')->where('id', $res[$i]['course_id'])->value('start_time'); //通过订单表中的用户id获取课程表中的开始时间
			$res[$i]['on_date'] = Db::name('course_table')->where('id', $res[$i]['course_id'])->value('on_date'); //通过订单表中的用户id获取课程表中的日期
			$res[$i]['time'] = strtotime($res[$i]['on_date'] . ' ' . $res[$i]['start_time']); //将课程所在的日期和时间转化为时间戳
			$time = time(); //获取当前时间的时间戳
			$res[$i]['timediff'] = $this->timediff($res[$i]['time'], $time); //计算两个时间戳之间相差的日时分秒

			$res[$i]['appoinTime'] = Db::name('course_table')->where('id', $res[$i]['course_id'])->value('appoinTime'); //通过课程表获取课程表中的可取消时间

			if ($res[$i]['timediff']['day'] >= 0 && $res[$i]['timediff']['hour'] > $res[$i]['appoinTime']) {
				//判断开始时间和当前时间的大小
				$res[$i]['isCancel'] = 1;
			} else {
				$res[$i]['isCancel'] = 0;
			}
		}
		$this->assign('order_list', $res);
		return $this->fetch();
	}
	//功能：计算两个时间戳之间相差的日时分秒
	//$begin_time  开始时间戳
	//$end_time 结束时间戳
	function timediff($begin_time, $end_time) {
		if ($begin_time < $end_time) {
			$starttime = $begin_time;
			$endtime = $end_time;
		} else {
			$starttime = $end_time;
			$endtime = $begin_time;
		}

		//计算天数
		$timediff = $endtime - $starttime;
		$days = intval($timediff / 86400);
		//计算小时数
		$remain = $timediff % 86400;
		$hours = intval($remain / 3600);
		//计算分钟数
		$remain = $remain % 3600;
		$mins = intval($remain / 60);
		//计算秒数
		$secs = $remain % 60;
		$res = array("day" => $days, "hour" => $hours, "min" => $mins, "sec" => $secs);
		return $res;
	}

	// 预约订单管理

	public function appointment() {
		$res = Db::name('payment_table')->select();
		return $this->fetch();

	}

	// 给用户添加课程（非提交）
	public function addOrder() {
		$id = $this->request->has('id') ? $this->request->param('id', 0, 'intval') : $id;
		if ($id == 0) {
			$this->error('id不能为空');
		}
		$user_info = Db::name('user_table')->where('id', $id)->find();
		$course_info = Db::name('course_table')->select();
		$this->assign('user_info', $user_info);
		$this->assign('course_info', $course_info);

		return $this->fetch('userOrder');
	}
	//添加课程（提交）
	public function setUserOrder() {
		$post = $this->request->post();
		$data['user_id'] = $post['id'];
		$data['class_number'] = $post['class_number'];
		$data['expire_time'] = $post['expire_time'];
		$data['payment_time'] = date("Y-m-d H:i:s");
		$data['course_id'] = $post['course_id'];
		$data['status'] = 1;
		$pay_fees['pay_fees'] = 1;

		Db::name('user_table')->where('id', $post['id'])->update($pay_fees);

		$order = Db::name('payment_table')->insert($data);

		if ($order) {
			$res['code'] = 200;
			$res['msg'] = '添加成功';
			$res['data'] = $order;
		} else {
			$res['code'] = 201;
			$res['msg'] = '添加失败';
			$res['url'] = $order;
		}
		exit(json_encode($res));

	}

	/**
	 * 更新用户状态
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
		if (Db::name('user_table')->where('id', $get['id'])->update(['status' => $get['status']]) !== false) {
			//记录日志
			//$this->add_log($this->userSession['id'],$this->userSession['username'],'更新ID:'.$get['id'].'账户状态');
			//  $this->success('更新成功');
			return json(array('code' => 200, 'msg' => '更新成功'));
		}
		// $this->error('更新失败');
		return json(array('code' => 0, 'msg' => '更新失败'));
	}
	/**
	 * 更新用户缴费状态
	 * @return \think\response\Json
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-03-05 15:33
	 */
	public function update_pay_fees() {
		if ($this->request->isGet() == false) {
			return json(array('code' => 0, 'msg' => '更新失败'));
		}
		$get = $this->request->get();
		if (Db::name('user_table')->where('id', $get['id'])->update(['pay_fees' => $get['status']]) !== false) {
			return json(array('code' => 200, 'msg' => '更新成功'));
		}
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
			$this->error('id不正能为空');
		}
		$user_info = Db::name('user_table')->where('id', $id)->find();
		$this->assign('user_info', $user_info);
		return $this->fetch();
	}
// 更新用户信息
	public function updateUserInfo() {
		$post = $this->request->post();
		$data['phone'] = $post['phone'];
		$data['user_name'] = $post['user_name'];
		$data['nickname'] = $post['nickname'];
		$data['stature'] = $post['stature'];
		$data['weight'] = $post['weight'];
		$data['age'] = $post['age'];
		$data['sex'] = $post['sex'];
		$data['birth_time'] = $post['birth_time'];
		$data['pay_fees'] = $post['pay_fees'];
		$data['status'] = $post['status'];
		$data['url'] = $post['url'];

		$stores = Db::name('user_table')->where('id', $post['id'])->update($data);
		if ($stores) {
			$res['code'] = 200;
			$res['msg'] = '修改成功';
			$res['data'] = $stores;
		} else {
			$res['code'] = 201;
			$res['msg'] = '修改失败';
		}
		echo json_encode($res);
	}

	/**
	 * 修改密码
	 * @return mixed
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-03-05 21:10
	 */
	public function edit_password() {
		//获取管理员登录id
		$adminUser = $this->userSession;
		$id = $adminUser['id'];
		//修改操作
		$this->assign('id', $id);
		return $this->fetch();
	}

	/**
	 * 提交更新密码
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-04-27 19:53
	 */
	public function update_password() {
		$adminUser = $this->userSession;
		$id = $adminUser['id'];
		if ($this->request->isPost()) {
			//是提交操作
			$post = $this->request->post();
			//验证部分数据合法性
			$is_Check = (new AdminUserValidate())->goCheck($post);
			if ($is_Check !== true) {
				$this->error('提交失败：' . $is_Check);
			}
			//实例化管理员模型
			$model = new AdminUserModel();
			//验证密码
			$user = $model->where('id', $post['id'])->find();
			if ($user['password'] != passwordMD5($post['password_old'], $user['salt'])) {
				$this->error('密码错误');
			}
			$log['user_id'] = $id;
			$log['is_admin'] = 1;
			$log['field'] = 'password';
			$log['value'] = $post['password_old'];
//            if( empty((new LogEditModel())->save($log))){
			//                $this->error('修改失败,系统错误');
			//            }
			$data['password'] = passwordMD5($post['password_new'], $user['salt']);
			if (false == $model->allowField(true)->save($data, ['id' => $id])) {
				$this->error('修改失败');
			}
			//记录日志
			//$this->add_log($this->userSession['id'],$this->userSession['username'],'将原密码'.$post['password_old'].'修改了');
			$this->success('修改管理员信息成功', 'admin/index/welcome');
		}
		$this->error('修改失败:非法提交！');
	}

	/**
	 * 根据昵称获取加盐值 保证昵称数据唯一性
	 * @param $nickname
	 * @return mixed
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-03-05 16:14
	 */
	public function set_saltByNick($nickname) {
		$return['salt'] = getRandStr(6);
		$return['nickname'] = $nickname . '_' . $return['salt'];
		//实例化管理员模型
		$model = new AdminUserModel();
		//验证昵称是否存在
		$nickname = $model->where('nickname', $return['nickname'])->select();
		if (!$nickname->isEmpty()) {
			$this->set_saltByNick($nickname);
		}
		return $return;
	}

	/**
	 * 添加新用户
	 * @return mixed
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-03-05 22:32
	 */
	public function add() {
		return $this->fetch();
	}

	public function save() {
		//是新增操作
		if ($this->request->isPost()) {
			//实例化管理员模型
			$model = new AdminUserModel();
			//是提交操作
			$post = $this->request->post();
			//验证部分数据合法性
			$is_Check = (new AdminUserValidate())->goCheck($post);
			if ($is_Check !== true) {
				$this->error('提交失败：' . $is_Check);
			}
			//验证用户名是否存在
			$name = $model->where('username', $post['username'])->select();
			if (!$name->isEmpty()) {
				$this->error('提交失败：该用户名已被注册');
			}
			$set_nickAndSalt = $this->set_saltByNick($post['nickname']);
			$post['salt'] = $set_nickAndSalt['salt'];
			$post['nickname'] = $set_nickAndSalt['nickname'];
			//验证邮箱是否存在
			$email = $model->where(['email' => $post['email']])->select();
			if (!$email->isEmpty()) {
				$this->error('提交失败：该邮箱已被占用');
			}
			//验证电话是否存在
			$phone = $model->where(['phone' => $post['phone']])->select();
			if (!$phone->isEmpty()) {
				$this->error('提交失败：该电话已被占用');
			}
			//密码处理
			$post['password'] = passwordMD5($post['password'], $post['salt']);
			if (false == $model->allowField(true)->save($post)) {

				$this->error('添加管理员失败');
			} else {
				//记录日志
				//$this->add_log($this->userSession['id'],$this->userSession['username'],'添加用户:'.$post['username']);
				$this->success('添加管理员成功', 'admin/admin_user/_list');
			}
		} else {
			$this->error('添加管理员失败:非法提交！');
		}
	}

	public function update() {
		//是修改操作
		if ($this->request->isPost()) {
			//实例化管理员模型
			$model = new AdminUserModel();
			//是提交操作
			$post = $this->request->post();
			//验证部分数据合法性
			$is_Check = (new AdminUserValidate())->goCheck($post);
			if ($is_Check !== true) {
				$this->error('提交失败：' . $is_Check);
			}
			if (false == $model->allowField(true)->save($post, ['id' => $post['id']])) {
				$this->error('修改失败');
			} else {
				//记录日志
				//$this->add_log($this->userSession['id'],$this->userSession['username'],'修改了基本账户信息');
				$this->success('修改账户信息成功', 'admin/admin_user/_list');
			}
		} else {
			$this->error('修改失败:非法提交！');
		}
	}

	/**
	 * 删除用户账户（屏蔽）
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-03-05 17:56
	 */
	public function delete() {
		if ($this->request->isAjax()) {
			$post = $this->request->param();
			$is_delete = (new AdminUserModel())->where('id', $post['id'])->value('is_delete');
			if ($is_delete == 0) {
				if (true == (new AdminUserModel())->where('id', $post['id'])->update(['is_delete' => 1])) {
					//记录日志
					//$this->add_log($this->userSession['id'],$this->userSession['username'],'删除ID:'.$post['id'].'账户');
					$this->success('删除成功', 'admin/admin_user/_list');
				}
			}
			$this->error('删除失败');
		}
	}

	/**
	 * 批量更新 启用账户
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-03-05 15:55
	 */
	public function enable() {
		if ($this->request->isPost()) {
			$post = $this->request->post();
			$i = 0;
			foreach ($post['user_id'] as $k => $val) {
				$status = (new AdminUserModel())->where('id', $val)->value('status');
				if ($status == 0) {
					if (false == (new AdminUserModel())->where('id', $val)->update(['status' => 1])) {
						$this->error('更新失败');
					} else {
						$i++;
					}
				}
			}
			//记录日志
			//$this->add_log($this->userSession['id'],$this->userSession['username'],'批量启用ID账户【'.implode(',',$post['user_id']).'】');
			$this->success('更新成功，启用' . $i . '个账户', 'admin/admin_user/_list');
		}
	}

	/**
	 * 批量更新 禁用账户
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-03-05 16:00
	 */
	public function prohibit() {
		if ($this->request->isPost()) {
			$post = $this->request->post();
			$i = 0;
			foreach ($post['user_id'] as $k => $val) {
				$status = (new AdminUserModel())->where('id', $val)->value('status');
				if ($status == 1) {
					if (false == (new AdminUserModel())->where('id', $val)->update(['status' => 0])) {
						$this->error('更新失败');
					} else {
						$i++;
					}
				}
			}
			//记录日志
			//$this->add_log($this->userSession['id'],$this->userSession['username'],'批量禁用ID账户【'.implode(',',$post['user_id']).'】');
			$this->success('更新成功，禁用' . $i . '个账户', 'admin/admin_user/_list');
		}
	}

	/**
	 * 批量更新 删除账户
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-03-05 16:06
	 */
	public function delete_all() {
		if ($this->request->isPost()) {
			$post = $this->request->post();
			$i = 0;
			foreach ($post['user_id'] as $k => $val) {
				$is_delete = (new AdminUserModel())->where('id', $val)->value('is_delete');
				if ($is_delete == 0) {
					if (false == (new AdminUserModel())->where('id', $val)->update(['is_delete' => 1])) {
						$this->error('更新失败');
					} else {
						$i++;
					}
				}
			}
			//记录日志
			//$this->add_log($this->userSession['id'],$this->userSession['username'],'批量删除ID账户【'.implode(',',$post['user_id']).'】');
			$this->success('更新成功，删除' . $i . '个账户', 'admin/admin_user/_list');
		}
	}

	/**
	 * 批量更新 重置账户密码 123456
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-03-05 16:29
	 */
	public function reset_password() {
		if ($this->request->isPost()) {
			$post = $this->request->post();
			$i = 0;
			$model = new AdminUserModel();
			foreach ($post['user_id'] as $k => $val) {
				$userInfo = $model->where('id', $val)->find();
				$saveInfo = $this->set_saltByNick($userInfo['nickname']);
				//密码处理
				$saveInfo['password'] = passwordMD5($this->andConfig['default_password'], $saveInfo['salt']);
				if (false == $model->allowField(true)->save($saveInfo, ['id' => $val])) {
					$this->error('更新失败');
				} else {
					$i++;
				}
			}
			//记录日志
			//$this->add_log($this->userSession['id'],$this->userSession['username'],'批量重置密码【'.$this->andConfig['default_password'].'】ID账户：'.implode(',',$post['user_id']));
			$this->success('更新成功，重置' . $i . '个账户密码:' . $this->andConfig['default_password'], 'admin/admin_user/_list');
		}
	}

	/**
	 * 更新用户角色组
	 * @return mixed
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-03-05 22:30
	 */
	public function edit_roles() {
		//获取角色id
		$id = $this->request->has('id') ? $this->request->param('id', 0, 'intval') : 0;
		$model = new AdminUserModel();
		//是修改操作
		if ($this->request->isPost()) {
			//是提交操作
			$post = $this->request->post();
			if (false == $model->saveRolesByID($id, $post['roles'])) {
				$this->error('修改规则失败');
			} else {
				//记录日志
				//$this->add_log($this->userSession['id'],$this->userSession['username'],'更新了'.$model->where(['id'=>$id])->value('username').'的角色');
				$this->success('修改规则信息成功', 'admin/admin_user/_list');
			}
		} else {
			if ($id == 0) {
				$this->error('id不能为空');
			}
			//非提交操作

			// 获取用户的所有角色
			$roles = $model->with('roles')->find(['id' => $id]);
			$user_roles = array();
			foreach ($roles['roles'] as $key => $role) {
				// 输出用户的角色名
				$user_roles[] = $role->id;
			}
			$this->assign('user_roles', $user_roles);
			$model = new AuthGroupModel();
			$role_group = $model->where(['status' => 1])->select();
			$this->assign('role_group', $role_group);
			$this->assign('username', $roles);
		}
		return $this->fetch();
	}
}