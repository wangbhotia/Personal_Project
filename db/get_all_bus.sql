
select * from business 
	join address on
	business.id = address.bus_id

 	join hours on
 	business.id = hours.bus_id

 	join social on
 	business.id = social.bus_id
