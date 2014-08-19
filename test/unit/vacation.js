/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect      = require('chai').expect,
    Vacation    = require('../../app/models/vacation'),
    dbConnect   = require('../../app/lib/mongodb'),
    cp          = require('child_process'),
    Mongo       = require('mongodb'),
    db          = 'traveler-test';

describe('Vacation', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Vacation object', function(){
      var obj = {name:'Paris, France', lat:'48.856614', lng:'2.3522219000000177', start:'mm/dd/yyyy', end:'mm/dd/yyyy'},
           v1 = new Vacation(obj);
      expect(v1).to.be.instanceof(Vacation);
      expect(v1).to.be.okay;
      expect(v1.lat).to.equal(48.856614);
    });
  });

  describe('.all', function(){
    it('should get all the vacations', function(done){
      Vacation.all(function(err, vacations){
        expect(vacations).to.have.length(5);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should get a vacation by the id', function(done){
      var id = '000000000000000000000001';
      Vacation.findById(id, function(vacation){

        console.log(vacation);
        expect(vacation.name).to.equal('Imperial Beach');
        done();
      });
    });
  });

  describe('#save', function(){
    it('should save a vacation to the database', function(done){
      var obj = {name:'Paris, France', lat:'48.856614', lng:'2.3522219000000177', start:'mm/dd/yyyy', end:'mm/dd/yyyy'},
          vacation = new Vacation(obj);
      vacation.save(function(vacation){

        expect(vacation._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
});

