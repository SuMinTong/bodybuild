<?php
namespace app\index\controller;
use think\Db;
use think\facade\Session;

class Send {
	
	public function index()
	{
		echo "132123";
		
	}
	
	public function sendMessage() {
		$formid = $_GET['formID'];
		$openid = $_GET['openid'];
		$access_token = $this->getAcctoken();
		$data_arr = array('keyword1' => array("value" => '132546546', "color" => '#f00')
		//这里根据你的模板对应的关键字建立数组，color 属性是可选项目，用来改变对应字段的颜色
		);
		$post_data = array("touser" => $openid,
		//用户的 openID，可用过 wx.getUserInfo 获取
		"template_id" => '6vmlhcxCXlb1sdfvOBC3FQZlNCuVBndFU9ziPctNirs',
		//小程序后台申请到的模板编号
		"form_id" => $formid,
		//第一步里获取到的 formID
		"data" => $data_arr
		//需要强调的关键字，会加大居中显示
		);
		$url = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" . $access_token;
		//这里替换为你的 appID 和 appSecret
		$data = json_encode($post_data, true);
		//将数组编码为 JSON

		$return = $this->request_post($url, $data);
		echo $return;
	}

	function send_post($url, $post_data) {
		$options = array('http' => array('method' => 'POST', 'header' => 'Content-type:application/json',
		//header 需要设置为 JSON
		'content' => $post_data, 'timeout' => 60
		//超时时间
		));

		$context = stream_context_create($options);
		$result = file_get_contents($url, false, $context);

		return $result;
	}

	function getAcctoken() {
		// https: //api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
		$url = 'https://api.weixin.qq.com/cgi-bin/token';
		$post_data['grant_type'] = 'client_credential';
		$post_data['appid'] = 'wx486aedcd94e3c722';
		$post_data['secret'] = 'acd7b22cc1a39ff9db024a41d19849c9';
		$o = "";
		foreach ($post_data as $k => $v) {
			$o .= "$k=" . urlencode($v) . "&";
		}
		$post_data = substr($o, 0, -1);
		$res = $this -> doGet($url . '?' . $post_data);
		$arr = json_decode($res, 1);
		// $str 代表json字符串
		//		Session::delete('access_token');
		Session::set('access_token', $arr['access_token']);
		return $arr['access_token'];
	}

	public function doGet($url) {
		//初始化
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $url);
		// 执行后不直接打印出来
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HEADER, false);
		// 跳过证书检查
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		// 不从证书中检查SSL加密算法是否存在
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

		//执行并获取HTML文档内容
		$output = curl_exec($ch);

		//释放curl句柄
		curl_close($ch);

		return $output;
	}

	function request_post($url = '', $param = '') {
		if (empty($url) || empty($param)) {
			return false;
		}

		$postUrl = $url;
		$curlPost = $param;
		$curl = curl_init();
		//初始化curl
		curl_setopt($curl, CURLOPT_URL, $postUrl);
		//抓取指定网页
		curl_setopt($curl, CURLOPT_HEADER, 0);
		//设置header
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		//要求结果为字符串且输出到屏幕上
		curl_setopt($curl, CURLOPT_POST, 1);
		//post提交方式
		curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
		$data = curl_exec($curl);
		//运行curl
		curl_close($curl);

		return $data;
	}
}
