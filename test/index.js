'use strict'

var sha = require('../')
var assert = require('assert')
var read = require('fs').createReadStream
var write = require('fs').createWriteStream
var del = require('fs').unlinkSync

afterEach(function () {
  try {
    del(__dirname + '/output')
  } catch (ex) {
    if (ex.code !== 'ENOENT')
      throw ex
  }
})

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

describe('getSync', function () {
  describe('(filename)', function () {
    describe('with a non-existant file', function () {
      it('results in an error', function () {
        try {
          sha.getSync(__dirname + '/non-existant')
        } catch (err) {
          assert.equal(err.code, 'ENOENT')
          return
        }
        assert(false, 'Should throw an error')
      })
    })
    describe('with a file', function () {
      it('results in the `sha1` hash of the file', function () {
        var hash = sha.getSync(__dirname + '/data')
        assert.equal(hash, '48cecad55d3233c527421bebdd25f8475234b4d0')
      })
    })
  })
  describe('(filename, {algorithm: "md5"})', function () {
    describe('with a non-existant file', function () {
      it('results in an error', function () {
        try {
          sha.getSync(__dirname + '/non-existant', {algorithm: "md5"})
        } catch (err) {
          assert.equal(err.code, 'ENOENT')
          return
        }
        assert(false, 'Should throw an error')
      })
    })
    describe('with a file', function () {
      it('results in the `md5` hash of the file', function () {
        var hash = sha.getSync(__dirname + '/data', {algorithm: "md5"})
        assert.equal(hash, 'acb514860386ce1b290f327263b4c2ff')
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

describe('checkSync', function () {
  describe('(filename, expected)', function () {
    describe('with a non-existant file', function () {
      it('results in an error', function () {
        try {
          sha.checkSync(__dirname + '/non-existant', '48cecad55d3233c527421bebdd25f8475234b4d0')
        } catch (err) {
          assert.equal(err.code, 'ENOENT')
          return
        }
        assert(false, 'Should throw an error')
      })
    })
    describe('with the correct hash', function () {
      it('does not result in an error', function () {
        sha.checkSync(__dirname + '/data', '48cecad55d3233c527421bebdd25f8475234b4d0')
      })
    })
    describe('with the wrong hash', function () {
      it('results in an error', function () {
        try {
          sha.checkSync(__dirname + '/data', 'acb514860386ce1b290f327263b4c2ff')
        } catch (err) {
          assert(err)
          assert(err instanceof Error)
          return
        }
        assert(false, 'Should throw an error')
      })
    })
  })
  describe('(filename, expected, {algorithm: "md5"})', function () {
    describe('with a non-existant file', function () {
      it('results in an error', function () {
        try {
          sha.checkSync(__dirname + '/non-existant', 'acb514860386ce1b290f327263b4c2ff', {algorithm: "md5"})
        } catch (err) {
          assert.equal(err.code, 'ENOENT')
          return
        }
        assert(false, 'Should throw an error')
      })
    })
    describe('with the correct hash', function () {
      it('does not result in an error', function () {
        sha.checkSync(__dirname + '/data', 'acb514860386ce1b290f327263b4c2ff', {algorithm: "md5"})
      })
    })
    describe('with the wrong hash', function () {
      it('results in an error', function () {
        try {
          sha.checkSync(__dirname + '/data', '48cecad55d3233c527421bebdd25f8475234b4d0', {algorithm: "md5"})
        } catch (err) {
          assert(err)
          assert(err instanceof Error)
          return
        }
        assert(false, 'Should throw an error')
      })
    })
  })
})

describe('stream', function () {
  describe('.pipe(sha.stream(expected))', function () {
    describe('with the correct hash', function () {
      it('results in pass through', function (done) {
        var checkStream = read(__dirname + '/data')
                            .pipe(sha.stream('48cecad55d3233c527421bebdd25f8475234b4d0'))
        var writeStream = checkStream.pipe(write(__dirname + '/output'))
        checkStream.on('error', done)
        writeStream.on('close', function () {
          sha.check(__dirname + '/output', '48cecad55d3233c527421bebdd25f8475234b4d0', done)
        })
      })
    })
    describe('with the wrong hash', function () {
      it('results in an error', function (done) {
        var checkStream = read(__dirname + '/data')
                            .pipe(sha.stream('acb514860386ce1b290f327263b4c2ff'))
        var writeStream = checkStream.pipe(write(__dirname + '/output'))
        var erred = false
        checkStream.on('error', function (err) {
          assert.ok(err)
          erred = true
        })
        writeStream.on('close', function () {
          if (erred) return done()
        })
      })
    })
  })
  describe('.pipe(sha.stream(expected, {algorithm: "md5"}))', function () {
    describe('with the correct hash', function () {
      it('results in a `null` error', function (done) {
        var checkStream = read(__dirname + '/data')
                            .pipe(sha.stream('acb514860386ce1b290f327263b4c2ff', {algorithm: "md5"}))
        var writeStream = checkStream.pipe(write(__dirname + '/output'))
        checkStream.on('error', done)
        writeStream.on('close', function () {
          sha.check(__dirname + '/output', '48cecad55d3233c527421bebdd25f8475234b4d0', done)
        })
      })
    })
    describe('with the wrong hash', function () {
      it('results in an error', function (done) {
        var checkStream = read(__dirname + '/data')
                            .pipe(sha.stream('48cecad55d3233c527421bebdd25f8475234b4d0', {algorithm: "md5"}))
        var writeStream = checkStream.pipe(write(__dirname + '/output'))
        var erred = false
        checkStream.on('error', function (err) {
          assert.ok(err)
          erred = true
        })
        writeStream.on('close', function () {
          if (erred) return done()
        })
      })
    })
  })
})