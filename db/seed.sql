insert into media_types(media_type,media_name)  values(1,'music');
insert into media_types(media_type,media_name)  values(2,'shows');
insert into media_types(media_type,media_name)  values(3,'films');
insert into media_types(media_type,media_name)  values(4,'books');

insert into users(user_id,user_name,password_hash,email) values(1,'john doe','this is not hashed','john.doe@email.com');

insert into media(media_id,title,descr,media_type,release_date) values(1,'test book','does not exist',4,'2025-12-02');

insert into books(book_id,author,publisher,pages,chapters,media_id) values(1,'me','also me',1,1,1);

insert into reviews(review_id,title,post_date,descr,media_id,user_id) values(1,'My review','2025-12-02','terrible',1,1);
