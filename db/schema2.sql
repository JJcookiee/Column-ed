/*Literaly just reordered so it actually works*/
CREATE TABLE media_types (
    media_type INT NOT NULL PRIMARY KEY,
    media_name VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    UNIQUE KEY uq_users_username (user_name),
    UNIQUE KEY uq_users_email (email)
);

CREATE TABLE cast_member (
    cast_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    member_name VARCHAR(50) NOT NULL
);

CREATE TABLE media (
    media_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tmdb_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    descr VARCHAR(500) NOT NULL,
    media_type INT NOT NULL,
    release_date DATE NOT NULL,
    UNIQUE KEY uq_tmdb_media (tmdb_id, media_type),
    FOREIGN KEY (media_type) REFERENCES media_types(media_type)
);

CREATE TABLE music (
    music_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    artist VARCHAR(50) NOT NULL,
    producer VARCHAR(50),
    duration TIME NOT NULL,
    media_id INT NOT NULL,
    UNIQUE KEY uq_music_media (media_id),
    FOREIGN KEY (media_id) REFERENCES media(media_id)
);

CREATE TABLE TV_shows (
    show_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    director VARCHAR(50) NOT NULL,
    producer VARCHAR(50),
    episodes INT NOT NULL DEFAULT 1,
    seasons INT NOT NULL DEFAULT 1,
    media_id INT NOT NULL,
    UNIQUE KEY uq_tv_media (media_id),
    FOREIGN KEY (media_id) REFERENCES media(media_id)
);

CREATE TABLE books (
    book_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(50) NOT NULL,
    publisher VARCHAR(50),
    pages INT NOT NULL DEFAULT 1,
    chapters INT,
    media_id INT NOT NULL,
    UNIQUE KEY uq_book_media (media_id),
    FOREIGN KEY (media_id) REFERENCES media(media_id)
);

CREATE TABLE films (
    film_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    director VARCHAR(50) NOT NULL,
    runtime TIME NOT NULL,
    media_id INT NOT NULL,
    UNIQUE KEY uq_film_media (media_id),
    FOREIGN KEY (media_id) REFERENCES media(media_id)
);

CREATE TABLE diary (
    diary_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    diary_date DATE NOT NULL,
    user_id INT NOT NULL,
    media_id INT NOT NULL,
    UNIQUE KEY uq_diary_unique (user_id, media_id, diary_date),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (media_id) REFERENCES media(media_id)
);

CREATE TABLE to_watch (
    to_watch_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    to_watch_date DATE NOT NULL,
    user_id INT NOT NULL,
    media_id INT NOT NULL,
    UNIQUE KEY uq_to_watch_unique (user_id, media_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (media_id) REFERENCES media(media_id)
);

CREATE TABLE favourites (
    favourites_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    favourites_date DATE NOT NULL,
    user_id INT NOT NULL,
    media_id INT NOT NULL,
    UNIQUE KEY uq_favourites_unique (user_id, media_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (media_id) REFERENCES media(media_id)
);

CREATE TABLE reviews (
    review_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    post_date DATE NOT NULL,
    descr VARCHAR(500) NOT NULL,
    media_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (media_id) REFERENCES media(media_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE comment (
    comment_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    post_date DATE NOT NULL,
    comment_text VARCHAR(500) NOT NULL,
    user_id INT NOT NULL,
    review_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

CREATE TABLE review_likes (
    review_id INT NOT NULL,
    user_id INT NOT NULL,
    is_liked BOOLEAN NOT NULL,
    PRIMARY KEY (review_id, user_id),
    FOREIGN KEY (review_id) REFERENCES reviews(review_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE comment_likes (
    comment_id INT NOT NULL,
    user_id INT NOT NULL,
    is_liked BOOLEAN NOT NULL,
    PRIMARY KEY (comment_id, user_id),
    FOREIGN KEY (comment_id) REFERENCES comment(comment_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE media_cast (
    media_cast_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cast_id INT NOT NULL,
    media_id INT NOT NULL,
    UNIQUE KEY uq_media_cast (cast_id, media_id),
    FOREIGN KEY (cast_id) REFERENCES cast_member(cast_id),
    FOREIGN KEY (media_id) REFERENCES media(media_id)
);
