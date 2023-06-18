import { Server } from "socket.io";
import { sockerPort } from '../config';

class SocketManager {
    private static instance: SocketManager;
    private io = new Server(sockerPort);


    handleConnection() {
        console.log('Socket server running on port ' + sockerPort);

        this.io.on('new-order', (order) => {
            console.log('Order created:', order);
            this.io.emit('cooker-order-added', order);
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
