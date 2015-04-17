require('./globals');

var request = require('request');

var imgPath = path.join(ROOT, 'img', 'img.jpg');

var Twit = require('twit');

var T = new Twit(config.twitter);

var writeLog = function(msg) {
  var p = path.join(ROOT, 'log', 'log.json');
  fs.readFile(p, function(err, data) {
    data = JSON.parse(data);
    data.push(msg);
    fs.writeFile(p, JSON.stringify(data, undefined, 2));
  });
};

fs.exists(imgPath, function loop(exists) {
  if (!exists) {
    T.get('users/show', { screen_name: 'yaworsw' }, function(err, data, res) {
      request(data.profile_image_url.replace('_normal', '')).pipe(fs.createWriteStream(imgPath)).on('close', function() {
        loop(true);
      });
    });
  } else {
    require('./lib/modifiers/rotate')(imgPath, { degs: config.degs }).then(function() {
      fs.readFile(imgPath, { encoding: 'base64' }, function(err, b64) {
        T.post('account/update_profile_image', { image: b64, skip_status: 1 }, function(err, data, response) {

        });
      });
    }, function() {
      writeLog('error' + arguments);
    });
  }
});
