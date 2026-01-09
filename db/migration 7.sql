ALTER TABLE `media` DROP `title`;
ALTER TABLE `media` DROP `descr`;
ALTER TABLE `media` DROP `media_type`;
ALTER TABLE `media` DROP `release_date`;
ALTER TABLE `to_watch` CHANGE `to_watch_date` `to_watch_date` DATE NULL;
