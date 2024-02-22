import React from 'react'
import Maincontainer from './components/Maincontainer'
import { Provider } from 'react-redux'
import store from './utils/store'

const App:React.FC = () => {
  return (
    <Provider store={store}>
    <div className='bg-green-500'>
        <Maincontainer/>
    </div>
    </Provider>
  )
}

export default App
