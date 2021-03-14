-- to generate user
insert into users(username, password, email, points, role_id, createdAt, updatedAt) values (
"owner", "pass",
"graphinetime@gmail.com",
8, 1,
"2020-08-4", "2020-08-3");
insert into users(username, password, email, points, role_id, createdAt, updatedAt) values (
"member", "pass",
"ahmedzakariya355@gmail.com",
16, 0,
"2020-08-4", "2020-08-3");

-- To generate an group
-- insert into events  (Name, ContactInfo, createdAt, updatedAt) values ("Muaz's group", "kinda sus", "2020-08-4", "2020-8-1");
insert into groups(Name, ContactInfo, createdAt, updatedAt) values (
"AI-3 C635 Team",
"Send emails to Johnathan at jpon@gmail.com"
, "2020-08-4", "2020-8-1");
insert into groups(Name, ContactInfo, createdAt, updatedAt) values (
"IT Team",
"Email me at tyler@gmail.com

I am the IT regional Manager"
, "2020-08-4", "2020-8-1");
insert into groups(Name, ContactInfo, createdAt, updatedAt) values (
"Project 5 Team",
"Team Lead: Johnathan Kline
    Email: teller@gmail.com
    Phone: 313-222-5656

Please give me some time to respond to emails and requests.
Forward questions to my secretary."
, "2020-08-4", "2020-8-1");

-- to generate groupmember
insert into groupmembers(User, groupmembers.Group, Manager, createdAt, updatedAt) values (
1, 1,
false,
"2020-08-4", "2021-2-2");
insert into groupmembers(User, groupmembers.Group, Manager, createdAt, updatedAt) values (
1, 2,
false,
"2020-08-4", "2021-2-2");
insert into groupmembers(User, groupmembers.Group, Manager, createdAt, updatedAt) values (
1, 3,
false,
"2020-08-4", "2021-2-2");

-- To generate an event
-- insert into events  (Name, Description, Address, Time, createdAt, updatedAt) values ("I remmber life in the womb it's hazy", "safe naked wet and warm and lazy", "my house", "2020-08-04", "2021-8-4", "2020-1-2");
insert into events  (Name, Description, Address, Time, createdAt, updatedAt) values (
"Curb Watchers",
"Need members to help with side project.

This program will keep track of Reddit threads of a certain regex, watch them till archive, and store them in an SQL database."
, "4821 Salmon St., MI", "2021-02-22 06:30:20",
"2021-8-4", "2020-1-2");

-- to generate eventmember
-- insert into eventmembers(user, event, attended, rsvp, manager, createdAt, updatedAt) values (1,1, true, true, false, "2020-08-4", "2019-4-3");
insert into eventmembers(user, event, attended, rsvp, manager, createdAt, updatedAt) values (
1,1,
true, true, false,
"2020-08-4", "2019-4-3");
insert into eventmembers(user, event, attended, rsvp, manager, createdAt, updatedAt) values (
2,1,
true, true, true,
"2020-08-4", "2019-4-3");
