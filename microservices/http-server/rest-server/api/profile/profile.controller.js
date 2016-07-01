var controller = {};

var context = require('../../context');
var mesh = context.mesh;

controller.createdProfile = function(req, res) {
  mesh.act('role:profile,cmd:create', req.body, function(err, response) {
    if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(409).send(); }
    return res.status(201).send();
  });
};

controller.getProfile = function(req, res) {
  mesh.act('role:profile,cmd:getProfile', req.body, function(err, response) {
    if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(409).send(); }
    return res.status(201).send();
  });
};

controller.addFriend = function(req, res) {
  mesh.act('role:profile,cmd:addFriend', req.body, function(err, response) {

  });
};

controller.editProfile = function(req, res) {
  const editProfileRequest = req.body;
  editProfileRequest.username = req.claims.sub;
  mesh.act('role:profile,cmd:editProfile', editProfileRequest, function(err, response) {
    if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { console.log('HERE2: ', response); return res.status(404).send(); }
    return res.status(200).send();
  });
};

exports = module.exports = controller;
