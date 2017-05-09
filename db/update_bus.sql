
update business
	set bus_name = $2,
			bus_slogan = $3,
			bus_phone = $4,
			bus_email = $5,
			bus_type = $6,
			bus_cuisine = $7,
			bus_desc = $8,
			bus_happy_hours = $9,
			bus_logo = $10,
			bus_cover_img = $11
	where id = $1;