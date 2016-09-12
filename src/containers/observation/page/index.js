import React, { PropTypes } from 'react'
import { ControlLabel, Grid, Row, Col, Button, FormGroup, FormControl } from 'react-bootstrap'
import {
  RenderPest,
  RenderAlcohol,
  RenderDoubleTextArea,
  RenderFromToNumberComment
} from '../../../components/observation/render'
import { containsObjectWithField, parseISODateNonStrict as parseISODate, DATE_FORMAT_DISPLAY } from '../../../util'
import FontAwesome from 'react-fontawesome'
import { hashHistory } from 'react-router'
import SaveCancel from '../../../components/formfields/saveCancel/SaveCancel'
import DatePicker from 'react-bootstrap-date-picker'
import ActorSuggest from '../../../components/actor'
import moment from 'moment'
import * as validation from './validation'

export default class ObservationPage extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
    observations: PropTypes.arrayOf(PropTypes.object),
    doneDate: PropTypes.string,
    doneBy: PropTypes.object,
    registeredDate: PropTypes.string,
    registeredBy: PropTypes.string,
    onSaveObservation: PropTypes.func.isRequired,
    mode: React.PropTypes.oneOf(['ADD', 'VIEW', 'EDIT']).isRequired,
    saveDisabled: React.PropTypes.bool,
    cancelDisabled: React.PropTypes.bool
  }

  static defaultProps = {
    observations: [],
    saveDisabled: false,
    cancelDisabled: false
  }

  static createDefaultPestData() {
    return { observations: [{ lifeCycle: '', count: '' }] }
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedType: null,
      observations: props.observations,
      doneDate: props.doneDate || moment(),
      doneBy: props.doneBy
    }
    this.isTypeSelectable = this.isTypeSelectable.bind(this)
    this.onChangeField = this.onChangeField.bind(this)
    this.onChangeTypeSelect = this.onChangeTypeSelect.bind(this)
    this.onChangePestObservation = this.onChangePestObservation.bind(this)
    this.onRemovePestObservation = this.onRemovePestObservation.bind(this)
    this.onClickAddObservation = this.onClickAddObservation.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mode === 'VIEW') {
      this.setState({
        ...this.state,
        doneBy: nextProps.doneBy && nextProps.doneBy.id ? nextProps.doneBy : null,
        doneDate: nextProps.doneDate,
        observations: nextProps.observations
      })
    }
  }

  onChangeField(field, value, index) {
    const observations = [...this.state.observations]
    observations[index] = { ...observations[index], data: { ...observations[index].data, [field]: value } }
    this.setState({ ...this.state, observations })
  }

  onChangePestObservation(pestObservationIndex, field, value, pestIndex) {
    const observations = [...this.state.observations]
    const pestObj = observations[pestIndex]
    const pestObservations = pestObj.data.observations
    pestObservations[pestObservationIndex][field] = value
    this.setState({ ...this.state, observations })
  }

  onRemovePestObservation(pestObservationIndex, pestIndex) {
    const observations = [...this.state.observations]
    const pestObj = observations[pestIndex]
    pestObj.data.observations = pestObj.data.observations.filter((elm, index) => index !== pestObservationIndex)
    this.setState({ ...this.state, observations })
  }

  onClickAddObservation(pestIndex) {
    const observations = [...this.state.observations]
    const pestObj = observations[pestIndex]
    const pestObservations = pestObj.data.observations
    pestObservations.unshift({ lifeCycle: '', count: '' })
    this.setState({ ...this.state, observations })
  }

  onChangeTypeSelect(e) {
    this.setState({
      ...this.state,
      selectedType: e.target.options[e.target.selectedIndex].value
    })
  }

  typeDefinitions = {
    '': { label: 'typeSelect.labelText' },
    gas: {
      label: 'gas.labelText',
      render: this.renderDoubleTextArea,
      validate: validation.validateDoubleTextArea
    },
    lightConditions: {
      label: 'lightConditions.labelText',
      render: this.renderDoubleTextArea,
      validate: validation.validateDoubleTextArea
    },
    cleaning: {
      label: 'cleaning.labelText',
      render: this.renderDoubleTextArea,
      validate: validation.validateDoubleTextArea
    },
    pest: {
      label: 'pest.labelText',
      render: this.renderPest,
      data: ObservationPage.createDefaultPestData(),
      validate: validation.validatePest
    },
    mold: {
      label: 'mold.labelText',
      render: this.renderDoubleTextArea,
      validate: validation.validateDoubleTextArea
    },
    skallsikring: {
      label: 'skallsikring.labelText',
      render: this.renderDoubleTextArea,
      validate: validation.validateDoubleTextArea
    },
    tyverisikring: {
      label: 'tyverisikring.labelText',
      render: this.renderDoubleTextArea,
      validate: validation.validateDoubleTextArea
    },
    brannsikring: {
      label: 'brannsikring.labelText',
      render: this.renderDoubleTextArea,
      validate: validation.validateDoubleTextArea
    },
    vannskaderisiko: {
      label: 'vannskaderisiko.labelText',
      render: this.renderDoubleTextArea,
      validate: validation.validateDoubleTextArea
    },
    relativeHumidity: {
      label: 'relativeHumidity.labelText',
      render: this.renderFromToNumberComment,
      validate: validation.validateFromTo
    },
    hypoxicAir: {
      label: 'hypoxicAir.labelText',
      render: this.renderFromToNumberComment,
      validate: validation.validateFromTo
    },
    temperature: {
      label: 'temperature.labelText',
      render: this.renderFromToNumberComment,
      validate: validation.validateFromTo
    },
    alcohol: {
      label: 'alcohol.labelText',
      render: this.renderAlcohol,
      validate: validation.validateAlcohol
    }
  }

  addObservationType(typeToAdd, data = {}) {
    const type = typeToAdd || this.state.selectedType
    if (!type || type === '') {
      return
    }
    const typeProps = { ...data, ...this.typeDefinitions[type].data }
    const observations = [{ type, data: typeProps }, ...this.state.observations]
    this.setState({ ...this.state, observations, selectedType: null })
  }

  isTypeSelectable(typeStr) {
    return !containsObjectWithField(this.state.observations, 'type', typeStr)
  }

  removeObservation(index) {
    const observations = this.state.observations
    this.setState({ ...this.state, observations: observations.filter((o, i) => i !== index) })
  }

  validateForm(formProps) {
    let errors = {}

    if (typeof formProps.doneBy !== 'object' || !formProps.doneBy.id) {
      errors.doneBy = 'musit.observation.page.doneByRequired'
    }

    if (!formProps.doneDate) {
      errors.doneDate = 'musit.observation.page.dateRequired'
    }

    this.state.observations.forEach((observation, index) => {
      const typeDefinition = this.typeDefinitions[observation.type];
      if (typeDefinition.validate) {
        errors = { ...errors, ...typeDefinition.validate.bind(this)(observation.data, index, observation.type) }
      }
    })

    return errors
  }

  handleSubmit(e) {
    e.preventDefault()
    const errors = this.validateForm(this.state)
    this.setState({ ...this.state, errors })
    if (Object.keys(errors).length === 0) {
      this.props.onSaveObservation(this.props.id, this.state)
    }
  }

  renderObservation(observation, index) {
    const typeDefinition = this.typeDefinitions[observation.type];
    return typeDefinition.render.bind(this)(observation.type, observation.data, index)
  }

  renderAlcohol(id, valueProps, index) {
    return (<RenderAlcohol
      disabled={this.props.mode === 'VIEW'}
      valueProps={valueProps}
      index={index}
      mode={this.props.mode}
      translate={this.props.translate}
      onChangeField={this.onChangeField}
    />)
  }

  renderPest(id, valueProps, index) {
    return (<RenderPest
      disabled={this.props.mode === 'VIEW'}
      canEdit={this.props.mode !== 'VIEW'}
      valueProps={valueProps}
      index={index}
      mode={this.props.mode}
      translate={this.props.translate}
      onChangeField={this.onChangeField}
      onChangePestObservation={this.onChangePestObservation}
      onRemovePestObservation={this.onRemovePestObservation}
      onClickAddObservation={this.onClickAddObservation}
    />)
  }

  renderDoubleTextArea(id, valueProps, index) {
    return (<RenderDoubleTextArea
      disabled={this.props.mode === 'VIEW'}
      type={id}
      valueProps={valueProps}
      index={index}
      mode={this.props.mode}
      translate={this.props.translate}
      onChangeField={this.onChangeField}
    />)
  }

  renderFromToNumberComment(id, valueProps, index) {
    return (<RenderFromToNumberComment
      disabled={this.props.mode === 'VIEW'}
      type={id}
      valueProps={valueProps}
      index={index}
      mode={this.props.mode}
      translate={this.props.translate}
      onChangeField={this.onChangeField}
    />)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid>
          <Row>
            <h3 />
            <Row>
              <Col xs={12} sm={5}>
                <ControlLabel>{this.props.translate('musit.observation.date')}</ControlLabel>
                {this.props.mode !== 'ADD' ? (
                  <FormControl
                    componentClass="input"
                    value={this.state.doneDate.format(DATE_FORMAT_DISPLAY)}
                    disabled
                  />
                ) : (
                  <DatePicker
                    dateFormat={DATE_FORMAT_DISPLAY}
                    value={this.state.doneDate.toISOString()}
                    onChange={(newValue) => {
                      this.setState({ ...this.state, doneDate: parseISODate(newValue) })
                    }}
                    disabled={this.props.mode === 'VIEW'}
                  />
                )}
              </Col>
              <Col xs={12} sm={5}>
                <ControlLabel>{this.props.translate('musit.observation.doneBy')}</ControlLabel>
                {this.props.mode !== 'ADD' ? (
                  <FormControl
                    componentClass="input"
                    value={this.state.doneBy ? this.state.doneBy.fn : ''}
                    disabled
                  />
                ) : (
                  <ActorSuggest
                    id="doneByField"
                    value={this.state.doneBy ? this.state.doneBy.fn : ''}
                    placeHolder="Find actor"
                    onChange={doneBy => {
                      this.setState({ ...this.state, doneBy })
                    }}
                  />
                )}
              </Col>
            </Row>
            {this.props.mode === 'VIEW' ?
              <Row>
                <Col sm={5}>
                  <ControlLabel>{this.props.translate('musit.texts.dateRegistered')}</ControlLabel>
                  <FormControl
                    componentClass="input"
                    value={parseISODate(this.props.registeredDate).format(DATE_FORMAT_DISPLAY)}
                    disabled
                  />
                </Col>
                <Col sm={5} >
                  <ControlLabel>{this.props.translate('musit.texts.registeredBy')}</ControlLabel>
                  <FormControl
                    componentClass="input"
                    value={this.props.registeredBy}
                    disabled
                  />
                </Col>
              </Row>
            : ''}
            <h3 />
            {this.props.mode !== 'ADD' ? '' : (
              <Row>
                <Col xs={2}>
                  <FormGroup controlId="formControlsSelect">
                    <FormControl
                      componentClass="select"
                      placeholder="select"
                      onChange={this.onChangeTypeSelect}
                      value={this.state.selectedType ? this.state.selectedType : ''}
                    >
                      {Object.keys(this.typeDefinitions).filter(this.isTypeSelectable).map((type, index) => {
                        return (
                          <option key={index} value={type}>
                            {this.props.translate(`musit.observation.page.${this.typeDefinitions[type].label}`)}
                          </option>
                        )
                      })}
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col xs={4}>
                  <Button
                    bsStyle="primary"
                    onClick={() => this.addObservationType()}
                  >
                      Legg til
                  </Button>
                </Col>
              </Row>
            )}
            {this.state.observations.map((observation, index) => {
              const typeDefinition = this.typeDefinitions[observation.type];
              return (
                <div key={index}>
                  <h3>
                    {this.props.translate(`musit.observation.page.${typeDefinition.label}`)}
                    &nbsp;
                    {this.props.mode !== 'ADD' ? '' : (
                      <a onClick={() => this.removeObservation(index)}>
                        <FontAwesome name="times" />
                      </a>
                    )}
                  </h3>
                  {this.renderObservation(observation, index)}
                  <hr />
                </div>
              )
            })}
          </Row>
          <br />
          <Row className="row-centered" style={{ textAlign: 'center' }}>
            {this.state.errors && Object.values(this.state.errors).map((error, index) => {
              return <p style={{ color: 'red' }} key={index}>{this.props.translate(error)}</p>
            })}
            <br />
            {this.props.mode === 'VIEW' ?
              <Col xs={10}>
                <Button
                  onClick={() => {
                    hashHistory.goBack()
                  }}
                >
                  Lukk
                </Button>
              </Col> :
              <SaveCancel
                translate={this.props.translate}
                onClickSave={this.handleSubmit}
                onClickCancel={() => hashHistory.goBack()}
                saveDisabled={this.props.saveDisabled === true || this.state.observations.length === 0}
                cancelDisabled={this.props.cancelDisabled}
              />
            }
          </Row>
        </Grid>
      </form>
    )
  }
}