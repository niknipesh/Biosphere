App = require("./appModel");



//Handle Index Actions
exports.index = function (req, res) {
    App.get(function (err, apps) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "App Details Retrieved successfully",
            data: apps
        });
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
                message: 'Contact deleted',
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
                        message: 'Contact Info updated',
                        data: response
                    });
                }
                
            });
            }
    
        });
    };