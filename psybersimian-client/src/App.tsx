import './App.css';
import { Header } from './components/Header';

export const App = ({ component }: { component: JSX.Element }) => {
  return (
    <>
      <div>
        <Header />
        {component}
      </div>
    </>
  );
}