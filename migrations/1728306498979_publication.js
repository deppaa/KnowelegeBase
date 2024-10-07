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
  await pgm.createType({ name: 'enum_status' }, ['public', 'private']);

  await pgm.createTable(
    { name: 'publication' },
    {
      id: { type: 'serial', primaryKey: true },
      title: { type: 'text', notNull: true },
      description: { type: 'text', notNull: true },
      status: {
        type: 'enum_status',
        notNull: true,
      },
    },
  );

  await pgm.createTable(
    { name: 'publication_tag' },
    {
      id: { type: 'serial', primaryKey: true },
      publication_id: { type: 'integer', notNull: true },
      tag_id: { type: 'integer', notNull: true },
    },
  );

  await pgm.createTable(
    { name: 'tags' },
    {
      id: { type: 'serial', primaryKey: true },
      title: { type: 'text', notNull: true },
    },
  );

  await pgm.addConstraint(
    { name: 'publication_tag' },
    'fk_publication_tag_publication_id',
    {
      foreignKeys: {
        columns: 'publication_id',
        references: {
          name: 'publication',
          column: 'id',
        },
      },
    },
  );

  await pgm.addConstraint(
    { name: 'publication_tag' },
    'fk_publication_tag_tag_id',
    {
      foreignKeys: {
        columns: 'tag_id',
        references: {
          name: 'tags',
          column: 'id',
        },
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
  await pgm.dropConstraint(
    { name: 'publication_tag' },
    'fk_publication_tag_publication_id',
  );

  await pgm.dropConstraint(
    { name: 'publication_tag' },
    'fk_publication_tag_tag_id',
  );

  await pgm.dropTable({ name: 'publication' });

  await pgm.dropTable({ name: 'publication_tag' });

  await pgm.dropTable({ name: 'tags' });

  await pgm.dropType({ name: 'enum_status' });
};
