import React, { memo, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { useInjectReducer } from '@/utils/injectReducer'
import { useInjectSaga } from '@/utils/injectSaga'
import reducer from './store/reducers'
import saga from './store/sagas'

import { users } from './constants/users'
import Pagination from '@/components/Pagination'

import noImg from '@/assets/images/no_image.png'

export const PERPAGE = 4

const key = 'users'

export function HomePage(props: any) {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  const [currentPage, setCurrentPage] = useState(1)

  const handleSetCurrentPage = (page: number = 1) => {
    setCurrentPage(page)
  }

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
                      users.slice(currentPage * PERPAGE, currentPage * PERPAGE + PERPAGE).map((user: any) => {
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
                  users.length > 0 && (
                    <Pagination
                      handleSubmit={handleSetCurrentPage}
                      currentPage={currentPage}
                      total={users.length}
                      limitPagination={5}
                      rangeNumb={4}
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
})

const withConnect = connect(mapStateToProps, {
})

export default compose(withConnect, memo)(HomePage)
