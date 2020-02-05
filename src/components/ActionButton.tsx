import { Button, Spinner } from 'native-base'
import React from 'react'

const ActionButton = (props) => {
  const {
    loading,
    children,
    ...restProps
  } = props

  return (
    <Button {...restProps}>
      {loading && <Spinner color='white' />}
      {children}
    </Button>
  )
}

export default ActionButton
