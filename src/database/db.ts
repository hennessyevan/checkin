import electron from 'electron';
import shortid from 'shortid';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';

const { app } = electron.remote;

// DB Init
const adapter = new FileSync(path.join(app.getPath('userData'), 'db.json'), {
    defaultValue: { people: [], theme: 'light' }
    // serialize: data => JSON.stringify({ ...data, id: shortid.generate() })
    // deserialize: data => JSON.parse(atob(data))
});
const db = low(adapter);

export default db;
