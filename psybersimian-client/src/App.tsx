import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import './App.css';

export const App = () => {
  const [count, setCount] = useState(0);
  const [tagLine, setTagLine] = useState('');
  const baseTagLine = 'No more monkey business';

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
        <h1 className="libre-barcode-39-text-regular text-blush-red text-5xl text-center">Psybersimian</h1>
        <p className="press-start-2p-regular text-nowrap text-sm text-ivory text-center z-50 mt-5 absolute ms-5 me-5 lg:text-4xl md:text-wrap">{tagLine}</p>
        <Hero />
        <p className="ibm-plex-sans-regular text-5xl text-ivory text-center">Coming soon...</p>
      </div>
    </>
  );
}