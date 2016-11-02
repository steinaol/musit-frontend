import React, { PropTypes } from 'react'
import ObservationPage from './index'
import Layout from '../../layout'
import Breadcrumb from '../../layout/Breadcrumb'

export default class ViewObservationPage extends React.Component {

  static propTypes = {
    observations: PropTypes.arrayOf(PropTypes.object),
    doneDate: PropTypes.string,
    doneBy: PropTypes.object,
    registeredBy: PropTypes.string,
    registeredDate: PropTypes.string,
    translate: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    loadPersonNameFromId: PropTypes.func.isRequired,
    loadObservation: PropTypes.func.isRequired,
    rootNode: React.PropTypes.object
  }

  componentWillMount() {
    if (this.props.params.obsId) {
      this.props.loadObservation(this.props.params.id, this.props.params.obsId, {
        onSuccess: (r) => {
          this.props.loadPersonNameFromId(r.doneBy)
        }
      })
    }
    if (!this.props.rootNode.path) {
      this.props.loadStorageObj(this.props.params.id)
    }
  }

  render() {
    if (!this.props.observations) {
      return null; // We need data to display. If there is no data, there is nothing to display. Maybe spin wheel?
    }
    return (
      <Layout
        title="Magasin"
        translate={this.props.translate}
        breadcrumb={<Breadcrumb node={this.props.rootNode} disabled />}
        content={
          <div>
            <h4 style={{ textAlign: 'center' }}>{this.props.translate('musit.observation.page.titles.view')}</h4>
            <ObservationPage
              id={this.props.params.id}
              onSaveObservation={() => true} // disable save
              observations={this.props.observations}
              translate={this.props.translate}
              doneBy={this.props.doneBy}
              doneDate={this.props.doneDate}
              registeredBy={this.props.registeredBy}
              registeredDate={this.props.registeredDate}
              saveDisabled
              mode="VIEW"
            />
          </div>
        }
      />
    )
  }
}