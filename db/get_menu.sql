
select menu.*, array_agg(menuitems.menu_item_name) as itemname,
	array_agg(menuitems.menu_item_desc) as itemdesc,
	array_agg(menuitems.menu_item_price) as itemprice
	from menu
	join menuitems on
	menu.id = menuitems.mi_id
	group by menu.id