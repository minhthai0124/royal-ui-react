import React from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  title: string
}

const HelmetComponent = (props: Props) => {
  const { title } = props

  return (
    <Helmet>
      <title>{title}</title>
      <meta httpEquiv="keywords" content="キーワード" />
      <meta httpEquiv="description" content="テキスト、てきすと" />
    </Helmet>
  )
}

export default HelmetComponent
