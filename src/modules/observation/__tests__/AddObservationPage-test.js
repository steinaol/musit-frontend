import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { AddObservationPage } from '../AddObservationPage';
import MusitActor from '../../../models/actor';
import MuseumId from '../../../models/museumId';
import { AppSession } from '../../app/appSession';

describe('Render add observation page', () => {
  it('should set default date and have correct date format', () => {
    const addObservation = sinon.spy();
    const loadRootNode = sinon.spy();
    const emitError = sinon.spy();
    const emitSuccess = sinon.spy();
    shallow(
      <AddObservationPage
        store={{
          rootNode: null
        }}
        params={{
          id: '1'
        }}
        appSession={new AppSession({
          token: '1234',
          museumId: new MuseumId(99),
          actor: new MusitActor({ dataportenId: '12345', fn: 'Jarl'})
        })}
        emitSuccess={emitSuccess}
        emitError={emitError}
        loadRootNode={loadRootNode}
        doneDate="2017-02-08T11:14:25.889Z"
        addObservation={addObservation}
        mode="ADD"
        id="1"
      />
    );
    expect(loadRootNode.callCount).toBe(1);
  });
});