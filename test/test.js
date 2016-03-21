var example = require('..');
var assert = require('assert');

example.Spawn.run('echo', '"Hello world!"')
    .on('stderr', function (data) {
        console.log(data);
    })
    .on('stdout', function (data) {
        assert.equal(data, '"Hello world!"');
    })
    .on('error', function (error) {
        console.log(error);
    })
    .on('exit', function (code) {
        assert.equal(0, code);
    });

example.Spawn.run('ls', '/xyz')
    .on('stderr', function (data) {
        assert.equal('ls: /xyz: No such file or directory', data);
    })
    .on('exit', function (code) {
        assert.equal(1, code);
    });
