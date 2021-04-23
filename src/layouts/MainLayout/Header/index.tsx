import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'

import './styles.scss'

import { useInjectReducer } from '@/utils/injectReducer'
import { useInjectSaga } from '@/utils/injectSaga'
import reducer from '@/containers/Auth/Login/store/reducers'
import saga from '@/containers/Auth/Login/store/sagas'

import { logout } from '@/containers/Auth/Login/store/actions'

import logo from '@/assets/images/logo.svg'
import logoMini from '@/assets/images/logo-mini.svg'
import face28 from '@/assets/images/faces/face28.jpg'
import face4 from '@/assets/images/faces/face4.jpg'
import face3 from '@/assets/images/faces/face3.jpg'
import face2 from '@/assets/images/faces/face2.jpg'


import "@/assets/js/off-canvas.js"
import "@/assets/js/hoverable-collapse.js"
import "@/assets/js/template.js"
import "@/assets/js/todolist.js"
// import "@/assets/vendors/base/vendor.bundle.base.js"

{/* <script src="../../vendors/base/vendor.bundle.base.js"></script> */ }

interface Props {
  logout(): any
}

const Header = (props: Props) => {
  useInjectSaga({ key: 'login', saga })
  useInjectReducer({ key: 'login', reducer })

  // const {
  //   logout,
  // } = props

  // const isAuthenticated = CookieHandlerInstance.checkCookie(
  //   process.env.COOKIE_NAME || 'token'
  // )

  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <Link className="navbar-brand brand-logo mr-5" to="../../index.html">
          <img src={logo} className="mr-2" alt="logo" />
        </Link>
        <Link className="navbar-brand brand-logo-mini" to="../../index.html">
          <img src={logoMini} alt="logo" />
        </Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
          <span className="ti-view-list"></span>
        </button>
        <ul className="navbar-nav mr-lg-2">
          <li className="nav-item nav-search d-none d-lg-block">
            <div className="input-group">
              <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                <span className="input-group-text" id="search">
                  <i className="ti-search"></i>
                </span>
              </div>
              <input type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" />
            </div>
          </li>
        </ul>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item dropdown mr-1">
            <Link className="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" to="#" data-toggle="dropdown">
              <i className="ti-email mx-0"></i>
            </Link>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="messageDropdown">
              <p className="mb-0 font-weight-normal float-left dropdown-header">Messages</p>
              <a className="dropdown-item">
                <div className="item-thumbnail">
                  <img src={face4} alt="" className="profile-pic" />
                </div>
                <div className="item-content flex-grow">
                  <h6 className="ellipsis font-weight-normal">David Grey
                  </h6>
                  <p className="font-weight-light small-text text-muted mb-0">
                    The meeting is cancelled
                  </p>
                </div>
              </a>
              <a className="dropdown-item">
                <div className="item-thumbnail">
                  <img src={face2} alt="" className="profile-pic" />
                </div>
                <div className="item-content flex-grow">
                  <h6 className="ellipsis font-weight-normal">Tim Cook
                  </h6>
                  <p className="font-weight-light small-text text-muted mb-0">
                    New product launch
                  </p>
                </div>
              </a>
              <a className="dropdown-item">
                <div className="item-thumbnail">
                  <img src={face3} alt="" className="profile-pic" />
                </div>
                <div className="item-content flex-grow">
                  <h6 className="ellipsis font-weight-normal"> Johnson
                  </h6>
                  <p className="font-weight-light small-text text-muted mb-0">
                    Upcoming board meeting
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" to="#" data-toggle="dropdown">
              <i className="ti-bell mx-0"></i>
              <span className="count"></span>
            </Link>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="notificationDropdown">
              <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
              <a className="dropdown-item">
                <div className="item-thumbnail">
                  <div className="item-icon bg-success">
                    <i className="ti-info-alt mx-0"></i>
                  </div>
                </div>
                <div className="item-content">
                  <h6 className="font-weight-normal">Application Error</h6>
                  <p className="font-weight-light small-text mb-0 text-muted">
                    Just now
                  </p>
                </div>
              </a>
              <a className="dropdown-item">
                <div className="item-thumbnail">
                  <div className="item-icon bg-warning">
                    <i className="ti-settings mx-0"></i>
                  </div>
                </div>
                <div className="item-content">
                  <h6 className="font-weight-normal">Settings</h6>
                  <p className="font-weight-light small-text mb-0 text-muted">
                    Private message
                  </p>
                </div>
              </a>
              <a className="dropdown-item">
                <div className="item-thumbnail">
                  <div className="item-icon bg-info">
                    <i className="ti-user mx-0"></i>
                  </div>
                </div>
                <div className="item-content">
                  <h6 className="font-weight-normal">New user registration</h6>
                  <p className="font-weight-light small-text mb-0 text-muted">
                    2 days ago
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="nav-item nav-profile dropdown">
            <Link className="nav-link dropdown-toggle" to="#" data-toggle="dropdown" id="profileDropdown">
              <img src={face28} alt="profile" />
            </Link>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
              <a className="dropdown-item">
                <i className="ti-settings text-primary"></i>
                Settings
              </a>
              <a className="dropdown-item">
                <i className="ti-power-off text-primary"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span className="ti-view-list"></span>
        </button>
      </div>
    </nav>
  )
}

const mapStateToProps = createStructuredSelector({
})

const withConnect = connect(mapStateToProps, {
  logout,
})

export default compose(withConnect)(Header)
