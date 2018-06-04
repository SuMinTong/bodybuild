<?php
namespace app\index\controller;
use think\Db;

/**
 * 门店管理类
 */
class Course {

	// 显示时间以及星期

	public function getTime() {
		for ($i = 0; $i < 7; $i++) {
			$dateArray[$i] = date('Y-m-d', strtotime(date('Y-m-d') . '+' . $i . 'day'));
		};
		$b = array();
		foreach ($dateArray as $key => $value) {
			$b[] = array('id' => $key, 'date' => $value);
		};
		foreach ($b as $k => $v) {
			$b[$k]['week'] = $this -> get_week($v['date']);
			$b[$k]['date'] = str_replace('-', '.', substr($v['date'], 5));
		}
		echo json_encode($b);
	}

	function get_week($date) {
		$date_str = date('Y-m-d', strtotime($date));
		$arr = explode("-", $date_str);
		$year = $arr[0];
		$month = sprintf('%02d', $arr[1]);
		$day = sprintf('%02d', $arr[2]);
		$hour = $minute = $second = 0;
		$strap = mktime($hour, $minute, $second, $month, $day, $year);
		$number_wk = date("w", $strap);
		$weekArr = array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
		return $weekArr[$number_wk];
	}

	// 通过门店id和星期查询课程
	public function getCourseById() {
		$where['on_week'] = $_GET['on_week'];
		$where['store_id'] = $_GET['store_id'];
		$res = Db::name('course_table') -> where($where) -> select();
		for ($i = 0; $i < count($res); $i++) {
			$res[$i]['date_time'] = $res[$i]['on_date'] . ' ' . $res[$i]['over_time'];
			$res[$i]['difference'] = strtotime($res[$i]['date_time']) - strtotime(date("H:i:s"));
			$res[$i]['hour'] = $res[$i]['difference'] / 3600;

			if ($res[$i]['appoinTime'] < $res[$i]['hour']) {
				$res[$i]['isCancal'] = 1;
			} else {
				$res[$i]['isCancal'] = 0;
			}
		}
		if (!$res) {
			$data['code'] = 201;
			$data['msg'] = "请求出错";
			$data['data'] = '';
		} else {
			$data['code'] = 200;
			$data['msg'] = "请求成功";
			$data['data'] = $res;
		}
		exit(json_encode($data));
	}

	// 通过课程id获取课程详情
	public function getCourseByCourseId() {
		$res = Db::name('course_table') -> where('id', $_GET['course_id']) -> find();
		$res['speciality'] = Db::name('teacher_table') -> where('id', $res['teacher_id']) -> value('speciality');

		$res['professional'] = Db::name('teacher_table') -> where('id', $res['teacher_id']) -> value('professional');
		$res['coach_said'] = Db::name('teacher_table') -> where('id', $res['teacher_id']) -> value('coach_said');
		if (!$res) {
			$data['code'] = 201;
			$data['msg'] = "请求出错";
			$data['data'] = '';
		} else {
			$data['code'] = 200;
			$data['msg'] = "请求成功";
			$data['data'] = $res;
		}
		exit(json_encode($data));
	}

	// 用户预约课程

	public function appiontTime() {
		$data['user_id'] = $_GET['user_id'];
		$data['course_id'] = $_GET['course_id'];
		$data['status'] = 0;
		$data['appoin_status'] = 1;
		$courseNum['now_class_num'] = Db::name('course_table') -> where('id', $data['course_id']) -> value('now_class_num');
		// echo $now_class_number;
		$courseNum['now_class_num'] += 1;
		$course = Db::name('course_table') -> where('id', $data['course_id']) -> update($courseNum);
		$res = Db::name('payment_table') -> insert($data);
		if (!$res) {
			$data['code'] = 201;
			$data['msg'] = "预约出错";
			$data['data'] = '';
		} else {
			$data['code'] = 200;
			$data['msg'] = "预约成功";
			$data['data'] = $res;
		}
		exit(json_encode($data));
	}

	//用户取消预约
	public function cancalAppiont() {
		$data['user_id'] = $_GET['user_id'];
		$data['course_id'] = $_GET['course_id'];
		$courseNum['now_class_num'] = Db::name('course_table') -> where('id', $data['course_id']) -> value('now_class_num');
		$courseNum['now_class_num'] -= 1;
		$appoin_status['appoin_status'] = 0;
		$course = Db::name('course_table') -> where('id', $data['course_id']) -> update($courseNum);
		//课程表当前预约人数减一
		$payment = Db::name('payment_table') -> where('course_id', $data['course_id']) -> update($appoin_status);
		//课程表当前预约人数减一
		if ($course && $payment) {
			$res['code'] = 200;
			$res['msg'] = '取消成功';
			$res['data'] = '1';
		} else {
			$res['code'] = 201;
			$res['msg'] = '取消失败';
			$res['data'] = '0';
		}
		echo json_encode($res);
	}

}
?>