CREATE TABLE media (
    media_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    descr VARCHAR(500) NOT NULL,
    media_type INT NOT NULL,
    release_date DATE NOT NULL
);

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    password_hash VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL
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
    FOREIGN KEY (review_id) REFERENCES reviews(review_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE comment_likes (
    comment_id INT NOT NULL,
    user_id INT NOT NULL,
    is_liked BOOLEAN NOT NULL,
    FOREIGN KEY (comment_id) REFERENCES comment(comment_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE cast_member (
    cast_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    member_name VARCHAR(50) NOT NULL
);

CREATE TABLE media_cast (
    cast_id INT NOT NULL,
    media_id INT NOT NULL,
    FOREIGN KEY (cast_id) REFERENCES cast_member(cast_id),
    FOREIGN KEY (media_id) REFERENCES media(media_id)
);

CREATE TABLE media_types (
    media_type INT NOT NULL PRIMARY KEY,
    media_name VARCHAR(50) NOT NULL
);

CREATE TABLE diary (
    diary_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    diary_date DATE NOT NULL,
    user_id INT NOT NULL,
    media_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (media_id) REFERENCES media(media_id)
);

CREATE TABLE music (
    music_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    artist VARCHAR(50) NOT NULL,
    producer VARCHAR(50),
    duration TIME NOT NULL,
    media_id INT NOT NULL,
    FOREIGN KEY (media_id) REFERENCES media(media_id)
);

CREATE TABLE TV_shows (
    show_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    director VARCHAR(50) NOT NULL,
    producer VARCHAR(50),
    episodes INT NOT NULL DEFAULT 1,
    seasons INT NOT NULL DEFAULT 1,
    cast_id INT NOT NULL,
    media_id INT NOT NULL,
    FOREIGN KEY (cast_id) REFERENCES media_cast(cast_id),
    FOREIGN KEY (media_id) REFERENCES media(media_id)
);

CREATE TABLE books (
    book_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(50) NOT NULL,
    publibsher VARCHAR(50),
    pages INT NOT NULL DEFAULT 1,
    chapters INT,
    media_id INT NOT NULL,
    FOREIGN KEY (media_id) REFERENCES media(media_id)
);

CREATE TABLE films (
    film_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    director VARCHAR(50) NOT NULL,
    runtime TIME NOT NULL,
    cast_id INT NOT NULL,
    media_id INT NOT NULL,
    FOREIGN KEY (cast_id) REFERENCES media_cast(cast_id),
    FOREIGN KEY (media_id) REFERENCES media(media_id)
);

create table to_watch(
    to_watch_id int not null primary key identity(1, 1)
    to_watch_date 

)