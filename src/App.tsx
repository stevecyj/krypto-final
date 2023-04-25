import DefaultLayout from '@/layouts/Default.tsx';
import MintTokenPage from '@/pages/MintTokenPage.tsx';
import MintNftPage from '@/pages/MintNftPage.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: 'mint-token',
        element: <MintTokenPage />,
      },
      {
        path: 'mint-nft',
        element: <MintNftPage />,
      },
    ],
  },
]);
function App() {
  console.log(123);
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
