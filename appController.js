App = require("./appModel");
User = require("./userModel");



//Handle Index Actions
exports.index = function (req, res) {
    App.get(function (err, apps) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }else{
            User.find({"email": req.params.email}, function(err, response){
                if (err){
                    res.json(err)
                }else{
                    //console.log("User:- ",response);
                    //console.log("Length:- ",response.length);
                    var key = "isFavourite";
                    var trueValue = true;
                    var falseValue = false;
                    for(var i=0; i<apps.length; i++){
                       // console.log("apps[",i,"]:- ",apps[i]);

                        for(var j=0; j<response.length; j++){
                          //  console.log("response[",j,"]:- ", response[j]);
                            if(response[j].favourites.indexOf(apps[i]._id) >= 0){
                                console.log("Reached in true");
                                apps[i][key] = true;
                            }else{
                                console.log("Reached in false")
                                apps[i][key] = false;
                            }
                            console.log("apps[",i,"]:- ",apps[i]);
                        }
                    }
                    res.json({
                        message: 'New app created!',
                        data: apps,
                        response: response
                    });

                }
            })
            
            /*res.json({
                status: "success",
                message: "App Details Retrieved successfully",
                data: apps
            });*/
    }
    });
};


//Handle Create App Actions
exports.new = function (req, res) {
    var app = new App();
    app.appTitle = req.body.appTitle;
    app.description = req.body.description;
    app.url = req.body.url;
    app.tags = req.body.tags;
    app.createdBy = req.body.createdBy;
    app.authors = req.body.authors;
   
// save the app and check for errors
    app.save(function (err, response) {
         if (err){
             res.json(err);
         }
         else{
            res.json({
                message: 'New app created!',
                data: app,
                response: response
            });
         }
    });
};

/*
// Handle view app info
exports.view = function (req, res) {
    app.findById(req.params.appTitle, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};*/

// Handle delete app actions
exports.delete = function (req, res) {
    
    App.remove({
        _id: req.params.app_id
       //appTiltle: req.params.appTitle
    }, function (err, response) {
        if (err)
            res.send(err);
        else{
            res.json({
                status: "success",
                message: 'App deleted',
                response: response
            });
        }

    });
};



// Handle update contact info
exports.update = function (req, res) {
    App.findById(req.params.app_id, function (err, app) {
            if (err){
                res.send(err);
            }else{
                app.appTitle = req.body.appTitle;
                app.Description = req.body.Description;
                app.url = req.body.url;
                app.tags = req.body.tags;
                app.createdBy = req.body.createdBy;
                app.authors = req.body.authors;
    // save the contact and check for errors
            app.save(function (err, response) {
                if (err){
                    res.json(err);
                }else{
                    res.json({
                        message: 'App Info updated',
                        data: response
                    });
                }
                
            });
            }
    
        });
    };