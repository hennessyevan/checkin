import db from './db';
import shortid from 'shortid';
import { addReducer, getGlobal, setGlobal } from 'reactn';
import { remote } from 'electron';

// Old store
let oldStore: any = localStorage.getItem('store');
oldStore = JSON.parse(oldStore);

// Initial Store
setGlobal({
    people: db.get('people').value(),
    event: ''
});

// Persist Store
remote.getCurrentWindow().on('close', () => {
    localStorage.setItem('store', JSON.stringify(getGlobal()));
});

export type PersonType = {
    name: string;
    id?: string;
};

// Reducers
addReducer('addPerson', (global, data) => {
    db.get('people')
        .push({ ...data, id: shortid.generate() })
        .write();
    return {
        people: db.get('people').value()
    };
});

addReducer('deletePerson', (global, id) => {
    db.get('people')
        .remove({ id })
        .write();
    return {
        people: db.get('people').value()
    };
});
