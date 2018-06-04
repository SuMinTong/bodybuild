<?php

namespace app\admin\controller;
use think\Controller;
use think\File;
use think\Request;

/**
 * 上传控制器
 * +----------------------------------------------------------------------
 * Class SystemConfig
 * @package app\admin\controller
 * +----------------------------------------------------------------------
 * | author     :BabySeeME <417170808@qq.com>
 * +----------------------------------------------------------------------
 * | createTime :2018-03-04 14:08
 */

class Upload extends controller {
	//商品分类手机小图标上传
	public function upload() {
		// 获取表单上传文件 例如上传了001.jpg
		$file = request()->file('file');
		// 移动到框架应用根目录/public/uploads/ 目录下
		if ($file) {
			$info = $file->move(ROOT_PATH . 'public/uploads/store/');
			if ($info) {
				$res = $info->getSaveName();
				$data['code'] = 200;
				$data['path'] = '/uploads/store/' . $res;
				echo json_encode($data);
			}
		}
	}

	//layui编辑器图片上传接口
	public function lay_img_upload() {
		$file = Request::instance()->file('file');
		if (empty($file)) {
			$result["code"] = "1";
			$result["msg"] = "请选择图片";
			$result['data']["src"] = '';
		} else {
			// 移动到框架应用根目录/public/uploads/ 目录下
			$info = $file->move(ROOT_PATH . 'public' . DS . 'uploads/layui');
			if ($info) {
				$name_path = str_replace('\\', "/", $info->getSaveName());
				//成功上传后 获取上传信息
				$result["code"] = '0';
				$result["msg"] = "上传成功";
				$result['data']["src"] = "/uploads/layui/" . $name_path;
			} else {
				// 上传失败获取错误信息
				$result["code"] = "2";
				$result["msg"] = "上传出错";
				$result['data']["src"] = '';
			}

		}

		return json_encode($result);
	}
}

?>