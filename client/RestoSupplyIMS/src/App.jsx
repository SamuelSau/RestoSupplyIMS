import { useState } from 'react'
import './App.css'
import UserAuthentication from './components/UserAuthentication';
/*
import components
*/

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <UserAuthentication/>
    </div>
  )
}

export default App
