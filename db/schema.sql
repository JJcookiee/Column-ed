create table media(
    primary key media_id int not null,
    title varchar(255) not null,
    desc varchar(500) not null,
    media_type int not null,
    release_date date not null 
);

create table users(
    primary key user_id int not null,
    user_name varchar(50) not null,
    password_hash varchar(50) not null,
    email varchar(255) not null
);

create table reviews(
    primary key review_id int not null,
    title varchar(255) not null,
    post_date date not null,
    desc varchar(500) not null,
    foreign key media_id int not null,
    foreign key user_id int not null
);