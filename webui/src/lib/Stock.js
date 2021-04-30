import EventEmitter from 'events';
import http from './http';

export class StockError extends Error {
  constructor(message) {
    super(message);
    this.name = 'StockError';
  }
}

export class StockNotFoundError extends StockError {
  constructor() {
    super('No Stock found.');
    this.name = 'StockNotFoundError';
  }
}

export default class Stock extends EventEmitter {
  id;
  name;
  items;

  static async findById(id) {
    return new Stock(await http.get(`/api/stock/${id}`, {json: true}));
  }
  static async create(values) {
    return new Stock(await http.post('/api/stock', {json: true, body: {name: values.name}}));
  }

  constructor(values) {
    super();
    this.id = values.id;
    this.name = values.name;
    this.items = values.items;
  }

  async addItem(values) {
    const item = await http.post(`/api/items`, {json: true, body: {StockId: this.id, name: values.name}});
    this.items.push(item);
    this.emit('items', this);
  }
}
