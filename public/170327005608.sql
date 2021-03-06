/*
MySQL Backup
Source Server Version: 5.0.45
Source Database: lvren
Date: 2017-3-27 00:56:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `dynamic`
-- ----------------------------
DROP TABLE IF EXISTS `dynamic`;
CREATE TABLE `dynamic` (
  `Did` int(18) NOT NULL auto_increment,
  `Oid` int(18) NOT NULL,
  `P1` varchar(255) default NULL,
  `P9` varchar(255) default NULL,
  `P8` varchar(255) default NULL,
  `P7` varchar(255) default NULL,
  `P6` varchar(255) default NULL,
  `P5` varchar(255) default NULL,
  `P4` varchar(255) default NULL,
  `P3` varchar(255) default NULL,
  `P2` varchar(255) default NULL,
  `Photos` varchar(255) default NULL,
  `Detail` varchar(1000) default NULL,
  `Time` timestamp NULL default CURRENT_TIMESTAMP,
  `Uid` varchar(18) default NULL,
  PRIMARY KEY  (`Did`),
  KEY `Oid` (`Oid`),
  KEY `Uid` (`Uid`),
  CONSTRAINT `dynamic_ibfk_1` FOREIGN KEY (`Oid`) REFERENCES `order` (`Oid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `message`
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `Mid` int(18) NOT NULL auto_increment,
  `Tid` int(18) NOT NULL,
  `Text` varchar(255) default NULL COMMENT '留言内容',
  `Uid` varchar(18) default NULL,
  `Mtime` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`Mid`),
  KEY `Mid` (`Tid`),
  KEY `Uid` (`Uid`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`Uid`) REFERENCES `user` (`Uid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `news`
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `Nid` char(18) NOT NULL,
  `Uid` varchar(18) default NULL,
  `Tid` varchar(18) default NULL,
  `Flag` int(1) default '0' COMMENT '是否已读',
  `Type` varchar(255) default NULL COMMENT '留言0、回复1、订单2',
  `Ntime` timestamp NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`Nid`),
  KEY `Tid` (`Tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='InnoDB free: 11264 kB; (`Uid`) REFER `yitu/user`(`Uid`)';

-- ----------------------------
--  Table structure for `order`
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `Oid` int(18) NOT NULL auto_increment COMMENT '订单id',
  `Tid` varchar(18) NOT NULL,
  `Uid` varchar(18) NOT NULL COMMENT '雇主（下单的人）',
  `State` varchar(18) NOT NULL COMMENT '状态',
  `OrderTime` timestamp NULL default CURRENT_TIMESTAMP COMMENT '订单时间',
  `Appointment` varchar(30) NOT NULL COMMENT '预约时间',
  `Price` int(18) default NULL,
  PRIMARY KEY  (`Oid`),
  KEY `Uid` (`Uid`),
  KEY `Tid` (`Tid`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`Uid`) REFERENCES `user` (`Uid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `reply`
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply` (
  `Rid` int(18) NOT NULL auto_increment,
  `Mid` int(18) NOT NULL,
  `Uid` varchar(18) NOT NULL COMMENT '谁回复',
  `Reply` varchar(255) default NULL,
  `Rtime` timestamp NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`Rid`),
  KEY `Mid` (`Mid`),
  KEY `Uid` (`Uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `save`
-- ----------------------------
DROP TABLE IF EXISTS `save`;
CREATE TABLE `save` (
  `Sid` int(11) NOT NULL auto_increment,
  `Uid` varchar(18) NOT NULL,
  `Tid` varchar(18) NOT NULL,
  PRIMARY KEY  (`Sid`),
  KEY `save_ibfk_1` (`Uid`),
  KEY `Tid` (`Tid`),
  CONSTRAINT `save_ibfk_1` FOREIGN KEY (`Uid`) REFERENCES `user` (`Uid`),
  CONSTRAINT `save_ibfk_2` FOREIGN KEY (`Tid`) REFERENCES `tourcard` (`Uid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tourcard`
-- ----------------------------
DROP TABLE IF EXISTS `tourcard`;
CREATE TABLE `tourcard` (
  `Uid` varchar(18) NOT NULL,
  `Uptime` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  `Title` varchar(80) default NULL,
  `About` varchar(1000) NOT NULL,
  `Addr` varchar(80) default NULL,
  `Price` int(8) NOT NULL,
  `CanCut` varchar(6) default '',
  `Play` varchar(1000) default NULL COMMENT '玩法',
  `Other` varchar(1000) default NULL,
  `AppointTime` varchar(1000) default NULL,
  `AboutPrice` varchar(1000) default NULL,
  `Face` varchar(1000) NOT NULL,
  `Photos` varchar(1000) NOT NULL,
  PRIMARY KEY  (`Uid`),
  KEY `Uid` (`Uid`),
  CONSTRAINT `tourcard_ibfk_1` FOREIGN KEY (`Uid`) REFERENCES `user` (`Uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `Uid` varchar(18) NOT NULL,
  `Password` varchar(32) NOT NULL COMMENT '用户密码',
  `Name` varchar(18) default '',
  `Gender` char(6) character set gbk default '芳华正茂',
  `Birthday` varchar(18) default NULL COMMENT '出生日期',
  `IDCard` char(18) default '未知' COMMENT '身份证',
  `Job` varchar(40) default '未知',
  `Tellphone` char(11) default '未知',
  `Wechat` varchar(18) default '未知' COMMENT '微信号',
  `Anhao` varchar(40) default '我是旅人' COMMENT '微信暗号',
  `Zhifubao` varchar(255) default '未知',
  `HeadPic` varchar(100) default 'http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200' COMMENT '头像',
  `RegTime` timestamp NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP COMMENT '注册时间',
  `Intro` varchar(100) character set gbk default '趁阳光正好，趁微风不噪，趁你还年轻，趁Ta还未老，一起去旅行吧',
  PRIMARY KEY  (`Uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records 
-- ----------------------------
INSERT INTO `message` VALUES ('1','2','1212','2@qq.com','2017-03-26 19:02:27'), ('5','2','2323','2@qq.com','2017-03-26 19:36:18'), ('6','2','爵士鼓','2@qq.com','2017-03-26 19:42:53'), ('8','343434','谔谔额','2@qq.com','2017-03-26 19:57:19'), ('9','343434','enenn','2@qq.com','2017-03-26 22:33:47'), ('10','343434','西斜','343434','2017-03-27 00:07:03');
INSERT INTO `news` VALUES ('M10','343434','343434','0','0','2017-03-27 00:42:01'), ('M38','343434','2@qq.com','0','0','2017-03-27 00:41:59'), ('M6','2@qq.com','2','0','0','2017-03-26 20:04:35'), ('M8','2@qq.com','343434','0','0','2017-03-27 00:41:58'), ('M9','2@qq.com','343434','0','0','2017-03-27 00:41:56'), ('O14','2@qq.com','2@qq.com','0','2','2017-03-26 20:29:17'), ('O15','343434','2@qq.com','0','2','2017-03-26 22:14:34'), ('O16','2','2@qq.com','0','2','2017-03-26 23:13:57'), ('O39','2@qq.com','343434','1','2','2017-03-26 22:10:18'), ('R1','343434','2@qq.com','1','1','2017-03-27 00:43:09'), ('R2','343434','343434','1','1','2017-03-27 00:47:53');
INSERT INTO `order` VALUES ('1','22@qq.com','2','0','2017-03-20 15:33:08','2017-03-27 06:22','1'), ('2','2','22@qq.com','1','2017-03-20 15:33:30','2018-03-27 06:22','2'), ('3','2','245915765@qq.com','1','2017-03-20 15:33:53','2017-03-23 06:22','11'), ('5','2','3','2','2017-03-20 17:43:09','2017-03-23 00:00','100'), ('6','2','3','0','2017-03-24 15:11:23','','12'), ('8','343434','343434','1','2017-03-25 23:41:53','2017-03-30 00:00','6'), ('10','343434','22@qq.com','0','2017-03-25 23:48:42','2017-03-30 00:00','6'), ('14','2@qq.com','22@qq.com','1','2017-03-26 12:14:09','2017-03-30 17:00','100'), ('15','2@qq.com','343434','0','2017-03-26 22:12:49','2017-03-29 00:00','100'), ('16','2@qq.com','2','0','2017-03-26 22:15:12','2017-04-06 00:00','100');
INSERT INTO `reply` VALUES ('1','9','343434','可以可以','2017-03-21 00:30:23'), ('2','10','343434','停车坐爱枫林晚','2017-03-27 00:32:21');
INSERT INTO `save` VALUES ('15','2@qq.com','2');
INSERT INTO `tourcard` VALUES ('1@qq.com','2017-03-16 16:36:32','44','4','安徽','44','是','4','','4','4','http://olb1e0iqk.bkt.clouddn.com/65c6e859-9a5a-4e7e-8a8b-7db03c5821e0.png','http://olb1e0iqk.bkt.clouddn.com/75768731-9bf9-4870-adad-1d2cdae09374.png,http://olb1e0iqk.bkt.clouddn.com/d3126a4b-9a6c-4336-aed3-e791ebe49d56.png,http://olb1e0iqk.bkt.clouddn.com/dda9aa86-5e31-4314-b1b6-738b81b8b339.jpg,http://olb1e0iqk.bkt.clouddn.com/d714da98-014c-4ecc-b926-4ced9899f0ab.jpg'), ('2','2017-03-23 15:06:10','老夫聊发少年狂','12','安徽','12','是','12','3','12','12','http://olb1e0iqk.bkt.clouddn.com/d6d55542-f435-4b87-b689-61b63450a7a2.jpg','http://olb1e0iqk.bkt.clouddn.com/597d763b-79d2-42ee-a069-0914a051950b.jpg,http://olb1e0iqk.bkt.clouddn.com/7d3f35ab-df90-4039-82d0-9f3d08f0e6f5.jpg,http://olb1e0iqk.bkt.clouddn.com/6bfc6ea6-48da-4b4e-9a4d-29ef4de55163.jpg,http://olb1e0iqk.bkt.clouddn.com/5121e7db-384c-40e4-9853-7610041318d4.jpg,http://olb1e0iqk.bkt.clouddn.com/a6ab6679-ecf0-4884-bb3a-cdafc319fc65.jpg'), ('22@qq.com','2017-03-16 16:37:16','带你逛吃古荆州，记录你和古早味~','带你一天走遍荆州城，体验古城的魅力。线路提前定制，人文、美食、自然景观都有，可根据您的爱好来挑选不同的套餐。很乐意给蜂蜂拍下您与荆州城的记忆~~时长一般是一天，也可以是半天，会半价。吃行费用自出哦，但如果有缘我请你吃~~ ','吉尔吉斯斯坦','122','是','带你一天走遍荆州城，体验古城的魅力。线路提前定制，人文、美食、自然景观都有，可根据您的爱好来挑选不同的套餐。很乐意给蜂蜂拍下您与荆州城的记忆~~时长一般是一天，也可以是半天，会半价。吃行费用自出哦，但如果有缘我请你吃~~ ','','带你一天走遍荆州城，体验古城的魅力。线路提前定制，人文、美食、自然景观都有，可根据您的爱好来挑选不同的套餐。很乐意给蜂蜂拍下您与荆州城的记忆~~时长一般是一天，也可以是半天，会半价。吃行费用自出哦，但如果有缘我请你吃~~ ','带你一天走遍荆州城，体验古城的魅力。线路提前定制，人文、美食、自然景观都有，可根据您的爱好来挑选不同的套餐。很乐意给蜂蜂拍下您与荆州城的记忆~~时长一般是一天，也可以是半天，会半价。吃行费用自出哦，但如果有缘我请你吃~~ ','http://olb1e0iqk.bkt.clouddn.com/c4234f8c-dc1c-4107-8f8a-f1ddeaed5e18.jpg','http://olb1e0iqk.bkt.clouddn.com/1f46290f-59b6-4ed0-9970-7cea182a2031.jpg,http://olb1e0iqk.bkt.clouddn.com/4eb22caf-ccf8-4105-b27c-a42b8534bf00.jpg,http://olb1e0iqk.bkt.clouddn.com/00e3c2d7-81e3-4ace-9e4f-6081b31ac3b1.jpg,http://olb1e0iqk.bkt.clouddn.com/48f4a716-d1bf-406d-b006-b178283136d6.jpg,http://olb1e0iqk.bkt.clouddn.com/cbf08c9e-806c-44f4-a247-44f7c8f3834d.jpg,http://olb1e0iqk.bkt.clouddn.com/f30da4cb-db4d-4802-a246-3be679852e6a.jpg'), ('245915765@qq.com','2017-03-16 09:10:07','日暮苍山远2','网店店主，半调子音乐人，爵士鼓手，说唱歌手，美食节目主持','12','120','否','聚会是在我们自己家里，不大的地方。\r\n\r\n有音乐人来的时候，这里是音乐工作室，国内最新的音乐设备大多第一时间会寄到这里评测。\r\n\r\n有学生来的时候这里是爵士鼓教室，全钢制隔音房加上和橘丽丝同一年出生的一套雅马哈爵士鼓。\r\n\r\n有朋友来的时候这里是Party House,100寸投影和XBOX还有各种监听级音箱。但不管谁来，这里都是橘丽丝的私房菜馆。\r\n做上一桌菜的橘丽丝上桌前一定先招呼大家喝一杯，川妹子的酒量不输东北姑娘，只要拿着酒杯那么天南地北咱哥俩谁跟谁。','就像橘丽丝歌里唱的一样—“都喊我姐老倌，都说我管得宽，你来四川酒杯端起你是把我喝不翻。”\r\n想说的很多，其实意思是，晚来天欲雪，能饮一杯无？\r\n菜管饱，酒管够。唯一的缺点就是橘丽丝喝多了说话带loop','12','12','http://olb1e0iqk.bkt.clouddn.com/6d08de44-b0de-483c-ae98-25f1d74564d3.jpg','http://olb1e0iqk.bkt.clouddn.com/67c15bfe-6844-4477-915b-e0680f32a848.jpg,http://olb1e0iqk.bkt.clouddn.com/a16afc20-0300-4a98-acf9-ee7f9d13a75a.jpg,http://olb1e0iqk.bkt.clouddn.com/cf79fd13-b59d-43f2-803b-3622fc48f4ef.jpg,http://olb1e0iqk.bkt.clouddn.com/236edb54-aabb-4086-8442-1823900e94f8.jpg,http://olb1e0iqk.bkt.clouddn.com/d161f9b6-5b3a-4f3c-b32c-2dd9eadb8765.jpg,http://olb1e0iqk.bkt.clouddn.com/c07c7709-bce8-4dab-8f76-967c45095d4a.jpg'), ('245915769@qq.com','2017-03-16 16:36:35','22222','2','安徽','2','否','2','2','2','2','http://olb1e0iqk.bkt.clouddn.com/3caf3cd6-de9e-4bcc-a306-b70e4aba3f8d.jpg','http://olb1e0iqk.bkt.clouddn.com/2d841972-57e4-4f57-937f-58e6505b5b98.png,http://olb1e0iqk.bkt.clouddn.com/0324d189-efb9-44dc-bf01-1a788a573e0f.png,http://olb1e0iqk.bkt.clouddn.com/105e3974-7dfc-49e2-ac06-dffa013de0aa.jpg,http://olb1e0iqk.bkt.clouddn.com/470eeb8a-65a4-4d21-97a3-821625a68edb.png'), ('245915777@qq.com','2017-03-16 16:36:47','1111111','1','呼和浩特','1','是','1','1','1','1','http://olb1e0iqk.bkt.clouddn.com/a087d317-89d3-470e-80d7-46fd08efdb27.png','http://olb1e0iqk.bkt.clouddn.com/cbe39097-3dcb-4e92-90e8-28985b33ca9c.png,http://olb1e0iqk.bkt.clouddn.com/82230579-a141-445b-9d7d-759b97ea6140.png,http://olb1e0iqk.bkt.clouddn.com/ad07bb2c-6ab6-4c56-851c-f9d7b5ee6530.jpg,http://olb1e0iqk.bkt.clouddn.com/6c371375-67b8-47f1-b22b-048cb7d2331b.png'), ('245915778@qq.com','2017-03-16 16:36:58','6','6','吉尔吉斯斯坦','6','否','6','6','6','6','http://olb1e0iqk.bkt.clouddn.com/11007621-49b8-4d71-9633-628761536a67.png','http://olb1e0iqk.bkt.clouddn.com/375aea50-744e-49e9-87e0-af182c623734.png,http://olb1e0iqk.bkt.clouddn.com/2bcd0f38-7ad8-489e-b427-42cf6716fd79.png,http://olb1e0iqk.bkt.clouddn.com/32180306-8919-48f7-927b-527cf3927809.jpg,http://olb1e0iqk.bkt.clouddn.com/3fee1010-16c0-4525-9aef-7b1af1175177.png'), ('2@qq.com','2017-03-26 09:35:55','人与地坛','地道的北京人','北京','100','是','北京秘密','','两天一夜','门票','http://olb1e0iqk.bkt.clouddn.com/9adbed12-c4cd-4348-a4b7-2f9872836feb.png','http://olb1e0iqk.bkt.clouddn.com/80338c12-7e51-4ae7-b2d6-a42fff6bac27.png,http://olb1e0iqk.bkt.clouddn.com/609c9eb4-fa05-4436-b79c-baece07fe7b2.png,http://olb1e0iqk.bkt.clouddn.com/632891f7-02bf-4224-a834-0e9c4ea4052c.png,http://olb1e0iqk.bkt.clouddn.com/53085b91-5700-48d0-b78f-9228a4afad6a.png'), ('3','2017-03-24 11:36:59','22','2','吉尔吉斯斯坦','2','否','2','2','2','2','http://olb1e0iqk.bkt.clouddn.com/981d2154-d6c2-4dde-b7b3-4209c96f0241.jpg','http://olb1e0iqk.bkt.clouddn.com/455143cb-5b7e-48be-ab58-815bf47ccb98.jpg,http://olb1e0iqk.bkt.clouddn.com/04d1b17b-d00e-4560-8a95-b5c227b0ae31.png,http://olb1e0iqk.bkt.clouddn.com/acfb6bf7-8760-436e-a9c4-760f7d7e018d.jpg,http://olb1e0iqk.bkt.clouddn.com/75473bac-0fd0-4070-a988-dd203cd4eb28.jpg'), ('333@qq.com','2017-03-16 16:37:00','22','2','吉尔吉斯斯坦','2','是','2','2','2','2','http://olb1e0iqk.bkt.clouddn.com/b761b5b7-d863-4896-b59a-da7b2614281f.jpg','http://olb1e0iqk.bkt.clouddn.com/6efbadd6-73fe-4428-86a5-b850f37c1bb0.png,http://olb1e0iqk.bkt.clouddn.com/441af795-8756-4c84-aca5-80807403285d.jpg,http://olb1e0iqk.bkt.clouddn.com/6cdf34f8-784b-4d4c-9b79-51720b48caf0.jpg,http://olb1e0iqk.bkt.clouddn.com/0852dd80-6b86-4320-bcfc-cbd4744602dd.jpg'), ('343434','2017-03-25 21:46:40','66','6','吉尔吉斯斯坦','6','是','6','','6','6','http://olb1e0iqk.bkt.clouddn.com/1740344d-9ac6-4244-8e9e-7c5a64d96482.png','http://olb1e0iqk.bkt.clouddn.com/74572c87-0477-4024-9357-ec24431f48a4.png,http://olb1e0iqk.bkt.clouddn.com/9c0f0880-a609-4834-b5bc-f64198ae5fce.png,http://olb1e0iqk.bkt.clouddn.com/ff7a9fea-4b37-4cf9-a317-6d46621ed328.jpg,http://olb1e0iqk.bkt.clouddn.com/e31238e9-c659-4e06-9a92-547f6a60a11c.png'), ('4','2017-03-16 16:37:02','1111111111111','3','吉尔吉斯斯坦','3','否','3','3','3','3','http://olb1e0iqk.bkt.clouddn.com/6138839d-2c07-4671-8260-7d671a6b0044.png','http://olb1e0iqk.bkt.clouddn.com/493245e1-d2e4-43e9-b086-a62fce407243.png,http://olb1e0iqk.bkt.clouddn.com/2b777cdf-3a75-4464-9fff-76668562fdb7.png,http://olb1e0iqk.bkt.clouddn.com/0c305842-bf6e-43b3-aa64-08f09684c311.jpg,http://olb1e0iqk.bkt.clouddn.com/8cde6f1a-fcbe-4acc-8fe2-b2bbab795b3b.png');
INSERT INTO `user` VALUES ('1@qq.com','14c879f3f5d8ed93a09f6090d77c2cc3','','',NULL,NULL,NULL,NULL,'',NULL,NULL,'http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-20 17:40:19',NULL), ('2','14c879f3f5d8ed93a09f6090d77c2cc3','而安','0','1994-03-16','6','6','6','6','6','23','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-20 17:40:22','非常沉默，非常骄傲，从不依靠，从不寻找——三毛'), ('222','c4ca4238a0b923820dcc509a6f75849b','','',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'2017-03-24 17:20:47',NULL), ('22@qq.com','14c879f3f5d8ed93a09f6090d77c2cc3','未知','未知',NULL,'未知','未知','未知','未知','来自逸途','未知','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-20 17:40:24',NULL), ('245915765@qq.com','14c879f3f5d8ed93a09f6090d77c2cc3','布兰妮小甜甜','1','2016-09-21','350481199411111111','歌手','110','8888888','YITU ZUREN','18459999999','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-20 17:40:27',NULL), ('245915769@qq.com','14c879f3f5d8ed93a09f6090d77c2cc3','曲琳琳','0','1990-11-22','350481199011222222','私人旅行定制师','18859454545','18859454545','来自逸途','未知','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-20 17:40:31',NULL), ('245915777@qq.com','14c879f3f5d8ed93a09f6090d77c2cc3','李欣','1','1988-11-22','350444198811222222','健身教练','15659885454','15659885454','长沙，我来了。from逸途','未知','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-20 17:40:33',NULL), ('245915778@qq.com','14c879f3f5d8ed93a09f6090d77c2cc3','林纾','1','1995-03-29','350408199503291702','教师','13405013033','13405013033','来自逸途,去哈尔滨','未知','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-20 17:40:35',NULL), ('2@qq.com','14c879f3f5d8ed93a09f6090d77c2cc3','珊','0','2017-03-08','未知','未知','未知','未知','我是旅人','未知','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-26 16:36:35','趁阳光正好，趁微风不噪，趁你还年轻，趁Ta还未老，一起去旅行吧'), ('3','14c879f3f5d8ed93a09f6090d77c2cc3','','0','','未知','未知','未知','未知','我是旅人','未知',NULL,'2017-03-25 21:09:45','趁阳光正好，趁微风不噪，趁你还年轻，趁Ta还未老，一起去旅行吧'), ('333@qq.com','14c879f3f5d8ed93a09f6090d77c2cc3','未知','0','1970-01-01','未知','博物维护','未知','未知','来自逸途','未知','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-20 17:40:40',NULL), ('343434','14c879f3f5d8ed93a09f6090d77c2cc3','照歌','1','1993-05-09','1','修文物','1','1','1','1','http://olb1e0iqk.bkt.clouddn.com/d17ba0c3-1afc-435b-ae56-973f7cfc37b2.jpg','2017-03-24 11:07:38','明月松间照，清泉石上流'), ('4','14c879f3f5d8ed93a09f6090d77c2cc3','歌浴森','1','2016-11-05','35042349890010','歌手','18459666666','18459999999','我在上海等你','18459999999','http://p3.music.126.net/IAZKcW9XEAD-3Ce7xscrWA==/3264450024529041.jpg?param=200y200','2017-03-20 17:40:45',NULL);
