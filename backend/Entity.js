// An Entity represents, essentially, a row in a database

let assert = require('assert');
let crypto = require('crypto');
let ES6Error = require('es6-error');

let knexpg = require('./knexpg');

//
// In ids, we will use just characters 0-9 and a-z (lowercase) and _ (underscore).
// Underscores will just be separators
// An id will have 4 parts
// 1: "fp" - short for format.pub
// 2: type - ex. 'u' for user
// 3: hint - ex. ccheever for the user ccheever (optional)
// 4: randomness - ex. 6s3rozfqbt0qycl
//
// So, an example user id might be
// fp_u_ccheever_6s3rozfqbt0qycl
//

/**
 * Returns randomness of at least 12 characters, 0-9, a-z
 */
function _randomIdPart() {
  let n = 12;
  while (true) {
    let id = crypto
      .randomBytes(n)
      .toString('base64')
      .replace(/[\+=\/]/g, '')
      .toLowerCase();
    if (id.length >= n) {
      return id;
    }
  }
}

function _randomId(typeCode, hint) {
  let fix = '';
  if (hint) {
    fix =
      hint
        .toString()
        .toLowerCase()
        .replace(/[^0-9a-z]/g, '')
        .substr(0, 8) + '_';
  }
  return 'fp_' + typeCode + '_' + fix + _randomIdPart();
}

async function createRow(table, props, typeCode, pk, hint) {
  if (!pk) {
    pk = table + 'Id';
  }
  if (!typeCode) {
    typeCode = table.charAt(0);
  }
  if (!props[pk]) {
    props[pk] = _randomId(typeCode, hint);
  }
  let result = await knexpg(table)
    .insert(props)
    .returning('*');
  assert.equal(result.length, 1, 'Failed to create row in database');
  return result[0];
}

async function updateRow(table, id, props, pk) {
  let result = await knexpg(table)
    .where({ [pk]: id })
    .returning('*')
    .update({
      ...props,
      [pk]: id,
    });
  assert.equal(result.length, 1, "Should have updated exactly one row but didn't");
  return result[0];
}

async function retrieveRow(table, id) {
  let pk = table + 'Id';
  let result = await knexpg(table)
    .select('*')
    .where({ [pk]: id });
  assert.equal(result.length, 1, 'Multiple values for what should be a single entity');
  return result[0];
}

async function deleteRow(table, id) {}

class UnauthorizedError extends ES6Error {
  constructor(message = 'Unauthorized', metadata) {
    super(message);
    this._unauthorized = true;
    this.metadata = metadata;
  }
}

function assertIsUser(ctx, userId) {
  if (ctx.userId !== userId) {
    throw new UnauthorizedError(`Unauthorized: Only user ${userId} can do that`);
  }
}

module.exports = {
  _randomId,
  _randomIdPart,
  createRow,
  retrieveRow,
  updateRow,
  deleteRow,
  UnauthorizedError,
  assertIsUser,
};
