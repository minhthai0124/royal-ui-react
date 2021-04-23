import React, { Fragment } from 'react'

import Header from './Header'
import Footer from './Footer'

import './style.scss'
import SideBar from './SideBar'

export default function MainLayout(props: any) {
  return (
    <Fragment>
      <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
          <SideBar />
          <div className="main-panel">
            {props.children}
            <Footer />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
