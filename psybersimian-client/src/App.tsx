import './App.css';

export const App = ({ component }: { component: JSX.Element }) => {
  return (
    <>
      <div>
        {component}
      </div>
    </>
  );
}