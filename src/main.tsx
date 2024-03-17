import { App } from './app'
import { createRoot } from 'react-dom/client'

const domNode = document.getElementById('root')!
createRoot(domNode).render(<App />)
