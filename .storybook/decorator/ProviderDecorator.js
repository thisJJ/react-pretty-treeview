import React from 'react'

import { Provider as ReduxProvider } from 'react-redux'
import { buildStore } from '~/store'

console.log(buildStore())

const ProviderDecorator = ( story ) => {
  return (
    <ReduxProvider store={ buildStore() }>
      { story() }
    </ReduxProvider>
  )
}

export default ProviderDecorator
