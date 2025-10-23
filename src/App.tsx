import { useEffect, useState } from 'react';
import reactLogo from '@/assets/react.svg';
import viteLogo from '/vite.svg';

import './App.css';
import { Button } from '@shadcn/components/ui/button';

function App() {
    const [count, setCount] = useState(0);
    const [msg, setMsg] = useState('')
    // useEffect(() => {
    //     fetch('/@api/hello').then(res => res.json()).then(res => setMsg(res.msg)).catch((err) => console.error('something went wrong'))
    // }, []) 

    return (
        <>
            <div className="flex min-h-svh flex-col items-center justify-center">
                <Button className='text-red-500'>Click me</Button>
            </div>
        </>
    );
}

export default App;
