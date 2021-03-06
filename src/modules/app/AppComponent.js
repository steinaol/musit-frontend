import { I18n } from 'react-i18nify';
import 'react-select/dist/react-select.css';
import React, { Component, PropTypes } from 'react';
import { IndexLink, hashHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import MusitUserAccount from './UserAccount';
import './AppComponent.css';
import Logo from './musitLogo.png';
import LoginComponent from '../login/LoginComponent';
import { emitError } from '../../shared/errors';
import Loader from 'react-loader';
import { loadAppSession$, setMuseumId$, setCollectionId$ } from '../app/appSession';
import inject from 'react-rxjs/dist/RxInject';
import {
  clearObjects$ as clearObjectPicklist$,
  clearNodes$ as clearNodePicklist$
} from './pickList';
import Config from '../../config';

export class AppComponent extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    appSession: PropTypes.object.isRequired,
    setMuseumId: PropTypes.func.isRequired,
    setCollectionId: PropTypes.func.isRequired,
    loadAppSession: PropTypes.func.isRequired,
    pickList: PropTypes.object.isRequired,
    enableAnalysis: PropTypes.bool.isRequired,
    goTo: PropTypes.func.isRequired,
    clearObjectPicklist: PropTypes.func.isRequired,
    clearNodePicklist: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleMuseumId = this.handleMuseumId.bind(this);
    this.handleCollectionId = this.handleCollectionId.bind(this);
  }

  componentWillMount() {
    this.props.loadAppSession();
  }

  handleLogout() {
    fetch('/api/auth/rest/logout', {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Bearer ' + this.props.appSession.accessToken
      })
    })
      .then(response => {
        if (response.ok) {
          localStorage.removeItem('accessToken');
          window.location.replace('https://auth.dataporten.no/logout');
        }
      })
      .catch(error => emitError({ type: 'network', error }));
  }

  handleLanguage(l) {
    localStorage.setItem('language', l);
    window.location.reload(true);
  }

  handleMuseumId(museumId, collectionId) {
    this.props.setMuseumId(museumId);
    this.props.setCollectionId(collectionId);
    this.props.clearObjectPicklist();
    this.props.clearNodePicklist();
    this.props.goTo(
      Config.magasin.urls.client.storagefacility.goToRoot({
        ...this.props.appSession,
        museumId,
        collectionId
      })
    );
  }

  handleCollectionId(collectionId) {
    this.props.setCollectionId(collectionId);
    this.props.clearObjectPicklist();
    const nodeId = this.props.params.id;
    const localAppSession = this.props.appSession.copy({ collectionId });
    if (nodeId) {
      this.props.goTo(
        Config.magasin.urls.client.storagefacility.goToNode(nodeId, localAppSession)
      );
    } else {
      this.props.goTo(
        Config.magasin.urls.client.storagefacility.goToRoot(localAppSession)
      );
    }
  }

  getFooterClass() {
    let returnClassName;
    if (window.location.href.toLowerCase().includes('test:')) {
      returnClassName = 'footer backgroundUTV';
    } else if (window.location.href.toLowerCase().includes('utv.uio.no')) {
      returnClassName = 'footer backgroundUTV';
    } else if (window.location.href.toLowerCase().includes('test.uio.no')) {
      returnClassName = 'footer backgroundTEST';
    } else {
      returnClassName = 'footer version well';
    }
    return returnClassName;
  }

  isSessionLoaded() {
    return !!this.props.appSession.buildInfo;
  }

  render() {
    if (!this.props.appSession.accessToken) {
      return <LoginComponent />;
    }

    if (!this.isSessionLoaded()) {
      return <Loader loaded={false} />;
    }

    return (
      <div>
        <Navbar fixedTop style={{ zIndex: 1 }}>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to={'/about'} activeStyle={{ color: '#33e0ff' }}>
                <div className="brand">
                  <img height="40" alt="logo" src={Logo} />
                </div>
                <span>MUSIT</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav navbar>
              <LinkContainer
                to={Config.magasin.urls.client.magasin.goToMagasin(this.props.appSession)}
              >
                <NavItem>{I18n.t('musit.texts.magazine')}</NavItem>
              </LinkContainer>
              {this.props.enableAnalysis &&
                <NavDropdown
                  title={I18n.t('musit.analysis.analysis')}
                  id="analysis-dropdown"
                >
                  <LinkContainer
                    to={Config.magasin.urls.client.analysis.addAnalysis(
                      this.props.appSession
                    )}
                  >
                    <MenuItem>
                      {I18n.t('musit.analysis.registeringAnalysis')}
                    </MenuItem>
                  </LinkContainer>
                  <LinkContainer
                    to={Config.magasin.urls.client.analysis.addSample(
                      this.props.appSession
                    )}
                  >
                    <MenuItem>
                      {I18n.t('musit.analysis.registeringSample')}
                    </MenuItem>
                  </LinkContainer>
                </NavDropdown>}
              <LinkContainer
                to={Config.magasin.urls.client.report.goToReport(this.props.appSession)}
              >
                <NavItem>{I18n.t('musit.reports.reports')}</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <LinkContainer
                to={Config.magasin.urls.client.picklist.goToPicklistNodes(
                  this.props.appSession
                )}
              >
                <NavItem>
                  <span className="icon icon-musitpicklistnode" />
                  {' '}
                  {this.props.pickList.nodes.length}
                </NavItem>
              </LinkContainer>
              <LinkContainer
                to={Config.magasin.urls.client.picklist.goToPicklistObjects(
                  this.props.appSession
                )}
              >
                <NavItem>
                  <span className="icon icon-musitpicklistobject" />
                  {' '}
                  {this.props.pickList.objects.length}
                </NavItem>
              </LinkContainer>
              <LinkContainer
                to={Config.magasin.urls.client.searchObjects.goToSearchObjects(
                  this.props.appSession
                )}
              >
                <NavItem>
                  <FontAwesome name="search" style={{ fontSize: '1.3em', height: 25 }} />
                </NavItem>
              </LinkContainer>
              <MusitUserAccount
                actor={this.props.appSession.actor}
                groups={this.props.appSession.groups}
                token={this.props.appSession.accessToken}
                selectedMuseumId={this.props.appSession.museumId}
                selectedCollectionId={this.props.appSession.collectionId}
                handleLogout={this.handleLogout}
                handleLanguage={this.handleLanguage}
                handleMuseumId={this.handleMuseumId}
                handleCollectionId={this.handleCollectionId}
                rootNode={this.props.rootNode}
              />
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="appContent">
          {this.props.children}
        </div>

        <footer className={this.getFooterClass()}>
          {'Build number: ' +
            (this.props.appSession.buildInfo &&
              this.props.appSession.buildInfo.buildInfoBuildNumber)}
        </footer>
      </div>
    );
  }
}

const data = {
  appSession$: { type: PropTypes.object.isRequired },
  pickList$: { type: PropTypes.object.isRequired }
};

const commands = {
  loadAppSession$,
  setMuseumId$,
  setCollectionId$,
  clearObjectPicklist$,
  clearNodePicklist$
};

const props = {
  goTo: hashHistory.push,
  enableAnalysis: Config.isDev
};

export default inject(data, commands, props)(AppComponent);
