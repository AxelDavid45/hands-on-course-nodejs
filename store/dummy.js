'use strict';
const db = {
  users: [{ id: '1', name: 'Axel' }],
};

const list = async (table) => db[table];

const get = async (table, id) => {
  const results = await list(table);
  return results.filter((item) => item.id === id)[0] || [];
};

const upsert = async (table, data) => {
  if (!db[table]) {
    db[table] = [];
  }
  db[table].push(data);
  console.log(db);
  return data;
};

const remove = async (table, id) => true;

async function query(table, queryObject) {
  const results = await list(table);
  const objectKeys = Object.keys(queryObject);
  const usernameKey = objectKeys[0];
  return (
    results.filter(
      (item) => item[usernameKey] === queryObject[usernameKey]
    )[0] || []
  );
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
