import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'

import Routes from './routes/routes'
import AppProvider from './hooks'
import GlobalStyle from './styles/globalStyle'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <>
    <AppProvider>
    <Routes />
    </AppProvider>
         <ToastContainer autoClose={2000} theme='colored' /> <GlobalStyle />
    </>

)
