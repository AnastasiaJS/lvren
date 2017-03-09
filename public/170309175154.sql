/*
MySQL Backup
Source Server Version: 5.5.50
Source Database: yitu
Date: 2017-03-09 17:51:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `dynamic`
-- ----------------------------
DROP TABLE IF EXISTS `dynamic`;
CREATE TABLE `dynamic` (
  `Did` int(18) NOT NULL AUTO_INCREMENT,
  `Oid` int(18) NOT NULL,
  `P1` varchar(255) DEFAULT NULL,
  `P9` varchar(255) DEFAULT NULL,
  `P8` varchar(255) DEFAULT NULL,
  `P7` varchar(255) DEFAULT NULL,
  `P6` varchar(255) DEFAULT NULL,
  `P5` varchar(255) DEFAULT NULL,
  `P4` varchar(255) DEFAULT NULL,
  `P3` varchar(255) DEFAULT NULL,
  `P2` varchar(255) DEFAULT NULL,
  `Photos` varchar(255) DEFAULT NULL,
  `Detail` varchar(1000) DEFAULT NULL,
  `Time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Uid` varchar(18) DEFAULT NULL,
  PRIMARY KEY (`Did`),
  KEY `Oid` (`Oid`),
  KEY `Uid` (`Uid`),
  CONSTRAINT `dynamic_ibfk_1` FOREIGN KEY (`Oid`) REFERENCES `order` (`Oid`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `message`
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `Mid` int(18) NOT NULL AUTO_INCREMENT,
  `Tid` int(18) NOT NULL,
  `Text` varchar(255) DEFAULT NULL COMMENT '留言内容',
  `Uid` varchar(18) DEFAULT NULL,
  `Time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Mid`),
  KEY `Mid` (`Tid`),
  KEY `Uid` (`Uid`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`Uid`) REFERENCES `user` (`Uid`),
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`Tid`) REFERENCES `tourcard` (`Tid`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `news`
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Mid` varchar(255) DEFAULT NULL,
  `Tid` int(18) DEFAULT NULL,
  `Flag` int(1) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Tid` (`Tid`),
  CONSTRAINT `news_ibfk_1` FOREIGN KEY (`Tid`) REFERENCES `tourcard` (`Tid`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COMMENT='InnoDB free: 11264 kB; (`Uid`) REFER `yitu/user`(`Uid`)';

-- ----------------------------
--  Table structure for `order`
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `Oid` int(18) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `Tid` int(18) NOT NULL,
  `Uid` varchar(18) NOT NULL COMMENT '雇主（下单的人）',
  `State` varchar(18) NOT NULL COMMENT '状态',
  `OrderTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '订单时间',
  `Appointment` varchar(30) NOT NULL COMMENT '预约时间',
  PRIMARY KEY (`Oid`),
  KEY `Uid` (`Uid`),
  KEY `Tid` (`Tid`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`Uid`) REFERENCES `user` (`Uid`),
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`Tid`) REFERENCES `tourcard` (`Tid`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `reply`
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `Cid` int(11) DEFAULT NULL,
  `Mid` int(18) NOT NULL,
  `Uid` varchar(18) NOT NULL COMMENT '谁回复',
  `Reply` varchar(255) DEFAULT NULL,
  `Time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `Mid` (`Mid`),
  KEY `Uid` (`Uid`),
  CONSTRAINT `reply_ibfk_1` FOREIGN KEY (`Mid`) REFERENCES `message` (`Mid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `save`
-- ----------------------------
DROP TABLE IF EXISTS `save`;
CREATE TABLE `save` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Tid` int(11) DEFAULT NULL,
  `Uid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Tid` (`Tid`),
  KEY `Uid` (`Uid`),
  CONSTRAINT `save_ibfk_1` FOREIGN KEY (`Tid`) REFERENCES `tourcard` (`Tid`),
  CONSTRAINT `save_ibfk_2` FOREIGN KEY (`Uid`) REFERENCES `user` (`Uid`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tourcard`
-- ----------------------------
DROP TABLE IF EXISTS `tourcard`;
CREATE TABLE `tourcard` (
  `Tid` int(18) NOT NULL AUTO_INCREMENT,
  `Uid` varchar(18) NOT NULL,
  `Uptime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Title` varchar(80) DEFAULT NULL,
  `About` varchar(1000) NOT NULL,
  `Price` int(8) NOT NULL,
  `CanCut` varchar(6) DEFAULT '',
  `Play` varchar(1000) DEFAULT NULL COMMENT '玩法',
  `Other` varchar(1000) DEFAULT NULL,
  `AppointTime` varchar(1000) DEFAULT NULL,
  `AboutPrice` varchar(1000) DEFAULT NULL,
  `Face` varchar(1000) NOT NULL,
  `Photos` varchar(1000) NOT NULL,
  PRIMARY KEY (`Tid`),
  KEY `Uid` (`Uid`),
  CONSTRAINT `tourcard_ibfk_1` FOREIGN KEY (`Uid`) REFERENCES `user` (`Uid`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `Uid` varchar(18) NOT NULL,
  `Password` varchar(32) NOT NULL COMMENT '用户密码',
  `Nickname` varchar(18) DEFAULT NULL,
  `Name` varchar(18) DEFAULT '',
  `Sex` char(6) DEFAULT '',
  `Birthday` date DEFAULT NULL COMMENT '出生日期',
  `IDCard` char(18) DEFAULT NULL COMMENT '身份证',
  `Addr` varchar(32) DEFAULT NULL,
  `Job` varchar(40) DEFAULT NULL,
  `Tellphone` char(11) DEFAULT NULL,
  `Wechat` varchar(18) DEFAULT '' COMMENT '微信号',
  `Anhao` varchar(40) DEFAULT NULL COMMENT '微信暗号',
  `Zhifubao` varchar(255) DEFAULT NULL,
  `HeadPic` varchar(41) DEFAULT NULL COMMENT '头像',
  `RegTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '注册时间',
  PRIMARY KEY (`Uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records 
-- ----------------------------
INSERT INTO `dynamic` VALUES ('8','39','827377ef-7cbc-411d-8820-7567b65ed1c8.jpeg','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','827377ef-7cbc-411d-8820-7567b65ed1c8.jpeg','第一次来广州，导游专车接送，受宠若惊啊，还在导游家里吃到了当地的特色菜，好棒啊[em_3]','2016-11-06 18:08:49','2'), ('9','65','0af9a38d-10b0-4350-a2af-fc36b609fcb3.jpg','NULL','NULL','NULL','NULL','NULL','NULL','NULL','0c386817-ab48-4c74-aaff-81b308cc975f.jpg','0af9a38d-10b0-4350-a2af-fc36b609fcb3.jpg','让我掉下眼泪的  不止昨夜的酒\r\n　　让我依依不舍的 不止你的温柔\r\n\r\n　       你会挽着我的衣袖 我会把手揣进裤兜\r\n　　走到玉林路的尽头 坐在小酒馆的门口——《成都》\r\n   在成都听着这首歌[em_20]','2016-11-06 18:19:46','2'), ('10','40','b9330f48-991c-40ee-ad70-b5781086fe26.jpg','NULL','NULL','NULL','NULL','NULL','NULL','NULL','f733f6c1-2fd6-413a-a1bb-0e04d671b24b.jpg','b9330f48-991c-40ee-ad70-b5781086fe26.jpg','去的时候，刚好看见街头艺人在唱“北京~北京！”，唱的不似汪峰苍凉，却是充满激情。晚安北京[em_53]','2016-11-06 21:40:59','245915765@qq.com'), ('12','62','c51fb1fe-0e75-48f4-aa4b-d09cb5825d05.jpeg','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','c51fb1fe-0e75-48f4-aa4b-d09cb5825d05.jpeg','[em_3]拍的照片很美~','2016-11-07 08:37:10','3'), ('14','68','5c2ed497-7fb8-4db1-bdd2-1904e6f90ead.jpeg','NULL','NULL','NULL','NULL','NULL','NULL','2b91c791-6a7e-451f-8de6-89ee8e03c861.jpeg','2b91c791-6a7e-451f-8de6-89ee8e03c861.jpeg','5c2ed497-7fb8-4db1-bdd2-1904e6f90ead.jpeg','小哥人不错呀~','2016-11-07 08:49:54','4'), ('16','68','0ef76a0b-ebd7-4dc5-a83f-c64d309b8fe1.jpeg','NULL','NULL','NULL','NULL','NULL','NULL','NULL','d5a70ebe-495f-46a7-b641-2f10158974e0.jpeg','0ef76a0b-ebd7-4dc5-a83f-c64d309b8fe1.jpeg','','2016-11-07 11:20:08','4'), ('17','69','6fb46ba3-2514-49fe-8a4c-229225d7137d.jpeg','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','6fb46ba3-2514-49fe-8a4c-229225d7137d.jpeg','[em_41]人很好啊，带着女朋友一起招待我的，很多好吃的[em_67]','2016-11-07 11:26:40','245915765@qq.com'), ('19','62','b70c9b97-c445-40a3-bc9d-495f5a536030.png','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','b70c9b97-c445-40a3-bc9d-495f5a536030.png','','2016-11-08 15:36:34','3'), ('21','69','e5abe9cd-5f65-4e40-930e-82535e910eaa.jpeg','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','e5abe9cd-5f65-4e40-930e-82535e910eaa.jpeg','成都成都','2016-11-12 10:27:16','245915765@qq.com'), ('22','69','339ba349-309d-487f-a319-e6c7db6897a9.jpeg','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','339ba349-309d-487f-a319-e6c7db6897a9.jpeg','HERE CHDU','2016-11-12 10:50:59','245915765@qq.com'), ('23','62','4c6a70bb-90cb-4d81-bd15-a01f128f1d09.png','NULL','NULL','NULL','NULL','NULL','NULL','NULL','NULL','4c6a70bb-90cb-4d81-bd15-a01f128f1d09.png','1','2016-11-14 21:34:16','3');
INSERT INTO `message` VALUES ('28','29','好想吃蛋糕~','4','2016-09-24 11:03:00'), ('29','29','闻到香味了','3','2016-09-24 11:17:17'), ('31','29','不会','4','2016-09-24 11:37:22'), ('39','29','人生天地间，忽如远行客，多出去走走吧','3','2016-09-27 16:19:36'), ('44','29','想睡觉','3','2016-09-24 14:11:19'), ('46','29','妮妮','2','2016-09-24 15:42:09'), ('62','48','只在工作室里体验吗？','2','2016-09-28 10:15:20'), ('64','49','照片上哪个是你啊？','2','2016-10-07 18:44:14'), ('69','50','费用包含什么？','4','2016-10-08 21:21:06'), ('72','50','嗯？','4','2016-10-09 19:52:59'), ('75','50','不','2','2016-10-10 08:51:06'), ('76','50','很好看==','2','2016-10-26 16:07:35'), ('80','29','图上绿色的东西是什么？抹茶制品？','245915765@qq.com','2016-11-06 21:34:59'), ('82','48','很期待','2','2016-10-28 18:27:26'), ('83','48','可以试穿不？','3','2016-10-28 18:29:15'), ('85','48','导游主业是摄影师？可以免费拍照不？','4','2016-10-28 18:31:51'), ('88','28','哈哈哈哈','2','2016-10-31 10:28:56'), ('91','28','顶顶顶顶顶顶','3','2016-11-05 18:12:09'), ('92','67','大叔，帅！','245915765@qq.com','2016-11-06 18:24:31'), ('93','50','','3','2016-11-06 20:34:29'), ('94','50','123','3','2016-11-06 20:34:34'), ('95','73','能骑马吗？','245915765@qq.com','2016-11-06 21:31:45'), ('96','49','sha ','2','2016-11-07 15:49:08'), ('97','45','帅','3','2016-11-07 22:18:09'), ('98','77','租我吧','333@qq.com','2016-11-12 10:19:33');
INSERT INTO `news` VALUES ('3','72','50','0','msg'), ('7','75','50','0','msg'), ('8','76','50','0','msg'), ('12','29','29','0','reply'), ('14','80','29','0','msg'), ('15','80','29','0','reply'), ('17','82','48','0','msg'), ('18','83','48','1','msg'), ('19','84','48','1','msg'), ('20','85','48','1','msg'), ('23','88','28','0','msg'), ('27','91','28','0','msg'), ('28','64','49','0','reply'), ('29','92','67','0','msg'), ('30','92','67','0','reply'), ('31','0','66','1','order1'), ('32','93','50','0','msg'), ('33','94','50','0','msg'), ('34','95','73','1','msg'), ('35','96','49','1','msg'), ('36','97','45','1','msg'), ('37','98','77','1','msg');
INSERT INTO `order` VALUES ('29','43','2','未确定','2016-09-26 15:37:12','2016-09-15 15:15'), ('31','43','3','待付款','2016-09-27 19:00:49','2016-09-27 19:00'), ('36','49','245915765@qq.com','待付款','2016-10-04 21:56:07','2016-10-04 21:56'), ('37','48','2','已确定','2016-10-04 22:04:59','2016-10-04 22:04'), ('39','49','2','已付款','2016-10-04 23:07:58','2016-10-04 23:07'), ('40','28','245915765@qq.com','已付款','2016-10-16 20:08:22','2016-10-16 20:08'), ('59','50','245915777@qq.com','未确定','2016-11-02 19:12:52','2016-11-02 18:38'), ('61','49','3','待付款','2016-11-05 11:34:22','2016/11/18 15:00'), ('62','28','3','已付款','2016-11-05 18:12:38','2016/11/11 21:00'), ('64','67','3','未确定','2016-11-06 16:45:32','2016/11/16 20:00'), ('65','50','2','已付款','2016-11-06 18:09:17','2016/07/06 20:00'), ('66','50','3','待付款','2016-11-06 20:33:35','2016/11/06 22:00'), ('67','73','245915765@qq.com','未确定','2016-11-06 21:33:25','2016/11/17 07:00'), ('68','70','4','已付款','2016-11-07 08:40:50','2016/11/17 10:00'), ('69','45','245915765@qq.com','已付款','2016-11-07 11:24:48','2016/11/01 11:24'), ('70','49','2','未确定','2016-11-07 15:49:35','2016/11/07 18:00'), ('71','45','3','未确定','2016-11-07 22:18:26','2016-12-07T14:16:00'), ('72','75','2','未确定','2016-11-12 09:48:24','2016-11-12T09:47:55');
INSERT INTO `reply` VALUES ('2','49','64','3','啥？','2016-10-06 23:35:06'), ('7','29','39','2','可以出来看看','2016-10-07 18:47:15'), ('8','29','28','2','谢谢~','2016-10-07 18:50:52'), ('11','50','69','245915765@qq.com','包午餐','2016-10-08 21:21:53'), ('12','29','46','2','哈哈哒','2016-10-08 21:52:54'), ('15','29','29','2','@@','2016-10-11 21:15:53'), ('16','29','80','2','哈哈，是啊~你来，请你吃==','2016-11-06 21:35:20'), ('18','49','64','3','是男生','2016-11-05 21:58:40'), ('19','67','92','4','谢谢夸奖！','2016-11-06 18:34:38');
INSERT INTO `save` VALUES ('11','49','4'), ('57','49','3'), ('71','28','3'), ('78','49','2'), ('80','73','245915765@qq.com'), ('82','70','4'), ('83','45','4'), ('84','45','3'), ('85','75','2'), ('95','67','245915765@qq.com');
INSERT INTO `tourcard` VALUES ('28','2','2016-10-11 20:59:46','榛美去的[北京胡同]旅拍小课，在北京带你拍出旅行大片','在埃及的古堡酒店假装公主，在京都的町屋民宿扮演裁缝；\r\n 在莫斯科的公园和当地人玩滑板，在古巴的街头观赏小孩的足球赛；\r\n 在墨西哥寻觅最好吃的taco，在首尔的冬夜品尝街头年糕；\r\n 暴走过纽约，漫步过清迈……','50','不可以','我是全职旅行家榛美去，是小世界工作室创始人，是随心所欲的模特兼摄影师。\r\n\r\n 是一丝不苟的旅行专栏写手，是特立独行的时尚买手，是走街串巷的美食达人。\r\n\r\n 我的旅途，填满了各种充满当地元素的体验与美食，每一处风景都留在我脑海与相机。做我爱做的事，去我想去的地方，努力活成一个洒脱又有趣的人。','【关于旅拍】\r\n 旅拍应该是我旅行中最重要的一项，我是因为旅行的照片被大家认识，喜欢，从而走上了职业旅行家的道路。\r\n\r\n 在一年的旅行、沉淀之后，我创立有了小世界工作室，专注于与众不同的旅行摄影、写真和婚纱拍摄，将全世界的值得探索的目的地都放入我的旅行拍摄计划。',NULL,NULL,'',''), ('29','2','2016-06-20 11:59:54','手把手教你来玩烘焙！','自我介绍：我是Nana，四年前我在五道口附近开了一家小咖啡馆——双风车咖啡，每天店里出售我和甜品师亲手制作的甜点。很开心因为这间咖啡馆，我在这四年遇到了很多志同道合的朋友。现在，我终于拥有了自己的烘焙工作室，希望可以和同样热爱烘焙的你，一起找寻更多的烘焙乐趣。\r\n','60','可以','让我来告诉你双风车出售的经典黄油曲奇——朗姆葡萄酥的小秘密。\r\n 朗姆酒到底发挥了怎么样的作用？\r\n 为什么葡萄干甜而不腻？\r\n 淡淡的坚果味又是从哪里来的呢？\r\n 小小的曲奇也可能有无限的发挥空间。\r\n 让我们从原料的选择，到烤箱的稳定调控，一起去探索烘焙的乐趣吧～\r\n','\r\n 时间：下单后沟通确认\r\n 地点：海淀区六道口静淑苑路翰庭小区三号楼一单元102（近北京林业大学东门与双风车咖啡馆） ',NULL,NULL,'',''), ('43','4','2015-12-31 20:59:56','漫游成都：跟旅行摄影师拍摄一天','我是丁海笑\r\n 一个重度旅行上瘾者','600','不可以','Lonely Planet 中文作者 \\ 《IN 成都》、《搭车十年》作者 \\ 摄影博客Lofter 上关注量超过10万的摄影师','',NULL,NULL,'',''), ('45','2','2016-11-06 20:55:00','梦戏成都','【关于我】本人是一个喜欢运动的人，玩滑板','200','可以','双脚离地，就能飞起','可以一起划船吃烧烤',NULL,NULL,'',''), ('48','4','2015-11-10 21:00:14','体验满族服饰，感受民族独特文化','满族，全称满洲族，满族祖先在不同的历史时期有着不同的称呼。先秦时期称为肃慎，汉晋时期的挹娄，南北朝时期的勿吉，隋唐时期的靺鞨，金代的女真，1635年皇太极颁布诏令改女真为满洲。 满洲服装重骑射，方便灵活，窄袖，内袍外挂，袍褂相连，不论男女老少都穿着袍服，因此袍服是满族服装发展的核心形制。那么你想知道满族的袍子是什么样子吗？ \r\n\r\n 我是萨哈连（Sahaliyan），满族，楚燕老师说：“中国有五千年文化传统，其中服装也是非常重要的一个载体，作为一种符号，凝集中国精神和风采。在文化复兴大背景下，不去复兴民族服饰是无论如何也说不通的。服饰能够最好、最直观展现中华文化特性。” 为了传承文化，让更多人分享祖先留给我们的宝贵文化财富，我从事了传统满洲服饰定制工作。目前就读于北京服装学院。 在我的工作室，我将向你展示满族服饰、介绍清代满族服饰知识（满族人穿什么？戴什么？什么是行服、便服、常服、吉服）、服装的历史，讲解制作流程，学习传统服装制作技艺等等。 \r\n','69','不可以','【体验地点】私人工作室，位于北京市大兴区枣园地铁站附近；时长约1个小时 ','【关于费用】 费用包含：体验费、讲解费；如果想要来套定制满族服饰，另行收费，当面详谈。',NULL,NULL,'',''), ('49','3','2015-12-23 21:00:27','日光加蓝陪伴你，倾国倾城属于你','阳光，鲜花，你，\r\n 就是最美的风景，\r\n 也是我的世界里的美好回忆，\r\n 莫辜负了广州一年四季的好春光。','120','可以','【交通】专车接送。路费全包。照片拍到满意为止。价格为初步价，如果投缘，适当优惠，会根据顾客的人数和对路线的需求上下浮动。\r\n 一切都可以谈。。。。。\r\n','【天气】看天吃饭，也可以在室内环境进行拍摄。拍摄效果会先发给顾客进行参考决定。\r\n\r\n 【餐费】各自AA。\r\n\r\n 【服装】顾客负责（可选用尽量显身材吸睛的某宝爆',NULL,NULL,'',''), ('50','245915765@qq.com','2016-07-07 21:00:32','【夜跑成都】 一起赶走无聊，跑出趣！','我是鲨鱼 成都人\r\n 夜跑狂热爱好者','150','可以','你见过凌晨4点的成都吗？\r\n 当你在白天走过的喧嚣街道变得空无一人，所有繁华锦绣都回归平静\r\n\r\n 你在特别是该吃宵夜的时候\r\n 与朋友一起穿着自己最爱的运动服，踩着最好看舒适的跑鞋，在夜的霓虹楼宇间奔跑过么？','如果你想赶走无聊，那么就和我们一起跑出趣吧！\r\n 让我们一起冲破楼宇的束缚和障碍的限制，用我们自己的方式，在街道奔跑',NULL,NULL,'',''), ('66','3','2016-11-06 16:49:36','天下熙熙，皆为利来；天下攘攘，皆为利往','本姑娘是土生土长滴南京人，程序猿一枚。\r\n如果你对编程有兴趣，但又米有什么基础，偶可以教你写个简单滴小程序哈！地点随便挑哈！','45','可以','来南京，有几个景点我认为是必看，夫子庙代表的是旧秦淮的金陵胜景，总统府和中山陵则映照着近代中国的风云诡谲，而大屠杀纪念馆镌刻着民族的耻辱。因此线路安排：总统府—明孝陵—夫子庙—中山陵—灵谷寺—长江大桥—阅江楼—狮子桥美食街—玄武湖—鸡鸣寺—中华门—雨花台—大屠杀纪念馆。','自古以来，南京 总是笼罩着一种烟雾之中的伤怀之感。“潮打空城寂寞回”、“乌衣巷口夕阳斜”、“槛外长江空自流”，关于南京 的诗句，总是落寞中带有一丝高贵；“石头城”、“六朝金粉”、“秦淮明月”，关于南京 的意象，总是唯美中带有一点凄清。即使是在当今，说到南京 ，人们的第一反应还是：一个落寞的古都。“古都”本来就与“孤独”谐音，或许就是如此吧，丰厚的文化底蕴与那一丝失落气息培养出来的人和氛围，都是矛盾着、华丽着、并且毫无疑问地——惹人感慨和热爱的。走在石头城上，可以感受春秋战国的诸侯争霸，理解当时越国的强盛，也可以感受明城墙的气魄。这种雄浑因为吴越的关系，要远胜于西安。面对着秦淮河，想到了宋齐梁陈的繁华，终究一去不复返。',NULL,NULL,'',''), ('67','4','2016-11-06 16:50:08','咨询北京、西藏旅行路线、景点、装备、交通、住宿…… 温暖大叔陪你细品北京、陪你看西藏神山日落……','先后于2014年和2015年两度前往西藏旅行。\r\n2014年3月底组织全国12名驴友前往西藏12天，在著名的“林芝桃花季”先后游览拉萨－林芝－波密－然乌湖一线和拉萨－日喀则－珠峰一线。\r\n2015年9月中组织全国4名驴友前往西藏18天，先后游览西藏大北线（一措再措线路）：拉萨－日喀则－珠峰－玛旁雍措－冈仁波齐－札达－噶尔（狮泉河）－班公措－革吉－昂拉仁措－措勤-扎日南木措－当惹雍措－尼玛－达则错－色林措－班戈－纳木措－拉萨。','100','不可以','可提供最新的西藏旅游线路咨询，可提供详细西藏旅行资讯、全套解决方案，并可协助找到同行伙伴。\r\n西藏陪玩服务需对方提供全部交通、住宿、门票费用（其它个人费用可自行承担）。陪玩服务不包括徒步、转山等耗费体力活动。','',NULL,NULL,'',''), ('68','3','2016-11-06 20:58:33','带你领略广州独特的足球文化，体验天体主场气氛','懂球帝曼联圈球评著名写手小眼怪杰佬带你进入恒大天体河主场领略主场狂热的足球气氛。现场数据与战术分析为你讲解比赛。\r\n\r\n','200','不可以','仅限恒大有主场联赛赛事的时候生效。全程可以粤语国语评述。\r\n\r\n球票可以帮你买哦~球票价格再单独算吧。\r\n\r\n如果同日有英超比赛可以一起去酒吧看，但是费用自理：））','',NULL,NULL,'',''), ('69','245915778@qq.com','2016-11-06 21:08:24','杀手带你游冰城，冰雪大世界、雪地温泉♨、滑雪、雪乡，吃冰糖葫芦、马迭尔冰棍','我是哈尔滨当地人，从小到大都很喜欢美食，哈尔滨这里除了冰雪和夏季凉爽的自然风光，还有许多特色美食，如果你像我一样也是个吃货，俺可以带去体验哈尔滨道外巴洛克小吃，张包铺，最后一家国营更新饭店，老仁义红光混沌馆的火烧，体验哈尔滨最传统最具代表性的生活，穿过历史小街感受这座城市的历史文化，哈尔滨最好吃的锅包肉，最具特色的俄式西餐，馆藏在楼宇间出人意料的美味私房菜，各大高校周围出名的夜市，例如美女众多的师大夜市，如果咱们有缘，除了必去的几大著名景点外，俺还可以带你去一些花很少的钱就可以看到的美景，还可以免费赠送你中国常春藤盟校哈尔滨工业大学半日游，一起体验位于冰城的百年名校的独特气息，在学校餐厅吃顿午餐或晚餐。总之如果你不是哈尔滨人，我会为你在这座城市的旅行增添一份不同的记忆。','200','可以','D1.白天畅游太阳岛雪博会、东北虎林园、夜游冰雪大世界\r\nD2.游中央大街（品尝正宗的马迭尔冰棍）、圣.索菲亚教堂、老道外巴洛克建筑、防洪纪念塔\r\nD3-D4.雪乡两日，早上包车哈尔滨出发下午1点左右到达牡丹江雪乡，自由活动，戏雪拍美景，睡火炕吃农家菜，第二天起早穿越（大约4-5小时），下午坐车返回哈尔滨\r\nD5-D6.哈尔滨到大庆2-3小时车程，到达大庆林甸雪地温泉♨（套票吃住全含）\r\nD7-D8.哈尔滨到吉林3小时车程，到达休整戏雪吃特色美食，第二天早上看雾凇美景、拍美片，下午返回哈尔滨\r\n\r\n根据个人时间选择路线','东北美食：杀猪菜、大丰收、小鸡炖蘑菇、锅包肉、商委红肠、秋林面包',NULL,NULL,'',''), ('70','245915777@qq.com','2016-11-06 21:15:49','带你骑行长沙。教你做衡东土菜。','我是一个健身教练，喜欢爬山，骑行','200','可以','长沙骑行，先租车，如果您有车就不需要租。然后从长沙理工出发，途径长沙三桥猴子石大桥，桥上风景不错，然后去岳麓山，感受千年学府的浓郁书香气息，下了岳麓山去橘子洲环洲骑行，感受毛爷爷当年指点江山的地方。然后如果体力还狗可以去梅溪湖，湖畔美景不容错过。\r\n衡东土菜，湖南衡阳衡东土菜，你值得拥有，够辣够香够野性！','',NULL,NULL,'',''), ('71','2','2016-11-06 21:18:58','音乐人美食家的私厨料理邀你品尝','网店店主，半调子音乐人，爵士鼓手，说唱歌手，美食节目主持','120','不可以','聚会是在我们自己家里，不大的地方。\r\n\r\n有音乐人来的时候，这里是音乐工作室，国内最新的音乐设备大多第一时间会寄到这里评测。\r\n\r\n有学生来的时候这里是爵士鼓教室，全钢制隔音房加上和橘丽丝同一年出生的一套雅马哈爵士鼓。\r\n\r\n有朋友来的时候这里是Party House,100寸投影和XBOX还有各种监听级音箱。但不管谁来，这里都是橘丽丝的私房菜馆。\r\n做上一桌菜的橘丽丝上桌前一定先招呼大家喝一杯，川妹子的酒量不输东北姑娘，只要拿着酒杯那么天南地北咱哥俩谁跟谁。','就像橘丽丝歌里唱的一样—“都喊我姐老倌，都说我管得宽，你来四川酒杯端起你是把我喝不翻。”\r\n想说的很多，其实意思是，晚来天欲雪，能饮一杯无？\r\n菜管饱，酒管够。唯一的缺点就是橘丽丝喝多了说话带loop',NULL,NULL,'',''), ('72','4','2016-11-06 21:22:10','让我带你拍遍上海的大街小巷吧','在上海从事了十年的摄影行业，擅长旅拍及人像。','300','可以','想要在旅行中想拍到不一样的照片，那您找我就对了。\r\n让我带您游上海，带您拍上海特色的石库门，老弄堂……………来吧！我们还可以郊区拍上海的古镇，上海的古镇有几十个，每个古镇都有它独特的味道。有时间还可以看看上海隔壁城市的徽派艺术。也是很具有代表意义的。\r\n还等什么，出发吧，我在上海等您。','',NULL,NULL,'',''), ('73','245915769@qq.com','2016-11-06 21:27:21','呼伦贝尔蒙古妹带你穿蒙古袍在草原载歌载舞','姜饼人：资深旅行体验官，私人旅行定制师，金牌在行旅行咨询师。地地道道蒙古族妹子，深谙蒙古族文化，习俗。','299','不可以','如果你想体验真正的呼伦比尔文化，走进呼伦贝尔人的生活，穿上蒙古袍在草原上尽情载歌载舞，拍下美照，在朋友圈炫出最耀眼的呼伦贝尔旅行。品尝当地人最喜欢的地道蒙古美食，俄罗斯美食。来租下我的时间吧。价格包含往返草原的车费，蒙古袍的租费（一天）全程拍照，全程土著陪同。时间为6小时。','',NULL,NULL,'',''), ('74','245915765@qq.com','2016-11-06 21:30:51','带你逛成都，顺便拍写真','我是上班族，所以只有周末和节假日可以陪你浪。\r\n旅行途中我可以给你拍美美的照片，如果需要可以帮你简单做后期。\r\n','0','可以','如果我们有缘相见，你可以享受毫不操心的旅行，因为我会帮你规划景点，查阅交通，寻觅美食。\r\n游玩产生的费用我们AA。','',NULL,NULL,'',''), ('75','4','2016-11-07 11:35:39','陪你看看小众景点，吃吃本地小吃。','如果你愿意摆POSE，我可以为你拍点喜欢的照片，虽然不是专业摄影师。如果你愿意写点文字，我可以帮你做本个性化游记，虽然不是专业的编辑。大都市的繁华，不需要本地人陪同的。我能做的，是可以带你去点小众地方，吃个本地人都喜欢去的小店，开心就好。','100','不可以','如果你愿意摆POSE，我可以为你拍点喜欢的照片，虽然不是专业摄影师。如果你愿意写点文字，我可以帮你做本个性化游记，虽然不是专业的编辑。大都市的繁华，不需要本地人陪同的。我能做的，是可以带你去点小众地方，吃个本地人都喜欢去的小店，开心就好。','',NULL,NULL,'',''), ('77','333@qq.com','2016-11-12 10:19:05','为你呈现精彩的 西安的吃喝玩乐','\r\n\r\n本人乐观开朗，喜欢旅游摄影，喜欢开朗的小伙伴一道漫步古城，可以把美美的你拍得更迷人哟。','50','不可以','可以带你聆听千年钟声，漫步城墙，学说陕西话，品尝地道美食，尤其西安肉夹馍，面皮，嘹咋了。为你提供详细地出行计划参考。','',NULL,NULL,'',''), ('80','2','2017-03-08 14:39:32','44','4','44','是','4','','4','4','http://olb1e0iqk.bkt.clouddn.com/65c6e859-9a5a-4e7e-8a8b-7db03c5821e0.png','http://olb1e0iqk.bkt.clouddn.com/75768731-9bf9-4870-adad-1d2cdae09374.png,http://olb1e0iqk.bkt.clouddn.com/d3126a4b-9a6c-4336-aed3-e791ebe49d56.png,http://olb1e0iqk.bkt.clouddn.com/dda9aa86-5e31-4314-b1b6-738b81b8b339.jpg,http://olb1e0iqk.bkt.clouddn.com/d714da98-014c-4ecc-b926-4ced9899f0ab.jpg'), ('82','2','2017-03-08 16:31:08','带你逛吃古荆州，记录你和古早味~','带你一天走遍荆州城，体验古城的魅力。线路提前定制，人文、美食、自然景观都有，可根据您的爱好来挑选不同的套餐。很乐意给蜂蜂拍下您与荆州城的记忆~~时长一般是一天，也可以是半天，会半价。吃行费用自出哦，但如果有缘我请你吃~~ ','122','是','带你一天走遍荆州城，体验古城的魅力。线路提前定制，人文、美食、自然景观都有，可根据您的爱好来挑选不同的套餐。很乐意给蜂蜂拍下您与荆州城的记忆~~时长一般是一天，也可以是半天，会半价。吃行费用自出哦，但如果有缘我请你吃~~ ','','带你一天走遍荆州城，体验古城的魅力。线路提前定制，人文、美食、自然景观都有，可根据您的爱好来挑选不同的套餐。很乐意给蜂蜂拍下您与荆州城的记忆~~时长一般是一天，也可以是半天，会半价。吃行费用自出哦，但如果有缘我请你吃~~ ','带你一天走遍荆州城，体验古城的魅力。线路提前定制，人文、美食、自然景观都有，可根据您的爱好来挑选不同的套餐。很乐意给蜂蜂拍下您与荆州城的记忆~~时长一般是一天，也可以是半天，会半价。吃行费用自出哦，但如果有缘我请你吃~~ ','http://olb1e0iqk.bkt.clouddn.com/c4234f8c-dc1c-4107-8f8a-f1ddeaed5e18.jpg','http://olb1e0iqk.bkt.clouddn.com/1f46290f-59b6-4ed0-9970-7cea182a2031.jpg,http://olb1e0iqk.bkt.clouddn.com/4eb22caf-ccf8-4105-b27c-a42b8534bf00.jpg,http://olb1e0iqk.bkt.clouddn.com/00e3c2d7-81e3-4ace-9e4f-6081b31ac3b1.jpg,http://olb1e0iqk.bkt.clouddn.com/48f4a716-d1bf-406d-b006-b178283136d6.jpg,http://olb1e0iqk.bkt.clouddn.com/cbf08c9e-806c-44f4-a247-44f7c8f3834d.jpg,http://olb1e0iqk.bkt.clouddn.com/f30da4cb-db4d-4802-a246-3be679852e6a.jpg'), ('83','2','2017-03-08 16:35:08','来南京陪你玩，为你拍摄属于你的民国小清新记忆','大家好，我是唐人立，从长相看，我是林更新与陈汉典的结合（此处应有掌声）。\r\n\r\n大学期间游遍全国，被称为“逃学威龙”，毕业前在北京798开办个人影展\"逃学去旅行——4年200城\"，毕业后出了本书叫《一个人走世界——大学4年 200城的旅行》。\r\n\r\n工作后两次辞职，三次前往泰国、两次前往印度。我喜欢在路上的日子，让我遇见了一个全新的自己，一个更好的自己……\r\n\r\n我不以赚钱为目的，我希望能认识更多同样爱旅行爱拍照的你。在南京我有个摄影工作室，欢迎大家参观玩耍。','100','是','我会为你在南京拍摄一组小清新写真。\r\n\r\n我会带你一同寻找藏在小巷中的美食。\r\n\r\n如果你喜欢明信片，我会送你我拍的照片做成的明信片。\r\n\r\n我会带你去先锋书店，浦口火车站。\r\n\r\n或者我可以带你去江宁爱情隧道。\r\n\r\n或者我会带你去紫金山上看南京城的夜景（可以开车上山）。\r\n\r\n如果你是南京人，我会带你感受一个未曾遇见的南京。\r\n\r\n如果你不是南京人，我会为你在这座城市的旅行增添一份不同的记忆。','','周末','一天的时间陪你玩陪你聊天、并为你拍摄一套写真。\r\n\r\n吃饭AA，乘坐公交地铁AA，门票AA。','http://olb1e0iqk.bkt.clouddn.com/4a82e075-f10b-4aaf-a7ac-8c4cf9f0cece.jpg','http://olb1e0iqk.bkt.clouddn.com/4bc804e5-c447-4e6e-9edb-1c91bdf58746.jpg,http://olb1e0iqk.bkt.clouddn.com/1c45d73b-0644-49fd-bdd6-aeb84f121c6b.jpeg,,,,http://olb1e0iqk.bkt.clouddn.com/a7f97555-b3e8-4359-a888-0612445ecfa2.jpeg'), ('95','2','2017-03-08 17:09:57','1','1','1','否','1','1','1','1','http://olb1e0iqk.bkt.clouddn.com/580cb35e-9ac4-4c66-9dbc-92ed1f260d32.png','http://olb1e0iqk.bkt.clouddn.com/302fd441-46a1-4b3a-bd07-1da5fee3260f.png,http://olb1e0iqk.bkt.clouddn.com/b5dfe422-d73b-4d2a-ab5f-23c3041a53f3.jpg,http://olb1e0iqk.bkt.clouddn.com/6fb23ddb-33e8-40ec-99a0-95732b9cd99a.jpg,http://olb1e0iqk.bkt.clouddn.com/8f9e72ff-397f-428c-845b-176d01135a7b.jpg'), ('96','2','2017-03-08 17:11:32','1111111','1','1','是','1','1','1','1','http://olb1e0iqk.bkt.clouddn.com/a087d317-89d3-470e-80d7-46fd08efdb27.png','http://olb1e0iqk.bkt.clouddn.com/cbe39097-3dcb-4e92-90e8-28985b33ca9c.png,http://olb1e0iqk.bkt.clouddn.com/82230579-a141-445b-9d7d-759b97ea6140.png,http://olb1e0iqk.bkt.clouddn.com/ad07bb2c-6ab6-4c56-851c-f9d7b5ee6530.jpg,http://olb1e0iqk.bkt.clouddn.com/6c371375-67b8-47f1-b22b-048cb7d2331b.png'), ('97','2','2017-03-08 17:12:22','22222','2','2','否','2','2','2','2','http://olb1e0iqk.bkt.clouddn.com/3caf3cd6-de9e-4bcc-a306-b70e4aba3f8d.jpg','http://olb1e0iqk.bkt.clouddn.com/2d841972-57e4-4f57-937f-58e6505b5b98.png,http://olb1e0iqk.bkt.clouddn.com/0324d189-efb9-44dc-bf01-1a788a573e0f.png,http://olb1e0iqk.bkt.clouddn.com/105e3974-7dfc-49e2-ac06-dffa013de0aa.jpg,http://olb1e0iqk.bkt.clouddn.com/470eeb8a-65a4-4d21-97a3-821625a68edb.png'), ('98','2','2017-03-08 17:16:41','6','6','6','否','6','6','6','6','http://olb1e0iqk.bkt.clouddn.com/11007621-49b8-4d71-9633-628761536a67.png','http://olb1e0iqk.bkt.clouddn.com/375aea50-744e-49e9-87e0-af182c623734.png,http://olb1e0iqk.bkt.clouddn.com/2bcd0f38-7ad8-489e-b427-42cf6716fd79.png,http://olb1e0iqk.bkt.clouddn.com/32180306-8919-48f7-927b-527cf3927809.jpg,http://olb1e0iqk.bkt.clouddn.com/3fee1010-16c0-4525-9aef-7b1af1175177.png'), ('99','2','2017-03-08 17:23:31','22','2','2','是','2','2','2','2','http://olb1e0iqk.bkt.clouddn.com/981d2154-d6c2-4dde-b7b3-4209c96f0241.jpg','http://olb1e0iqk.bkt.clouddn.com/067a7a68-974e-4d2a-9ff8-4681fe405812.png,http://olb1e0iqk.bkt.clouddn.com/155b669b-8f12-444a-9ce1-e51c97deb0ea.jpg,http://olb1e0iqk.bkt.clouddn.com/286feeba-1a64-425b-8616-df65de3b1485.jpg,http://olb1e0iqk.bkt.clouddn.com/d32799a7-32a6-4403-a170-ac62230ac5dd.jpg'), ('100','2','2017-03-08 17:24:46','22','2','2','是','2','2','2','2','http://olb1e0iqk.bkt.clouddn.com/b761b5b7-d863-4896-b59a-da7b2614281f.jpg','http://olb1e0iqk.bkt.clouddn.com/6efbadd6-73fe-4428-86a5-b850f37c1bb0.png,http://olb1e0iqk.bkt.clouddn.com/441af795-8756-4c84-aca5-80807403285d.jpg,http://olb1e0iqk.bkt.clouddn.com/6cdf34f8-784b-4d4c-9b79-51720b48caf0.jpg,http://olb1e0iqk.bkt.clouddn.com/0852dd80-6b86-4320-bcfc-cbd4744602dd.jpg'), ('101','2','2017-03-08 17:25:09','66','6','6','否','6','','6','6','http://olb1e0iqk.bkt.clouddn.com/1740344d-9ac6-4244-8e9e-7c5a64d96482.png','http://olb1e0iqk.bkt.clouddn.com/74572c87-0477-4024-9357-ec24431f48a4.png,http://olb1e0iqk.bkt.clouddn.com/9c0f0880-a609-4834-b5bc-f64198ae5fce.png,http://olb1e0iqk.bkt.clouddn.com/ff7a9fea-4b37-4cf9-a317-6d46621ed328.jpg,http://olb1e0iqk.bkt.clouddn.com/e31238e9-c659-4e06-9a92-547f6a60a11c.png'), ('102','2','2017-03-08 17:27:26','3','3','3','否','3','3','3','3','http://olb1e0iqk.bkt.clouddn.com/6138839d-2c07-4671-8260-7d671a6b0044.png','http://olb1e0iqk.bkt.clouddn.com/493245e1-d2e4-43e9-b086-a62fce407243.png,http://olb1e0iqk.bkt.clouddn.com/2b777cdf-3a75-4464-9fff-76668562fdb7.png,http://olb1e0iqk.bkt.clouddn.com/0c305842-bf6e-43b3-aa64-08f09684c311.jpg,http://olb1e0iqk.bkt.clouddn.com/8cde6f1a-fcbe-4acc-8fe2-b2bbab795b3b.png'), ('103','2','2017-03-08 17:28:10','7','7','7','是','7','7','7','7','http://olb1e0iqk.bkt.clouddn.com/4052bf5d-8e43-4f30-badd-19bde89c8b73.jpg','http://olb1e0iqk.bkt.clouddn.com/2daabcec-d9c8-40fc-951d-4ae992d8f71a.png,http://olb1e0iqk.bkt.clouddn.com/114ff8bb-1d78-471f-bc66-83a2642d91f7.jpg,http://olb1e0iqk.bkt.clouddn.com/500128ff-ebae-425a-9cb2-fd8706197fdd.jpg,http://olb1e0iqk.bkt.clouddn.com/dbbc0deb-0f6d-48b1-ac5f-1e7db4709a75.jpg'), ('104','2','2017-03-08 17:30:19','22','2222','2','是','2','2','2','2','http://olb1e0iqk.bkt.clouddn.com/03a38846-e231-482c-9280-69b993d9709f.png','http://olb1e0iqk.bkt.clouddn.com/133c741a-ca39-4296-8c29-f7ca75117cc2.png,http://olb1e0iqk.bkt.clouddn.com/855d25c8-364d-431e-b51d-a1c0d7356bdc.png,http://olb1e0iqk.bkt.clouddn.com/7fce2134-13a8-4fcc-9849-5496a80b824d.jpg,http://olb1e0iqk.bkt.clouddn.com/0fe082d1-9984-45ea-83de-89617148474e.png'), ('105','2','2017-03-08 17:52:43','1','1','1','否','1','1','1','1','http://olb1e0iqk.bkt.clouddn.com/f902909e-058d-4f97-9127-4327177c29ea.png','http://olb1e0iqk.bkt.clouddn.com/af8334ef-1d74-4c2b-8ce5-cdede1177cf7.png,http://olb1e0iqk.bkt.clouddn.com/35dc3597-71aa-4ea9-8527-d685e22ae7b0.png,http://olb1e0iqk.bkt.clouddn.com/b0759174-37cf-4c94-8628-2a22ca0cab4d.jpg,http://olb1e0iqk.bkt.clouddn.com/58c75213-ef7e-4d27-b2fe-bb317ada5de1.png'), ('106','2','2017-03-08 17:53:17','2','2','2','否','2','','2','2','http://olb1e0iqk.bkt.clouddn.com/57e8fbc4-762f-45ea-9aaa-e490cb8a28e4.jpg','http://olb1e0iqk.bkt.clouddn.com/13c4b735-a753-4a8f-9c24-4a984a14965c.jpg,http://olb1e0iqk.bkt.clouddn.com/593b6468-2a4a-42a0-b8da-44fade7e3f32.jpg,http://olb1e0iqk.bkt.clouddn.com/4d57b43e-98be-4427-a666-28cec59fdb55.jpg,http://olb1e0iqk.bkt.clouddn.com/726dda4c-fb84-4162-b933-26d9e90e93a8.jpg'), ('107','2','2017-03-08 18:01:19','666','6','6','否','6','6','6','6','http://olb1e0iqk.bkt.clouddn.com/15ed7de1-a82f-4edc-996c-05c85fe6a5df.png','http://olb1e0iqk.bkt.clouddn.com/93bfa03f-55af-4661-a758-9d2c0838195d.png,http://olb1e0iqk.bkt.clouddn.com/63d452df-e8cc-4486-afbe-301717274873.png,http://olb1e0iqk.bkt.clouddn.com/8e7070bd-5125-403e-87a7-ee04cc2aed23.jpg,http://olb1e0iqk.bkt.clouddn.com/6767ff56-29e5-464b-8e2d-90243aebb691.png');
INSERT INTO `user` VALUES ('2','','江唯','江唯','男','2016-10-19','350481199111296522','南京','建筑师','18156023235','18156023235','土拨鼠','18459999999','64b7799b-e12c-40e3-a421-673378f04b2c.jpg','2016-11-06 17:03:22'), ('22@qq.com','','22@qq.com','未知','未知',NULL,'未知','未知','未知','未知','未知','来自逸途','未知','avatar_small.jpg','2016-11-12 11:57:00'), ('245915765@qq.com','','布兰妮','布兰妮小甜甜','男','2016-09-21','350481199411111111','成都','歌手','110','8888888','YITU ZUREN','18459999999','51117e50-7075-4f55-8061-8af3786af41c.jpg','2017-02-14 09:59:50'), ('245915769@qq.com','','伊莎贝拉的姜饼人','曲琳琳','女','1990-11-22','350481199011222222','呼伦贝尔','私人旅行定制师','18859454545','18859454545','来自逸途','未知','0c5a20c9-9067-4793-9805-ee70d918fd71.jpeg','2016-11-06 21:26:27'), ('245915777@qq.com','','小鱼儿','李欣','男','1988-11-22','350444198811222222','长沙','健身教练','15659885454','15659885454','长沙，我来了。from逸途','未知','b7f6b58f-5bb5-4e43-aea1-b0ef3d09083c.jpeg','2016-11-06 21:14:05'), ('245915778@qq.com','','哈哈儿','林纾','男','1995-03-29','350408199503291702','哈尔滨','教师','13405013033','13405013033','来自逸途,去哈尔滨','未知','d26964af-a12f-4de6-9074-adfb46b3be31.jpeg','2016-11-06 21:05:05'), ('3','','南风二木','宝剑兄','女','1988-06-02','35048119999999','广州','土木工程师','13159687879','13159687879','我想去广州','18459111111','bc19106f-b347-46d4-b0e6-250c6915ac39.jpeg','2016-11-07 22:19:49'), ('333@qq.com','','333@qq.com','未知','男','1970-01-01','未知','西安','博物维护','未知','未知','来自逸途','未知','d2edd1c3-17f5-4ef5-b65a-4f846e6be11e.jpeg','2016-11-12 10:10:27'), ('343434','14c879f3f5d8ed93a09f6090d77c2cc3',NULL,'','',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'2017-03-09 17:08:35'), ('4','','丢洛','歌浴森','男','2016-11-05','35042349890010','上海','歌手','18459666666','18459999999','我在上海等你','18459999999','67e0ff6f-1cd4-4976-a8a5-68f4d866adfc.jpg','2016-10-26 15:37:07');
