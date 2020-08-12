'use strict'
const db = {
  'users': [
    { 'id': 1, 'name': 'Axel' },
  ],
};

const list = table => db[table];

const get = (table, id) => {
  const list = list(table);
  return list.filter(item => item.id === id)[0] || null;
}

const upsert = (table, data) => {
  db[table].push(data);
  return true;
}

const remove = (table, id) => true;

module.exports = {
  list,
  get,
  upsert,
  remove
}
