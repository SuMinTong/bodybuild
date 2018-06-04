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
use app\common\model\AuthRuleGroup;
use think\Db;
use think\facade\Session;

/**
 * 后台首页控制器类
 * +----------------------------------------------------------------------
 * Class Index
 * @package app\admin\controller
 * +----------------------------------------------------------------------
 * | author     :BabySeeME <417170808@qq.com>
 * +----------------------------------------------------------------------
 * | createTime :2018-04-27 20:29
 */
class Index extends AdminController {
	/**
	 * 后台首页渲染输出
	 * @return mixed
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-04-27 20:02
	 */
	public function index() {
		$menu = Db::name('AuthRule')->where(['status' => 1])->order('orders desc')->select();
		$RuleGroup = (new AuthRuleGroup())->where(['status' => 1])->order('orders desc')->select();
		//添加url
		foreach ($menu as $key => $value) {

			$menu[$key]['url'] = url($value['name']);
		}
		$menus = $this->menuList($menu);
		$this->assign('menus', $menus);
		$this->assign('menusGroup', $RuleGroup);
		//统计会员数
		$countUser = Db::name('user_table')->count();
		$this->assign('countUser', $countUser);

		$countArticle = Db::name('article_table')->count();
		$this->assign('countUser', $countArticle);
		//登录信息
		$this->assign('login', Session::get('adminUser'));

		return $this->fetch();
	}

	public function getTime() {
//		$data['begin_date'] = str_replace('-', '', $_POST['begin_date']);
//		$data['end_date'] = str_replace('-', '', $_POST['end_date']);
		$data['begin_date'] = '20170313';
		$data['end_date'] = '20170313';
		$access_token = $this->getAcctoken();
		$url = "https://api.weixin.qq.com/datacube/getweanalysisappiddailyvisittrend?access_token=" . $access_token;
		$headers=array(
			'Content-Type: application/json',
			'host:api.weixin.qq.com',
			'referer:https://servicewechat.com/'
		);
		
		$res = $this->http_request($url, $data,$headers);
//		echo json_encode($res);
		var_dump($res);
	}

	/**
	 * 默认欢迎页面
	 * @return mixed
	 * @company    :WuYuZhong Co. Ltd
	 * @author     :BabySeeME <417170808@qq.com>
	 * @createTime :2018-03-05 21:01
	 */
	public function welcome() {
		$this->addCss('admin/css/index');
		$this->addCss('admin/css/animate.css');
		//统计会员数
		$countUser = Db::name('user_table')->count();
		$this->assign('countUser', $countUser);
		//登录信息
		$this->assign('login', Session::get('adminUser'));
		return $this->fetch();
	}

	public function getAcctoken() {
		// https: //api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
		$url = 'https://api.weixin.qq.com/cgi-bin/token';
		$post_data['grant_type'] = 'client_credential';
		$post_data['appid'] = 'wx770424d62938425e';
		$post_data['secret'] = '9915014726219ec4d47cc973eb3353cf';
		$o = "";
		foreach ($post_data as $k => $v) {
			$o .= "$k=" . urlencode($v) . "&";
		}
		$post_data = substr($o, 0, -1);
		$res = $this->doGet($url . '?' . $post_data);
		$arr = json_decode($res, 1); // $str 代表json字符串
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
	
	function http_request($url,$data = null,$headers){
    $curl = curl_init();
    if( count($headers) >= 1 ){
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    }
    curl_setopt($curl, CURLOPT_URL, $url);

    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);

    if (!empty($data)){
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    }
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($curl);
    curl_close($curl);
    return $output;
}

	function request_post($url = '', $param = '') {
		if (empty($url) || empty($param)) {
			return false;
		}
		$postUrl = $url;
		$curlPost = $param;
		$curl = curl_init(); //初始化curl
		curl_setopt($curl, CURLOPT_URL, $postUrl); //抓取指定网页
		curl_setopt($curl, CURLOPT_HEADER, 0); //设置header
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); //要求结果为字符串且输出到屏幕上
		curl_setopt($curl, CURLOPT_POST, 1); //post提交方式
		curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
		$data = curl_exec($curl); //运行curl
		curl_close($curl);

		return $data;
	}

}
