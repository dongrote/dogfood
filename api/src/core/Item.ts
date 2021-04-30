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
}

export type ItemCreateArguments = Omit<ItemConstructorArguments, 'id'>;

export default class Item {
  static db: Array<Item> = [];
  id: number;
  StockId: number;
  name: string;
  count: number;

  static async create(values: ItemCreateArguments): Promise<Item> {
    const item = new Item({id: Item.db.length, StockId: values.StockId, name: values.name});
    Item.db.push(item);
    return item;
  }

  static async findById(id: number): Promise<Item> {
    for (const item of Item.db) {
      if (item.id === id) return item;
    }
    throw new ItemNotFoundError();
  }

  constructor(values: ItemConstructorArguments) {
    this.id = values.id;
    this.name = values.name;
    this.StockId = values.StockId;
    this.count = 0;
  }

  async increment(by?: number): Promise<number> {
    const value = by || 1;
    this.count += value;
    return this.count;
  }

  async decrement(by?: number): Promise<number> {
    const value = by || 1;
    this.count = Math.max(0, this.count - value);
    return this.count;
  }
}
