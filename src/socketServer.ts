import * as SocketIO from 'socket.io';
import * as express from 'express';
import * as http from 'http';

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

export function createSocket () {
   
    console.log('create socketio');
    io.on('connection', (ioClient) => {
        ioClient.on('subscribeToTimer', (interval) => {
            console.log('client is subscribing to timer with interval ', interval);
            setInterval(
                () => {
                    ioClient.emit('timer', new Date()); 
                },
                interval
            );
        });
    });
}

export function closeSocket () {
    io.close();
    server.close();
}

app.get('/haha', function(req: express.Request, res: express.Response){
    io.emit('timer', 0);
    res.send('hello world');
    console.log('hello!!!!!');
});

server.listen(8000);