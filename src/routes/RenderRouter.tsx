import React, { Fragment } from "react"
import HelmetComponent from "../components/HelmetComponent"
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

export const RenderRouter = ({
  route: Component,
  layout: Layout = Fragment,
  breadcrumb,
  title,
  roles,

  permission,
  redirect = '/',
  ...rest
}: any) => {
  return (
    <>
      <ErrorBoundary key={title}>
        {title && <HelmetComponent title={title} />}
        <Layout key={rest.path} path={rest.path} breadcrumb={breadcrumb} title={title}>
          <Component {...rest} />
        </Layout>
      </ErrorBoundary>
    </>
  )
}
