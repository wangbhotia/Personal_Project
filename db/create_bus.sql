
INSERT INTO business
  (bus_name, bus_slogan, bus_phone, 
  	bus_email, bus_type, bus_cuisine, bus_desc, 
  	bus_happy_hours, bus_logo, bus_cover_img, user_id)
  VALUES
  ( $1, $2, $3, $4, $5 ,$6, $7, $8, $9, $10, 1 ) RETURNING id;

-- with first_insert as (
--    insert into sample(firstname,lastname) 
--    values('fai55','shaggk') 
--    RETURNING id
-- ), 
-- second_insert as (
--   insert into sample1( id ,adddetails) 
--   values
--   ( (select id from first_insert), 'ss')
--   RETURNING user_id
-- )
-- insert into sample2 ( id ,adddetails) 
-- values 
-- ( (select user_id from first_insert), 'ss');

-- WITH first_insert as (
-- 	INSERT INTO business
-- 	  (bus_name, bus_slogan, bus_phone, 
-- 	  	bus_email, bus_type, bus_cuisine, bus_desc, 
-- 	  	bus_happy_hours, bus_logo, bus_cover_img, user_id)
-- 	  VALUES
-- 	  ( $1, $2, $3, $4, $5 ,$6, $7, $8, $9, $10, 1 ) RETURNING id as newbus_id;
-- ),
-- second_insert as (
-- 	INSERT INTO address
-- 	  (street, city, state, zip, bus_id)
-- 	  VALUES
-- 	  ( $1, $2, $3, $4, $5, (select newbus_id from first_insert))
-- )