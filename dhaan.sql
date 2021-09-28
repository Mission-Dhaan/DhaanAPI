/*
SQLyog Ultimate v12.1 (64 bit)
MySQL - 5.7.26 : Database - dhaan
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`dhaan` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `dhaan`;

/*Table structure for table `farmers` */

DROP TABLE IF EXISTS `farmers`;

CREATE TABLE `farmers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `active` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `farmers` */

insert  into `farmers`(`id`,`email`,`name`,`active`) values (1,'prashanth.mac@gmail.com','Prashanth',1),(2,'bharathi.a@gmail.com','Bharathi',1),(3,'raghavendra.k@gmail.com','Raghavendra',1),(4,'suneetha@gmail.com','Suneetha',1);

/*Table structure for table `listing` */

DROP TABLE IF EXISTS `listing`;

CREATE TABLE `listing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `farmerId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `donate` enum('1','0') DEFAULT '0' COMMENT '1-Donate 0-No Donation',
  `isAvailable` enum('1','0') DEFAULT '1' COMMENT '1-Available 0-sold',
  `createDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products` (`productId`),
  KEY `fk_farmers` (`farmerId`),
  CONSTRAINT `fk_farmers` FOREIGN KEY (`farmerId`) REFERENCES `farmers` (`id`),
  CONSTRAINT `fk_products` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

/*Data for the table `listing` */

insert  into `listing`(`id`,`farmerId`,`productId`,`location`,`donate`,`isAvailable`,`createDate`) values (1,1,1,'1758 Capitol Avenue','0','1','2021-07-08'),(2,2,2,'1748 Green Street','1','1','2021-07-09'),(3,3,3,'3247 Johnny Lane','1','1','2021-07-07'),(4,1,4,'4915 Carolyns Circle','1','1','2021-07-18'),(5,4,6,'4557 Franklin Street','1','1','2021-07-20'),(9,1,10,'1758 Capitol Avenue','1','1','2021-07-11');

/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `quantity` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `organic` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `hfrip` enum('1','0') DEFAULT '0',
  `farmerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_farmer` (`farmerId`),
  CONSTRAINT `fk_farmer` FOREIGN KEY (`farmerId`) REFERENCES `farmers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

/*Data for the table `products` */

insert  into `products`(`id`,`name`,`quantity`,`price`,`organic`,`location`,`hfrip`,`farmerId`) values (1,'Tomato','1',10,90,'NewJersey','1',1),(2,'Chilly','0.5',5,80,'Bangalore','0',2),(3,'Potato','5',50,100,'Texas','0',3),(4,'Beans','10',40,80,'Kerala','0',1),(5,'Onion','15',25,100,'Telangana','0',2),(6,'Carrot','20',200,100,'California','1',4),(8,'Cabbage','2',20,100,'London','0',4),(10,'Green Peas','10',200,100,'NewJersey','0',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
