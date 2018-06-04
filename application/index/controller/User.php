<?php
namespace app\index\controller;
use think\Db;

/**
 * 门店管理类
 */
class User {

	// function __construct(argument)
	// {
	// 	# code...
	// }
	// 会员注册

	public function addUser() {
		$data['phone'] = $_GET['phone'];
		$data['user_name'] = $_GET['user_name'];
		$data['nickname'] = $_GET['nickname'];
		$data['stature'] = $_GET['stature'];
		$data['weight'] = $_GET['weight'];
		$data['age'] = $_GET['age'];
		$data['sex'] = $_GET['sex'];
		$data['birth_time'] = $_GET['birth_time'];
		$data['pay_fees'] = 0;
		$data['status'] = 0;
		$data['url'] = $_GET['url'];
		$data['open_id'] = $_GET['open_id'];

		$stores = Db::name('user_table') -> insert($data);
		if ($stores) {
			$res['code'] = 200;
			$res['msg'] = '添加成功';
			$res['data'] = $stores;
		} else {
			$res['code'] = 201;
			$res['msg'] = '添加失败';
		}
		echo json_encode($res);
	}
	//模糊查询
	public function search()
	{
		$data=$_GET['data'];
 		$where =[
    		['phone | user_name | stature | weight | age | sex | nickname','like','%'.$data.'%']
		];
		$res=Db::name('user_table')->where($where)->select();
		var_dump($res);
	}

	public function getUserInfoByOpenId() {
		$res = Db::name('user_table') -> where('open_id', $_GET['open_id']) -> find();
		echo json_encode($res);
	}

	// 更新会员信息
	public function updateUser() {
		$data['phone'] = $_POST['phone'];
		$data['user_name'] = $_POST['user_name'];
		$data['nickname'] = $_POST['nickname'];
		$data['stature'] = $_POST['stature'];
		$data['weight'] = $_POST['weight'];
		$data['age'] = $_POST['age'];
		$data['sex'] = $_POST['sex'];
		$data['birth_time'] = $_POST['birth_time'];
		$data['pay_fees'] = $_POST['pay_fees'];
		$data['status'] = $_POST['status'];
		$data['url'] = $_POST['url'];

		$stores = Db::name('user_table') -> where('id', $_POST['id']) -> update($data);
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

	//获取用户总课程数
	public function getClassNumByUserId() {
		$data = Db::name('payment_table') -> where('user_id', $_GET['user_id']) -> sum('class_number');
		if ($data) {
			$res['code'] = 200;
			$res['msg'] = '成功';
			$res['data'] = $data;
		} else {
			$res['code'] = 201;
			$res['msg'] = '失败';
		}
		echo json_encode($res);
	}

	//获取用户剩余课程数
	public function remain() {

		$data = Db::name('payment_table') -> where('user_id', $_GET['user_id']) -> field('class_number,expire_time') -> select();
		for ($i = 0; $i < count($data); $i++) {
			$data[$i]['time1'] = strtotime($data[$i]['expire_time']) - strtotime(date("H:i:s"));
			if ($data[$i]['time1'] < 0) {
				$data[$i]['time1'] = 0;
			}
			//			$data[$i]['class_number']+=$data[$i]['class_number'];
		}
		echo json_encode($data);

	}
//通过用户id获取用户预约信息
	public function getCourseById() {
		$where['user_id']=$_GET['user_id'];
		$where['appoin_status']=1;
		
		$data = Db::name('payment_table') -> where($where) -> select();//通过user_id获取付款表
		for ($i=0; $i < count($data); $i++) {
			$data[$i]['course']= Db::name('course_table') -> where('id', $data[$i]['course_id']) -> select();//通过付款表中的课程表id获取课程信息
			$data[$i]['time']= Db::name('course_table') -> where('id', $data[$i]['course_id']) -> value('over_time');
			$data[$i]['date']= Db::name('course_table') -> where('id', $data[$i]['course_id']) -> value('on_date');
			$data[$i]['datetime']= $data[$i]['date'].' '.$data[$i]['time'];
			$data[$i]['strtotime'] = strtotime($data[$i]['datetime']);
			$data[$i]['nowtime'] = strtotime(date("H:i:s"));
			$data[$i]['difference'] = strtotime($data[$i]['datetime'])-strtotime(date("H:i:s"));
			$data[$i]['hour'] = $data[$i]['difference']/3600;
			$data[$i]['appoinTime']= Db::name('course_table') -> where('id', $data[$i]['course_id']) -> value('appoinTime');
			if($data[$i]['appoinTime']<$data[$i]['hour']){
				$data[$i]['isCancal']=1;
			}else {
				$data[$i]['isCancal']=0;
			}
		}
		if ($data) {
			$res['code'] = 200;
			$res['msg'] = '成功';
			$res['data'] = $data;
		} else {
			$res['code'] = 201;
			$res['msg'] = '失败';
		}
		echo json_encode($res);

	}

}
?>