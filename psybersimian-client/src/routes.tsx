import { App } from './App';
import { Home } from './components/Home';
// import NotFoundPage from './components/NotFoundPage';

// import home page
// import not found page

export const routes = [
    {
      path: "/",
      element: <App component={<Home />} />,
    },
    // {
    //   path: 'error',
    //   element: <App component={<NotFoundPage />} />
    // },
    // {
    //   path: '*',
    //   element: <App component={<NotFoundPage />} />
    // }
];