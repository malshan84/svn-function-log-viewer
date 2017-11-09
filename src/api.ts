import * as openSocket from 'socket.io-client';

const  socket = openSocket('http://localhost:8000');

export default function subscribeToTimer(cb: Function) {
    socket.on('timer', (timestamp: number) => {cb(timestamp); });
    socket.emit('subscribeToTimer', 1000);
    console.log('subscribe!!!!!');
}