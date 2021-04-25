import React, { memo, useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

// import { TextButtonComponent } from '@/components/buttons'
import { useInjectReducer } from '@/utils/injectReducer'
import { useInjectSaga } from '@/utils/injectSaga'
import reducer from './store/reducers'
import saga from './store/sagas'
import { makeSelectError, makeSelectIsRequesting } from './store/selectors'
import { User } from './types'
import { login } from './store/actions'

import { useForm } from "react-hook-form"
import { todoList } from "@/assets/js/todolist.js"

import logo from '@/assets/images/logo.svg'

// const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/
const key = 'login'

interface Props {
  login(user: User, setErrors: any): void
  isRequesting: boolean
}

function LoginView({ login, isRequesting }: Props) {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  useEffect(() => {
    todoList()
  })

  const { register, handleSubmit } = useForm<User>();
  const onSubmit = (data: User) => {
    login(data, () => { })
    // login(user, setErrors)
  }

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={logo} alt="logo" />
                </div>
                <h4>{"Hello! let's get started"}</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg" id="exampleInputEmail1"
                      placeholder="Username"
                      {...register("username")}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg" id="exampleInputPassword1"
                      placeholder="Password"
                      {...register("password")}
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      type="submit"
                    >SIGN IN</button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" {...register("isSave")} />
                        Keep me signed in
                      </label>
                    </div>
                    <Link to="#" className="auth-link text-black">Forgot password?</Link>
                  </div>
                  <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="ti-facebook mr-2"></i>Connect using facebook
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    {"Don't have an account?"} <Link to="/register" className="text-primary">Create</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectError(),
  isRequesting: makeSelectIsRequesting()
})

const withConnect = connect(mapStateToProps, { login })

export default compose(withConnect, memo)(LoginView)
