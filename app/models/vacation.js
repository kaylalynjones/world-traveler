'use strict';

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

Vacation.prototype.save = function(cb){
  var vacation = this;
  Vacation.collection.save(this, function(){
    cb(vacation);
  });
};

module.exports = Vacation;

