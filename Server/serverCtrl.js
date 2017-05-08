const app = require('./server'), 
			db = app.get('db');

module.exports = {
  newBus: function(req, res){
  	// console.log(req.body)
		let busInfo = [req.body.name, req.body.slogan, req.body.phone, 
      req.body.email, req.body.type, req.body.cuisine,
      req.body.about, req.body.happyh, req.body.logo,
      req.body.coverimg]; //req.body.userid
    
    // let address = [req.body.street, req.body.city, req.body.state,
      // req.body.zip];
    var newbus_id;
    db.create_bus(busInfo, function(err, newbus){
    	if(!err){
    		// console.log('SQL response SAYS:', newbus[0].id);

    		// let test = JSON.parse(newbus);
    		// newbus_id = test["id"];
    		// console.log('test', newbus_id)
    		// newbus_id = newbus[0].id;
    		// console.log('newbus_id: ', newbus_id);
    	// 	console.log('ad:', address);

		  	console.log(newbus[0].id);
    		return newbus[0].id;
    	} else {
    		return res.send(err);
    	}
    });
    console.log('outside of fn:', newbus_id);
  },

  newAddress: function(req, res){
  	db.create_address(address, newbus_id, function(err, newadd){
  		if(!err){
  			return res.send(newadd);
  		} else {
  			res.send(err);
  		}
  	});
  }

    /*

    let hours = [
          req.body.sun,
          req.body.mon,
          req.body.tue,
          req.body.wed,
          req.body.thu,
          req.body.fri,
          req.body.sat,
          req.body.busid
        ]

    let special = [
            req.body.spname1,
            req.body.spdesc1,
            req.body.spimg1,
            req.body.spbg1,
            req.body.busid
            // -----------------
            // req.body.spname2,
            // req.body.spdesc2,
            // req.body.spimg2,
            // req.body.spbg2,
            // req.body.busid
          ]

    let menu = [
        req.body.m1_title,
        req.body.busid
        // --------------------
        // req.body.m2_title,
        // req.body.busid
        // --------------------
        // req.body.m3_title,
        // req.body.busid
      ]

    let menuitems = [
              req.body.m1_item1_name,
              req.body.m1_item1_desc,
              req.body.m1_item1_price,
              req.body.menuid
            //   -------------------------
            //   req.body.m1_item2_name,
            //   req.body.m1_item2_desc,
            //   req.body.m1_item2_price,
            //   req.body.menuid
            //   -------------------------
            //   req.body.m1_item3_name,
            //   req.body.m1_item3_desc,
            //   req.body.m1_item3_price,
            //   req.body.menuid
            //   -------------------------
            //   req.body.m1_item4_name,
            //   req.body.m1_item4_desc,
            //   req.body.m1_item4_price,
            //   req.body.menuid
            //   -------------------------
            //   req.body.m1_item5_name,
            //   req.body.m1_item5_desc,
            //   req.body.m1_item5_price,
            //   req.body.menuid


            //   ---------------------------
            //   ---------------------------
            //   ---------------------------


            //   req.body.m2_item1_name,
            //   req.body.m2_item1_desc,
            //   req.body.m2_item1_price,
            //   req.body.menuid
            //   -------------------------
            //   req.body.m2_item2_name,
            //   req.body.m2_item2_desc,
            //   req.body.m2_item2_price,
            //   req.body.menuid
            //   -------------------------
            //   req.body.m2_item3_name,
            //   req.body.m2_item3_desc,
            //   req.body.m2_item3_price,
            //   req.body.menuid
            //   -------------------------
            //   req.body.m2_item4_name,
            //   req.body.m2_item4_desc,
            //   req.body.m2_item4_price,
            //   req.body.menuid
            //   -------------------------
            //   req.body.m2_item5_name,
            //   req.body.m2_item5_desc,
            //   req.body.m2_item5_price,
            //   req.body.menuid


            //   ---------------------------
            //   ---------------------------
            //   ---------------------------


            //   req.body.m3_item1_name,
            //   req.body.m3_item1_desc,
            //   req.body.m3_item1_price,
            //   req.body.menuid
            //   -------------------------
            //   req.body.m3_item2_name,
            //   req.body.m3_item2_desc,
            //   req.body.m3_item2_price,
            //   req.body.menuid
            //   -------------------------
            //   req.body.m3_item3_name,
            //   req.body.m3_item3_desc,
            //   req.body.m3_item3_price,
            //   req.body.menuid
            //   -------------------------
            //   req.body.m3_item4_name,
            //   req.body.m3_item4_desc,
            //   req.body.m3_item4_price,
            //   req.body.menuid
            //   -------------------------
            //   req.body.m3_item5_name,
            //   req.body.m3_item5_desc,
            //   req.body.m3_item5_price,
            //   req.body.menuid
            ]

    let gallery = [
            req.body.gallery,
            req.body.busid
          ]

    let social = [
          req.body.facebook,
          req.body.googleplus,
          req.body.instagram,
          req.body.yelp,
          req.body.tripadvisor,
          req.body.pinterest,
          req.body.twitter,
          req.body.busid
        ] */



}