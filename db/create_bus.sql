
INSERT INTO business
  (bus_name, bus_slogan, bus_phone, 
  	bus_email, bus_type, bus_cuisine, bus_desc, 
  	bus_happy_hours, bus_logo, bus_cover_img, user_id)
  VALUES
  ( $1, $2, $3, $4, $5 ,$6, $7, $8, $9, $10, $11 ) RETURNING id;