INSERT INTO media_types(media_name) VALUES
('music'),
('shows'),
('films'),
('books');

INSERT INTO users (user_name, password_hash, email) VALUES
('john doe','this is not hashed','john.doe@email.com');

INSERT INTO media(title, descr, media_type, release_date) VALUES
('test book', 'does not exist', 4, '2025-12-02');

INSERT INTO books(author, publisher, pages, chapters, media_id) VALUES
('me', 'also me', 1, 1, 1);

INSERT INTO reviews(title, post_date, descr, media_id, user_id) VALUES
('My review', '2025-12-02', 'terrible', 1, 1);