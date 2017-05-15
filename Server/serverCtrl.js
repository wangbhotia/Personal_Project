const app = require('./server'), 
			db = app.get('db');

module.exports = {
  getAllBus: (req, res) => {
    db.get_all_bus(function(err, businesses){
      (!err) ? res.send(businesses) : res.send(err);
    });
  },

  getSpecial: (req, res) => {
    let sId = parseInt(req.params.id);
    db.get_special(sId, function(err, special){
      (!err) ? res.send(special) : res.send(err);
    });
  },

  getMenu: (req, res) => {
    let mId = parseInt(req.params.id);
    db.get_menu(mId, function(err, menu){
      (!err) ? res.send(menu) : res.send(err);
    });
  },

  getMenuItems: (req, res) => {
    let miId = parseInt(req.params.id);
    db.get_menu_items(miId, function(err, menuitems){
      (!err) ? res.send(menuitems) : res.send(err);
    });
  },

  getGallery: (req, res) => {
    let gId = parseInt(req.params.id);
    db.get_gallery(gId, function(err, gallery){
      (!err) ? res.send(gallery) : res.send(err);
    });
  },

  newBus: (req, res) => {
		let busInfo = [req.body.bus_name, req.body.bus_slogan, req.body.bus_phone, 
      						req.body.bus_email, req.body.bus_type, req.body.bus_cuisine,
      						req.body.bus_desc, req.body.bus_happy_hours, req.body.bus_logo,
      						req.body.bus_cover_img, req.body.user_id];
    
    db.create_bus(busInfo, function(err, newbus){
    	if(!err){
    		let newbus_id = newbus[0].id;
		  	// console.log('new id from db:', newbus[0].id);

				db.create_address([req.body.street, req.body.city, req.body.state, req.body.zip, newbus_id], function(err, newadd){
					if(!err){
						console.log('no error on address');
					} else {
						console.log(err);
						res.send(err);
					}
				});

				db.create_hours([req.body.sunday, req.body.monday, req.body.tuesday, req.body.wednesday, req.body.thursday, req.body.friday, req.body.saturday,
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
				let gallery = req.body.gallery;
				for (let i = 0; i < gallery.length; i++) {
					db.create_gallery([gallery[i], newbus_id], function(err, newgallery){
						if(!err){
							console.log('no error on gallery');
						} else {
							console.log(err);
							res.send(err);
						}
					});
				}

    		return res.send(newbus);
    	} else {
    		return res.send(err);
    	}
    });
  },

  updateBus: (req, res, next) => {
  	let toUpdateBus = [req.body.id, req.body.bus_name, req.body.bus_slogan, req.body.bus_phone, req.body.bus_email, req.body.bus_type, req.body.bus_cuisine, req.body.bus_desc, req.body.bus_happy_hours, req.body.bus_logo, req.body.bus_cover_img];

  	db.update_bus(toUpdateBus, function(err, updatedBus){
  		if(!err){
  			// return res.send(updatedBus);
  		} else {
  			console.log(err);
  			return res.send(err);
  		}
  	});
  	next();
  },

  updateAddress: (req, res, next) => {
  	let toUpdateAdd = [req.body.id, req.body.street, req.body.city, req.body.state, req.body.zip];

  	db.update_address(toUpdateAdd, function(err, updatedAdd){
  		if(!err){
  			// return res.send(updatedAdd);
  		} else {
  			console.log(err);
  			return res.send(err);
  		}
  	});
  	next();
  },

  updateHours: (req, res, next) => {
  	let toUpdateHours = [req.body.id, req.body.sunday, req.body.monday, req.body.tuesday, req.body.wednesday, req.body.thursday, req.body.friday, req.body.saturday];

  	db.update_hours(toUpdateHours, function(err, updatedHours){
  		if(!err){
  			// return res.send(updatedHours);
  		} else {
  			console.log(err);
  			return res.send(err);
  		}
  	});
  	next();
  },

  updateSocial: (req, res) => {
  	let toUpdateSocial = [req.body.id, req.body.facebook, req.body.googleplus, req.body.instagram, req.body.yelp, req.body.tripadvisor, req.body.twitter];

  	db.update_social(toUpdateSocial, function(err, updatedSocial){
  		if(!err){
  			return res.send(updatedSocial);
  		} else {
  			console.log(err);
  			return res.send(err);
  		}
  	});
  },

  featureBus: (req, res) => {
    let featBus = [req.body.featured, req.body.id];

    db.feature_bus(featBus, function(err, busFeatured){
      if(!err){
        return res.send(busFeatured);
      } else {
        console.log(err);
        return res.send(err);
      }
    });
  },

  deleteBus: (req, res) => {
  	let toDelBusId = parseInt(req.params.id);
  	db.delete_bus(toDelBusId, function(err, delbus){
  		if(!err){
  			return res.send(delbus);
  		} else {
  			console.log(err);
  			return res.send(err);
  		}
  	});
  }

}
