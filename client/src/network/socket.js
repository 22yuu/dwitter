import { io } from 'socket.io-client';

export default class Socket {
    constructor(baseURL, getAccessToken) {
        // const io = io(this.baseURL, {
        //     query: {token: this.getAccessToken()},
        // }) query는 보안상의 이유로 사용해서는 안됨!
        this.io = io(baseURL, {
            auth: (cb) => cb({token: getAccessToken()}),
        });

        this.io.on('connect_error', (error) => {
            console.log('socket error', error);
        });
    }

    onSync(event, callback) {
        if( !this.io.connected) {
            // 연결이 안됐다면 연결
            this.io.connect();
        }
        
        this.io.on(event, (message) => callback(message));
        return () => this.io.off(event); // 연결 종료
    }
}