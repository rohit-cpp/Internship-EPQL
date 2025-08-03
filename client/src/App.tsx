import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      
      <div>
         <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
      </div>
   </div>
  )
}

export default App
