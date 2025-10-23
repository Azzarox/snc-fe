import { useEffect, useState } from 'react';
import reactLogo from '@/assets/react.svg';
import viteLogo from '/vite.svg';

import './App.css';
import { Button } from '@shadcn/components/ui/button';
import { ThemeToggle } from './components/common/ThemeToggle';
import Home from './components/Layout/Home';

function App() {
    const [count, setCount] = useState(0);
    const [msg, setMsg] = useState('')
    // useEffect(() => {
    //     fetch('/@api/hello').then(res => res.json()).then(res => setMsg(res.msg)).catch((err) => console.error('something went wrong'))
    // }, []) 

    return (
        <>
            {/* <div className="flex min-h-svh flex-col items-center justify-center">
                <div className='flex flex-row gap-x-2 items-center justify-center'>
                    <ThemeToggle />
                    <Button className='cursor-pointer'>Click me</Button>
                </div>
            </div> */}
            <Home/>
        </>
    );
}

export default App;
