import React from 'react';
import { Table } from 'react-bootstrap';

class StorageUnitList extends React.Component {
  render() {
    return (
      <Table responsive striped condensed hover>
        <thead>
          <tr>
            <th style={{ width: '5%' }}>#</th>
            <th style={{ width: '10%' }}>Type</th>
            <th style={{ width: '70%' }}>Name</th>
            <th style={{ width: '15%' }}>{' '}</th>
          </tr>
        </thead>
        <tbody>
          {this.props.units.map(u => (
            <tr>
              <td>{u.id}</td>
              <td>{u.type}</td>
              <td>{u.name}</td>
              <td>
                <button onClick={() => this.props.onPick(u)}>Pick</button>
                <button onClick={() => this.props.onEdit(u)}>Edit</button>
                <button onClick={() => this.props.onDelete(u)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

StorageUnitList.propTypes = {
  units: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired
  })).isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired,
  onPick: React.PropTypes.func.isRequired,
};

export default StorageUnitList