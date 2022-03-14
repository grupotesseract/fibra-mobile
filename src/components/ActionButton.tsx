import { Button } from 'native-base'
import React from 'react'

const ActionButton = (props) => {
  const {
    loading,
    children,
    ...restProps
  } = props

  return (
    <Button _loading={{
      bg: "primary",
      opacity: '100',
      _text: {
        color: "white"
      }
    }} _spinner={{
      color: "white"
    }} size='lg' rounded={0} {...restProps}>
      {children}
    </Button>
  )
}


export default ActionButton
