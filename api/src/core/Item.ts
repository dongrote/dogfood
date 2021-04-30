import models from '../db/models';

export class ItemError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ItemError';
  }
}

export class ItemNotFoundError extends ItemError {
  constructor() {
    super('Item not found');
    this.name = 'ItemNotFoundError';
  }
}

interface ItemConstructorArguments {
  id: number,
  StockId: number,
  name: string,
  count: number,
}

export type ItemCreateArguments = Omit<ItemConstructorArguments, 'id' | 'count'>;

export default class Item {
  static db: Array<Item> = [];
  id: number;
  StockId: number;
  name: string;
  count: number;

  static async create(values: ItemCreateArguments): Promise<Item> {
    return new Item(await models.Item.create({StockId: values.StockId, name: values.name}));
  }

  static async findById(id: number): Promise<Item> {
    const row = await models.Item.findByPk(id);
    if (!row) throw new ItemNotFoundError();
    return new Item(row);
  }

  constructor(values: ItemConstructorArguments) {
    this.id = values.id;
    this.name = values.name;
    this.StockId = values.StockId;
    this.count = values.count;
  }

  async increment(by?: number): Promise<number> {
    await models.Item.increment('count', {where: {id: this.id}, by: by || 1});
    const row = await models.Item.findByPk(this.id);
    this.count = row.count;
    return this.count;
  }

  async decrement(by?: number): Promise<number> {
    if (this.count === 0) return this.count;
    await models.Item.decrement('count', {where: {id: this.id}, by: by || 1});
    const row = await models.Item.findByPk(this.id);
    this.count = row.count;
    return this.count;
  }
}
