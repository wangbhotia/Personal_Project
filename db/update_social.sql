
update social
	set facebook = $2,
			googleplus = $3,
			instagram = $4,
			yelp = $5,
			tripadvisor = $6,
			twitter = $7
	where bus_id = $1;