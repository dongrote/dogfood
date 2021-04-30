import _ from 'lodash';

export default class http {
  static async get(url, options) {
    const res = await fetch(url, {method: 'GET'});
    if (!res.ok) throw new Error(res.statusText);
    return _.get(options, 'json', false) ? await res.json() : await res.text();
  }

  static async post(url, options) {
    const res = _.get(options, 'json', false)
      ? await fetch(url, {method: 'POST', body: JSON.stringify(_.get(options, 'body', {})), headers: {'Content-Type': 'application/json'}})
      : await fetch(url, {method: 'POST', body: _.get(options, 'body')});
    if (!res.ok) throw new Error(res.statusText);
    return _.get(options, 'json', false) ? await res.json() : await res.text();
  }

  static async patch(url, options) {
    const res = _.get(options, 'json', false)
      ? await fetch(url, {method: 'PATCH', body: JSON.stringify(_.get(options, 'body', {})), headers: {'Content-Type': 'application/json'}})
      : await fetch(url, {method: 'PATCH', body: _.get(options, 'body')});
    if (!res.ok) throw new Error(res.statusText);
    return _.get(options, 'json', false) ? await res.json() : await res.text();
  }
};
