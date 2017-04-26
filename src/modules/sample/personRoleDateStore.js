/* @flow */
import { createStore, createAction } from 'react-rxjs/dist/RxStore';
import { Observable } from 'rxjs';

export type Person = { name: string, role: string, date: string };
export type Persons = { persons: Array<Person> };
const initialState: Persons = { persons: [] };
const emptyPerson: Person = { name: '', role: '', date: '' };

export const addEmptyPerson$ = createAction('addEmptyPerson$');
export const editPersons$ = createAction('editPersons$');
export const removePerson$ = createAction('removePerson$');

export const clear$ = createAction('clear$');

const reducer$ = actions =>
  Observable.merge(
    actions.addEmptyPerson$.map(() =>
      (state: Persons) => ({ persons: [...state.persons, emptyPerson] })),
    actions.editPersons$.map((i: { ind: number, person: Person }) =>
      (state: Persons) => {
        console.log('State', state, i);
        const s = {
          persons: [
            ...state.persons.slice(0, i.ind),
            i.person,
            ...state.persons.slice(i.ind + 1)
          ]
        };
        console.log('State etter: ', s);
        return s;
      }),
    actions.removePerson$.map((i: number) =>
      (state: Persons) => ({
        ...state,
        persons: [...state.persons.slice(0, i), ...state.persons.slice(i + 1)]
      }))
  );

export const personRoleDateStore$ = (
  actions$: {
    addEmptyPerson$: Observable,
    editPersons$: Observable,
    removePerson$: Observable
  } = { addEmptyPerson$, editPersons$, removePerson$ }
) => createStore('personRoleDateStore$', reducer$(actions$), Observable.of(initialState));

export default personRoleDateStore$();
