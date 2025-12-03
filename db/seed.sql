-- MEDIA TYPES  (media_type is NOT auto_increment, so we must set it)
INSERT INTO media_types (media_type, media_name) VALUES
(1, 'music'),
(2, 'shows'),
(3, 'films'),
(4, 'books');

-- USERS (user_id is AUTO_INCREMENT → don't specify it)
INSERT INTO users (user_name, password_hash, email) VALUES
('john doe', 'this is not hashed', 'john.doe@email.com');

-- MEDIA (media_id is AUTO_INCREMENT → don't specify it)
INSERT INTO media (title, descr, media_type, release_date) VALUES
('test book', 'does not exist', 4, '2025-12-02');

-- BOOKS (link to the media row we just inserted)
INSERT INTO books (author, publisher, pages, chapters, media_id) VALUES
(
  'me',
  'also me',
  1,
  1,
  (SELECT media_id FROM media WHERE title = 'test book' LIMIT 1)
);

-- REVIEWS (link to same media + user via subqueries)
INSERT INTO reviews (title, post_date, descr, media_id, user_id) VALUES
(
  'My review',
  '2025-12-02',
  'terrible',
  (SELECT media_id FROM media WHERE title = 'test book' LIMIT 1),
  (SELECT user_id  FROM users WHERE user_name = 'john doe' LIMIT 1)
);
