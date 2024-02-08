import { createRoot } from 'react-dom/client'
import { App } from './app'

const domNode = document.getElementById('root')!
createRoot(domNode).render(<App />)
