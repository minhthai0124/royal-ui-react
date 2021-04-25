import React, { memo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { useInjectReducer } from '@/utils/injectReducer'
import { useInjectSaga } from '@/utils/injectSaga'
import reducer from './store/reducers'
import saga from './store/sagas'
import { getUsersListRequested } from './store/actions'

import Pagination from '@/components/Pagination'

import noImg from '@/assets/images/no_image.png'
import { selectUsersList } from './store/selectors'

export const PERPAGE = 4

const key = 'users'

interface User {
  avatar: String
  email: String
  id: number
  name: String
  phone: String
}

interface Props {
  getUsersListRequested(): any
  usersList: any
}
export function HomePage(props: any) {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  const { getUsersListRequested, usersList } = props

  const [currentPage, setCurrentPage] = useState(1)

  const handleSetCurrentPage = (page: number = 1) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    getUsersListRequested()
  }, [getUsersListRequested])

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Striped Table</h4>
              <p className="card-description">
                Add className <code>.table-striped</code>
              </p>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>
                        User
                      </th>
                      <th>
                        Name
                      </th>
                      <th>
                        Email
                      </th>
                      <th>
                        Phone
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      usersList.slice((currentPage-1) * PERPAGE, (currentPage-1) * PERPAGE + PERPAGE).map((user: User) => {
                        return (
                          <tr key={user.id}>
                            <td className="py-1">
                              <img src={noImg} alt="" />
                            </td>
                            <td>
                              {user.name}
                            </td>
                            <td>
                              {user.email}
                            </td>
                            <td>
                              {user.phone}
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                {
                  usersList.length > 0 && (
                    <Pagination
                      handleSubmit={handleSetCurrentPage}
                      currentPage={currentPage}
                      total={usersList.length}
                      limitPagination={PERPAGE}
                      rangeNumb={Math.floor(usersList.length/PERPAGE)}
                    />
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  usersList: selectUsersList()
})

const withConnect = connect(mapStateToProps, {
  getUsersListRequested
})

export default compose(withConnect, memo)(HomePage)
