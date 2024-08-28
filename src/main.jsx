{import('tailwindcss').defineConfig}
import ReactDom from 'react-dom/client'
import Root from './router/index.jsx'
import './index.css'


ReactDom.createRoot(document.getElementById('root')).render(
  <Root />
)
