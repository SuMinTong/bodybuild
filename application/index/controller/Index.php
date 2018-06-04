<?php
namespace app\index\controller;
use think\Db;

class Index {
	public function index() {
		$user = Db::table('user_table') -> where('id', 1) -> find();
		$data['code'] = 1;
		$data['data'] = $user;
		// var_dump($user);
		echo json_encode($data);

	}

	public function hello() {
		$stores = Db::name('store_table') -> select();
		if (!$stores) {
			$this -> error('message');
		}
		$res['code'] = 2;
		$res['msg'] = 'success';
		$res['data'] = $stores;
		echo json_encode($res);
	}

	public function getWeekDate() {
		for ($i = 0; $i < 7; $i++) {
			$dateArray[$i] = date('Y-m-d', strtotime(date('Y-m-d') . '+' . $i . 'day'));
		};
		$b = array();
		foreach ($dateArray as $key => $value) {
			$b[] = array('id' => $key, 'date' => $value);
		};
		foreach ($b as $k => $v) {
			$b[$k]['week'] = $this -> get_week($v['date']);
			$b[$k]['date'] = str_replace('-','.',substr($v['date'], 5));
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

}
