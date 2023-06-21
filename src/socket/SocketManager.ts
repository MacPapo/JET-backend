import { Server } from "socket.io";
import { sockerPort } from '../config';

class SocketManager {
    private static instance: SocketManager;
    private io = new Server(sockerPort, { cors: { origin: '*' } });


    handleConnection() {
        console.log('Socket server running on port ' + sockerPort);

        this.io.on('connection', (socket) => {
            console.log('New connection: ' + socket.id);

            socket.on('cooker-new-order', (order) => {
                this.io.emit('cooker-new-order', 'New Order on table n.' + order.table + ' Added!');
            });

            socket.on('bartender-new-order', (order) => {
                this.io.emit('bartender-new-order', 'New Order on table n.' + order.table + ' Added!');
            });

            socket.on('cooker-complete-order', (order) => {
                // SAVE ON REDIS
                this.io.emit('cooker-complete-order', 'test');
            });

            socket.on('bartender-complete-order', (order) => {
                // SAVE ON REDIS
                this.io.emit('cooker-complete-order', 'test');
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
