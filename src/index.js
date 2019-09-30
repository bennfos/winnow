import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Winnow from './components/Winnow'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(
  <Router>
      <Winnow />
  </Router>
  , document.getElementById('root'))
