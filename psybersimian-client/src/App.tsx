import './App.css';
import { Header } from './components/Header';

export const App = ({ component }: { component: JSX.Element }) => {
  return (
    <>
      <div>
        <Header />
        {component}
        <div className='bg-midnight-black absolute w-full'>
            <footer className='flex flex-row justify-center text-ivory'>
                <p className="text-base font-bold m-2">6151 W. Calle Bilboa Tucson, AZ 85742</p>
                <a href='tel:5204053987' className='m-2'>520-405-3987</a>
                <p className="m-2">Copyright 2024 Psybersimian L.L.C.</p>
            </footer>
        </div>
      </div>
    </>
  );
}