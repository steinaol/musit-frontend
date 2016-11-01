import React, { PropTypes } from 'react'
import StorageUnitContainer from './index'

export default class EditStorageUnitContainer extends React.Component {
  static propTypes = {
    onLagreClick: PropTypes.func.isRequired,
    loadStorageUnit: PropTypes.func.isRequired,
    params: PropTypes.object,
    unit: PropTypes.object,
    loaded: PropTypes.bool.isRequired,
    updateState: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.loadStorageUnit(this.props.params.id, {
      onSuccess: (result) => {
        this.props.updateState(result)
      }
    })
  }

  render() {
    return (
      <StorageUnitContainer
        translate={this.props.translate}
        unit={this.props.unit}
        updateState={this.props.updateState}
        onLagreClick={this.props.onLagreClick}
        params={this.props.params}
        loaded={this.props.loaded && !!this.props.unit}
      />
    )
  }
}