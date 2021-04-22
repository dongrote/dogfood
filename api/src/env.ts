import _ from 'lodash';

export = {
  port: (): number => Number(_.get(process.env, 'PORT', 3000)),
};
