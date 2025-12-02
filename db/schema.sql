create table media(
    media_id int not null primary key,
    title varchar(255) not null,
    descr varchar(500) not null,
    media_type int not null,
    release_date date not null 
);

create table users(
    user_id int not null primary key,
    user_name varchar(50) not null,
    password_hash varchar(50) not null,
    email varchar(255) not null
);

create table reviews(
    review_id int not null primary key,
    title varchar(255) not null,
    post_date date not null,
    descr varchar(500) not null,
    media_id int not null references media(media_id),
    user_id int not null references users(user_id)
);

create table comment(
    comment_id int not null primary key,
    post_date date not null,
    comment_text varchar(500) not null,
    user_id int not null references users(user_id),
    review_id int not null references reviews(review_id)
);

create table review_likes(
    review_id int not null references reviews(review_id),
    user_id int not null references users(user_id),
    is_liked boolean not null
);

create table comment_likes(
    comment_id int not null references comments(comment_id),
    user_id int not null references users(user_id),
    is_liked boolean not null
);