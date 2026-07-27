import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { FavoritesProvider } from "./context/FavoritesContext.jsx"
import { WatchedProvider } from './context/WatchedContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <FavoritesProvider>
      <WatchedProvider>
       <App />
       </WatchedProvider>
    </FavoritesProvider>
     
    </BrowserRouter>
  </StrictMode>,
)
