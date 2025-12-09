
INSERT INTO media_types (media_type, media_name) VALUES
(1, 'music'),
(2, 'shows'),
(3, 'films'),
(4, 'books');


INSERT INTO users (user_name, password_hash, email) VALUES
('john doe', 'this is not hashed', 'john.doe@email.com'),
('Bruno Fernandes', 'not hashed', 'bruno.fernandes@email.com'),
('Jane Doe', 'password123', 'jane.doe@outlook.co.uk'),
('barack obama', '123456789', 'barack.obama@yahoo.com'),
('Gemma Collins', 'Claustrophobic', 'gemmacollins1992@gmail.com');


INSERT INTO media (title, descr, media_type, release_date) VALUES
('test book', 'does not exist', 4, '2025-12-02'),
('1948', 'A dystopian novel', 4, '2014-04-02'),
('Si6', 'Two detectives hunt a serial killer', 3, '1996-01-05'),
('Blond', 'Goated album', 1, '2016-08-20'),
('The Warehouse', 'Mockumentary following workers in a warehouse', 2, '2005-05-16'),
('Graham Potter', 'School of wizards', 4, '2003-02-14'),
('Diary of a wimpy man', 'Man nerd going to school', 4, '2011-12-24'),
('Nightfall', 'A thriller about vampires', 3, '2017-09-14'),
('Starlight Dreams', 'Sci-fi films about a stranded astronaut', 3, '2021-03-22'),
('Iron Fortress', 'Action packed story about an elite soldier unit', 3, '2019-11-30'),
('Galaxy Rangers', 'Animated Sci-fi adventure series', 2, '2018-07-11'),
('Cold Case Unit', 'Crime drama where a team solves long-forgotten cases', 2, '2020-10-05'),
('Arthur', 'Serial killer who doubles down as a cop', 2, '2011-03-24'),
('Golden Hour', 'Relaxing acoustic album', 1, '2022-06-15'),
('Midnight Beats', 'Electronic dance music album', 1, '2020-09-22'),
('Rock Revival', 'Modern rock album with classic influences', 1, '2018-04-30');


INSERT INTO cast_member (member_name) VALUES
('John Smith'),
('Emma Clark'),
('Liam Johnson'),
('Sophia Turner'),
('Carlos Diaz'),
('Bryan Mbeumo'),
('Mia Joyce'),
('Archie Leach');


INSERT INTO books (author, publisher, pages, chapters, media_id) VALUES
('me', 'also me', 1, 1, 
    (SELECT media_id FROM media WHERE title = 'test book' LIMIT 1)),
('George Ohwell', 'Secker & Warberg', 328, 23, 
    (SELECT media_id FROM media WHERE title = '1948' LIMIT 1)),
('JK Rowley', 'Bloomsfield Publishing', 320, 17, 
    (SELECT media_id FROM media WHERE title = 'Graham Potter' LIMIT 1)),
('Geoff Kinney', 'Puffing Books', 214, 11, 
    (SELECT media_id FROM media WHERE title = 'Diary of a wimpy man' LIMIT 1));


INSERT INTO reviews (title, post_date, descr, media_id, user_id) VALUES
('My review', '2025-12-02', 'terrible', 
    (SELECT media_id FROM media WHERE title = 'test book' LIMIT 1), 
    (SELECT user_id FROM users WHERE user_name = 'john doe' LIMIT 1)),
('A perfect classic', '2024-05-24', '1948 is by far the best thing I have ever read',
    (SELECT media_id FROM media WHERE title = '1948' LIMIT 1),
    (SELECT user_id FROM users WHERE user_name = 'Gemma Collins' LIMIT 1)),
('Brutal and relentless', '2017-03-15', 'Amazing visually, the film creates a very dark and creeping mood',
    (SELECT media_id FROM media WHERE title = 'Si6' LIMIT 1),
    (SELECT user_id FROM users WHERE user_name = 'barack obama' LIMIT 1)),
