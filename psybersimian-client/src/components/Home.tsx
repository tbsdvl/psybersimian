import { useState, useEffect } from 'react';
import { Hero } from './Hero';
import { Section } from './Section';
import { Paragraph } from './Paragraph';
import { Card } from './Card';

export const Home = () => {
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
      <div id="home">
        <p className="press-start-2p-regular text-nowrap text-sm text-ivory text-center z-20 mt-44 absolute ms-5 md:text-2xl lg:text-4xl md:text-wrap md:ms-9">{tagLine}</p>
        { count === baseTagLine.length ? <p className="ibm-plex-sans-regular text-balance text-xl text-ivory text-center z-20 mt-72 absolute ms-3 animate-fade md:text-5xl lg:text-7xl md:text-wrap">Crafting tailored software solutions to propel business growth and efficiency.</p> : null }
        <Hero isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
        <Section style={"bg-ivory"}>
          <Card>
            <Paragraph textStyle={"ibm-plex-sans-regular text-5xl text-midnight-black text-center h-screen"} text={'Coming soon...'}/>
          </Card>
        </Section>
        <Section style={"bg-lamplight-yellow"}>
          <Paragraph textStyle={"ibm-plex-sans-regular text-5xl text-midnight-black text-center h-screen"} text={'Coming soon...'}/>
        </Section>
        <Section style={"bg-honeysuckle"}>
          <Paragraph textStyle={"ibm-plex-sans-regular text-5xl text-ivory text-center h-screen"} text={'Coming soon...'}/>
        </Section>
      </div>
    </>
  );
}