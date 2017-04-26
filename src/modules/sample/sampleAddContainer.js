import inject from 'react-rxjs/dist/RxInject';
import sampleForm from './sampleForm';
import SampleFormAddComponent from './SampleAddComponent';
import Sample from '../../models/sample';
import React from 'react';
import { Observable } from 'rxjs';
import { emitError, emitSuccess } from '../../shared/errors';
import { toPromise } from '../../shared/util';
import personRoleDateStore$, {
  addEmptyPerson$,
  editPersons$,
  removePerson$
} from './personRoleDateStore';

const { form$, updateForm$, loadForm$ } = sampleForm;

const data = {
  appSession$: { type: React.PropTypes.instanceOf(Observable).isRequired },
  form$,
  personRoleDateStore$
};

const props = {
  addSample: toPromise(Sample.addSample()),
  emitSuccess,
  emitError
};

const commands = { updateForm$, loadForm$, addEmptyPerson$, editPersons$, removePerson$ };

export default inject(data, commands, props)(SampleFormAddComponent);
