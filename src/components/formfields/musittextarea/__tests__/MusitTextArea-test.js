import { assert, React, ReactDOM, ReactTestUtils } from '../../../../../test/setup';
import MusitTextArea from '../index';

describe('MusitTextArea', () => {
  it('should render MusitTextArea', () => {
    const myDiv = ReactTestUtils.renderIntoDocument(
      <MusitTextArea
        id="navn"
        placeHolder="skriv inn navn her"
        validate="string"
        value="flint"
        onChange={() => null}
      />
    );

    const actualDiv = ReactDOM.findDOMNode(myDiv);
    const field = actualDiv.querySelectorAll('textarea')[0];
    assert.equal(field.value, 'flint', 'Felt må være tilstede')
  });

  it('should render MusitTextArea blank', () => {
    const myDiv = ReactTestUtils.renderIntoDocument(
      <MusitTextArea
        id="navn"
        placeHolder="skriv inn navn her"
        validate="string"
        value=""
        onChange={() => null}
      />
      );

    const actualDiv = ReactDOM.findDOMNode(myDiv);
    const field = actualDiv.querySelectorAll('textarea')[0];
    assert.equal(field.value, '', 'Felt må være tilstede')
  });

  it('number input', () => {
    const myDiv = ReactTestUtils.renderIntoDocument(
      <MusitTextArea
        id="navn"
        placeHolder="skriv inn navn her"
        validate="string"
        value="123454566"
        onChange={() => null}
      />
      );

    const actualDiv = ReactDOM.findDOMNode(myDiv);
    const field = actualDiv.querySelectorAll('textarea')[0];
    assert.equal(field.value, '123454566', 'Felt må være tilstede')
  });
});
