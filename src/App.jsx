import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// Components
import Button from './components/button/button';
import MainNav from './components/main-nav/main-nav';

// Icons
import { UserIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Spotlight from './components/spotlight/spotlight';
import Filters from './components/filters/filters';
import Footer from './components/footer/footer';
import Results from './components/results/results';
import CreateAd from './components/create-ad/create-ad';





function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <header className="bg-white border-b border-cherry-200 p-5">
        <div className="container mx-auto header-elements flex justify-between items-center">
          <div className="logo">
            <span className="font-bold text-cherry-900 text-2xl">VA</span>
          </div>
          <MainNav />
        </div>
      </header>
     
      <Spotlight />
      <CreateAd/>
      <Filters />
      <Results/>

      {/* <div className="container mx-auto bg-white p-5 mt-10 rounded-lg shadow-sm">
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
          <Button variant="secondary" iconDirection="left" Icon={UserIcon}>Icon left</Button>
          <Button variant="primary" iconDirection="left" Icon={UserIcon}>Icon left</Button>
          <Button variant="tertiary" iconDirection="left" Icon={UserIcon}>Icon left</Button>
          <Button variant="text" iconDirection="left" Icon={UserIcon}>Icon left</Button>
          <Button size="l" iconDirection="left" Icon={UserIcon}>Icon left</Button>
          <Button iconDirection="right" Icon={UserIcon}>Icon right</Button>
        </div>


      </div> */}


      <Footer />

    </>
  )
}

export default App
