create table users (
id bigint not null auto_increment,
email varchar(255),
gender bit,
password varchar(255),
primary key (id)) engine=InnoDB;

select * from users;
