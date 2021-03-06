import inject from 'react-rxjs/dist/RxInject';
import sampleForm from './sampleForm';
import SampleEditComponent from './SampleEditComponent';
import React from 'react';
import { Observable } from 'rxjs';
import mount from '../../shared/mount';
import { emitError, emitSuccess } from '../../shared/errors';
import { toPromise } from '../../shared/util';
import Sample from '../../models/sample';
import flowRight from 'lodash/flowRight';

const { form$, loadForm$, updateForm$ } = sampleForm;

const data = {
  appSession$: { type: React.PropTypes.instanceOf(Observable).isRequired },
  form$
};

const commands = { loadForm$, updateForm$ };

const props = {
  loadSample: toPromise(Sample.loadSample()),
  editSample: toPromise(Sample.editSample()),
  emitSuccess,
  emitError
};

export default flowRight([
  inject(data, commands, props),
  mount(({ loadSample, loadForm, params, appSession }) => {
    const sampleId = params.sampleId;
    const museumId = appSession.museumId;
    const accessToken = appSession.accessToken;
    const val = { id: sampleId, museumId: museumId, token: accessToken };
    loadSample(val).then(v => {
      const formData = Object.keys(v).reduce(
        (akk, key: string) => [...akk, { name: key, defaultValue: v[key] }],
        []
      );
      loadForm(formData);
    });
  })
])(SampleEditComponent);
