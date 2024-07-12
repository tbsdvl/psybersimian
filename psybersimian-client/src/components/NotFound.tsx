import { useState, useEffect } from 'react';

export const NotFound = () => {
    const [dots, setDots] = useState('');

    const animateDots = async () => {
        setTimeout(() => {
            if (dots.length === 3) {
                setDots('');
                return;
            } else if (dots.length < 3) {
                setDots(dots + ".");
                return;
            }
        }, 1000);
    }

    useEffect(() => {
        (async () => {
            animateDots();
        })();
    }, [dots]);
    return (
        <div className="w-screen flex flex-col justify-center">
            <p className='glow dot align-center text-center animate-pulse relative shadow-md'>
                ERROR
            </p>
            <div className='flex flex-row justify-center text-ivory text-6xl align-center text-center relative p-5'>
                Something is missing{<p className='animate-repeatFade'>{dots}</p>}
            </div>
        </div>
    );
}