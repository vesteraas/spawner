var spawner = require('..');
var assert = require('assert');

spawner.Spawner.run('echo', '"Hello world!"')
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

spawner.Spawner.run('ls', '/xyz')
    .on('stderr', function (data) {
        assert.equal('ls: /xyz: No such file or directory', data);
    })
    .on('exit', function (code) {
        assert.equal(1, code);
    });
