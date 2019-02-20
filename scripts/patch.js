const fs = require('fs');
const f = 'node_modules/typeorm/migration/MigrationExecutor.js';

fs.readFile(f, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    var result = data.replace(/.connection.migrations.map/g, '.connection.migrations.filter(function (migration) { return migration.constructor.name !== \'Function\' }).map');

    fs.writeFile(f, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});