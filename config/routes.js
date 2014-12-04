module.exports = function (router) {
    var homeController = require('../controllers/home-controller');
    var authController = require('../controllers/auth-controller');
    var userController = require('../controllers/user-controller');
    var friendController = require('../controllers/friend-controller');
    var wallController = require('../controllers/wall-controller');

    router.route('/')
    .get(homeController.index);

    router.route('/auth/login')
    .get(authController.index)
    .post(authController.login);

    router.route('/auth/logout')
    .get(authController.logout, passport.authenticate('local', { failureRedirect: '/' }));

    router.route('/user/show/:id')
    .get(userController.index, passport.authenticate('local', { failureRedirect: '/auth/login' }));

    router.route('/user/add')
    .get(userController.addForm)
    .post(userController.add);

    router.route('/user/modify')
    .get(userController.modify, passport.authenticate('local', { failureRedirect: '/auth/login' }));

    router.route('/user/delete')
    .get(userController.delete, passport.authenticate('local', { failureRedirect: '/auth/login' }));

    router.route('/friends')
    .get(friendController.index, passport.authenticate('local', { failureRedirect: '/auth/login' }))
    .post(friendController.add, passport.authenticate('local', { failureRedirect: '/auth/login' }));

    router.route('/friends/accept/:id')
    .get(friendController.accept, passport.authenticate('local', { failureRedirect: '/auth/login' }));

    router.route('/friends/ignore/:id')
    .get(friendController.ignore, passport.authenticate('local', { failureRedirect: '/auth/login' }));

    router.route('/friends/delete/:id')
    .get(friendController.delete, passport.authenticate('local', { failureRedirect: '/auth/login' }));

    router.route('/wall')
    .get(wallController.index, passport.authenticate('local', { failureRedirect: '/auth/login' }));

    router.route('/post/add')
    .get(wallController.addPostForm, passport.authenticate('local', { failureRedirect: '/auth/login' }))
    .post(wallController.addPost, passport.authenticate('local', { failureRedirect: '/auth/login' }));

    router.route('/post/show/:id')
    .get(wallController.getPost, passport.authenticate('local', { failureRedirect: '/auth/login' }));

    router.route('/post/delete/:id', passport.authenticate('local', { failureRedirect: '/auth/login' }))
    .get(wallController.deletePost);
}
