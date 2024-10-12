import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)

  const [datausers, setDatausers] = useState(null)
  const [data, setData] = useState(null)

  const fetchUsers = async () => {
    const responseu = await axios.get("http://localhost:3001/getUsers")
    // console.log(responseu.data)
    setDatausers(responseu.data)
  };

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:3001/api")
    // console.log(response.data)
    setData(response.data.message)
  };

  useEffect(() =>{
    fetchAPI();
    fetchUsers();
  }, [])

  return (
    <>
      <div>
        {datausers ? datausers.map((item, i) => {
            return (
              <div  key={i}>
                <span>{item.name + " : "}</span>
                <span>{item.age + " : "}</span>
                <span>{item.pass}</span>
              </div>
            )}) : <p>Loading...</p>
        }
        <div>
          {data ? <p>{data}</p> : <p>Loading...</p>}
        </div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
