
update business
	set featured = $1
	where id = $2
	RETURNING featured;