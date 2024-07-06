import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Grid from './components/grid.jsx'
import InputPage from './components/inputPage.jsx'

import {Provider} from 'react-redux'
import { store } from "./components/store/store"
import LoginPage from './components/loginPage.jsx'
// const route = createBrowserRouter([{
//   path:'/',
//   element:<InputPage/>
// },
// {
//   path:'/play',
//   element:<Grid/>
// }])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
      {/* Router for React Router */}
      <Router>
        {/* Define your routes */}
        <Routes>
          <Route path='/' element={<App/>}>
              <Route path="/input" element={<InputPage />} />
              <Route path="/play" element={<Grid />} />
              <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
)
