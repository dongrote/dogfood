exports = module.exports = {
  development: {
    storage: 'db.sqlite',
    dialect: 'sqlite',
  },
  test: {
    dialect: 'sqlite',
  },
  production: {
    storage: 'db.sqlite',
    dialect: 'sqlite',
    logging: () => null,
  }
};
