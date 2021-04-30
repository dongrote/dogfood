import Item from './Item';
import {PaginatedData} from './types';

export class StockError extends Error {
  constructor(message) {
    super(message);
    this.name = 'StockError';
  }
}

export class StockNotFoundError extends StockError {
  constructor() {
    super('Stock not found.');
    this.name = 'StockNotFoundError';
  }
}

interface StockConstructorArguments {
  id: number,
  name: string,
  items: Array<Item>,
}

export type StockCreateArguments = Omit<StockConstructorArguments, 'id' | 'items'>;

export default class Stock {
  id: number;
  name: string;
  items: Array<Item>;

  static async findAll(): Promise<PaginatedData<Stock>> {
    return {count: db.length, results: db};
  }

  static async findById(id: number): Promise<Stock> {
    console.dir(db);
    const values = db.find(row => row.id === id);
    if (!values) throw new StockNotFoundError();
    return new Stock(values);
  }

  static async create(values: StockCreateArguments): Promise<Stock> {
    const stock = new Stock({id: db.length + 1, name: values.name, items: []});
    db.push(stock);
    return stock;
  }

  constructor(values: StockConstructorArguments) {
    this.id = values.id;
    this.name = values.name;
    this.items = values.items;
  }

  async addItem(item: Item): Promise<Stock> {
    this.items.push(item);
    return this;
  }

}

const db = [];
