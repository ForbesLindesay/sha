var sha = require('../')
var assert = require('assert')

describe('get', function () {
  describe('(filename, callback(err, hash))', function () {
    describe('with a non-existant file', function () {
      it('results in an error', function (done) {
        sha.get(__dirname + '/non-existant', function (err, hash) {
          assert.equal(hash, undefined)
          assert.equal(err.code, 'ENOENT')
          return done()
        })
      })
    })
    describe('with a file', function () {
      it('results in the `sha1` hash of the file', function (done) {
        sha.get(__dirname + '/data', function (err, hash) {
          assert.equal(hash, '48cecad55d3233c527421bebdd25f8475234b4d0')
          return done()
        })
      })
    })
  })
  describe('(filename, {algorithm: "md5"}, callback(err, hash))', function () {
    describe('with a non-existant file', function () {
      it('results in an error', function (done) {
        sha.get(__dirname + '/non-existant', {algorithm: "md5"}, function (err, hash) {
          assert.equal(hash, undefined)
          assert.equal(err.code, 'ENOENT')
          return done()
        })
      })
    })
    describe('with a file', function () {
      it('results in the `md5` hash of the file', function (done) {
        sha.get(__dirname + '/data', {algorithm: "md5"}, function (err, hash) {
          assert.equal(hash, 'acb514860386ce1b290f327263b4c2ff')
          return done()
        })
      })
    })
  })
})


describe('check', function () {
  describe('(filename, expected, callback(err, hash))', function () {
    describe('with a non-existant file', function () {
      it('results in an error', function (done) {
        sha.check(__dirname + '/non-existant', '48cecad55d3233c527421bebdd25f8475234b4d0',
          function (err) {
            assert.equal(err.code, 'ENOENT')
            return done()
          })
      })
    })
    describe('with the correct hash', function () {
      it('results in a `null` error', function (done) {
        sha.check(__dirname + '/data', '48cecad55d3233c527421bebdd25f8475234b4d0',
          function (err) {
            assert.equal(err, null)
            return done()
          })
      })
    })
    describe('with the wrong hash', function () {
      it('results in an error', function (done) {
        sha.check(__dirname + '/data', 'acb514860386ce1b290f327263b4c2ff',
          function (err) {
            assert(err)
            assert(err instanceof Error)
            return done()
          })
      })
    })
  })
  describe('(filename, expected, {algorithm: "md5"}, callback(err, hash))', function () {
    describe('with a non-existant file', function () {
      it('results in an error', function (done) {
        sha.check(__dirname + '/non-existant', 'acb514860386ce1b290f327263b4c2ff', {algorithm: "md5"},
          function (err) {
            assert.equal(err.code, 'ENOENT')
            return done()
          })
      })
    })
    describe('with the correct hash', function () {
      it('results in a `null` error', function (done) {
        sha.check(__dirname + '/data', 'acb514860386ce1b290f327263b4c2ff', {algorithm: "md5"},
          function (err) {
            assert.equal(err, null)
            return done()
          })
      })
    })
    describe('with the wrong hash', function () {
      it('results in an error', function (done) {
        sha.check(__dirname + '/data', '48cecad55d3233c527421bebdd25f8475234b4d0', {algorithm: "md5"},
          function (err) {
            assert(err)
            assert(err instanceof Error)
            return done()
          })
      })
    })
  })
})