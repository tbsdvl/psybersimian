import { Hero } from './components/Hero';
import './App.css';

export const App = () => {
  return (
    <>
      <div>
        <h1 className="libre-barcode-39-text-regular text-blush-red text-4xl text-center">Psybersimian</h1>
        <Hero />
        <p className="ibm-plex-sans-regular text-5xl text-ivory text-center">Coming soon...</p>
      </div>
    </>
  );
}