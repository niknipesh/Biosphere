let router = require('express').Router();
// Import contact controller
var contactController = require('./contactController');
var appController = require('./appController');
var userController = require('./userController');


router.get('/', function (req, res) {
    res.json({
       status: 'Working',
       message: 'Welcome to BIOSPHERE!!!',
    });
});


// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);


router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);


router.route('/apps')
    .post(appController.new);

router.route('/apps/:email')
    .get(appController.index)

router.route('/apps/:app_id')
    .delete(appController.delete)
    .put(appController.update)
    .patch(appController.update)


router.route('/users')
    .get(userController.index)
    .post(userController.new)

router.route('/users/:user_id')
    .put(userController.update)


module.exports = router;