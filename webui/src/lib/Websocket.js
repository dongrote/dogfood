import io from 'socket.io-client';

export default class Websocket {
  static socket;
  static init() {
    Websocket.socket = io();
  }

  static on(event, handler) {}

  static 
}
