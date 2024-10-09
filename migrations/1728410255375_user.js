/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = async (pgm) => {
  await pgm.createType({ name: 'enum_role' }, ['user']);

  await pgm.createTable(
    { name: 'accaunt' },
    {
      id: { type: 'serial', primaryKey: true },
      login: { type: 'text', notNull: true },
      password: { type: 'text', notNull: true },
      role: {
        type: 'enum_role',
        notNull: true,
      },
    },
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = async (pgm) => {
  await pgm.dropTable({ name: 'accaunt' });

  await pgm.dropType({ name: 'enum_role' });
};
