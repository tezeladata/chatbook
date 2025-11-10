import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router"
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { PostProvider } from './context/PostContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </AuthProvider>
  </BrowserRouter>
)
