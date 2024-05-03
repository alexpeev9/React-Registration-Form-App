import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import App from './App'
import ThemeSwitch from './components/ThemeSwitch'

import './assets/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <App />
      <ThemeSwitch />
    </ChakraProvider>
  </StrictMode>
)
