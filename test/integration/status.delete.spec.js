'use strict';

/* dependencies */
const path = require('path');
const mongoose = require('mongoose');
const { expect } = require('chai');
const { Status } = require(path.join(__dirname, '..', '..'));

describe('Status', function () {

  before(function (done) {
    mongoose.connect('mongodb://localhost/majifix-status', done);
  });

  before(function (done) {
    Status.remove(done);
  });

  describe('static delete', function () {

    let account;

    before(function (done) {
      const fake = Status.fake();
      fake
        .post(function (error, created) {
          account = created;
          done(error, created);
        });
    });

    it('should be able to delete', function (done) {
      Status
        .del(account._id, function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(account._id);
          done(error, deleted);
        });
    });

    it('should throw if not exists', function (done) {
      Status
        .del(account._id, function (error, deleted) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(deleted).to.not.exist;
          done();
        });
    });

  });

  describe('instance delete', function () {

    let account;

    before(function (done) {
      const fake = Status.fake();
      fake
        .post(function (error, created) {
          account = created;
          done(error, created);
        });
    });

    it('should be able to delete', function (done) {
      account
        .del(function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(account._id);
          done(error, deleted);
        });
    });

    it('should throw if not exists', function (done) {
      account
        .del(function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(account._id);
          done();
        });
    });

  });

  after(function (done) {
    Status.remove(done);
  });

});