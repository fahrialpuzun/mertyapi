import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App initialPath={root.dataset.prerendered ? window.location.pathname : undefined} />
  </StrictMode>
)

if (root.dataset.prerendered) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
