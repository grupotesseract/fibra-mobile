import { Button, Spinner } from 'native-base'
import React from 'react'

const ActionButton = (props) => {
  const {
    loading,
    children,
    ...restProps
  } = props

  return (
    <Button size='lg' rounded={0} {...restProps}>
      {loading && <Spinner color='white' />}
      {children}
    </Button>
  )
}


export default ActionButton
