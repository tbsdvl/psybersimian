import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import './App.css';
import { Header } from './components/Header';

export const App = () => {
  const [count, setCount] = useState(0);
  const [tagLine, setTagLine] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const baseTagLine = 'No more monkey business.';

  const buildTagLine = async () => {
    setTimeout(() => {
      setTagLine(tagLine + baseTagLine[count]);
      setCount(count + 1);
    }, 40);
  }

  const changeTagLine = async () => {
    setTimeout(() => {
      if (tagLine.endsWith("|")) {
        setTagLine(baseTagLine);
        return;
      } else if (tagLine.length === baseTagLine.length) {
        setTagLine(baseTagLine + "|");
        return;
      }
    }, 700);
  }

  useEffect(() => {
    (async () => {
      if (count === baseTagLine.length) {
        await changeTagLine();
        return;
      } else {
        await buildTagLine();
      }
    })();
  }, [tagLine]);

  return (
    <>
      <div>
        <Header />
        <p className="press-start-2p-regular text-nowrap text-sm text-ivory text-center z-50 mt-44 absolute ms-5 md:text-2xl lg:text-4xl md:text-wrap md:ms-9">{tagLine}</p>
        { count === baseTagLine.length ? <p className="ibm-plex-sans-regular text-balance text-xl text-ivory text-center z-50 mt-72 absolute ms-3 animate-fade md:text-5xl lg:text-7xl md:text-wrap">Crafting tailored software solutions propelling business growth and efficiency.</p> : null }
        <Hero isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
        <section className="bg-ivory">
          <p className="ibm-plex-sans-regular text-5xl text-midnight-black text-center h-screen">Coming soon...</p>
        </section>
        <section className="bg-lamplight-yellow">
          <p className="ibm-plex-sans-regular text-5xl text-midnight-black text-center h-screen">Coming soon...</p>
        </section>
        <section className="bg-honeysuckle">
          <p className="ibm-plex-sans-regular text-5xl text-ivory text-center h-screen">Coming soon...</p>
        </section>
      </div>
    </>
  );
}