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
7. Run migration `yarn run db:up`

## Backend

## Development

### WSL:

1. Set PUBLIC_ENV to local
2. Run backend `yarn run watch`

### `yarn run lint`

Run eslint.

### `yarn run db:up`

Run migrations.

### `yarn run db:start`

Run database.

### `yarn run db:create {name}`

Create migration file.

### `yarn run watch`

Runs the app
