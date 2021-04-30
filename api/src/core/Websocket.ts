import {Server} from 'socket.io';
import http from 'http';

export class WebsocketError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WebsocketError';
  }
}

export class WebsocketNotInitializedError extends WebsocketError {
  constructor() {
    super(`Websocket has not been initialized. Did you forget to call Websocket.initialize()?`);
    this.name = 'WebsocketNotInitializedError';
  }
}

export default class Websocket {
  static server: Server;

  static initialize() { Websocket.server = new Server({serveClient: false}); }

  static assertInitialized() { if (!Websocket.server) throw new WebsocketNotInitializedError(); }

  static attach(hostServer: http.Server) {
    Websocket.assertInitialized();
    Websocket.server.attach(hostServer);
  }
}
