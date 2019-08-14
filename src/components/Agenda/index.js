// @flow

import React, { Component } from 'react'
import { DateTime } from 'luxon'
import { computed, observable } from 'mobx'
import { inject, observer } from 'mobx-react'

import greeting from 'lib/greeting'
import runEvery  from 'lib/runEvery'

import type Account from 'src/models/Account'

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
      selectedCalendar: 'all',
    }
  }

  handleChange = (event: SyntheticInputEvent<EventTarget>): void => {
    const {name} = event.target
    this.setState({[name]: event.target.value})
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
    return (
      <div className={style.outer}>
        <div className={style.container}>

          <div className={style.header}>
            <span className={style.title}>
              {greeting(currentTime.time)}
            </span>
            <span className={style.calendar_select_container}>
              <label className={style.calendar_select_label}>Current Calendar:</label>
              <select name='selectedCalendar' value={this.state.selectedCalendar} onChange={this.handleChange}>
                <option key='all'>all</option>
                {this.props.account.calendars.map((item: Calendar) => {
                  return <option key={item.id}>{item.id}</option>
                })}
              </select>
            </span>
          </div>

          <List>
            {this.events.map(({ calendar, event }) => (
              <EventCell key={event.id} calendar={calendar} event={event} />
            ))}
          </List>

        </div>
      </div>
    )
  }
}

export default Agenda
