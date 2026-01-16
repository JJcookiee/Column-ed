ALTER TABLE reviews
ADD UNIQUE KEY uniq_user_media (user_id, media_id);