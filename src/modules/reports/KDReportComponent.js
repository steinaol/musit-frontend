import React, { PropTypes, Component } from 'react';
import { Table, PageHeader, Panel, Grid, Row } from 'react-bootstrap';
import { I18n } from 'react-i18nify';
import { formatFloatToString } from './../../shared/util';
import { Observable } from 'rxjs';
import store$, { loadKDReport$, clear$ } from './reportStore';
import inject from 'react-rxjs/dist/RxInject';
import { makeUrlAware } from '../app/appSession';
import flowRight from 'lodash/flowRight';

export class KDReport extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    appSession: PropTypes.object.isRequired,
    loadKDReport: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.loadKDReport();
  }

  loadKDReport(
    museumId = this.props.appSession.museumId,
    token = this.props.appSession.accessToken
  ) {
    this.props.clear();
    this.props.loadKDReport({ museumId, token });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.appSession.museumId.id !== this.props.appSession.museumId.id) {
      this.loadKDReport(nextProps.appSession.museumId);
    }
  }

  render() {
    const data = this.props.store.data.kdreport;
    return (
      <div>
        <main>
          <Panel>
            <Grid>
              <Row className="row-centered">
                <PageHeader>
                  {I18n.t('musit.reports.securingCollections.header')}
                </PageHeader>
                <Table style={{ width: 700 }}>
                  <tbody>
                    <tr>
                      <td>{I18n.t('musit.reports.securingCollections.totalArea')}</td>
                      <td>{data && formatFloatToString(data.totalArea)} m²</td>
                    </tr>
                    <tr>
                      <td>{I18n.t('musit.reports.securingCollections.perimeter')}</td>
                      <td>
                        {data && formatFloatToString(data.perimeterSecurity)} m²
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {I18n.t('musit.reports.securingCollections.theftProtection')}
                      </td>
                      <td>
                        {data && formatFloatToString(data.theftProtection)} m²
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {I18n.t('musit.reports.securingCollections.fireProtection')}
                      </td>
                      <td>{data && formatFloatToString(data.fireProtection)} m²</td>
                    </tr>
                    <tr>
                      <td>{I18n.t('musit.reports.securingCollections.waterDamage')}</td>
                      <td>
                        {data && formatFloatToString(data.waterDamageAssessment)} m²
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {I18n.t(
                          'musit.reports.securingCollections.routinesAndContingencyPlan'
                        )}
                      </td>
                      <td>
                        {data && formatFloatToString(data.routinesAndContingencyPlan)} m²
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            </Grid>
          </Panel>
        </main>
      </div>
    );
  }
}

const data = {
  appSession$: { type: React.PropTypes.instanceOf(Observable).isRequired },
  store$
};

const commands = {
  loadKDReport$,
  clear$
};

export default flowRight([inject(data, commands), makeUrlAware])(KDReport);
