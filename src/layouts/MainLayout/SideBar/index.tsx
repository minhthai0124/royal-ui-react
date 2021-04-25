import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
    <ul className="nav">
      <li className="nav-item">
        <Link className="nav-link" to='#'>
          <i className="ti-shield menu-icon"></i>
          <span className="menu-title">Dashboard</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" data-toggle="collapse" to="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
          <i className="ti-palette menu-icon"></i>
          <span className="menu-title">UI Elements</span>
          <i className="menu-arrow"></i>
        </Link>
        <div className="collapse" id="ui-basic">
          <ul className="nav flex-column sub-menu">
            <li className="nav-item"> <Link className="nav-link" to="#">Buttons</Link></li>
            <li className="nav-item"> <Link className="nav-link" to="#">Typography</Link></li>
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#">
          <i className="ti-layout-list-post menu-icon"></i>
          <span className="menu-title">Form elements</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#">
          <i className="ti-pie-chart menu-icon"></i>
          <span className="menu-title">Charts</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#">
          <i className="ti-view-list-alt menu-icon"></i>
          <span className="menu-title">Tables</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#">
          <i className="ti-star menu-icon"></i>
          <span className="menu-title">Icons</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" data-toggle="collapse" to="#auth" aria-expanded="false" aria-controls="auth">
          <i className="ti-user menu-icon"></i>
          <span className="menu-title">User Pages</span>
          <i className="menu-arrow"></i>
        </Link>
        <div className="collapse" id="auth">
          <ul className="nav flex-column sub-menu">
            <li className="nav-item"> <Link className="nav-link" to="#"> Login </Link></li>
            <li className="nav-item"> <Link className="nav-link" to="#"> Login 2 </Link></li>
            <li className="nav-item"> <Link className="nav-link" to="#"> Register </Link></li>
            <li className="nav-item"> <Link className="nav-link" to="#"> Register 2 </Link></li>
            <li className="nav-item"> <Link className="nav-link" to="#"> Lockscreen </Link></li>
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#">
          <i className="ti-write menu-icon"></i>
          <span className="menu-title">Documentation</span>
        </Link>
      </li>
    </ul>
  </nav>
  )
}

const mapStateToProps = createStructuredSelector({
})

const withConnect = connect(mapStateToProps, { })

export default compose(withConnect)(SideBar)
