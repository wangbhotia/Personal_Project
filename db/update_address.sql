
update address
	set street = $2,
			city = $3,
			state = $4,
			zip = $5
	where bus_id = $1;