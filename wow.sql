-- To generate an event
-- insert into events  (Name, Description, Address, Time, createdAt, updatedAt) values ("I remmber life in the womb it's hazy", "safe naked wet and warm and lazy", "my house", "2020-08-04", "2021-8-4", "2020-1-2");

-- to generate eventmember
-- insert into eventmembers(user, event, attended, rsvp, manager, createdAt, updatedAt) values (1,1, true, true, false, "2020-08-4", "2019-4-3");
-- insert into eventmembers(user, event, attended, rsvp, manager, createdAt, updatedAt) values (1,1, true, true, false, "2020-08-4", "2019-4-3");

-- to generate user
insert into users(username, password, email, points, role_id, createdAt, updatedAt) values ("username", "Password", "muaz@gmail.com", 8, 0, "2020-08-4", "2020-08-3");
insert into users(username, password, email, points, role_id, createdAt, updatedAt) values ("username1", "Password", "zaki@gmail.com", 0, 0, "2020-08-4", "2020-08-3");

-- To generate an gropu
-- insert into events  (Name, ContactInfo, createdAt, updatedAt) values ("Muaz's group", "kinda sus", "2020-08-4", "2020-8-1");
insert into groups  (Name, ContactInfo, createdAt, updatedAt) values ("Muaz's group", "kinda sus", "2020-08-4", "2020-8-1");
insert into groups  (Name, ContactInfo, createdAt, updatedAt) values ("My group", "kinda sus", "2020-08-4", "2020-8-1");

-- to generate groupmember
insert into groupmembers(User,  groupmember.Group, Manager, createdAt, updatedAt) values (1, 2  false, "2020-08-4", "2021-2-2");
insert into groupmembers(User, groupmember.Group, Manager, createdAt, updatedAt) values (1, 2, false, "2020-08-4", "2021-2-2");
