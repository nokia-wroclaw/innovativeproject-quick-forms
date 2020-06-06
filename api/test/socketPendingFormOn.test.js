const  {beforeAll, afterAll, afterEach, beforeEach} = require( "@jest/globals");
const express = require('express');

const socketPendingFormOn = require('../src/sockets/socketPendingFormOn');

const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');
const app = express();

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

beforeAll((done) => {
    httpServer = require('http').createServer(app);
    httpServerAddr = httpServer.listen().address();
    ioServer = ioBack(httpServer);
    done();
});

afterAll((done) => {
    ioServer.close();
    httpServer.close();
    done();
});

beforeEach((done) => {
    socket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
        'reconnection delay': 0,
        'reopen delay': 0,
        'force new connection': true,
        transports: ['websocket'],
    });
    socket.on('connect', () => {
        done();
    });
});

afterEach((done) => {
    if (socket.connected) {
        socket.disconnect();
    }
    done();
});
    test('should communicate', (done) => {
        // once connected, emit Hello World
        ioServer.emit('echo', 'Hello World');
        socket.once('echo', (message) => {
            // Check that the message matches
            expect(message).toBe('Hello World');
            done();
        });
        ioServer.on('connection', (mySocket) => {
            expect(mySocket).toBeDefined();
        });
    });
    test('should communicate with waiting for socket.io handshakes', (done) => {
        // Emit sth from Client do Server
        socket.emit('examlpe', 'some messages');
        // Use timeout to wait for socket.io server handshakes
        setTimeout(() => {
            // Put your server side expect() here
            done();
        }, 50);
    });



test('Form is created on create command', () => {
    const socketDictionary = {};
    socketPendingFormOn.start(app, ioBack, socketDictionary)
    const command = 'create'
    const data = {
        filledFormNumberID: 'aaa-bbb-ccc-ddd',
        state: 1
    }

    const dataToSend = [command, data]
    ioServer.emit('pendingFormID', dataToSend)
})
//
// test('Form is created on create command only when it did not exist before', () => {
//    // expect(socketPendingFormOn.start());
// });
//
// test('editForm edits form', () => {
//
// });
//
// test('Form is edited on edit command only when it existed before', () => {
//     //if foundForm === null here
// });
//
// test('Form executes only specified commands', () => {
//
// });
