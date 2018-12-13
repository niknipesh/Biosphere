User = require("./userModel");


//Handle Index Actions
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "User Details Retrieved successfully",
            data: users
        });
    });
};



//Handle Create App Actions
exports.new = function (req, res) {
    var user = new User();
    user.email = req.body.email;
    user.favourites =  req.body.favourites;
   
// save the app and check for errors
    user.save(function (err, response) {
         if (err){
             res.json(err);
         }
         else{
            res.json({
                message: 'New user created!',
                data: user,
                response: response
            });
         }
    });
};




// Handle update contact info
exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
            if (err){
                res.send(err);
            }else{
                user.email = req.body.email;
                user.favourites = req.body.favourites;
    // save the contact and check for errors
            user.save(function (err, response) {
                if (err){
                    res.json(err);
                }else{
                    res.json({
                        message: 'User info updated',
                        data: response
                    });
                }
                
            });
            }
    
        });
    };