import { TestScheduler } from 'rxjs/Rx';
import { objectStore$, initialState } from '../objectStore';
import assert from 'assert';

describe('objectStore', () => {
  it('testing reducer', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      /*  console.log(JSON.stringify(actual, null, 2));
       console.log(JSON.stringify(expected, null, 2));*/
      return assert.deepEqual(actual, expected);
    });

    const objData = {
      objectData: {
        id: 51,
        uuid: '12080e3e-2ca2-41b1-9d4a-4d72e292dcd8',
        museumId: 99,
        museumNo: 'MusN11',
        term: 'Solsikke',
        objectType: 'collection'
      },
      events: [
        {
          registeredBy: 'Stein Olsen',
          registeredDate: '2017-04-05T10:08:39+00:00',
          doneBy: '50cef0e2-e171-4bab-984f-a8c2af10081a',
          doneDate: '2017-04-05T10:08:39+00:00',
          id: 51,
          objectType: 'collection',
          from: {
            path: ',1,',
            pathNames: [
              {
                nodeId: 1,
                name: 'Utviklingsmuseet'
              }
            ],
            breadcrumb: [
              {
                id: 1,
                name: 'Utviklingsmuseet',
                url: '/magasin/1'
              }
            ]
          },
          to: {
            path: ',1,3,4,6,',
            pathNames: [
              {
                nodeId: 1,
                name: 'Utviklingsmuseet'
              },
              {
                nodeId: 3,
                name: 'Utviklingsmuseet Org'
              },
              {
                nodeId: 4,
                name: 'Forskningens hus'
              },
              {
                nodeId: 6,
                name: 'Naturværelset'
              }
            ],
            breadcrumb: [
              {
                id: 1,
                name: 'Utviklingsmuseet',
                url: '/magasin/1'
              },
              {
                id: 3,
                name: 'Utviklingsmuseet Org',
                url: '/magasin/3'
              },
              {
                id: 4,
                name: 'Forskningens hus',
                url: '/magasin/4'
              },
              {
                id: 6,
                name: 'Naturværelset',
                url: '/magasin/6'
              }
            ]
          },
          type: 'MoveObject',
          eventDate: '05.04.2017'
        }
      ],
      samples: [
        {
          objectId: 'cda61333-e4c8-43aa-852e-6a9da9e00de5',
          parentObjectId: '12080e3e-2ca2-41b1-9d4a-4d72e292dcd8',
          parentObjectType: 'collection',
          isExtracted: false,
          museumId: 99,
          status: 2,
          responsible: '50cef0e2-e171-4bab-984f-a8c2af10081a',
          createdDate: '2017-03-19T00:00:00.000Z',
          sampleType: 'Vev',
          sampleSubType: 'Bein',
          size: 123,
          sizeUnit: 'mm',
          container: 'Kapsel',
          storageMedium: 'Aceton',
          note: 'dss',
          registeredBy: '50cef0e2-e171-4bab-984f-a8c2af10081a',
          registeredDate: 1491386867960
        }
      ]
    };

    // mock streams
    const clearM = '-x--------------';
    const loadObjectM = '--x-------------';
    const expected = 'aab-------------';

    const expectedStateMap = {
      a: initialState,
      b: objData
    };

    // mock up$ and down$ events

    const clear$ = testScheduler.createHotObservable(clearM, { x: initialState });
    const loadObject$ = testScheduler.createHotObservable(loadObjectM, { x: objData });

    const state$ = objectStore$({ clear$, loadObject$ });

    // assertion
    testScheduler.expectObservable(state$).toBe(expected, expectedStateMap);

    // run tests
    testScheduler.flush();
  });
});
