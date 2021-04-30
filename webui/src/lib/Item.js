import EventEmitter from 'events';
import http from './http';

export default class Item extends EventEmitter {
  id;
  StockId;
  name;
  count;

  static async findById(id) {
    return new Item(await http.get(`/api/items/${id}`, {json: true}));
  }

  constructor(values) {
    super();
    this.id = values.id;
    this.StockId = values.StockId;
    this.name = values.name;
    this.count = values.count;
  }

  async increment() {
    const updated = await http.patch(`/api/items/${this.id}/increment`, {json: true});
    this.count = updated.count;
    this.emit('update', this);
  }

  async decrement() {
    const updated = await http.patch(`/api/items/${this.id}/decrement`, {json: true});
    this.count = updated.count;
    this.emit('update', this);
  }
}