('Kinda funny', '2013-06-18', 'Funniest show ever made wish it did not have to end!',
    (SELECT media_id FROM media WHERE title = 'The Warehouse' LIMIT 1),
    (SELECT user_id FROM users WHERE user_name = 'Bruno Fernandes' LIMIT 1)),
('Number 1 album of all time!', '2018-02-24', 'Perfect album with no skips and every song is a 10/10',
    (SELECT media_id FROM media WHERE title = 'Blond' LIMIT 1),
    (SELECT user_id FROM users WHERE user_name = 'Jane Doe' LIMIT 1));


INSERT INTO music (artist, producer, duration, media_id) VALUES
('Frank Lake', 'Frank Studios Ltd', '01:00:08',
    (SELECT media_id FROM media WHERE title = 'Blond' LIMIT 1)),
('Sam Hill', 'Hill Studios', '00:45:24',
    (SELECT media_id FROM media WHERE title = 'Golden Hour' LIMIT 1)),
('DJ Luna', 'BassLab Records', '00:52:54', 
    (SELECT media_id FROM media WHERE title = 'Midnight Beats' LIMIT 1)),
('The Wildfires', 'Storm Records', '00:39:42', 
    (SELECT media_id FROM media WHERE title = 'Rock Revival' LIMIT 1));


