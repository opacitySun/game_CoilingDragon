var express = require('express');
var router = express.Router();
var ueditorController = require('../server/controller/ueditorController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'welcome to sun admin',layout: 'layout.html' });
});

/* user-list */
router.get('/user', function(req, res, next) {
  res.render('user', { title: '用户',layout: 'layout.html' });
});

/* login */
router.get('/login', function(req, res) {
	res.render('login', { title: 'login',layout: false });
});

/* ueditor-img-del */
router.post('/ueditor-img-del', function(req, res) {
  ueditorController.removeImgAction(req, res);
});

module.exports = router;
