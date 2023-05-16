import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import theme from '../theme/theme.js';
import App from './App.jsx';
//import { Sepolia } from "@thirdweb-dev/chains";

const activeChain = 'goerli';
ReactDOM.createRoot(document.getElementById('root') ).render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={ activeChain }>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ThirdwebProvider>
  </React.StrictMode>,
);
