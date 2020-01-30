import React from 'react'
import { Header, Left, Button, Icon, Body, Title, Right, Text, View, Spinner } from 'native-base'

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
