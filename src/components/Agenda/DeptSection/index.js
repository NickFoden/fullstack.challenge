// @flow
import React from 'react'
import EventCell from '../EventCell'
import List from '../List'
import style from './style'

type eventsParams = {theEvents: Array, dept: string};

const index = ({theEvents, dept}: eventsParams) =>  {
  return (
    <div>
      <section className={style.dept_section} key={dept}><h4>{dept}</h4>
        <hr />
        <List>
          {theEvents.map(({ calendar, event }) => (
            <EventCell key={event.id} calendar={calendar} event={event} />
          ))}
        </List>
      </section>
    </div>
  );
}

export default index