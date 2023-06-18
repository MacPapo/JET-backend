import { Server } from "socket.io";
import { sockerPort } from '../config';

class SocketManager {
    private static instance: SocketManager;
    private io = new Server(sockerPort, { cors: { origin: '*' } });


    handleConnection() {
        console.log('Socket server running on port ' + sockerPort);

        this.io.on('connection', (socket) => {
            console.log('New connection: ' + socket.id);

            socket.on('new-order', (order) => {
                console.log('New order: ' + order);
                this.io.emit('cooker-bartender-new-order', 'New Order on table n.' + order + ' Added!');
            });

            socket.on('error', function (err) {
                console.log(err);
            });

        });

        this.io.on('disconnect', (socket) => {
            console.log('Disconnect: ' + socket.id);
        });

    }

    static getInstance(): SocketManager {
        if (!SocketManager.instance) {
            SocketManager.instance = new SocketManager();
        }
        return SocketManager.instance;
    }
}

export default SocketManager.getInstance();
