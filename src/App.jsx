import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// Buttons
import Button from './components/button/Button';

// Icons
import { UserIcon } from "@heroicons/react/24/outline";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <header className="bg-white border-b border-cherry-200 p-5">
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
                <Button >
                  <UserIcon className="size-5 text-cherry-500 " />
                  Login
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="container mx-auto bg-white p-5 mt-10 rounded-lg shadow-sm">
        <div className="flex gap-5 my-5 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="text" href="/">Text</Button>
        </div>

        <div className="flex gap-5 my-5 items-center">
          <Button size="s">Small</Button>
          <Button size="m">Medium</Button>
          <Button size="l">Large</Button>
        </div>
        <div className="flex gap-5 my-5 items-center">
          <Button iconDirection="left" Icon={UserIcon}>Icon left</Button>
          <Button size="s" iconDirection="left" Icon={UserIcon}>Icon left</Button>
          <Button variant="secondary"  iconDirection="left" Icon={UserIcon}>Icon left</Button>
          <Button variant="primary"  iconDirection="left" Icon={UserIcon}>Icon left</Button>
          <Button variant="tertiary"  iconDirection="left" Icon={UserIcon}>Icon left</Button>
          <Button variant="text"  iconDirection="left" Icon={UserIcon}>Icon left</Button>
          <Button size="l" iconDirection="left" Icon={UserIcon}>Icon left</Button>
          <Button iconDirection="right" Icon={UserIcon}>Icon right</Button>
        </div>


      </div>




    </>
  )
}

export default App
