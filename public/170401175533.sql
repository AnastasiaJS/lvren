/*
MySQL Backup
Source Server Version: 5.5.50
Source Database: lvren
Date: 2017-04-01 17:55:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `articles`
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `Aid` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) DEFAULT NULL,
  `Article` varchar(10000) DEFAULT NULL,
  `Author` varchar(100) DEFAULT NULL,
  `Summary` varchar(500) DEFAULT NULL,
  `Pic` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Aid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `message`
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `Mid` int(40) NOT NULL AUTO_INCREMENT,
  `Tid` varchar(40) NOT NULL,
  `Text` varchar(255) DEFAULT NULL COMMENT '留言内容',
  `Uid` varchar(40) DEFAULT NULL,
  `Mtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Mid`),
  KEY `Mid` (`Tid`),
  KEY `Uid` (`Uid`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`Uid`) REFERENCES `user` (`Uid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `news`
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `Nid` varchar(40) NOT NULL,
  `Uid` varchar(40) DEFAULT NULL,
  `Tid` varchar(40) DEFAULT NULL,
  `Flag` int(1) DEFAULT '0' COMMENT '是否已读',
  `Type` varchar(255) DEFAULT NULL COMMENT '留言0、回复1、订单2',
  `Ntime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Nid`),
  KEY `Tid` (`Tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='InnoDB free: 11264 kB; (`Uid`) REFER `yitu/user`(`Uid`)';

-- ----------------------------
--  Table structure for `order`
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `Oid` int(18) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `Tid` varchar(18) NOT NULL,
  `Uid` varchar(18) NOT NULL COMMENT '雇主（下单的人）',
  `State` varchar(18) NOT NULL COMMENT '状态',
  `OrderTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '订单时间',
  `Appointment` varchar(30) NOT NULL COMMENT '预约时间',
  `Price` int(18) DEFAULT NULL,
  PRIMARY KEY (`Oid`),
  KEY `Uid` (`Uid`),
  KEY `Tid` (`Tid`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`Uid`) REFERENCES `user` (`Uid`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `pingjia`
-- ----------------------------
DROP TABLE IF EXISTS `pingjia`;
CREATE TABLE `pingjia` (
  `Pid` int(18) NOT NULL,
  `Pingjia` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`Pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `reply`
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply` (
  `Rid` int(40) NOT NULL AUTO_INCREMENT,
  `Mid` int(40) NOT NULL,
  `Uid` varchar(40) NOT NULL COMMENT '谁回复',
  `Reply` varchar(255) DEFAULT NULL,
  `Rtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Rid`),
  KEY `Mid` (`Mid`),
  KEY `Uid` (`Uid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `save`
-- ----------------------------
DROP TABLE IF EXISTS `save`;
CREATE TABLE `save` (
  `Sid` int(40) NOT NULL AUTO_INCREMENT,
  `Uid` varchar(18) NOT NULL,
  `Tid` varchar(18) NOT NULL,
  PRIMARY KEY (`Sid`),
  KEY `save_ibfk_1` (`Uid`),
  KEY `Tid` (`Tid`),
  CONSTRAINT `save_ibfk_1` FOREIGN KEY (`Uid`) REFERENCES `user` (`Uid`),
  CONSTRAINT `save_ibfk_2` FOREIGN KEY (`Tid`) REFERENCES `tourcard` (`Uid`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tourcard`
-- ----------------------------
DROP TABLE IF EXISTS `tourcard`;
CREATE TABLE `tourcard` (
  `Uid` varchar(18) NOT NULL,
  `Uptime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Title` varchar(80) DEFAULT NULL,
  `About` varchar(1000) NOT NULL,
  `Addr` varchar(80) DEFAULT NULL,
  `Price` int(8) NOT NULL,
  `CanCut` varchar(6) DEFAULT '',
  `Play` varchar(1000) DEFAULT NULL COMMENT '玩法',
  `Other` varchar(1000) DEFAULT NULL,
  `AppointTime` varchar(1000) DEFAULT NULL,
  `AboutPrice` varchar(1000) DEFAULT NULL,
  `Face` varchar(1000) NOT NULL,
  `Photos` varchar(1000) NOT NULL,
  `Sort` char(2) DEFAULT NULL,
  PRIMARY KEY (`Uid`),
  KEY `Uid` (`Uid`),
  CONSTRAINT `tourcard_ibfk_1` FOREIGN KEY (`Uid`) REFERENCES `user` (`Uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `Uid` varchar(40) NOT NULL,
  `Password` varchar(32) NOT NULL COMMENT '用户密码',
  `Name` varchar(18) DEFAULT '',
  `Gender` char(6) CHARACTER SET gbk DEFAULT '芳华正茂',
  `Birthday` varchar(18) DEFAULT NULL COMMENT '出生日期',
  `IDCard` char(18) DEFAULT '未知' COMMENT '身份证',
  `Job` varchar(40) DEFAULT '未知',
  `Tellphone` char(11) DEFAULT '未知',
  `Wechat` varchar(18) DEFAULT '未知' COMMENT '微信号',
  `Anhao` varchar(40) DEFAULT '我是旅人' COMMENT '微信暗号',
  `Zhifubao` varchar(255) DEFAULT '未知',
  `HeadPic` varchar(100) DEFAULT 'http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200' COMMENT '头像',
  `RegTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '注册时间',
  `Intro` varchar(100) CHARACTER SET gbk DEFAULT '趁阳光正好，趁微风不噪，趁你还年轻，趁Ta还未老，一起去旅行吧',
  PRIMARY KEY (`Uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records 
-- ----------------------------
INSERT INTO `articles` VALUES ('1','艾瑞克•纽比：努尔斯坦之旅','http://www.traveler.com.cn/traveler/index.php/jplm/classic/829-atknbnestzl','胡子华','“一路走下山来，我只觉得心中舒畅极了。我感觉，今后不会有任何事情值得我们忧虑了。”','http://www.traveler.com.cn/traveler/images/jplm/jd/201508/1.jpg'), ('2','徽州，古宅新生','http://www.traveler.com.cn/traveler/index.php/hotel/hkcd/810-wzgzxs','贺兰','很多人惋惜徽州古宅曾遭到大面积毁坏，但有人丢弃就有人珍惜。在黄山黟县，许多“幸运”的老宅院被慧眼识珠，变身为精品民宿甚至高端酒店，在保存古宅旧风骨的同时，更在不断思索如何将传统融入当代人的审美与诉求中。','http://www.traveler.com.cn/traveler/images/jplm/jmwj/201507/0.jpg'), ('3','机场书店 旅行驿站','http://www.traveler.com.cn/traveler/index.php/jplm1/jmwj/hkcd/659-jcsdlxyz','文泽尔',' 就在实体书店遭受网络冲击，逐渐成为“弱势群体”时，机场书店却逆势而生（就连经常被国内旅行者诟病的中信书店2012年营业额也开始破亿了）。在候机的漫长时间里，书店成为惟一能和DFS抗衡的旅行者驿站。相对于国内，外国很多机场书店不仅能买到打折书、获赠精美礼品，甚至还能淘到宝贝级的二手书或是免费以书易书，它们不甘心只做打发时间的工具，而是要让接下来的旅途变得有趣和更有意义。','http://www.traveler.com.cn/traveler/images/jplm/jmwj/hk/201410/1.jpg'), ('4','黄山，是风景在召唤我','http://www.traveler.com.cn/traveler/index.php/jplm1/mdd/gncd/677-sfjzzhw','贺兰',' 迈克尔•肯纳（Michael Kenna），1953年出生于英国，以充满诗意、禅蕴的摄影作品享誉世界，作品同时被世界几十家著名美术馆所收藏。2008~2010年期间，他三次前往黄山拍摄，作品一经推出就在全球引起不小的震动。他拍摄的黄山，有着中国水墨画般的虚实意境，灰而不脏，黑而不死，处处充满了东方式的审美与禅意。','http://www.traveler.com.cn/traveler/images/jplm/mdd/gn/201411/1.jpg'), ('5','遁世高野山','http://www.traveler.com.cn/traveler/index.php/jplm1/mdd/hwcd/820-dsgys','康昊','1200年前，日本真言宗创始人空海在此开山建寺，如今作为世界遗产的高野山上密布着117所寺庙和1座佛教大学。这里是日本最大的出家之地。除了远离都市的高山风景、幽静别致的僧舍庭院和洋洒成篇的佛教历史，行旅高野山还有许多独一无二的体验，旅行者甚至可以在山中林立的寺庙间择一寺而借宿，体验日本现代僧侣的山间遁世生活。','http://www.traveler.com.cn/traveler/images/jplm/mdd/201508/2.jpg');
INSERT INTO `message` VALUES ('1','1@qq.com','1','343434','2017-03-29 11:12:59'), ('2','1@qq.com','哈哈','343434','2017-03-29 11:35:10'), ('3','222','最后一张图的灯是在什么节日里的才有的，好美','343434','2017-03-30 09:37:25'), ('4','222','很好','343434','2017-03-30 10:38:58'), ('5','222','xx','343434','2017-03-30 10:44:53'), ('6','333@qq.com','lll','343434','2017-03-30 12:52:58'), ('7','222','333','343434','2017-03-30 13:04:02'), ('8','222','烦恼歌','343434','2017-04-01 15:14:03');
INSERT INTO `news` VALUES ('M1','343434','1@qq.com','0','0','2017-03-29 11:12:59'), ('M2','343434','1@qq.com','0','0','2017-03-29 11:35:10'), ('M3','343434','222','1','0','2017-03-30 09:38:07'), ('M4','343434','222','1','0','2017-03-30 10:39:18'), ('M5','343434','222','1','0','2017-03-30 10:45:09'), ('M6','343434','333@qq.com','1','0','2017-03-30 12:53:59'), ('M7','343434','222','1','0','2017-04-01 15:14:33'), ('M8','343434','222','1','0','2017-04-01 15:14:37'), ('O19','343434','222','1','2','2017-04-01 15:14:58'), ('O21','22@qq.com','222','1','2','2017-04-01 17:33:44'), ('O22','343434','222','0','2','2017-04-01 17:55:21'), ('R1','222','222','1','1','2017-03-30 09:44:45'), ('R2','222','222','1','1','2017-03-30 12:51:38'), ('R3','222','222','1','1','2017-03-30 12:52:40'), ('R4','222','222','1','1','2017-04-01 17:50:14'), ('R5','222','222','1','1','2017-04-01 17:40:10'), ('R6','333@qq.com','333@qq.com','1','1','2017-03-30 12:54:20'), ('R7','222','222','1','1','2017-04-01 17:40:02');
INSERT INTO `order` VALUES ('1','22@qq.com','2','1','2017-03-20 15:33:08','2017-03-27 06:22','111'), ('2','2','22@qq.com','1','2017-03-20 15:33:30','2018-03-27 06:22','2'), ('3','2','245915765@qq.com','2','2017-03-20 15:33:53','2017-03-23 06:22','11'), ('5','2','3','2','2017-03-20 17:43:09','2017-03-23 00:00','100'), ('6','2','3','0','2017-03-24 15:11:23','','12'), ('8','343434','343434','2','2017-03-25 23:41:53','2017-03-30 00:00','6'), ('10','343434','22@qq.com','2','2017-03-25 23:48:42','2017-03-30 00:00','60'), ('14','2@qq.com','22@qq.com','2','2017-03-26 12:14:09','2017-03-30 17:00','100'), ('15','2@qq.com','343434','0','2017-03-26 22:12:49','2017-03-29 00:00','100'), ('16','2@qq.com','2','0','2017-03-26 22:15:12','2017-04-06 00:00','100'), ('17','333@qq.com','343434','0','2017-03-29 10:58:19','2017-08-30 00:00','2'), ('22','222','343434','1','2017-04-01 17:50:49','2017-04-05 00:00','333');
INSERT INTO `pingjia` VALUES ('18','很美丽的女孩，旅途愉快~');
INSERT INTO `reply` VALUES ('1','3','222','是在元宵节哈','2017-03-30 09:39:19'), ('2','3','222','哈哈哈','2017-03-30 10:08:05'), ('3','4','222','==','2017-03-30 10:39:22'), ('4','5','222','ggg','2017-03-30 10:45:12'), ('5','5','222','22222','2017-03-30 11:58:28'), ('6','6','333@qq.com','yyy','2017-03-30 12:54:03'), ('7','8','222','张学友','2017-04-01 15:14:45');
INSERT INTO `save` VALUES ('15','2@qq.com','2'), ('16','343434','2@qq.com'), ('17','343434','343434');
INSERT INTO `tourcard` VALUES ('1@qq.com','2017-03-28 17:32:59','音乐人美食家的私厨料理邀你品尝','橘丽丝，网店店主，半调子音乐人，爵士鼓手，说唱歌手，美食节目主持。','成都','148','是','聚会是在我们自己家里，不大的地方。\r\n\r\n有音乐人来的时候，这里是音乐工作室，国内最新的音乐设备大多第一时间会寄到这里评测。\r\n\r\n有学生来的时候这里是爵士鼓教室，全钢制隔音房加上和橘丽丝同一年出生的一套雅马哈爵士鼓。\r\n\r\n有朋友来的时候这里是Party House,100寸投影和XBOX还有各种监听级音箱。','但不管谁来，这里都是橘丽丝的私房菜馆。\r\n做上一桌菜的橘丽丝上桌前一定先招呼大家喝一杯，川妹子的酒量不输东北姑娘，只要拿着酒杯那么天南地北咱哥俩谁跟谁。','随你定','包吃','http://olb1e0iqk.bkt.clouddn.com/65c6e859-9a5a-4e7e-8a8b-7db03c5821e0.png','http://olb1e0iqk.bkt.clouddn.com/75768731-9bf9-4870-adad-1d2cdae09374.png,http://olb1e0iqk.bkt.clouddn.com/d3126a4b-9a6c-4336-aed3-e791ebe49d56.png,http://olb1e0iqk.bkt.clouddn.com/dda9aa86-5e31-4314-b1b6-738b81b8b339.jpg,http://olb1e0iqk.bkt.clouddn.com/d714da98-014c-4ecc-b926-4ced9899f0ab.jpg','2'), ('2','2017-03-27 16:01:44','老夫聊发少年狂','12','安徽','12','是','12','3','12','12','http://olb1e0iqk.bkt.clouddn.com/d6d55542-f435-4b87-b689-61b63450a7a2.jpg','http://olb1e0iqk.bkt.clouddn.com/597d763b-79d2-42ee-a069-0914a051950b.jpg,http://olb1e0iqk.bkt.clouddn.com/7d3f35ab-df90-4039-82d0-9f3d08f0e6f5.jpg,http://olb1e0iqk.bkt.clouddn.com/6bfc6ea6-48da-4b4e-9a4d-29ef4de55163.jpg,http://olb1e0iqk.bkt.clouddn.com/5121e7db-384c-40e4-9853-7610041318d4.jpg,http://olb1e0iqk.bkt.clouddn.com/a6ab6679-ecf0-4884-bb3a-cdafc319fc65.jpg','1'), ('222','2017-03-29 09:55:52','1321','省道','桂林','200','是','省道','省道','省道','但是','http://olb1e0iqk.bkt.clouddn.com/90a994b5-390f-4620-a2bf-556f2f472ce4.jpg','http://olb1e0iqk.bkt.clouddn.com/f003c061-3804-4b6d-9d1e-62e62f4fadb3.jpg,http://olb1e0iqk.bkt.clouddn.com/2db5e5c7-4452-4736-807e-7f2e14e3dfba.jpg,http://olb1e0iqk.bkt.clouddn.com/5e8949a5-8cb4-46df-9491-b5d792d4c16e.jpg,http://olb1e0iqk.bkt.clouddn.com/d75edeba-926c-4e03-9d32-91401b6313ea.jpg','0'), ('22@qq.com','2017-03-27 16:01:49','带你逛吃古荆州，记录你和古早味~','带你一天走遍荆州城，体验古城的魅力。线路提前定制，人文、美食、自然景观都有，可根据您的爱好来挑选不同的套餐。很乐意给蜂蜂拍下您与荆州城的记忆~~时长一般是一天，也可以是半天，会半价。吃行费用自出哦，但如果有缘我请你吃~~ ','吉尔吉斯斯坦','122','是','带你一天走遍荆州城，体验古城的魅力。线路提前定制，人文、美食、自然景观都有，可根据您的爱好来挑选不同的套餐。很乐意给蜂蜂拍下您与荆州城的记忆~~时长一般是一天，也可以是半天，会半价。吃行费用自出哦，但如果有缘我请你吃~~ ','','带你一天走遍荆州城，体验古城的魅力。线路提前定制，人文、美食、自然景观都有，可根据您的爱好来挑选不同的套餐。很乐意给蜂蜂拍下您与荆州城的记忆~~时长一般是一天，也可以是半天，会半价。吃行费用自出哦，但如果有缘我请你吃~~ ','带你一天走遍荆州城，体验古城的魅力。线路提前定制，人文、美食、自然景观都有，可根据您的爱好来挑选不同的套餐。很乐意给蜂蜂拍下您与荆州城的记忆~~时长一般是一天，也可以是半天，会半价。吃行费用自出哦，但如果有缘我请你吃~~ ','http://olb1e0iqk.bkt.clouddn.com/c4234f8c-dc1c-4107-8f8a-f1ddeaed5e18.jpg','http://olb1e0iqk.bkt.clouddn.com/1f46290f-59b6-4ed0-9970-7cea182a2031.jpg,http://olb1e0iqk.bkt.clouddn.com/4eb22caf-ccf8-4105-b27c-a42b8534bf00.jpg,http://olb1e0iqk.bkt.clouddn.com/00e3c2d7-81e3-4ace-9e4f-6081b31ac3b1.jpg,http://olb1e0iqk.bkt.clouddn.com/48f4a716-d1bf-406d-b006-b178283136d6.jpg,http://olb1e0iqk.bkt.clouddn.com/cbf08c9e-806c-44f4-a247-44f7c8f3834d.jpg,http://olb1e0iqk.bkt.clouddn.com/f30da4cb-db4d-4802-a246-3be679852e6a.jpg','2'), ('245915765@qq.com','2017-03-27 16:01:51','日暮苍山远2','网店店主，半调子音乐人，爵士鼓手，说唱歌手，美食节目主持','12','120','是','聚会是在我们自己家里，不大的地方。\r\n\r\n有音乐人来的时候，这里是音乐工作室，国内最新的音乐设备大多第一时间会寄到这里评测。\r\n\r\n有学生来的时候这里是爵士鼓教室，全钢制隔音房加上和橘丽丝同一年出生的一套雅马哈爵士鼓。\r\n\r\n有朋友来的时候这里是Party House,100寸投影和XBOX还有各种监听级音箱。但不管谁来，这里都是橘丽丝的私房菜馆。\r\n做上一桌菜的橘丽丝上桌前一定先招呼大家喝一杯，川妹子的酒量不输东北姑娘，只要拿着酒杯那么天南地北咱哥俩谁跟谁。','就像橘丽丝歌里唱的一样—“都喊我姐老倌，都说我管得宽，你来四川酒杯端起你是把我喝不翻。”\r\n想说的很多，其实意思是，晚来天欲雪，能饮一杯无？\r\n菜管饱，酒管够。唯一的缺点就是橘丽丝喝多了说话带loop','12','12','http://olb1e0iqk.bkt.clouddn.com/6d08de44-b0de-483c-ae98-25f1d74564d3.jpg','http://olb1e0iqk.bkt.clouddn.com/67c15bfe-6844-4477-915b-e0680f32a848.jpg,http://olb1e0iqk.bkt.clouddn.com/a16afc20-0300-4a98-acf9-ee7f9d13a75a.jpg,http://olb1e0iqk.bkt.clouddn.com/cf79fd13-b59d-43f2-803b-3622fc48f4ef.jpg,http://olb1e0iqk.bkt.clouddn.com/236edb54-aabb-4086-8442-1823900e94f8.jpg,http://olb1e0iqk.bkt.clouddn.com/d161f9b6-5b3a-4f3c-b32c-2dd9eadb8765.jpg,http://olb1e0iqk.bkt.clouddn.com/c07c7709-bce8-4dab-8f76-967c45095d4a.jpg','3'), ('245915769@qq.com','2017-03-27 16:01:53','22222','2','安徽','2','否','2','2','2','2','http://olb1e0iqk.bkt.clouddn.com/3caf3cd6-de9e-4bcc-a306-b70e4aba3f8d.jpg','http://olb1e0iqk.bkt.clouddn.com/2d841972-57e4-4f57-937f-58e6505b5b98.png,http://olb1e0iqk.bkt.clouddn.com/0324d189-efb9-44dc-bf01-1a788a573e0f.png,http://olb1e0iqk.bkt.clouddn.com/105e3974-7dfc-49e2-ac06-dffa013de0aa.jpg,http://olb1e0iqk.bkt.clouddn.com/470eeb8a-65a4-4d21-97a3-821625a68edb.png','4'), ('245915777@qq.com','2017-03-27 16:01:56','1111111','1','呼和浩特','1','是','1','1','1','1','http://olb1e0iqk.bkt.clouddn.com/a087d317-89d3-470e-80d7-46fd08efdb27.png','http://olb1e0iqk.bkt.clouddn.com/cbe39097-3dcb-4e92-90e8-28985b33ca9c.png,http://olb1e0iqk.bkt.clouddn.com/82230579-a141-445b-9d7d-759b97ea6140.png,http://olb1e0iqk.bkt.clouddn.com/ad07bb2c-6ab6-4c56-851c-f9d7b5ee6530.jpg,http://olb1e0iqk.bkt.clouddn.com/6c371375-67b8-47f1-b22b-048cb7d2331b.png','5'), ('245915778@qq.com','2017-03-27 16:01:59','6','6','吉尔吉斯斯坦','6','否','6','6','6','6','http://olb1e0iqk.bkt.clouddn.com/11007621-49b8-4d71-9633-628761536a67.png','http://olb1e0iqk.bkt.clouddn.com/375aea50-744e-49e9-87e0-af182c623734.png,http://olb1e0iqk.bkt.clouddn.com/2bcd0f38-7ad8-489e-b427-42cf6716fd79.png,http://olb1e0iqk.bkt.clouddn.com/32180306-8919-48f7-927b-527cf3927809.jpg,http://olb1e0iqk.bkt.clouddn.com/3fee1010-16c0-4525-9aef-7b1af1175177.png','5'), ('2@qq.com','2017-03-27 16:02:01','人与地坛','地道的北京人','北京','100','是','北京秘密','','两天一夜','门票','http://olb1e0iqk.bkt.clouddn.com/9adbed12-c4cd-4348-a4b7-2f9872836feb.png','http://olb1e0iqk.bkt.clouddn.com/80338c12-7e51-4ae7-b2d6-a42fff6bac27.png,http://olb1e0iqk.bkt.clouddn.com/609c9eb4-fa05-4436-b79c-baece07fe7b2.png,http://olb1e0iqk.bkt.clouddn.com/632891f7-02bf-4224-a834-0e9c4ea4052c.png,http://olb1e0iqk.bkt.clouddn.com/53085b91-5700-48d0-b78f-9228a4afad6a.png','4'), ('3','2017-03-27 16:02:04','22','2','吉尔吉斯斯坦','2','否','2','2','2','2','http://olb1e0iqk.bkt.clouddn.com/981d2154-d6c2-4dde-b7b3-4209c96f0241.jpg','http://olb1e0iqk.bkt.clouddn.com/455143cb-5b7e-48be-ab58-815bf47ccb98.jpg,http://olb1e0iqk.bkt.clouddn.com/04d1b17b-d00e-4560-8a95-b5c227b0ae31.png,http://olb1e0iqk.bkt.clouddn.com/acfb6bf7-8760-436e-a9c4-760f7d7e018d.jpg,http://olb1e0iqk.bkt.clouddn.com/75473bac-0fd0-4070-a988-dd203cd4eb28.jpg','3'), ('333@qq.com','2017-03-27 16:02:07','22','2','吉尔吉斯斯坦','2','是','2','2','2','2','http://olb1e0iqk.bkt.clouddn.com/b761b5b7-d863-4896-b59a-da7b2614281f.jpg','http://olb1e0iqk.bkt.clouddn.com/6efbadd6-73fe-4428-86a5-b850f37c1bb0.png,http://olb1e0iqk.bkt.clouddn.com/441af795-8756-4c84-aca5-80807403285d.jpg,http://olb1e0iqk.bkt.clouddn.com/6cdf34f8-784b-4d4c-9b79-51720b48caf0.jpg,http://olb1e0iqk.bkt.clouddn.com/0852dd80-6b86-4320-bcfc-cbd4744602dd.jpg','1'), ('343434','2017-03-27 16:02:09','66','6','吉尔吉斯斯坦','6','是','6','','6','6','http://olb1e0iqk.bkt.clouddn.com/1740344d-9ac6-4244-8e9e-7c5a64d96482.png','http://olb1e0iqk.bkt.clouddn.com/74572c87-0477-4024-9357-ec24431f48a4.png,http://olb1e0iqk.bkt.clouddn.com/9c0f0880-a609-4834-b5bc-f64198ae5fce.png,http://olb1e0iqk.bkt.clouddn.com/ff7a9fea-4b37-4cf9-a317-6d46621ed328.jpg,http://olb1e0iqk.bkt.clouddn.com/e31238e9-c659-4e06-9a92-547f6a60a11c.png','0'), ('4','2017-03-27 16:02:12','1111111111111','3','吉尔吉斯斯坦','3','否','3','3','3','3','http://olb1e0iqk.bkt.clouddn.com/6138839d-2c07-4671-8260-7d671a6b0044.png','http://olb1e0iqk.bkt.clouddn.com/493245e1-d2e4-43e9-b086-a62fce407243.png,http://olb1e0iqk.bkt.clouddn.com/2b777cdf-3a75-4464-9fff-76668562fdb7.png,http://olb1e0iqk.bkt.clouddn.com/0c305842-bf6e-43b3-aa64-08f09684c311.jpg,http://olb1e0iqk.bkt.clouddn.com/8cde6f1a-fcbe-4acc-8fe2-b2bbab795b3b.png','0');
INSERT INTO `user` VALUES ('1@qq.com','e10adc3949ba59abbe56e057f20f883e','爱丽丝','0','2017-03-07','1212','1212','12','12','12','12','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-28 17:39:47','12'), ('2','e10adc3949ba59abbe56e057f20f883e','而安','0','1994-03-16','6','6','6','6','6','23','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-27 14:11:53','非常沉默，非常骄傲，从不依靠，从不寻找——三毛'), ('222','e10adc3949ba59abbe56e057f20f883e','222','1','','','','','','','','http://olb1e0iqk.bkt.clouddn.com/65931b49-63b2-4cf1-9778-3f6b18217a5f.jpg','2017-03-29 10:28:21',''), ('22@qq.com','e10adc3949ba59abbe56e057f20f883e','未知','未知',NULL,'未知','未知','未知','未知','来自逸途','未知','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-27 14:11:53',NULL), ('245915765@qq.com','e10adc3949ba59abbe56e057f20f883e','布兰妮','1','2016-09-21','350481199411111111','歌手','110','8888888','YITU ZUREN','18459999999','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-27 14:35:34','生命中的所有偶然都是命中注定'), ('245915769@qq.com','e10adc3949ba59abbe56e057f20f883e','曲琳琳','0','1990-11-22','350481199011222222','私人旅行定制师','18859454545','18859454545','来自逸途','未知','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-27 14:11:53',NULL), ('245915777@qq.com','e10adc3949ba59abbe56e057f20f883e','李欣','1','1988-11-22','350444198811222222','健身教练','15659885454','15659885454','长沙，我来了。from逸途','未知','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-27 14:11:53',NULL), ('245915778@qq.com','e10adc3949ba59abbe56e057f20f883e','林纾','1','1995-03-29','350408199503291702','教师','13405013033','13405013033','来自逸途,去哈尔滨','未知','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-27 14:11:53',NULL), ('2@qq.com','e10adc3949ba59abbe56e057f20f883e','珊','0','2017-03-08','未知','未知','未知','未知','我是旅人','未知','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-27 14:11:53','趁阳光正好，趁微风不噪，趁你还年轻，趁Ta还未老，一起去旅行吧'), ('3','e10adc3949ba59abbe56e057f20f883e','','0','','未知','未知','未知','未知','我是旅人','未知',NULL,'2017-03-27 14:11:53','趁阳光正好，趁微风不噪，趁你还年轻，趁Ta还未老，一起去旅行吧'), ('333@qq.com','e10adc3949ba59abbe56e057f20f883e','未知','0','1970-01-01','未知','博物维护','未知','未知','来自逸途','未知','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-27 14:11:53',NULL), ('343434','e10adc3949ba59abbe56e057f20f883e','照歌','1','1993-05-09','1','修文物','1','1','1','1','http://olb1e0iqk.bkt.clouddn.com/d17ba0c3-1afc-435b-ae56-973f7cfc37b2.jpg','2017-03-27 14:11:53','明月松间照，清泉石上流'), ('4','e10adc3949ba59abbe56e057f20f883e','歌浴森','1','2016-11-05','35042349890010','歌手','18459666666','18459999999','我在上海等你','18459999999','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-27 14:11:53',NULL);
