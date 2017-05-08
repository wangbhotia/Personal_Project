const app = require('./server'), 
			db = app.get('db');

module.exports = {
  newBus: function(req, res){
  	// console.log(req.body)
		let busInfo = [req.body.name, req.body.slogan, req.body.phone, 
      						req.body.email, req.body.type, req.body.cuisine,
      						req.body.about, req.body.happyh, req.body.logo,
      						req.body.coverimg]; //req.body.userid
    
    db.create_bus(busInfo, function(err, newbus){
    	if(!err){
    		let newbus_id = newbus[0].id;
		  	console.log('new id from db:', newbus[0].id);

				db.create_address([req.body.street, req.body.city, req.body.state, req.body.zip, newbus_id], function(err, newadd){
					if(!err){
						console.log('no error on address');
						//return res.send(newadd);
					} else {
						console.log(err);
						res.send(err);
					}
				});

				db.create_hours([req.body.sun, req.body.mon, req.body.tue, req.body.wed, req.body.thu, req.body.fri, req.body.sat,
          newbus_id], function(err, newhours){
					if(!err){
						console.log('on error on hours');
					} else {
						console.log(err);
						res.send(err);
					}
				});

				db.create_social([req.body.facebook, req.body.googleplus, req.body.instagram, req.body.yelp, req.body.tripadvisor,req.body.twitter, newbus_id], function(err, newsocial){
        	if(!err){
        		console.log('no err on social');
        	} else {
        		console.log(err);
        		res.send(err);
        	}
        });

        let special = [ [req.body.spname1, req.body.spdesc1, req.body.spimg1, req.body.spbg1, newbus_id],
												[req.body.spname2, req.body.spdesc2, req.body.spimg2, req.body.spbg2, newbus_id] ];

				for(let i = 0; i < special.length; i++){
					db.create_specials(special[i], function(err, newspecials){
						if(!err){
							console.log('no error on special');
						} else {
							console.log(err);
							res.send(err);
						}
					});
				};

				let menu = [ [req.body.m1_title, newbus_id],
        						 [req.body.m2_title, newbus_id],
        		         [req.body.m3_title, newbus_id] ];

       	for (let i = 0; i < menu.length; i++) {
       		
       		db.create_menu(menu[i], function(err, newmenu){
       			if(!err){
       				// console.log('menu ' + [i] + ': ', newmenu[0].menu_id);
       				let newmenu_id = newmenu[0].menu_id;
       				console.log('no error on menu');

       				let menuitems = [ 
   					[ [req.body.m1_item1_name, req.body.m1_item1_desc, parseFloat(req.body.m1_item1_price), newmenu_id, newbus_id],
  						[req.body.m1_item2_name, req.body.m1_item2_desc, parseFloat(req.body.m1_item2_price), newmenu_id, newbus_id],
  						[req.body.m1_item3_name, req.body.m1_item3_desc, parseFloat(req.body.m1_item3_price), newmenu_id, newbus_id],
  						[req.body.m1_item4_name, req.body.m1_item4_desc, parseFloat(req.body.m1_item4_price), newmenu_id, newbus_id],
              [req.body.m1_item5_name, req.body.m1_item5_desc, parseFloat(req.body.m1_item5_price), newmenu_id, newbus_id] 
            ],

            [ [req.body.m2_item1_name, req.body.m2_item1_desc, parseFloat(req.body.m2_item1_price), newmenu_id, newbus_id],
							[req.body.m2_item2_name, req.body.m2_item2_desc, parseFloat(req.body.m2_item2_price), newmenu_id, newbus_id],
							[req.body.m2_item3_name, req.body.m2_item3_desc, parseFloat(req.body.m2_item3_price), newmenu_id, newbus_id],
							[req.body.m2_item4_name, req.body.m2_item4_desc, parseFloat(req.body.m2_item4_price), newmenu_id, newbus_id],
							[req.body.m2_item5_name, req.body.m2_item5_desc, parseFloat(req.body.m2_item5_price), newmenu_id, newbus_id] 
						],

						[ [req.body.m3_item1_name, req.body.m3_item1_desc, parseFloat(req.body.m3_item1_price), newmenu_id, newbus_id],
              [req.body.m3_item2_name, req.body.m3_item2_desc, parseFloat(req.body.m3_item2_price), newmenu_id, newbus_id],
              [req.body.m3_item3_name, req.body.m3_item3_desc, parseFloat(req.body.m3_item3_price), newmenu_id, newbus_id],
              [req.body.m3_item4_name, req.body.m3_item4_desc, parseFloat(req.body.m3_item4_price), newmenu_id, newbus_id],
              [req.body.m3_item5_name, req.body.m3_item5_desc, parseFloat(req.body.m3_item5_price), newmenu_id, newbus_id] 
            ] 
          ];

	   					for(let k = 0; k < menuitems[i].length; k++){
	   						// console.log('menuitems here: ', menuitems)
	   						db.create_menuitems(menuitems[i][k], function(err, newitems){
	   							if(!err){
	   								console.log('no error on menuitems: ' + menuitems[i][k]);
	   							} else {
	   								console.log(err);
	   								res.send(err);
	   							}
	   						});
	   					}
       			} else {
       				console.log(err);
       				res.send(err);
       			}
       		});	
       	}


				//this is an array of images
				
				// let gallery = req.body.gallery;
				// console.log('gallery: ', gallery);
				// for (let i = 0; i < gallery.length; i++) {
				// 	db.create_gallery([gallery[i], newbus_id], function(err, newgallery){
				// 		if(!err){
				// 			console.log('no error on gallery');
				// 		} else {
				// 			console.log(err);
				// 			res.send(err);
				// 		}
				// 	});
				// }

    		return res.send(newbus);
    	} else {
    		return res.send(err);
    	}
    });
  }
}
