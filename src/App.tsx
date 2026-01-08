import { useState } from "react"
import Answer from "./components/Answer"
import Inputs from "./components/Inputs"

function App() {
  const [result, setResult] = useState({ years: null, months: null, days: null })

  return (
    <main className='main'>
      <div className="main-card">
        <Inputs setResult={setResult} />
        <Answer result={result} />
      </div>
   </main>
  )
}

export default App
