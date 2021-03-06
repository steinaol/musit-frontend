import React from 'react';
import SampleDetails from './SampleDetails';
import { Accordion, Panel, Button } from 'react-bootstrap';
import downImg from './assets/down.png';
import upImg from './assets/up.png';
import './style.css';

class SampleEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {}
    };
  }

  render() {
    return (
      <ObjectList
        goTo={this.props.history.push}
        active={this.state.active}
        setActive={(index) =>
          this.setState({...this.state, active: {...this.state.active, [index]: !this.state.active[index] }})
        }
      />
    );
  }
}

export default SampleEdit;

const ObjectSamples = ({ active, setActive, indexes }) => (
  <table className="table table-bordered table-striped" id="samples" style={{ backgroundColor: 'white'}}>
    <thead>
      <tr>
        <th>Prøvetype</th>
        <th>Prøveundertype</th>
        <th>Status</th>
        <th width={10}>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      <tr onClick={() => setActive(indexes[0])}>
        <td style={{ paddingLeft: 5 }}>
          Vev
        </td>
        <td style={{ paddingLeft: 5 }}>
          Spindelvel
        </td>
        <td style={{ paddingLeft: 5 }}>
          N/A
        </td>
        <td>
          <img src={!active[indexes[0]] ? downImg : upImg} width={20} />
        </td>
      </tr>
      <tr id="collapse1" className={'collapse ' + active[indexes[0]] ? 'in' : 'out'} hidden={!active[indexes[0]]}>
        <td colSpan={3}>
          <SampleDetails />
        </td>
      </tr>
    </tbody>
  </table>
);


const ObjectList = ({ goTo, active, setActive }) => (
  <div>
    <h1>Prøveuttak</h1>
    <hr />
    <div className="well">
      <Accordion>
        <Panel header="Felles detaljer for alle prøver" eventKey="1">
          <SampleDetails/>
        </Panel>
      </Accordion>
      <div style={{paddingLeft: 1}}>
        <b>Avledes fra objekt</b>
        <br />
        <b>Museumsnr:</b> 1234 <b>Unr:</b> 12345678901 <b>Term/Artsnavn:</b> Kniv <a href="#">Se detaljer</a>
        <ObjectSamples active={active} setActive={setActive} indexes={[1]} />
        <br />
        <b>Avledes fra objekt</b>
        <br />
        <b>Museumsnr:</b> 1234 <b>Unr:</b> 12345678901 <b>Term/Artsnavn:</b> Kniv <a href="#">Se detaljer</a>
        <ObjectSamples active={active} setActive={setActive} indexes={[2]} />
      </div>
      <Button
        bsStyle="danger"
        onClick={() => goTo('sample/index')}
      >
        Gå tilbake
      </Button>
    </div>
  </div>
);