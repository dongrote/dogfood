import Item from './Item';
import {PaginatedData} from './types';
import models from '../db/models';

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
    const {count, rows} = await models.Stock.findAndCountAll({include: [models.Item]});
    return {count, results: rows.map(r => new Stock({id: r.id, name: r.name, items: r.Items}))};
  }

  static async findById(id: number): Promise<Stock> {
    const row = await models.Stock.findByPk(id, {include: [models.Item]});
    if (!row) throw new StockNotFoundError();
    return new Stock({id: row.id, name: row.name, items: row.Items});
  }

  static async create(values: StockCreateArguments): Promise<Stock> {
    const row = await models.Stock.create({name: values.name});
    return new Stock({id: row.id, name: row.name, items: row.Items});
  }

  constructor(values: StockConstructorArguments) {
    this.id = values.id;
    this.name = values.name;
    this.items = values.items;
  }

}

const db = [];
