import React, { Component, PropTypes } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { I18n } from 'react-i18nify';

export default class ObservationControlComponent extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onClickNewObservation: PropTypes.func.isRequired,
    onClickNewControl: PropTypes.func.isRequired
  };

  render() {
    const { id, onClickNewControl, onClickNewObservation } = this.props;
    const getTranslate = term => I18n.t(`musit.leftMenu.observationControl.${term}`);
    const buttonLogic = (type, eventType) => {
      return (
        <Button
          id={`${id}_${type}`}
          onClick={event => eventType(event.target.value)}
          style={{ textAlign: 'left', width: '100%' }}
        >
          <FontAwesome name="plus-circle" style={{ padding: '2px' }} />
          {getTranslate(type)}
        </Button>
      );
    };
    return (
      <div>
        <Row>
          <Col xs={6} sm={12}>
            {buttonLogic('newObservation', onClickNewObservation)}
          </Col>
          <Col xs={6} sm={12}>
            {buttonLogic('newControl', onClickNewControl)}
          </Col>
        </Row>
      </div>
    );
  }
}
