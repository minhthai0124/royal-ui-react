import React, { Fragment } from 'react'

export default function CommonLayout(props: any) {
  return (
    <Fragment>
      {props.children}
    </Fragment>
  )
}
