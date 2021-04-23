import React from 'react'
import ErrorContainer from '@/containers/ErrorPage'
import MainLayout from '@/layouts/MainLayout'

interface State {
  hasError: boolean
}

const ErrorPage = () => (
  <MainLayout>
    <ErrorContainer />
  </MainLayout>
)

export default class ErrorBoundaries extends React.Component<any, State> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />
    }

    return this.props.children
  }
}
