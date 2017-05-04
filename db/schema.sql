--USERS TABLE

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name varchar(100),
  last_name varchar(100),
  email varchar(100)
)
  -- username varchar(20),
  -- password varchar(20)

-- INSERT INTO users 
--   (first_name, last_name, email)
--   VALUES
--   ('John', 'Doe', 'email@email.com')


--BUSINESS TABLE

CREATE TABLE business (
  id SERIAL PRIMARY KEY,
  bus_name varchar(50),
  bus_slogan text,
  bus_phone varchar(20),
  bus_email varchar(100),
  bus_type varchar(15),
  bus_cuisine varchar(15),
  bus_desc text,
  bus_happy_hours text,
  bus_logo text,
  bus_cover_img text,
  user_id integer references users(id)
)
  -- featured bit 'false',

-- INSERT INTO business
--   (bus_name, bus_slogan, bus_phone, bus_email, bus_type, bus_cuisine, bus_desc, bus_happy_hours, bus_logo, bus_cover_img, user_id)
--   VALUES
--   ('Test Business',
--    'Testing Testing Testing',
--    '555-555-5555',
--    'email@email.com',
--    'Restaurant',
--    'American',
--    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
--    'Fusce sollicitudin lectus nulla, finibus dapibus mi mollis eget.',
--    'https://www.fineprintnyc.com/images/blog/history-of-logos/google/google-logo.png',
--    'https://images.unsplash.com/photo-1474898856510-884a2c0be546?dpr=1&auto=format&fit=crop&w=1500&h=1125&q=80&cs=tinysrgb&crop=&bg=',
--    '1'
--   )


--ADDRESS TABLE bus_address

CREATE TABLE address (
  id SERIAL PRIMARY KEY,
  street varchar(200),
  city varchar(100),
  state varchar(100),
  zip integer,
  bus_id integer references business(id)
)

-- INSERT INTO address
--   (street, city, state, zip, bus_id)
--   VALUES
--   ('123 Main St.', 'Provo', 'Utah', 12345, 1)


--HOURS TABLE bus_hours

CREATE TABLE hours (
  id SERIAL PRIMARY KEY,
  sunday varchar(20),
  monday varchar(20),
  tuesday varchar(20),
  wednesday varchar(20),
  thursday varchar(20),
  friday varchar(20),
  saturday varchar(20),
  bus_id integer references business(id)
)

-- INSERT INTO hours
--   (sunday, monday, tuesday, wednesday, thursday, friday, saturday, bus_id)
--   VALUES
--   ('10 AM - 10 PM', 
--     '10 AM - 10 PM', 
--     '10 AM - 10 PM', 
--     '10 AM - 10 PM', 
--     '10 AM - 10 PM',
--     '10 AM - 10 PM', 
--     '10 AM - 10 PM', 
--     1
--   )

--SPECIAL TABLE --bus_special, parallax

CREATE TABLE special (
  id SERIAL PRIMARY KEY,
  special_name varchar(50),
  special_desc text,
  special_img text,
  parallax_img text,
  bus_id integer references business(id)
)

-- INSERT INTO special
--   (special_name, special_desc, special_img, parallax_img, bus_id)
--   VALUES
--   ('Test Name', 
--     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet dictum nisl.',
--     'https://images.unsplash.com/photo-1428259067396-2d6bd3827878?dpr=1&auto=format&fit=crop&w=1500&h=997&q=80&cs=tinysrgb&crop=&bg=',
--     'https://images.unsplash.com/photo-1491217821879-7f1bb896efc1?dpr=1&auto=format&fit=crop&w=1500&h=994&q=80&cs=tinysrgb&crop=&bg=', 1),
--   ('Test Name 2', 
--     'Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur.',
--     'https://images.unsplash.com/photo-1428259067396-2d6bd3827878?dpr=1&auto=format&fit=crop&w=1500&h=997&q=80&cs=tinysrgb&crop=&bg=',
--     'https://images.unsplash.com/photo-1446034730750-a0b64d06ad13?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=', 1)


--MENU TABLE --bus_menu

