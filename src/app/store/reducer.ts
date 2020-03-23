import { Admin } from '../models/admin';
import { createReducer, on } from '@ngrx/store';
import { savedUser, saveArtists, saveExhibitions, saveEvents, savePublication } from './actions';
import { Artist } from '../models/artist';
import { Exhibition } from '../models/exhibition';
import { MyEvent } from '../models/event';

export const adminState: Admin = {
    username: '',
    password: ''
};

const _userReducer = createReducer(
    
    adminState, 

    on(savedUser, (state, action) => {
        return action.theAdminUser;
    })
);

export function userReducer(state, action) {
    return _userReducer(state, action);
}

export const artistsState: Artist[] = undefined;

const _artistsReducer = createReducer(

    artistsState,

    on(saveArtists, (state, action) => {
        return action.artists;
    })
);

export function artistsReducer(state, action) {
    return _artistsReducer(state, action)
}

export const exhibitionsState: Exhibition[] = undefined;

const _exhibitionsReducer = createReducer(

    exhibitionsState,

    on(saveExhibitions, (state, action) => {
        return action.exhibitions;
    })
);

export function exhibitionsReducer(state, action) {
    return _exhibitionsReducer(state, action)
}

export const eventsState: MyEvent[] = undefined;

const _eventsReducer = createReducer(

    eventsState,

    on(saveEvents, (state, action) => {
        return action.events;
    })
);

export function eventsReducer(state, action) {
    return _eventsReducer(state, action)
}

export const publicationsState: MyEvent[] = undefined;

const _publicationsReducer = createReducer(

    publicationsState,

    on(savePublication, (state, action) => {
        return action.publications;
    })
);

export function publicationsReducer(state, action) {
    return _publicationsReducer(state, action);
}