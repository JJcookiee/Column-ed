-- actual final schema based on migrations as well as removing tables we never used
CREATE TABLE `diary` ( 
 `diary_id` int(11) NOT NULL AUTO_INCREMENT, 
 `diary_date` date NOT NULL, 
 `user_id` int(11) NOT NULL, 
 `media_id` int(11) NOT NULL, 
 PRIMARY KEY (`diary_id`), 
 KEY `user_id` (`user_id`), 
 KEY `media_id` (`media_id`) 
);

CREATE TABLE `favourites` ( 
 `favourites_id` int(11) NOT NULL AUTO_INCREMENT, 
 `favourites_date` date NOT NULL, 
 `user_id` int(11) NOT NULL, 
 `media_id` int(11) NOT NULL, 
 PRIMARY KEY (`favourites_id`), 
 KEY `user_id` (`user_id`), 
 KEY `media_id` (`media_id`) 
);

CREATE TABLE `media` ( 
 `media_id` int(11) NOT NULL AUTO_INCREMENT, 
 `api_id` int(11) NOT NULL, 
 PRIMARY KEY (`media_id`) 
);

CREATE TABLE `reviews` ( 
 `review_id` int(11) NOT NULL AUTO_INCREMENT, 
 `rating` int(5) NOT NULL, 
 `post_date` date NOT NULL, 
 `descr` varchar(500) NOT NULL, 
 `media_id` int(11) NOT NULL, 
 `user_id` int(11) NOT NULL, 
 PRIMARY KEY (`review_id`), 
 UNIQUE KEY `uniq_user_media` (`user_id`,`media_id`), 
 KEY `media_id` (`media_id`) 
);

CREATE TABLE `users` ( 
 `user_id` int(11) NOT NULL AUTO_INCREMENT, 
 `user_name` varchar(50) NOT NULL, 
 `password` varchar(255) NOT NULL, 
 `email` varchar(255) NOT NULL, 
 `bio` varchar(255) DEFAULT 'Hello I am using Column-ed', 
 `display_name` varchar(255) DEFAULT NULL, 
 `pfp` varchar(255) NOT NULL DEFAULT 'defaultblue.png', 
 PRIMARY KEY (`user_id`) 
);

CREATE TABLE `user_follows` ( 
 `follower_id` int(11) NOT NULL, 
 `followed_id` int(11) NOT NULL, 
 PRIMARY KEY (`follower_id`,`followed_id`), 
 KEY `followed_id` (`followed_id`), 
 CONSTRAINT `CONSTRAINT_1` CHECK (`follower_id` <> `followed_id`) 
);