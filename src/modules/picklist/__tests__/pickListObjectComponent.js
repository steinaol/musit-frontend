import {shallow, mount} from 'enzyme';
import {shallowToJson, mountToJson} from 'enzyme-to-json';
import React from 'react';
import {PickListContainer} from '../PickListComponent';
import {AppSession} from '../../app/appSession';
import {expect as e} from 'chai';
import sinon from 'sinon';


describe('PickListComponent for objects', () => {

  const pickList = {
    nodes: [
      {
        marked: true,
        value: {id: 1, name: 'Hei'},
        path: [1]
      },
      {
        marked: true,
        value: {id: 2, name: 'Hei'},
        path: [1, 2]
      },
      {
        marked: true,
        value: {id: 3, name: 'Hei'},
        path: [1, 3]
      },
      {
        marked: true,
        value: {id: 4, name: 'Hei'},
        path: [1, 3]
      }
    ],
    objects: [
      {
        marked: true,
        value: {
          id: 1, name: 'Test21', mainObjectId: 1,
          isMainObject: () => true
        },
        path: [1]
      },
      {
        marked: true,
        value: {
          id: 2, name: 'Test2', mainObjectId: 1,
          isMainObject: () => false
        },
        path: [1, 2]
      },
      {
        marked: false,
        value: {id: 3, name: 'Test23',
          isMainObject: () => true},
        path: [1, 3]
      }
    ]
  };


  it('Should mount', () => {

    const onToggleNode = sinon.spy();
    const onToggleObject = sinon.spy();
    const onRemoveObject = sinon.spy();
    const onRemoveNode = sinon.spy();


    const wrapper = mount(<PickListContainer
      route={{type : 'objects'}}
      pickList={pickList}
      toggleNode={onToggleNode}
      toggleObject={onToggleObject}
      toggleMainObject={(x) => x}
      removeNode={onRemoveNode}
      removeObject={onRemoveObject}
      appSession={ new AppSession()}
      refreshNode={(x) => x}
      refreshObjects={(x) => x}
      emitError={(x) => x}
      emitSuccess={(x) => x}
      iconRendrer={ (x) => x}
      classExistsOnDom={ (x) => x}
      isTypeNode={() => false}
      toggleScanner={() => true}
      scannerEnabled={true}
    />);

    expect(mountToJson(wrapper)).toMatchSnapshot();
  });


  it('should display component (objects) correctly', () => {
    const wrapper = shallow(<PickListContainer
      route={{type : 'objects'}}
      pickList={pickList}
      toggleNode={(x) => x}
      toggleObject={(x) => x}
      toggleMainObject={(x) => x}
      removeNode={(x) => x}
      removeObject={(x) => x}
      appSession={ new AppSession()}
      refreshNode={(x) => x}
      refreshObjects={(x) => x}
      emitError={(x) => x}
      emitSuccess={(x) => x}
      classExistsOnDom={ (x) => x}
      isTypeNode={ () => false  }
      toggleScanner={() => true}
      scannerEnabled={true}
    />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });


  it('Testing functions objects', () => {

    const onToggleNode = sinon.spy();
    const onToggleObject = sinon.spy();
    const onRemoveObject = sinon.spy();
    const onRemoveNode = sinon.spy();
    const onToggleMainObject = sinon.spy();


    const wrapper = mount(<PickListContainer
      route={{type : 'objects'}}
      pickList={pickList}
      toggleNode={onToggleNode}
      toggleObject={onToggleObject}
      toggleMainObject={onToggleMainObject}
      removeNode={onRemoveNode}
      removeObject={onRemoveObject}
      appSession={ new AppSession()}
      refreshNode={(x) => x}
      refreshObjects={(x) => x}
      emitError={(x) => x}
      emitSuccess={(x) => x}
      iconRendrer={ (x) => x}
      classExistsOnDom={ (x) => x}
      isTypeNode={() => false}
      toggleScanner={() => true}
      scannerEnabled={true}
    />);

    const t = wrapper.find('Grid').children().find('Table').children().find('thead').children().find('tr').childAt(1).childAt(2);
    t.simulate('click');
    e(onRemoveObject.calledOnce).to.equal(true);

    const mo = wrapper.find('Grid').children().find('Table').children().find('tbody').childAt(0).childAt(0).childAt(0).childAt(0);
    mo.simulate('change');
    e(onToggleMainObject.calledOnce).to.equal(true);

    const o = wrapper.find('Grid').children().find('Table').children().find('tbody').childAt(2).childAt(0).childAt(0).childAt(0);
    o.simulate('change');
    e(onToggleObject.calledOnce).to.equal(true);
  });

});
