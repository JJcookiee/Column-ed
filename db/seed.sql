insert into media_types(media_type,media_name)  values(1,'music');
insert into media_types(media_type,media_name)  values(2,'shows');
insert into media_types(media_type,media_name)  values(3,'films');
insert into media_types(media_type,media_name)  values(4,'books');

insert into users(user_name,password_hash,email) values('john doe','this is not hashed','john.doe@email.com');

insert into reviews(title,post_date,descr,media_id,user_id) values('My review','2025-12-02','terrible',1,1);

insert into media(title,decr,media_type,release_date) values('test book','does not exist',4,'2025-12-02');

insert into books(auhtor,publisher,pages,chapters,media_id) values('me','also me',1,1,1)