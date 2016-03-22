"use strict";
var child_process_1 = require('child_process');
var events_1 = require('events');
var Spawner = (function () {
    function Spawner() {
    }
    Spawner.run = function (cmd, params) {
        var paramParts = params.match(/(("|').*?("|')|[^("|')\s]+)(?=\s*|\s*$)+/g) || [];
        var emitter = new events_1.EventEmitter();
        var child = child_process_1.spawn(cmd, paramParts);
        child.stderr.on('data', function (data) {
            var buff = new Buffer(data);
            emitter.emit('stderr', buff.toString('utf8').replace(/(\r\n|\n|\r)/gm, ""));
        });
        child.stdout.on('data', function (data) {
            var buff = new Buffer(data);
            emitter.emit('stdout', buff.toString('utf8').replace(/(\r\n|\n|\r)/gm, ""));
        });
        child.on('error', function (error) {
            emitter.emit('error', error);
        });
        child.on('exit', function (code) {
            emitter.emit('exit', code);
        });
        return emitter;
    };
    return Spawner;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Spawner;
//# sourceMappingURL=Spawner.js.map