import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import {config} from '../config.js';

class Socket {
    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin:'*',
            }
        });

        this.io.use((socekt, next) => {
            // const token = socket.handshake.query && socket.handshake.query.token;
            const token = socekt.handshake.auth.token;
            if(!token) {
                return enxt(new Error('Authentication error'));
            }
            jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
                if(error) {
                    return new Error('Authentication error');
                }
                next();
            })
        });
    }
}

let socket;
export function initSocket(server) {
    if(!socket) {
        socket = new Socket(server);
    }
}

export function getSocketIO() {
    if(!socket) {
        throw new Error('Please call init first!');
    }
    return socket.io;
}