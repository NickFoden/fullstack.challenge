// @flow

import React, { Component } from 'react'
import { DateTime } from 'luxon'
import { computed, observable } from 'mobx'
import { inject, observer } from 'mobx-react'

import greeting from 'lib/greeting'
import runEvery  from 'lib/runEvery'

import type Account from 'src/models/Account'

import DeptSection from "./DeptSection"
import List from './List'
import EventCell from './EventCell'

import style from './style'

/**
 * Agenda component
 * Displays greeting (depending on time of day)
 * and list of calendar events
 */

type tProps = {
  account: Account
}

type State = {
  departmentToggleOn: Boolean,
  selectedCalendar: String
}
const currentTime = observable({
  time: DateTime.local().hour,
})

runEvery(1000, () => { currentTime.time = DateTime.local().hour })

@inject('account')
@observer
class Agenda extends Component<tProps, State> {
  constructor () {
    super()
    this.state = {
      departmentToggleOn: false,
      selectedCalendar: 'all',
    }
  }

  handleChange = (event: SyntheticInputEvent<EventTarget>): void => {
    const {name} = event.target
    this.setState({[name]: event.target.value})
  }

  departmentToggle = () => {
    this.setState(prevState => ({
      departmentToggleOn: !prevState.departmentToggleOn,
    }))
  }

  renderByDepartments = (events: {calendar: Calendar, event: Event }) => {
    let departmentsObj = {None: []}
    events.map(item => {
      if (item.event.department) {
        departmentsObj[item.event.department] ? departmentsObj[item.event.department].push(item) : departmentsObj[item.event.department] = [item]
      }
      else {
        departmentsObj.None.push(item)
      }
    })

    let noDepartmentArray = events.filter(item => !item.event.department)
    let deptsArray = []
    for (let dept in departmentsObj) {
      if (dept !== 'None') {
        let theEvents = events.filter(item => item.event.department === dept)
        deptsArray.push(<DeptSection theEvents={theEvents} dept={dept} key={dept} />)
      }
    }
    deptsArray.push(<DeptSection theEvents={noDepartmentArray} dept={'No Dept'} key='none' />)

    return deptsArray
  }
  /**
   * Return events from all calendars, sorted by date-time.
   * Returned objects contain both Event and corresponding Calendar
   */
  @computed
  get events (): Array<{ calendar: Calendar, event: Event }> {
    const events = this.props.account.calendars.filter(item => item.id === this.state.selectedCalendar || this.state.selectedCalendar === 'all').map((calendar) => (
      calendar.events.map((event) => (
        { calendar, event }
      ))
    ))
      .flat()

    // Sort events by date-time, ascending
    events.sort((a, b) => (a.event.date.diff(b.event.date).valueOf()))

    return events
  }

  render () {
    const {departmentToggleOn, selectedCalendar} = this.state
    return (
      <div className={style.outer}>
        <div className={style.container}>

          <div className={style.header}>
            <span className={style.title}>
              {greeting(currentTime.time)}
            </span>
            <span className={style.calendar_select_container}>
              <label className={style.calendar_select_label}>Current Calendar{selectedCalendar === 'all' ? 's' : null}:</label>
              <select name='selectedCalendar' value={selectedCalendar} onChange={this.handleChange}>
                <option key='all'>all</option>
                {this.props.account.calendars.map((item: Calendar) => {
                  return <option key={item.id} value={item.id}>{item.id.substr(0, 4)}</option>
                })}
              </select>
            </span>
            <button className={style.button_dept_toggle} onClick={this.departmentToggle}>{departmentToggleOn ? 'Ungroup' : 'Group by Depts'}</button>
          </div>
          {!departmentToggleOn
            ? <List>
              {this.events.map(({ calendar, event }) => (
                <EventCell key={event.id} calendar={calendar} event={event} />
              ))}
            </List>
            : <div>{this.renderByDepartments(this.events)}</div>
          }
        </div>
      </div>
    )
  }
}

export default Agenda
