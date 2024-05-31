import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// Icons
import { UserIcon } from "@heroicons/react/24/outline";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <header className=" bg-cherry-100 border-b border-cherry-200 p-5">
        <div className="container mx-auto header-elements flex justify-between items-center">
          <div className="logo">
            <span className="font-bold text-cherry-900 text-2xl">Voksen Annoncer</span>
          </div>
          <nav>
            <ul className="flex gap-6 items-center">
              <li><a className="text-cherry-900 hover:text-cherry-600 font-bold" href="/">Ads</a></li>
              <li><a className="text-cherry-900 hover:text-cherry-600 font-bold" href="/">Klinikker</a></li>
              <li><a className="text-cherry-900 hover:text-cherry-600 font-bold" href="/">Websites</a></li>
              <li><a className="text-cherry-900 hover:text-cherry-600 font-bold" href="/">Support</a></li>
              <li>
                <button className="px-4 py-2 hover:bg-cherry-900 hover:text-cherry-200 bg-cherry-950 text-cherry-400  rounded-lg flex justify-items-center items-center">
                  <UserIcon className="size-5 text-cherry-500 " />
                  <span class="ml-2">Login</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="container mx-auto bg-cherry-200">
        <h1 className="text-cherry-500">Vite + React</h1>
        <h2 className="text-sky-600">Test</h2>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>

        </div>
      </div>



    </>
  )
}

export default App
