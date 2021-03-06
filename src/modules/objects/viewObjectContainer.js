/* @flow */
import ViewObjectComponent from './ViewObjectComponent';
import inject from 'react-rxjs/dist/RxInject';
import objectStore$, { loadObject$ } from './objectStore';
import React from 'react';
import { Observable } from 'rxjs';
import flowRight from 'lodash/flowRight';
import { emitError, emitSuccess } from '../../shared/errors';
import mount from '../../shared/mount';

const data: {} = {
  appSession$: { type: React.PropTypes.instanceOf(Observable).isRequired },
  objectStore$
};

const props: {} = {
  emitSuccess,
  emitError
};

const commands: {} = { loadObject$ };

export const onMount = ({ loadObject, params, appSession }: any) => {
  const objectId: string = params.objectId;
  const museumId: number = appSession.museumId;
  const accessToken: string = appSession.accessToken;
  const collectionId: string = appSession.collectionId;
  const val = {
    id: objectId,
    museumId: museumId,
    token: accessToken,
    collectionId: collectionId
  };
  loadObject(val);
};

export default flowRight([inject(data, commands, props), mount(onMount)])(
  ViewObjectComponent
);