CREATE TABLE menu (
  id SERIAL PRIMARY KEY,
  bus_menu_title varchar(50),
  bus_id integer references business(id)
)

-- INSERT INTO menu
--   (bus_menu_title, bus_id)
--   VALUES
--   ('Steaks', 1),
--   ('Burgers', 1),
--   ('Drinks', 1)

CREATE TABLE menuitems (
  id SERIAL PRIMARY KEY,
  menu_item_name varchar(100),
  menu_item_desc text,
  menu_item_price numeric(4,2),
  mi_id integer references menu(id)
)

-- INSERT INTO menuitems
--   (menu_item_name, menu_item_desc, menu_item_price, mi_id)
--   VALUES
--   ('House Steak', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 12.99, 1),
--   ('Beef Steak', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 18.99, 1),
--   ('Pork Steak', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 15.99, 1),
--   ('Goat Steak', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 29.99, 1),
--   ('Chicken Steak', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 10.99, 1),

--   ('House Burger', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 8.99, 2),
--   ('Spicy Chicken', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 9.99, 2),
--   ('Beef Burger', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 10.99, 2),
--   ('Pork Burger', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 11.99, 2),
--   ('Big Burger', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 14.99, 2),

--   ('Iced Tea', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1.99, 3),
--   ('Coke', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 0.99, 3),
--   ('Diet Coke', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 0.99, 3),
--   ('Green Tea', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2.99, 3),
--   ('Lemon Ginger', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2.99, 3)



--GALLERY TABLE --bus_gallery

CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  gallery_img_url text,
  bus_id integer references business(id)
)

-- INSERT INTO gallery
--   (gallery_img_url, bus_id)
--   VALUES
--   ('https://images.unsplash.com/photo-1453831362806-3d5577f014a4?dpr=1&auto=format&fit=crop&w=1500&h=1016&q=80&cs=tinysrgb&crop=&bg=', 1),
--   ('https://images.unsplash.com/photo-1453831210728-695502f9f795?dpr=1&auto=format&fit=crop&w=1500&h=900&q=80&cs=tinysrgb&crop=&bg=', 1),
--   ('https://images.unsplash.com/photo-1491739481003-2991327b66e2?dpr=1&auto=format&fit=crop&w=1500&h=996&q=80&cs=tinysrgb&crop=&bg=', 1),
--   ('https://images.unsplash.com/photo-1488558980948-81db7f6c239c?dpr=1&auto=format&fit=crop&w=1500&h=1040&q=80&cs=tinysrgb&crop=&bg=', 1),
--   ('https://images.unsplash.com/photo-1455853659719-4b521eebc76d?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=', 1),
--   ('https://images.unsplash.com/photo-1490990813269-10586274747f?dpr=1&auto=format&fit=crop&w=1500&h=1225&q=80&cs=tinysrgb&crop=&bg=', 1),
--   ('https://images.unsplash.com/photo-1477534980688-3ac008b36996?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=', 1),
--   ('https://images.unsplash.com/photo-1492683513054-55277abccd99?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=', 1)


--SOCIAL TABLE --bus_social

CREATE TABLE social (
  id SERIAL PRIMARY KEY,
  facebook text,
  googleplus text,
  instagram text,
  yelp text,
  tripadvisor text,
  pinterest text,
  twitter text,
  bus_id integer references business(id)
)

-- INSERT INTO social
--   (facebook, googleplus, instagram, yelp, tripadvisor, pinterest, twitter, bus_id)
--   VALUES
--   ('https://www.facebook.com', 
--     'https://plus.google.com',
--     'https://www.instagram.com',
--     'https://www.yelp.com',
--     'https://www.tripadvisor.com',
--     'https://www.pinterest.com',
--     'https://www.twitter.com', 
--     1
--   )


------------------------------------------

-- SELECT ALL

select * from business 
join address on
business.id = address.bus_id
join gallery on
business.id = gallery.bus_id
join hours on
business.id = hours.bus_id
join menu on
business.id = menu.bus_id
join menuitems on
menu.id = menuitems.mi_id
join social on
business.id = social.bus_id
join special on
business.id = special.bus_id 