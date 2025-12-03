INSERT INTO media_types(media_name) VALUES
('music'),
('shows'),
('films'),
('books');

INSERT INTO users(user_id, user_name, password_hash, email) VALUES
(1, 'john doe', 'this is not hashed', 'john.doe@email.com');

INSERT INTO media(media_id, title, descr, media_type, release_date) VALUES
(1, 'test book', 'does not exist', 4, '2025-12-02');

INSERT INTO books(book_id, author, publisher, pages, chapters, media_id) VALUES
(1, 'me', 'also me', 1, 1, 1);

INSERT INTO reviews(review_id, title, post_date, descr, media_id, user_id) VALUES
(1, 'My review', '2025-12-02', 'terrible', 1, 1);
