/// <reference path="../typings/node.d.ts" />

import {spawn} from 'child_process'
import {EventEmitter} from 'events';

export default class Spawn {
    static run(cmd: string, params: string) {
        let paramParts = params.match(/(("|').*?("|')|[^("|')\s]+)(?=\s*|\s*$)+/g) || <any>[];

        let emitter = new EventEmitter();

        var child = spawn(cmd, paramParts);

        child.stderr.on('data', (data: any) => {
            var buff = new Buffer(data);
            emitter.emit('stderr', buff.toString('utf8').replace(/(\r\n|\n|\r)/gm,""));
        });

        child.stdout.on('data', (data: any) => {
            var buff = new Buffer(data);
            emitter.emit('stdout', buff.toString('utf8').replace(/(\r\n|\n|\r)/gm,""));
        });

        child.on('error', function (error: any) {
            emitter.emit('error', error);
        });

        child.on('exit', function (code: number) {
            emitter.emit('exit', code);
        });

        return emitter;
    }
}