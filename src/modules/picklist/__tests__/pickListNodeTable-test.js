import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import PickListTable from '../PickListTable';
import {expect as e} from 'chai';
import sinon from 'sinon';


describe('PickListTable for nodes', () => {

  it('should display node-picklist correctly', () => {
    const pickList = [{value: 'Hei', marked: true, path: 'hei'}, {
      value: 'Hei',
      marked: false,
      isMainObject: true,
      path: 'hei'
    }, {value: 'Hei', marked: false, path: 'hei'}];
    const marked = pickList.filter(p => p.marked);
    const markedValues = marked.map(p => p.value);

    const wrapper = shallow(<PickListTable
      picks={pickList}
      marked={markedValues}
      isnode={true}
      move={(x) => x}
      print={(p) => p}
      toggle={(t)=> t}
      remove={(r)=> r}
      iconRendrer={(pick) => (pick.value.name ? <FontAwesome name="folder"/> :
                                  <span className='icon icon-musitobject'/>)
              }
      labelRendrer={(pick) => {
        return (
                  <div>
                    {null}
                    {null}
                    <span style={{ paddingLeft: '1em' }}>{pick.value.name ? pick.value.name : pick.value.term}</span>
                    <div className="labelText">
                    </div>
                  </div>
                );
      }}
    />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Testing functions for node table', () => {
    const pickList = [{marked: false, value: {id: 1}, path: [{id: 6, name: 'Code from Jarl', url: '/magasin/6'}]},
      {marked: true, value: {id: 2}, path: [{id: 6, name: 'Code from Jarl', url: '/magasin/6'}]}
    ];
    const marked = pickList.filter(p => p.marked);
    const markedValues = marked.map(p => p.value);

    const onMove = sinon.spy();
    const onPrint = sinon.spy();

    const onToggle = sinon.spy();

    const onRemove = sinon.spy();

    const wrapper = shallow(<PickListTable
      picks={pickList}
      marked={markedValues}
      isnode={true}
      move={onMove}
      print={onPrint}
      toggle={onToggle}
      remove={onRemove}
      iconRendrer={(pick) => (pick.value.name ? <FontAwesome name="folder"/> :
                                  <span className='icon icon-musitobject'/>)
              }
      labelRendrer={(pick) => {
        return (
                  <div>
                    {null}
                    {null}
                    <span style={{ paddingLeft: '1em' }}>{pick.value.name ? pick.value.name : pick.value.term}</span>
                    <div className="labelText">
                    </div>
                  </div>
                );
      }}
    />);
    e(wrapper.find('div').find('Table').find('tbody').find('tr')).to.have.length(pickList.length);

    const b = wrapper.find({name: 'print'}).first();
    b.simulate('click');
    e(onPrint.called).to.equal(true);

    const a = wrapper.find({name: 'truck'});
    a.simulate('click');
    e(onMove.called).to.equal(true);

    const c = wrapper.find({name: 'remove'}).first();
    c.simulate('click');
    e(onRemove.called).to.equal(true);

  });


});