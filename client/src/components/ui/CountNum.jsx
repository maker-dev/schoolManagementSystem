import React from 'react'
import CountUp from 'react-countup'

function CountNum({number}) {
  return (
    <CountUp start={0} end={number} duration={2.5} delay={0.5} />
)
}

export default CountNum