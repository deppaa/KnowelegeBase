## Warning

This project has been tested only in wsl

## How to install database

### WSL:

1. Install `PostgreSQL` by ([tutorial](https://www.cybertec-postgresql.com/en/postgresql-on-wsl2-for-windows-install-and-setup/#highlighter_741240))
2. Set environment variables:

```sh
echo 'export PATH="$PATH:/usr/lib/postgresql/15/bin/"' >> ~/.bashrc
echo 'export LC_ALL=en_US.UTF-8' >> ~/.bashrc
```

3. Reload terminal
4. Initialize the database: `yarn run db:init`
5. Change permissions: `sudo chmod -R 777 /var/run/postgresql/`
6. Start the database `yarn run db:start`
7. Run migration `yarn run prisma:migrate-dev`

## Backend

## Development

### WSL:

1. Set PUBLIC_ENV to local
2. Set JWT_SECRET to secret
3. Set PASSWORD_SALT to salt
4. Run backend `yarn run watch`

### `yarn run lint`

Run eslint.

### `yarn run prisma:migrate-dev`

Run migrations.

### `yarn run prisma:generate`

Create types by prisma shema.

### `yarn run db:start`

Run database.

### `yarn run watch`

Runs the app
