import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ChakraProvider} from "@chakra-ui/react";
import theme from "./theme.jsx";
import {HashRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <HashRouter>
          <ChakraProvider theme={theme}>
              <App/>
          </ChakraProvider>
      </HashRouter>
  </React.StrictMode>,
)
