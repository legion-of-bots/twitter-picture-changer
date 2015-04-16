var Twit = require('twit');

var T = new Twit(config.twitter);

module.exports = function(user, image) {
  var def = Q.defer();
  fs.readFile(image, { encoding: 'base64' }, function(err, b64) {
    if (err) { def.reject(err); }
    else {
      T.post('account/update_profile_image', { image: b64, skip_status: 1}, function(err, data, response) {
        if (err) { def.reject(err); }
        else     { def.resolve();   }
      });
    }
  });
  return def.promise;
};
