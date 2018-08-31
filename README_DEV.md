## Create migration

```bash
npm run migrate:create -- -n MigrationName
npm run migrate:generate -- -n MigrationName
npm run migrate:run
```

## Run with custom env file
```bash
./node_modules/.bin/cross-env NODE_ENV=production npm run start
./node_modules/.bin/cross-env NODE_ENV=postgres npm run build
./node_modules/.bin/cross-env NODE_ENV=postgres npm run start:dev
./node_modules/.bin/cross-env NODE_ENV=postgres npm run start
```