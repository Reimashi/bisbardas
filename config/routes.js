function checkLogin(req, res, next) {
    if (req.session.user) {
        if (req.session.user.lang) {
            res.setLocale(req.session.user.lang);
        }
        next();
    } else {
        res.redirect('/user/add');
    }
}

module.exports = function (router) {
    var authController = require('../controllers/auth-controller');
    var userController = require('../controllers/user-controller');
    var friendController = require('../controllers/friend-controller');
    var wallController = require('../controllers/wall-controller');

    router.route('/')
    .get(checkLogin, wallController.index);

    router.route('/auth/login')
    .get(authController.loginGet)
    .post(authController.loginPost);

    router.route('/auth/logout')
    .get(authController.logoutPost)
    .post(authController.logoutPost);

    router.route('/user/show/:id')
    .get(checkLogin, userController.index);

    router.route('/user/add')
    .get(userController.addGet)
    .post(userController.addPost);

    router.route('/user/modify')
    .get(checkLogin, userController.modifyGet)
    .post(checkLogin, userController.modifyPost);

    router.route('/user/delete')
    .post(checkLogin, userController.delete)
    .post(checkLogin, userController.delete);

    router.route('/users/list')
    .get(checkLogin, userController.usersListGet);

    router.route('/users/list/:page')
    .get(checkLogin, userController.usersListGet);

    router.route('/friends')
    .get(checkLogin, friendController.index);

    router.route('/friends/add/:id')
    .get(checkLogin, friendController.add)
    .post(checkLogin, friendController.add);

    router.route('/friends/accept/:id')
    .get(checkLogin, friendController.accept);

    router.route('/friends/ignore/:id')
    .get(checkLogin, friendController.ignore);

    router.route('/friends/delete/:id')
    .get(checkLogin, friendController.delete);

    router.route('/wall')
    .get(checkLogin, wallController.index);

    router.route('/post/add')
    .post(checkLogin, wallController.addPost);

    router.route('/post/show/:id')
    .get(checkLogin, wallController.getPost);

    router.route('/post/delete/:id')
    .get(checkLogin, wallController.deletePost);

    router.route('/post/like/:id')
    .get(checkLogin, wallController.deletePost);

    router.route('/post/unlike/:id')
    .get(checkLogin, wallController.deletePost);
}
