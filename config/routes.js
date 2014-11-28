module.exports = function (router) {
    var homeController = require('../controllers/home-controller');
    var authController = require('../controllers/auth-controller');
    var userController = require('../controllers/user-controller');
    var friendController = require('../controllers/friend-controller');
    var wallController = require('../controllers/wall-controller');

    router.route('/')
    .get(homeController.index);

    router.route('/auth')
    .get(authController.login)
    .post(authController.login);

    router.route('/auth/logout')
    .get(authController.logout);

    router.route('/user/:id')
    .get(userController.index)
    .post(userController.add);

    router.route('/user/:id/modify')
    .get(userController.modify);

    router.route('/user/:id/delete')
    .get(userController.delete);

    router.route('/friends')
    .get(friendController.index)
    .post(friendController.add);

    router.route('/friends/:id/accept')
    .get(friendController.accept);

    router.route('/friends/:id/ignore')
    .get(friendController.ignore);

    router.route('/friends/:id/delete')
    .get(friendController.delete);

    router.route('/wall')
    .get(wallController.index)
    .post(wallController.addPost);

    router.route('/wall/:id')
    .get(wallController.getPost);

    router.route('/wall/:id/delete')
    .get(wallController.deletePost);
}
