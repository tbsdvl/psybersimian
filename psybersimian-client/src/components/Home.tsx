import { useState, useEffect } from 'react';
import { Hero } from './Hero';
import { Section } from './Section';
import { Card } from './Card';
import { Aperture, Building2, BriefcaseBusiness } from 'lucide-react';
import { Paragraph } from './Paragraph';
import developer from '../assets/4707122.jpg';

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
        <Section style={"bg-ivory h-screen"}>
          <Card animationStyle={"card box-border h-6/12 w-3/4 p-4 shadow-lg m-10 shadow-black invisible"}>
            <h2 className="ibm-plex-sans-regular text-2xl text-midnight-black text-center mt-2 lg:text-5xl">Applications</h2>
            <div className="flex flex-col text-start ms-10 p-5 justify-around">
              <div className='flex flex-row'>
                <Building2 className='me-10 lg:mt-2' />
                <h3 className='text-sm lg:text-3xl'>Small Business</h3>
              </div>
              <Paragraph textStyle={"ibm-plex-sans-regular text-xs text-midnight-black text-start mt-2 lg:text-xl"} text={'Our products fulfill diverse needs of small businesses by delivering professional, high-quality, and dependable systems. Our team specializes in developing e-commerce, informational, and service-based applications, so small businesses quickly establish an online presence.'}/>
            </div>
            <div className="flex flex-col text-start ms-10 p-5 justify-around">
              <div className='flex flex-row'>
                <BriefcaseBusiness  className='me-10 lg:mt-2' />
                <h3 className='text-sm lg:text-3xl'>Enterprise</h3>
              </div>
              <Paragraph textStyle={"ibm-plex-sans-regular text-xs text-midnight-black text-start mt-2 lg:text-xl"} text={'We have experience with developing maintainable, long-lasting enterprise level solutions in the corporate community management and HOA industries.'}/>
            </div>
            <div className="flex flex-col text-start ms-10 p-5 justify-around">
              <div className='flex flex-row'>
                <Aperture className='me-10 lg:mt-2' />
                <h3 className='text-sm lg:text-3xl'>Government</h3>
              </div>
              <Paragraph textStyle={"ibm-plex-sans-regular text-xs text-midnight-black text-start mt-2 lg:text-xl"} text={'Government agencies collaborate with our expert team to deliver solutions on time and within budget, enhancing users digital government experience.'}/>
            </div>
          </Card>
        </Section>
        <Section style={"bg-lamplight-yellow h-screen"}>
          <Card animationStyle={"card box-border h-6/12 w-3/4 p-4 shadow-lg m-10 shadow-black"}>
            <h2 className="ibm-plex-sans-regular text-5xl text-midnight-black text-center mt-2">Our Team</h2>
            <div className="flex flex-row justify-center">
              <img className='h-1/3 w-1/3 box-border shadow-md shadow-black rounded-xl mt-10 lg:mt-3' src={developer} />
              <Paragraph textStyle={"ibm-plex-sans-regular text-sm text-midnight-black text-start mt-5 ms-10 p-5 lg:text-3xl"} text={'Our team comprises a number of talented, well-rounded engineers with solid reputations across multiple public and private sector organizations. We work diligently with our customers so that satisfaction is guaranteed upon product delivery.'}/>
            </div>
          </Card>
        </Section>
        <Section style={"bg-honeysuckle h-screen"}>
          <Card animationStyle={"card box-border h-6/12 w-3/4 p-4 shadow-lg m-10 shadow-black items-center"}>
            <h2 className="ibm-plex-sans-regular text-5xl text-midnight-black text-center mt-10">Contact</h2>
            <div className="flex flex-col justify-center items-center">
              <Paragraph textStyle={"ibm-plex-sans-regular text-md text-midnight-black text-start ms-10 p-10 lg:text-3xl"} text={'Interested in working with our team? Send us an email or give us a call!'}/>
              <a href="mailto:info@psybersimian.com"><p className='p-5 lg:text-3xl'>Email</p></a>
              <a href="tel:+5204053987"><p className='lg:text-3xl'>Phone</p></a>
            </div>
          </Card>
        </Section>
      </div>
    </>
  );
}