let router = require('express').Router();
// Import contact controller
var contactController = require('./contactController');
var appController = require('./appController');


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
    .get(appController.index)
    .post(appController.new);

router.route('/apps/:app_id')
    .delete(appController.delete)
    .put(appController.update)
    .patch(appController.update)


module.exports = router;