INSERT INTO media_cast (cast_id, media_id) VALUES
(
    (SELECT cast_id FROM cast_member WHERE member_name = 'Bryan Mbeumo' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Si6' LIMIT 1)
),
(
    (SELECT cast_id FROM cast_member WHERE member_name = 'John Smith' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Nightfall' LIMIT 1)
),
(
    (SELECT cast_id FROM cast_member WHERE member_name = 'Emma Clark' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Starlight Dreams' LIMIT 1)
),
(
    (SELECT cast_id FROM cast_member WHERE member_name = 'Liam Johnson' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Iron Fortress' LIMIT 1)
),
(
    (SELECT cast_id FROM cast_member WHERE member_name = 'Sophia Turner' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'The Warehouse' LIMIT 1)
),
(
    (SELECT cast_id FROM cast_member WHERE member_name = 'Carlos Diaz' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Galaxy Rangers' LIMIT 1)
),
(
    (SELECT cast_id FROM cast_member WHERE member_name = 'Mia Joyce' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Cold Case Unit' LIMIT 1)
),
(
    (SELECT cast_id FROM cast_member WHERE member_name = 'Archie Leach' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Arthur' LIMIT 1)
);


INSERT INTO films (director, runtime, cast_id, media_id) VALUES
('David Flincher', '02:05:00',
    (SELECT cast_id FROM cast_member WHERE member_name = 'Bryan Mbeumo' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Si6' LIMIT 1)),
('Christopher Molan', '2:18:00',
    (SELECT cast_id FROM cast_member WHERE member_name = 'John Smith' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Nightfall' LIMIT 1)),
('James Camera', '02:48:00',
    (SELECT cast_id FROM cast_member WHERE member_name = 'Emma Clark' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Starlight Dreams' LIMIT 1)),
('Quentin Tarantina', '03:21:42',
    (SELECT cast_id FROM cast_member WHERE member_name = 'Liam Johnson' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Iron Fortress' LIMIT 1));


INSERT INTO tv_shows (director, producer, episodes, seasons, cast_id, media_id) VALUES 
('Greg Daniels', 'NBC', 188, 9,
    (SELECT cast_id FROM cast_member WHERE member_name = 'Sophia Turner' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'The Warehouse' LIMIT 1)),
('Hiroshi Sato', 'Toei Animation', 26, 2,
    (SELECT cast_id FROM cast_member WHERE member_name = 'Carlos Diaz' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Galaxy Rangers' LIMIT 1)),
('Sarah Thompson', 'BBC Studios', 10, 1,
    (SELECT cast_id FROM cast_member WHERE member_name = 'Mia Joyce' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Cold Case Unit' LIMIT 1)),
('Harry Smith', 'Smith Productions', 46, 5,
    (SELECT cast_id FROM cast_member WHERE member_name = 'Archie Leach' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Arthur' LIMIT 1));


INSERT INTO comment (post_date, comment_text, user_id, review_id) VALUES
('2024-06-01', 'I agree!', 
    (SELECT user_id FROM users WHERE user_name = 'Bruno Fernandes' LIMIT 1),
    (SELECT review_id FROM reviews WHERE title = 'Kinda funny' LIMIT 1)
),
('2021-04-21', 'I had an complete different experience',
    (SELECT user_id FROM users WHERE user_name = 'Jane Doe' LIMIT 1),
    (SELECT review_id FROM reviews WHERE title = 'Number 1 album of all time!' LIMIT 1)
),
('2025-12-05', 'Great review! Now I want to read this!',
    (SELECT user_id FROM users WHERE user_name = 'Gemma Collins' LIMIT 1),
    (SELECT review_id FROM reviews WHERE title = 'A perfect classic' LIMIT 1)
);


INSERT INTO review_likes (review_id, user_id, is_liked) VALUES
(
    (SELECT review_id FROM reviews WHERE title = 'Kinda funny' LIMIT 1),
    (SELECT user_id FROM users WHERE user_name = 'Bruno Fernandes' LIMIT 1),
    TRUE
),
(
    (SELECT review_id FROM reviews WHERE title = 'Number 1 album of all time!' LIMIT 1),
    (SELECT user_id FROM users WHERE user_name = 'Jane Doe' LIMIT 1),
    TRUE
),
(
    (SELECT review_id FROM reviews WHERE title = 'Brutal and relentless' LIMIT 1),
    (SELECT user_id FROM users WHERE user_name = 'barack obama' LIMIT 1),
    TRUE
);


INSERT INTO comment_likes (comment_id, user_id, is_liked) VALUES
(
    (SELECT comment_id FROM comment WHERE comment_text = 'I agree!' LIMIT 1),
    (SELECT user_id FROM users WHERE user_name = 'john doe' LIMIT 1),
    TRUE
),
(
    (SELECT comment_id FROM comment WHERE comment_text = 'I had an complete different experience' LIMIT 1),
    (SELECT user_id FROM users WHERE user_name = 'Gemma Collins' LIMIT 1),
    TRUE
),
(
    (SELECT comment_id FROM comment WHERE comment_text = 'Great review! Now I want to read this!' LIMIT 1),
    (SELECT user_id FROM users WHERE user_name = 'Bruno Fernandes' LIMIT 1),
    TRUE
);


INSERT INTO favourites (favourites_date, user_id, media_id) VALUES
('2024-01-10',
    (SELECT user_id FROM users WHERE user_name = 'john doe' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Blond' LIMIT 1)
),
('2025-12-06',
    (SELECT user_id FROM users WHERE user_name = 'Bruno Fernandes' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'The Warehouse' LIMIT 1)
),
('2025-12-04',
    (SELECT user_id FROM users WHERE user_name = 'Jane Doe' LIMIT 1),
    (SELECT media_id FROM media WHERE title = '1948' LIMIT 1)
);


INSERT INTO to_watch (to_watch_date, user_id, media_id) VALUES
('2026-02-04',
    (SELECT user_id FROM users WHERE user_name = 'Jane Doe' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Nightfall' LIMIT 1)
),
('2026-02-06',
    (SELECT user_id FROM users WHERE user_name = 'barack obama' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Cold Case Unit' LIMIT 1)
),
('2025-12-22',
    (SELECT user_id FROM users WHERE user_name = 'Gemma Collins' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Galaxy Rangers' LIMIT 1)
);


INSERT INTO diary (diary_date, user_id, media_id) VALUES
('2025-12-02',
    (SELECT user_id FROM users WHERE user_name = 'john doe' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Graham Potter' LIMIT 1)
),
('2025-08-16',
    (SELECT user_id FROM users WHERE user_name = 'Bruno Fernandes' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'The Warehouse' LIMIT 1)
),
('2024-03-12',
    (SELECT user_id FROM users WHERE user_name = 'barack obama' LIMIT 1),
    (SELECT media_id FROM media WHERE title = 'Golden Hour' LIMIT 1)
);

