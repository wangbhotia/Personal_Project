
update hours
	set sunday = $2,
			monday = $3,
			tuesday = $4,
			wednesday = $5,
			thursday = $6,
			friday = $7,
			saturday = $8
	where bus_id = $1;