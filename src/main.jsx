import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ChakraProvider} from "@chakra-ui/react";
import theme from "./theme.jsx";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <ChakraProvider theme={theme}>
              <App/>
          </ChakraProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
