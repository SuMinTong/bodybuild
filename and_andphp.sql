-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2018-05-31 08:42:33
-- 服务器版本： 5.7.14
-- PHP Version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `and_andphp`
--

-- --------------------------------------------------------

--
-- 表的结构 `and_admin_user`
--

CREATE TABLE `and_admin_user` (
  `id` int(11) NOT NULL,
  `username` varchar(15) NOT NULL DEFAULT '' COMMENT '用户名，登陆使用',
  `nickname` varchar(15) NOT NULL DEFAULT '' COMMENT '管理员昵称',
  `email` varchar(32) NOT NULL DEFAULT '' COMMENT '电子邮箱，登陆使用',
  `phone` char(11) NOT NULL DEFAULT '0' COMMENT '手机号码，登陆使用',
  `password` varchar(32) NOT NULL DEFAULT 'e10adc3949ba59abbe56e057f20f883e' COMMENT '用户密码',
  `thumb` int(10) NOT NULL DEFAULT '0' COMMENT '管理员头像',
  `login_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '登陆状态,0:pc,1:app',
  `login_code` varchar(32) NOT NULL DEFAULT '0' COMMENT '排他性登陆标识,token',
  `last_login_ip` varchar(16) NOT NULL DEFAULT '0' COMMENT '最后登录IP',
  `last_login_time` int(11) NOT NULL DEFAULT '0' COMMENT '最后登录时间',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态：1启用，0禁用',
  `is_delete` tinyint(1) NOT NULL DEFAULT '0' COMMENT '删除状态:0正常,1已删除',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `salt` char(6) NOT NULL DEFAULT '0' COMMENT '密码加盐处理'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `and_admin_user`
--

INSERT INTO `and_admin_user` (`id`, `username`, `nickname`, `email`, `phone`, `password`, `thumb`, `login_status`, `login_code`, `last_login_ip`, `last_login_time`, `status`, `is_delete`, `create_time`, `salt`) VALUES
(1, 'admin', 'admin_er3zS1', 'admin@admin.com', '0', '663d544753d0ec55dfab6b9642120f6c', 0, 0, '0', '127.0.0.1', 1527736081, 1, 0, 1526877896, '5TloY5'),
(2, 'root', 'root_5TloY5', '1271735991@qq.com', '15253165511', '663d544753d0ec55dfab6b9642120f6c', 0, 0, '0', '127.0.0.1', 1527482598, 1, 0, 1526880469, '5TloY5');

-- --------------------------------------------------------

--
-- 表的结构 `and_article_table`
--

CREATE TABLE `and_article_table` (
  `id` int(11) NOT NULL,
  `keywords` varchar(255) NOT NULL COMMENT '关键字',
  `title` varchar(255) NOT NULL COMMENT '文章标题',
  `introduction` varchar(255) NOT NULL COMMENT '文章简介',
  `cid` int(11) NOT NULL COMMENT '门店id',
  `status` int(11) NOT NULL COMMENT '状态',
  `publish_time` varchar(50) NOT NULL COMMENT '创建时间',
  `content` longtext NOT NULL COMMENT '文章内容',
  `thumb` varchar(255) NOT NULL COMMENT '文章封面股份'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `and_auth_group`
--

CREATE TABLE `and_auth_group` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `title` char(100) NOT NULL DEFAULT '',
  `intro` varchar(30) NOT NULL DEFAULT '' COMMENT '角色介绍',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态：1正常，0禁用',
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `rules` text NOT NULL COMMENT '权限规则ID'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='权限组表';

--
-- 转存表中的数据 `and_auth_group`
--

INSERT INTO `and_auth_group` (`id`, `title`, `intro`, `status`, `is_admin`, `rules`) VALUES
(1, '超级管理员', '超级管理员', 1, 1, '71,72,73,77,64,65,69,70,78,94,83,103,107,35,36,74,85,86,87,88,75,76,91,93,95,96,97,98,99,100,101,102,92,79,104,81,105,106,89,90,2,10,50,51,54,55,44,45,46,47,48,49,3,12,52,58,59,26,25,27,13,61,53,60,28,30,29,31,4,14,9,23,24,8,20,21,22,7,17,18,19,6,16,5,15,1,56,57,40,41,42,43,39,38,32,33,34,37'),
(2, '测试管理员', '测试管理员', 1, 1, '71,72,73,77,64,65,69,70,78,94,83,103,107,35,36,74,85,86,87,88,75,76,91,93,95,96,97,98,99,100,101,102,92,79,104,81,105,106,89,90,2,10,50,51,54,55,44,45,46,47,48,49,3,12,52,58,59,26,25,27,13,61,53,60,28,30,29,31,4,14,9,23,24,8,20,21,22,7,17,18,19,6,16,5,15,1,56,57,40,41,42,43,39,38,32,33,34,37'),
(3, '普通会员', '普通会员', 1, 0, '91,95,93,96,97,99,100,101,102,98,108,92'),
(4, '论坛版主', '论坛版主', 1, 0, '');

-- --------------------------------------------------------

--
-- 表的结构 `and_auth_group_access`
--

CREATE TABLE `and_auth_group_access` (
  `admin_user_id` mediumint(8) UNSIGNED NOT NULL,
  `auth_group_id` mediumint(8) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL DEFAULT '0' COMMENT '会员ID',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态：0关闭，1开启'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='权限组规则表';

--
-- 转存表中的数据 `and_auth_group_access`
--

INSERT INTO `and_auth_group_access` (`admin_user_id`, `auth_group_id`, `user_id`, `status`) VALUES
(1, 3, 0, 1),
(3, 2, 0, 1),
(2, 2, 0, 1),
(0, 4, 16, 0),
(0, 3, 16, 1),
(1, 1, 0, 1),
(0, 2, 16, 0),
(0, 3, 22, 1),
(0, 3, 21, 1),
(0, 3, 23, 1),
(0, 3, 25, 1),
(0, 4, 25, 0);

-- --------------------------------------------------------

--
-- 表的结构 `and_auth_rule`
--

CREATE TABLE `and_auth_rule` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(80) NOT NULL DEFAULT '' COMMENT '规则名称',
  `title` varchar(20) NOT NULL,
  `description` varchar(50) NOT NULL DEFAULT '' COMMENT '描述',
  `type` tinyint(1) UNSIGNED NOT NULL DEFAULT '1' COMMENT ' 	1权限+菜单2只作为菜单 ',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态：1显示；2隐藏 ',
  `pid` smallint(5) UNSIGNED NOT NULL COMMENT '父级ID',
  `group_id` int(10) NOT NULL DEFAULT '1' COMMENT '分类ID',
  `icon` varchar(20) DEFAULT '' COMMENT '图标',
  `orders` int(1) UNSIGNED NOT NULL DEFAULT '0' COMMENT '排序',
  `condition` char(100) DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='规则表';

--
-- 转存表中的数据 `and_auth_rule`
--

INSERT INTO `and_auth_rule` (`id`, `name`, `title`, `description`, `type`, `status`, `pid`, `group_id`, `icon`, `orders`, `condition`) VALUES
(1, 'admin/SystemConfig/index', '系统配置', '', 1, 2, 0, 1, 'fa-gears', 0, ''),
(2, 'admin/SystemConfig/_list', '全局配置', '', 1, 1, 1, 1, '', 0, ''),
(3, 'admin/SystemConfig/add', '添加配置项', '', 1, 1, 2, 1, '', 0, ''),
(4, 'admin/SystemConfig/edit', '修改配置项', '', 1, 1, 2, 1, '', 0, ''),
(5, 'admin/SystemConfig/delete', '删除配置项', '', 1, 1, 2, 1, '', 0, ''),
(6, 'admin/SystemConfig/update_value', '单点更新配置项数值', '', 1, 1, 2, 1, '', 0, ''),
(7, 'admin/SystemConfig/save', '提交添加配置项', '', 1, 1, 2, 1, '', 0, ''),
(8, 'admin/SystemConfig/update', '提交修改配置项', '', 1, 1, 2, 1, '', 0, ''),
(9, 'admin/Auth/index', '权限管理', '', 1, 1, 0, 1, 'fa-sitemap', 0, ''),
(10, 'admin/AuthRule/_list', '权限列表', '', 1, 1, 9, 1, '', 0, ''),
(11, 'admin/AuthRule/add', '添加权限节点', '', 1, 1, 10, 1, '', 0, ''),
(12, 'admin/AuthRule/edit', '修改权限节点', '', 1, 1, 10, 1, '', 0, ''),
(13, 'admin/AuthRule/delete', '删除权限节点', '', 1, 1, 10, 1, '', 0, ''),
(14, 'admin/AuthRule/orders', '更新权限规则排序', '', 1, 1, 10, 1, '', 0, ''),
(15, 'admin/AuthRule/save', '提交添加权限', '', 1, 1, 10, 1, '', 0, ''),
(16, 'admin/AuthRule/update', '提交修改权限', '', 1, 1, 10, 1, '', 0, ''),
(17, 'admin/AuthGroup/_list', '角色列表', '', 1, 1, 9, 1, '', 0, ''),
(18, 'admin/AuthGroup/add', '添加角色类', '', 1, 1, 17, 1, '', 0, ''),
(19, 'admin/AuthGroup/edit', '修改角色类', '', 1, 1, 17, 1, '', 0, ''),
(20, 'admin/AuthGroup/delete', '删除角色类', '', 1, 1, 17, 1, '', 0, ''),
(21, 'admin/AuthGroup/edit_rule', '角色授权', '', 1, 1, 17, 1, '', 0, ''),
(22, 'admin/AuthGroup/update_rule', '更新角色状态', '更新角色类状态 开启|禁止', 1, 1, 17, 1, '', 0, ''),
(23, 'admin/AuthGroup/save', '提交添加角色', '', 1, 1, 17, 1, '', 0, ''),
(24, 'admin/AuthGroup/update', '提交修改角色', '', 1, 1, 17, 1, '', 0, ''),
(25, 'admin/Message/index', '消息管理', '', 1, 1, 0, 1, 'fa-map-signs', 0, ''),
(26, 'admin/Message/_list', '消息列表', '', 1, 1, 25, 1, '', 0, ''),
(27, 'admin/Site/index', '门店管理', '', 1, 1, 0, 2, 'fa-cog', 0, ''),
(28, 'admin/Site/storelist', '门店列表', '', 1, 1, 27, 2, 'fa-envelope', 0, ''),
(29, 'admin/Site/storeedit', '添加门店', '', 1, 1, 27, 2, 'fa-commenting', 0, ''),
(30, 'admin/Site/config_add', '提交修改', '', 1, 2, 27, 2, '', 0, ''),
(31, 'admin/Course/index', '课程管理', '', 1, 1, 0, 2, 'fa-link', 0, ''),
(32, 'admin/Course/courseList', '课程列表', '', 1, 1, 31, 2, '', 0, ''),
(33, 'admin/Course/addCourse', '添加课程', '', 1, 1, 31, 2, 'fa-link', 0, ''),
(34, 'admin/Message/add', '添加消息', '', 1, 1, 25, 1, '', 0, ''),
(35, 'admin/Swiper/_list', '轮播图列表', '', 1, 1, 37, 2, 'fa-forumbee', 0, ''),
(36, 'admin/User/order', '会员订单管理', '', 1, 1, 55, 3, '', 0, ''),
(37, 'admin/Swiper/index', '轮播图管理', '', 1, 1, 0, 3, 'fa-asterisk ', 0, ''),
(38, 'admin/Swiper/add', '添加轮播图', '', 1, 1, 37, 3, 'fa-asterisk ', 0, ''),
(43, 'admin/AdminUser/index', '后台管理员', '', 1, 1, 0, 3, 'fa-users', 0, ''),
(44, 'admin/AdminUser/_list', '管理成员', '', 1, 1, 43, 3, '', 0, ''),
(45, 'admin/AdminUser/add', '添加管理员', '', 1, 1, 44, 3, '', 0, ''),
(46, 'admin/AdminUser/edit', '修改管理员', '', 1, 1, 44, 3, '', 0, ''),
(47, 'admin/AdminUser/delete', '删除管理员', '', 1, 1, 44, 3, '', 0, ''),
(48, 'admin/AdminUser/update_status', '单点更新管理员状态值', '', 1, 1, 44, 3, '', 0, ''),
(49, 'admin/AdminUser/enable', '批量启用管理员账户', '', 1, 1, 44, 3, '', 0, ''),
(50, 'admin/AdminUser/prohibit', '批量禁用管理员账户', '', 1, 1, 44, 3, '', 0, ''),
(51, 'admin/AdminUser/delete_all', '批量删除管理员账户', '', 1, 1, 44, 3, '', 0, ''),
(52, 'admin/Teacher/addTeacher', '添加老师 ', '', 1, 1, 65, 2, 'fa-forumbee', 0, ''),
(53, 'admin/AdminUser/save', '提交添加管理员', '', 1, 1, 44, 3, '', 0, ''),
(54, 'admin/AdminUser/update', '提交修改管理员', '', 1, 1, 44, 3, '', 0, ''),
(55, 'admin/User/index', '会员管理', '', 1, 1, 0, 3, 'fa-address-card ', 0, ''),
(56, 'admin/User/_list', '会员列表', '', 1, 1, 55, 3, 'fa-address-book', 0, ''),
(57, 'admin/User/select', '获取会员信息', '', 1, 1, 56, 3, '', 0, ''),
(58, 'admin/User/update_status', '更新会员状态', '', 1, 1, 56, 3, '', 0, ''),
(59, 'admin/User/add', '添加会员', '', 1, 1, 56, 3, '', 0, ''),
(60, 'admin/User/save', '提交添加会员', '', 1, 1, 56, 3, '', 0, ''),
(61, 'admin/User/edit', '编辑会员', '', 1, 1, 56, 3, '', 0, ''),
(62, 'admin/User/update', '更新会员', '', 1, 1, 56, 3, '', 0, ''),
(63, 'admin/User/appointment', '预约订单管理', '', 1, 2, 55, 3, '', 0, ''),
(64, 'admin/Teacher/teacherList', '老师列表', '', 1, 1, 65, 2, 'fa-address-book', 0, ''),
(65, 'admin/Teacher/index', '老师管理', '', 1, 1, 0, 2, 'fa-address-book', 0, '');

-- --------------------------------------------------------

--
-- 表的结构 `and_auth_rule_group`
--

CREATE TABLE `and_auth_rule_group` (
  `id` int(11) NOT NULL,
  `title` varchar(20) NOT NULL DEFAULT '导航标题' COMMENT '导航标题',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态:0不显示，1显示',
  `orders` int(10) NOT NULL DEFAULT '0' COMMENT '排序'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `and_auth_rule_group`
--

INSERT INTO `and_auth_rule_group` (`id`, `title`, `status`, `orders`) VALUES
(1, '系统', 1, 0),
(2, '站点', 1, 0),
(3, '用户', 1, 0);

-- --------------------------------------------------------

--
-- 表的结构 `and_course_table`
--

CREATE TABLE `and_course_table` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) DEFAULT NULL COMMENT '老师表id',
  `store_id` int(11) DEFAULT NULL COMMENT '门店id',
  `class_number` int(11) DEFAULT NULL COMMENT '课堂人数',
  `now_class_num` int(11) NOT NULL COMMENT '课程当前人数',
  `course_name` varchar(255) DEFAULT NULL COMMENT '课堂名称',
  `course_describe` varchar(255) DEFAULT NULL COMMENT '课堂描述',
  `start_time` time DEFAULT NULL COMMENT '开始时间',
  `over_time` time DEFAULT NULL COMMENT '结束时间',
  `notice_matter` varchar(255) DEFAULT NULL COMMENT '注意事项',
  `luggage` varchar(255) DEFAULT NULL COMMENT '自带物品',
  `class_fee` decimal(11,2) DEFAULT NULL COMMENT '课时费用',
  `on_date` date DEFAULT NULL COMMENT '课程所在日期',
  `on_week` varchar(255) DEFAULT NULL COMMENT '课时所在星期',
  `boundary_moment` varchar(255) DEFAULT NULL COMMENT '分界时刻（上、中、下、晚上)',
  `status` int(11) NOT NULL,
  `url` varchar(500) NOT NULL,
  `swiper` varchar(255) NOT NULL COMMENT '课程轮播图',
  `calorie` varchar(10) NOT NULL COMMENT '卡路里',
  `muscular_strength` varchar(10) NOT NULL COMMENT '肌肉力量',
  `muscular_endurance` varchar(10) NOT NULL COMMENT '肌肉耐力',
  `harmony` varchar(10) NOT NULL COMMENT '协调性',
  `cardiopulmonary` varchar(10) NOT NULL COMMENT '心肺功能',
  `suppleness` varchar(10) NOT NULL COMMENT '柔韧性',
  `degree` varchar(10) NOT NULL COMMENT '难以程度',
  `appoinTime` int(11) NOT NULL COMMENT '可取消时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `and_course_table`
--

INSERT INTO `and_course_table` (`id`, `teacher_id`, `store_id`, `class_number`, `now_class_num`, `course_name`, `course_describe`, `start_time`, `over_time`, `notice_matter`, `luggage`, `class_fee`, `on_date`, `on_week`, `boundary_moment`, `status`, `url`, `swiper`, `calorie`, `muscular_strength`, `muscular_endurance`, `harmony`, `cardiopulmonary`, `suppleness`, `degree`, `appoinTime`) VALUES
(1, 1, 1, 15, 0, '跳绳', '1.课程设计上加入了趣味性十足的队友互助过程，让60分钟的训练充满了挑战和互相激励', '12:00:00', '13:00:00', '下列人群不符合参加我们的课程：手术3个月内的人群', '贴身或宽松运动服均可，训练运动鞋', '10.00', '2018-06-01', '周一', '2018-05-31', 1, '/uploads/store/20180531\\c7baeb0f4b5b59468252665227586ede.jpg', '/uploads/store/20180531\\b0452189cc40364c544b112d030674bd.jpg,/uploads/store/20180531\\7f6abf2a22caaaedb80e6c1bbe5e4941.jpg,', '10', '100', '20', '60', '70', '2018-05-31', '较难', 10);

-- --------------------------------------------------------

--
-- 表的结构 `and_payment_table`
--

CREATE TABLE `and_payment_table` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL COMMENT '用户表id',
  `payment_time` datetime DEFAULT NULL COMMENT '付款时间',
  `expire_time` datetime DEFAULT NULL COMMENT '到期时间',
  `class_number` int(11) DEFAULT NULL COMMENT '课堂数',
  `class_type` int(11) DEFAULT NULL COMMENT '上课类型（0：月，1：周)',
  `course_id` int(11) NOT NULL COMMENT '课程id',
  `status` int(11) NOT NULL COMMENT '付款状态',
  `appoin_status` int(11) NOT NULL COMMENT '用户预约状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `and_payment_table`
--

INSERT INTO `and_payment_table` (`id`, `user_id`, `payment_time`, `expire_time`, `class_number`, `class_type`, `course_id`, `status`, `appoin_status`) VALUES
(1, 5, NULL, NULL, NULL, NULL, 1, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `and_store_table`
--

CREATE TABLE `and_store_table` (
  `id` int(11) NOT NULL,
  `store_name` varchar(255) DEFAULT NULL COMMENT '店铺名',
  `support` varchar(255) DEFAULT NULL COMMENT '支持',
  `no_support` varchar(255) DEFAULT NULL COMMENT '不支持',
  `address` varchar(255) DEFAULT NULL COMMENT '地址',
  `metro_name` varchar(255) DEFAULT NULL COMMENT '地铁名',
  `metro_details` varchar(255) DEFAULT NULL COMMENT '地铁详情',
  `metro_distance` varchar(255) DEFAULT NULL COMMENT '地铁距离',
  `transit_name` varchar(255) DEFAULT NULL COMMENT '公交名',
  `transit_details` varchar(255) DEFAULT NULL COMMENT '公交详情',
  `transit_distance` varchar(255) DEFAULT NULL COMMENT '公交距离',
  `driving_details` varchar(255) DEFAULT NULL COMMENT '自驾详情',
  `recommend` varchar(255) DEFAULT NULL COMMENT '推荐',
  `longitude` varchar(255) DEFAULT NULL COMMENT '经度',
  `latitude` varchar(255) DEFAULT NULL COMMENT '纬度',
  `thumb` varchar(500) NOT NULL COMMENT '门店图片地址',
  `status` int(11) NOT NULL COMMENT '状态',
  `swiper` varchar(520) NOT NULL COMMENT '轮播图',
  `addre` varchar(255) NOT NULL COMMENT '门店地址简介'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `and_store_table`
--

INSERT INTO `and_store_table` (`id`, `store_name`, `support`, `no_support`, `address`, `metro_name`, `metro_details`, `metro_distance`, `transit_name`, `transit_details`, `transit_distance`, `driving_details`, `recommend`, `longitude`, `latitude`, `thumb`, `status`, `swiper`, `addre`) VALUES
(1, '天河北店', '饮水机', '沐浴', '天河北路458号沃凯街（三楼）', '岗顶', '岗顶A出口出站直走100米到达建设银行路口右转', '1.1公里', '龙口西站', '往华师方向下车：龙口西站下车后往车行道相反方向步行100米抵达目的地', '100米', '天河北路460号沃凯街漫咖啡店', '36.189626', '119.36987', '119.36987', '/uploads/store/20180531\\b786b4eb7e3fb41e07445443191694f9.jpg', 1, '/uploads/store/20180531\\59d92f4ce092648b8d32c61442c73853.jpg,', '天河北');

-- --------------------------------------------------------

--
-- 表的结构 `and_swiper_table`
--

CREATE TABLE `and_swiper_table` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL COMMENT '门店id',
  `course_id` int(11) NOT NULL COMMENT '课程id',
  `path` varchar(255) NOT NULL COMMENT '图片路径',
  `status` int(11) NOT NULL COMMENT '状态'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `and_swiper_table`
--

INSERT INTO `and_swiper_table` (`id`, `store_id`, `course_id`, `path`, `status`) VALUES
(1, 0, 0, '/uploads/store/20180531/0d1d915aec2a758d0a7e95ad809032fc.jpg,/uploads/store/20180531/5025997b8483754b5a1f8f180a4516e2.jpg,/uploads/store/20180531/ffebf0b3f8ff71d012e6eadc52264365.jpg,', 1);

-- --------------------------------------------------------

--
-- 表的结构 `and_system_config`
--

CREATE TABLE `and_system_config` (
  `id` int(11) NOT NULL,
  `title` varchar(32) NOT NULL,
  `group` varchar(15) NOT NULL DEFAULT '' COMMENT '组类',
  `vari` varchar(32) NOT NULL,
  `value` text NOT NULL,
  `type` enum('text','image','textarea','file','checkbox','radio','select','checker','array','keyvalue','password','color') NOT NULL,
  `options` text NOT NULL,
  `info` text NOT NULL,
  `orders` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `and_teacher_table`
--

CREATE TABLE `and_teacher_table` (
  `id` int(11) NOT NULL,
  `phone` varchar(255) DEFAULT NULL COMMENT '手机号',
  `name` varchar(255) DEFAULT NULL COMMENT '真实姓名',
  `user_name` varchar(255) DEFAULT NULL COMMENT '登录名',
  `user_password` varchar(255) DEFAULT NULL COMMENT '密码',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  `sex` char(1) DEFAULT NULL COMMENT '性别',
  `birth_time` date DEFAULT NULL COMMENT '出日期生',
  `url` varchar(255) DEFAULT NULL COMMENT '头像地址',
  `open_id` varchar(255) DEFAULT NULL COMMENT '用户唯一标识',
  `speciality` varchar(255) DEFAULT NULL COMMENT '特长',
  `professional` varchar(255) DEFAULT NULL COMMENT '专业资质',
  `coach_said` varchar(255) DEFAULT NULL COMMENT '教练说',
  `status` int(11) NOT NULL COMMENT '用户状态 '
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `and_teacher_table`
--

INSERT INTO `and_teacher_table` (`id`, `phone`, `name`, `user_name`, `user_password`, `age`, `sex`, `birth_time`, `url`, `open_id`, `speciality`, `professional`, `coach_said`, `status`) VALUES
(1, '17856965487', '王飞鸿', '红歌', NULL, 38, '男', '1989-09-25', '/uploads/store/20180531\\ff39a31f9b1824a0fe9ed33b0f056155.jpg', NULL, '力量训练，增肌减脂', '20年从教，经验丰富，了解特质', '加入我们，一起增肌减脂', 0),
(2, '15253165511', 'Diya', 'Diya', NULL, 25, '女', '1994-05-15', '/uploads/store/20180531\\9e38d91378f1dcebf3221d924979f04d.png', NULL, '综合性教练，擅长雷美', 'Certified in AASFP', '加入我，一起享受运动的快乐', 0),
(3, '15253165511', 'Diya', 'Diya', NULL, 25, '女', '1994-05-15', '/uploads/store/20180531\\9e38d91378f1dcebf3221d924979f04d.png', NULL, '综合性教练，擅长雷美', 'Certified in AASFP', '加入我，一起享受运动的快乐', 0);

-- --------------------------------------------------------

--
-- 表的结构 `and_time_table`
--

CREATE TABLE `and_time_table` (
  `id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL COMMENT '课程表id',
  `payment_time` datetime DEFAULT NULL COMMENT '上课时间',
  `expire_time` datetime DEFAULT NULL COMMENT '下课时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `and_user`
--

CREATE TABLE `and_user` (
  `id` int(11) NOT NULL,
  `create_ip` varchar(32) NOT NULL DEFAULT '' COMMENT 'IP',
  `username` varchar(32) NOT NULL DEFAULT '' COMMENT '名称',
  `nickname` varchar(50) NOT NULL,
  `password` varchar(32) NOT NULL DEFAULT '' COMMENT '密码',
  `thumb_url` varchar(100) DEFAULT '/static/common/images/default_head_img.png' COMMENT '头像',
  `email` varchar(50) DEFAULT '' COMMENT '邮箱',
  `phone` varchar(11) DEFAULT '' COMMENT '手机',
  `create_time` int(10) NOT NULL DEFAULT '0' COMMENT '注册时间',
  `user_level_id` int(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '消费等级',
  `user_role_id` tinyint(3) UNSIGNED NOT NULL DEFAULT '1' COMMENT '角色ID',
  `sex` tinyint(1) NOT NULL DEFAULT '0' COMMENT '性别',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '验证1表示正常2邮箱验证3手机认证5手机邮箱全部认证',
  `address` varchar(32) DEFAULT '' COMMENT '地址',
  `description` varchar(200) DEFAULT NULL COMMENT '描述',
  `last_login_time` int(10) DEFAULT '0' COMMENT '最后登陆时间',
  `last_login_ip` varchar(20) DEFAULT '0' COMMENT '最后登录IP',
  `salt` varchar(20) DEFAULT NULL COMMENT 'salt',
  `developer` tinyint(1) DEFAULT '0' COMMENT '开发者',
  `collect` int(11) DEFAULT '0' COMMENT '被关注数',
  `zan` int(11) DEFAULT '0' COMMENT '被赞数',
  `tips` int(11) DEFAULT '0' COMMENT '被打赏次数',
  `is_comment` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否禁言',
  `is_delete` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户表';

--
-- 转存表中的数据 `and_user`
--

INSERT INTO `and_user` (`id`, `create_ip`, `username`, `nickname`, `password`, `thumb_url`, `email`, `phone`, `create_time`, `user_level_id`, `user_role_id`, `sex`, `status`, `address`, `description`, `last_login_time`, `last_login_ip`, `salt`, `developer`, `collect`, `zan`, `tips`, `is_comment`, `is_delete`) VALUES
(1, '', 'smt', '舞月飘雪_pKSNsS', 'dfa4945b669a71198dffb78db8d70833', '/static/common/images/default_head_img.png', '1271735991@qq.com', '15253165511', 1526880978, 0, 1, 0, 1, '', NULL, 0, '0', 'pKSNsS', 0, 0, 0, 0, 1, 0);

-- --------------------------------------------------------

--
-- 表的结构 `and_user_table`
--

CREATE TABLE `and_user_table` (
  `id` int(11) NOT NULL,
  `phone` varchar(255) DEFAULT NULL COMMENT '手机号',
  `user_name` varchar(255) DEFAULT NULL COMMENT '用户名',
  `user_password` varchar(255) DEFAULT NULL COMMENT '密码',
  `stature` decimal(11,0) DEFAULT NULL COMMENT '身高',
  `weight` decimal(11,0) DEFAULT NULL COMMENT '体重',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  `sex` char(1) DEFAULT NULL COMMENT '性别',
  `birth_time` varchar(255) DEFAULT NULL COMMENT '出生日期',
  `url` varchar(255) DEFAULT NULL COMMENT '头像',
  `open_id` varchar(255) DEFAULT NULL COMMENT '用户唯一标识',
  `pay_fees` int(11) DEFAULT '0' COMMENT '是否缴费（0：未交，1：交了）',
  `nickname` varchar(100) NOT NULL COMMENT '呢称',
  `status` int(11) NOT NULL COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `and_admin_user`
--
ALTER TABLE `and_admin_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`,`email`,`phone`);

--
-- Indexes for table `and_article_table`
--
ALTER TABLE `and_article_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `and_auth_group`
--
ALTER TABLE `and_auth_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `and_auth_group_access`
--
ALTER TABLE `and_auth_group_access`
  ADD KEY `admin_user_id` (`admin_user_id`),
  ADD KEY `auth_group_id` (`auth_group_id`);

--
-- Indexes for table `and_auth_rule`
--
ALTER TABLE `and_auth_rule`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`) USING BTREE;

--
-- Indexes for table `and_course_table`
--
ALTER TABLE `and_course_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `and_payment_table`
--
ALTER TABLE `and_payment_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `and_store_table`
--
ALTER TABLE `and_store_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `and_swiper_table`
--
ALTER TABLE `and_swiper_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `and_system_config`
--
ALTER TABLE `and_system_config`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vari` (`vari`),
  ADD KEY `keyword` (`group`) USING BTREE;

--
-- Indexes for table `and_teacher_table`
--
ALTER TABLE `and_teacher_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `and_time_table`
--
ALTER TABLE `and_time_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `and_user`
--
ALTER TABLE `and_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`) USING BTREE,
  ADD KEY `phone` (`phone`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `and_user_table`
--
ALTER TABLE `and_user_table`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `and_admin_user`
--
ALTER TABLE `and_admin_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `and_article_table`
--
ALTER TABLE `and_article_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `and_auth_group`
--
ALTER TABLE `and_auth_group`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `and_auth_rule`
--
ALTER TABLE `and_auth_rule`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
--
-- 使用表AUTO_INCREMENT `and_course_table`
--
ALTER TABLE `and_course_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `and_payment_table`
--
ALTER TABLE `and_payment_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `and_store_table`
--
ALTER TABLE `and_store_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `and_swiper_table`
--
ALTER TABLE `and_swiper_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `and_system_config`
--
ALTER TABLE `and_system_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- 使用表AUTO_INCREMENT `and_teacher_table`
--
ALTER TABLE `and_teacher_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `and_time_table`
--
ALTER TABLE `and_time_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `and_user`
--
ALTER TABLE `and_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `and_user_table`
--
ALTER TABLE `and_user_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
