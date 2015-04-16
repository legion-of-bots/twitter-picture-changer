module.exports = function(p, opts) {
  var def = Q.defer();
  gm(p)
    .rotate(opts.color || 'white', opts.degs || 90)
    .write(p, function (err) {
      if (err) { def.reject(err); }
      else     { def.resolve();   }
    });
  return def.promise;
};
