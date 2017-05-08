
INSERT INTO menu
  (bus_menu_title, bus_id)
  VALUES
  ( $1, $2 ) RETURNING menu_id;