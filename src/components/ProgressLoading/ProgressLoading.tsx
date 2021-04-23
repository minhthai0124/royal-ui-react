import React, { useState, useEffect } from "react"
import { random } from "lodash"
import styled from "styled-components"
import usePrevious  from "@/utils/usePrevious"

const Meter = styled.div`
  height: 3px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  ::after {
    content: "";
    display: block;
    height: 100%;
    width: ${props => props.theme.percent + "%"};
    transition: all 400ms ease 0s;
    background: rgb(242, 12, 65);
    box-shadow: rgba(242, 12, 65, 0.7) 0px 0px 10px;
  }
`
export default function ProgressLoading({
  numberOfRequesting,
}: {
  numberOfRequesting: number
}) {
  const [hidden, setHidden] = useState(true)
  const [percent, setPercent] = useState(30)
  const prevNumberOfRequesting = usePrevious(numberOfRequesting)
  useEffect(() => {
    if (
      prevNumberOfRequesting !== undefined &&
      numberOfRequesting < Number(prevNumberOfRequesting)
    ) {
      setPercent(percent => percent + random(0, 100 - percent))
    }
    if (numberOfRequesting === 0 && prevNumberOfRequesting === 1) {
      setPercent(100)
      setTimeout(() => {
        setHidden(true)
        setPercent(30)
      }, 400)
    } else if (numberOfRequesting !== 0) {
      setHidden(false)
    }
  }, [numberOfRequesting, prevNumberOfRequesting, setHidden, setPercent])

  return hidden ? null : <Meter theme={{ percent }} />
}
