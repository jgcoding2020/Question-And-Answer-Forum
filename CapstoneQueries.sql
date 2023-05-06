show databases;
use sakila;
show tables;
select * from actor;
select first_name from actor;
select first_name as actor_name from actor;
select (1+1);
select now();
select curTime();
select curDate();
select pi();
select mod(107, 4);
select sqrt(100);
select * from actor;
-- order by
select * from actor order by first_name;
select * from actor order by last_name;
select * from actor order by first_name desc;
-- retrieving select column from table
select first_name, last_name from actor;
select first_name, last_name order by first_name desc;
-- retireving the data with filter condition and order by column
select * from actor where first_name ='Nick';
select actor_id, first_name, last_name from actor where first_name ='Nick' order by actor_id desc;
select actor_id, first_name, last_name from actor where actor_id > 100 order by first_name, last_name desc;
-- retrieve empty result set
select * from actor where 1 = 2;
-- retrieve column name using aliases
select rental_date, rental_id, return_date from rental;
select rental_date as RentalDate, inventory_id as filmListId, return_date as ReturnDate from rental;
select * from film;
select replacement_cost-rental_rate, film_id as FilmId, length/60 from film;
select replacement_cost-rental_rate as CostDiff, film_id as FilmId, length/60 as TimeInHour from film;
select rental_rate as RentalRate, rental_rate+3*4-1 as Result1, (rental_rate+3)*4-1 as Result2 from film;
-- retrieve result based on function
select * from payment;
select amount, round(amount) as Amnt, round(amount, 1) Amnt1, floor (amount) FloorAmnt, ceiling(amount) CeilingAmnt from payment;
-- string operations
select * from actor;
select concat(first_name, ' ', last_name) as FullName from actor;
select concat(first_name, ' ', last_name) as FullName, concat(left(first_name,1)) as FirstInitial from actor;
select concat(first_name, ' ', last_name) as FullName, length(concat(first_name, ' ', last_name)) as Length from actor;
select concat(first_name, ' ', last_name) as FullName, reverse(concat(first_name, ' ', last_name)) as ReverseFullName,
replace(concat(first_name, ' ', last_name), '$', '$') as ReplaceExample from actor;

-- date operations
-- date functions
select concat(first_name, ' ', last_name) as FullName,
date_format(last_update, get_format(datetime, 'EUR')) as LastUpdated1,
date_format(last_update, get_format(datetime, 'ISO')) as LastUpdated2,
date_format(last_update, get_format(datetime, 'USA')) as LastUpdated3 from actor;
select* from actor;
select rental_date,
dayofweek(rental_date) as DayOfWeek,
quarter(rental_date) as Quarter,
week(rental_date) as Week,
monthname(rental_date) as monthName from rental;

-- Distinct operations
select * from actor;
select Distinct first_name from actor;
select last_name from actor;
select Distinct last_name from actor;
-- Where clause comparison operators
select actor_id, first_name, last_name from actor where actor_id = 100; 
select actor_id, first_name, last_name from actor where not actor_id = 100; 
-- IN
select first_name from actor where first_name in ('John', 'Ed', 'Vivien', 'Jennifer');
select first_name from actor where first_name not in ('John', 'Ed', 'Vivien', 'Jennifer');

use cogent;
create table employee (
	emp_num int,
    emp_name varchar(25),
    emp_sal int
    );

insert into employee values (1002, 'Nick', 2000);
insert into employee values (1001, 'John', 3000);
select * from employee;

create database cogentdb;
use cogentdb;
create table person(
id int,
first_name varchar(20),
last_name varchar(20)
);
insert into person values(1001,'Gyanendra','Singh');
select * from person;
DELIMITER $$
USE `cogentdb`$$
CREATE PROCEDURE `retrieve_person` ()
BEGIN
 select * from person;
END$$
DELIMITER ;

create table DEPT (
	dept_name int,
    emp_no int,
    emp_name varchar(40),
    emp_sal int
);
drop database dept;
select * from dept;
insert into dept(dept_name, emp_no, emp_name, emp_sal) values (10, 3, 'Kim', 55000);
insert into dept(dept_name, emp_no, emp_name, emp_sal) values (30, 4, 'Terry', 75000);
insert into dept(dept_name, emp_no, emp_name, emp_sal) values (30, 5, 'Greg', 96000);
insert into dept(dept_name, emp_no, emp_name, emp_sal) values (10, 6, 'Jim', 45000);

ALTER USER 'root'@'localhost' IDENTIFIED BY 'Cogent@123';

use cogent;
show tables;

create table dept (
	dept_name int,
    emp_no int,
    emp_name varchar(40),
    emp_sal Int,
    emp_manager varchar(40),
    emp_title varchar(40)
);
insert into dept(dept_name, emp_no, emp_name, emp_sal, emp_manager, emp_title) values (10, 1, 'John', 60000, 'Greg', 'analyst');
insert into dept(dept_name, emp_no, emp_name, emp_sal, emp_manager, emp_title) values (20, 2, 'Janet', 95000, 'Susan', 'developer');
insert into dept(dept_name, emp_no, emp_name, emp_sal, emp_manager, emp_title) values (30, 3, 'Harry', 110000, 'Chef', 'sales');
insert into dept(dept_name, emp_no, emp_name, emp_sal, emp_manager, emp_title) values (10, 4, 'Xena', 65000, 'Greg', 'analyst');
insert into dept(dept_name, emp_no, emp_name, emp_sal, emp_manager, emp_title) values (20, 5, 'Benny', 115000, 'Susan', 'developer');
insert into dept(dept_name, emp_no, emp_name, emp_sal, emp_manager, emp_title) values (30, 6, 'Hercules', 55000, 'Chef', 'sales');
insert into dept(dept_name, emp_no, emp_name, emp_sal, emp_manager, emp_title) values (40, 7, 'Mary', 58000, 'Carry', 'analyst');
show tables;
select * from dept;

DELIMITER $$
USE `cogent`$$
CREATE PROCEDURE `proc_empname` (empno int)
BEGIN
 select emp_name from dept where emp_no = empno;
END$$
DELIMITER ;

DELIMITER $$
USE `cogent`$$
CREATE PROCEDURE `proc_dname` (empno int)
BEGIN
 select dept_name from dept where emp_no = empno;
END$$
DELIMITER ;

use cogentdb;
show tables;
select * from employee;
use cogent;

create database mydb;
use mydb;
show tables;
create table employee(
	id int primary key,
    fname varchar(40),
    lname varchar(40)
);
select * from employee;
drop table employee;
show tables;
select* from book;
show tables;
drop table student;
drop table course;
show tables;
select * from student;
drop table student;
select * from course;
drop table student;
drop table course;
show tables;
use cogent;
select * from student;
select * from course;
show tables;
drop table passport;
drop table employee;
select*from passport;
select*from employee;
use mydb;
show tables;
select * from employee;
show tables;
use cogent;
show tables;
drop table person;
show tables;
use cogent;
show tables;
select * from person;
use cogent;
select * from person;
drop table person;
use cogent;
show tables;
select tables;
use cogent;
show tables;
select * from person;
insert into person(person_id, person_name, person_age, person_salary) values (1,2,'j',4);
use cogent_do_connect;
drop database cogent_do_connect;
create database cogent_do_connect;