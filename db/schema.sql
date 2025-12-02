create table media(
    media_id int not null primary key identity(1,1),
    title varchar(255) not null,
    descr varchar(500) not null,
    media_type int not null,
    release_date date not null 
);

create table users(
    user_id int not null primary key identity(1,1),
    user_name varchar(50) not null,
    password_hash varchar(50) not null,
    email varchar(255) not null
);

create table reviews(
    review_id int not null primary key identity(1,1),
    title varchar(255) not null,
    post_date date not null,
    descr varchar(500) not null,
    media_id int not null references media(media_id),
    user_id int not null references users(user_id)
);

create table comment(
    comment_id int not null primary key identity(1,1),
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

create table diary(
    diary_id int not null primary key identity(1,1),
    diary_date date not null,
    user_id int not null references users(user_id),
    media_id int not null references media(media_id)
);

create table media_cast(
    cast_id int not null references cast_member(cast_id),
    media_id int not null references media(media_id)
);

create table cast_member(
    cast_id int not null primary key identity(1,1),
    member_name varchar(50) not null
);

create table media_types(
    media_type int not null primary key,
    media_name varchar(50) not null,
);

create table music(
    music_id int not null primary key identity(1,1),
    artist varchar(50) not null,
    producer varchar(50),
    duration time not null,
    media_id int not null references media(media_id)
);

create table TV_shows(
    show_id int not null primary key identity(1,1),
    director varchar(50) not null,
    producer varchar(50),
    episodes int not null default(1),
    seasons int not null default(1),
    cast_id int not null references media_cast(cast_id),
    media_id int not null references media(media_id)
);

create table books(
    book_id int not null primary key identity(1,1),
    author varchar(50) not null,
    publibsher varchar(50),
    pages int not null default(1),
    chapters int,
    media_id int not null references media(media_id)
);

create table films(
    film_id int not null primary key identity(1,1),
    director varchar(50) not null,
    runtime time not null,
    cast_id int not null references media_cast(cast_id),
    media_id int not null references media(media_id)
);