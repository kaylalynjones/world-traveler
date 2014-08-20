'use strict';

var Mongo = require('mongodb'),
    cp    = require('child_process'),
    fs    = require('fs'),
    path  = require('path'),
    _     = require('lodash');

function Vacation(obj){
  this.name = obj.name;
  this.lat = parseFloat(obj.lat);
  this.lng = parseFloat(obj.lng);
  this.start = new Date(obj.start);
  this.end = new Date(obj.end);
  this.photos = [];
}

Object.defineProperty(Vacation, 'collection', {
  get: function(){return global.mongodb.collection('vacations');}
});

Vacation.all = function(cb){
  Vacation.collection.find().toArray(cb);
};

Vacation.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Vacation.collection.findOne({_id:id}, function(err, vacation){
    vacation = changePrototype(vacation);
    cb(vacation);
  });
};

Vacation.prototype.save = function(cb){
  var vacation = this;
  Vacation.collection.save(this, function(){
    cb(vacation);
  });
};

Vacation.prototype.uploadPhoto = function(files, cb){
  var dir = __dirname + '/../static/img/' + this._id,
  exist = fs.existsSync(dir),
  self = this;

  if(!exist){
    fs.mkdirSync(dir);
  }

  files.photos.forEach(function(photo){
    var ext = path.extname(photo.path),
        rel = '/img/' + self._id + '/' + self.photos.length + ext,
        abs = dir + '/' + self.photos.length + ext;
    fs.renameSync(photo.path, abs);
    self.photos.push(rel);
  });
  Vacation.collection.save(self, cb);
};

Vacation.prototype.downloadPhoto = function(url, cb){
  var extensions = url.split('.'),
  extension = extensions[extensions.length - 1],
  dir = this._id,
  file = this.photos.length +'.'+extension,
  self = this;

  cp.execFile(__dirname + '/../scripts/download.sh', [url, file, dir], {cwd:__dirname + '/../scripts'},function(err, stdout, stderr){
    var photo = '/img/'+ dir +'/' + file;
    self.photos.push(photo);
    Vacation.collection.save(self, cb);
  });
};

function changePrototype(obj){
  var vacation = _.create(Vacation.prototype, obj);
  return vacation;
}


module.exports = Vacation;

