
select * from business 
	left outer join address on
	business.id = address.bus_id

 	left outer join hours on
 	business.id = hours.bus_id

 	left outer join social on
 	business.id = social.bus_id
