
select * from business 
join address on
business.id = address.bus_id
-- join gallery on
-- business.id = gallery.bus_id
 join hours on
 business.id = hours.bus_id
-- join menu on
-- business.id = menu.bus_id
-- join menuitems on
-- menu.id = menuitems.mi_id
 join social on
 business.id = social.bus_id
-- join special on
-- business.id = special.bus_id 