create database CM;
use CM;

create table userDetails(
	uid int auto_increment primary key,
	fname varchar(20) not null,
    lname varchar(20) not null,
    email varchar(40) unique not null,
	passwd varchar(60),
    dob Date not null
);

create table dept(
	did int auto_increment primary key,
    dname varchar(40),
    email varchar(40) unique
);

create table complaintHandler(
	cid int auto_increment primary key,
    email varchar(40) unique,
    fname varchar(20),
    lname varchar(20),
    passwd varchar(60)
);

create table complaint(
	id int auto_increment primary key,
    cdate date,
    title varchar(120),
    cdesc varchar(4000),
    did int not null,
    cid int not null,
    uid int not null,
    state enum ('Pending', 'Resolved', 'Review'),
    foreign key (did) references dept (did) on update cascade on delete cascade,
    foreign key (cid) references complaintHandler (cid) on update cascade on delete  cascade,
    foreign key (uid) references userDetails (uid) on update cascade on delete cascade
);