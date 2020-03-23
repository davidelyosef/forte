import { createAction, props } from '@ngrx/store';
import { Admin } from '../models/admin';
import { Artist } from '../models/artist';
import { Exhibition } from '../models/exhibition';
import { MyEvent } from '../models/event';
import { Publication } from '../models/publication';

export const savedUser = createAction('[Save user] admin', props<{ theAdminUser: Admin }>());
export const saveArtists = createAction('[Save Artists]', props<{ artists: Artist[]}>());
export const saveExhibitions = createAction('[Save exhibitions]', props<{ exhibitions: Exhibition[]}>());
export const saveEvents = createAction('[Save events]', props<{ events: MyEvent[]}>());
export const savePublication = createAction('[Save publications]', props<{ publications: Publication[]}>());