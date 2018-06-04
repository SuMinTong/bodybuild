<?php
namespace app\index\controller;
use think\Db;

/**
 * 门店管理类
 */
class Teacher {

// 通过老师id查看老师详情
	public function getTeacherById() {
		$teacher = Db::name('teacher_table')->where('id', $_GET['id'])->find();
		if (!$teacher) {
			$res['code'] = 0;
			$res['msg'] = 'fail';
			$res['data'] = '';
		} else {
			$res['code'] = 1;
			$res['msg'] = 'success';
			$res['data'] = $teacher;
		}
		echo json_encode($res);
	}

}

?>