import { App } from './App';
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';

// import home page
// import not found page

export const routes = [
    {
      path: "/",
      element: <App component={<Home />} />,
    },
    {
      path: 'error',
      element: <App component={<NotFound />} />
    },
    {
      path: '*',
      element: <App component={<NotFound />} />
    }
];