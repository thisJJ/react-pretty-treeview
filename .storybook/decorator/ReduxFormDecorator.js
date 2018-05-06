import React from 'react'
import { reduxForm } from 'redux-form'

const ReduxFormDecorator = reduxFormConfig => story => {
  const ReduxFormed = reduxForm( reduxFormConfig )( story )
  return (
    <ReduxFormed />
  )
}

export default ReduxFormDecorator
