import DefaultLayout from '@/layouts/Default.jsx';
import IndexPage from '@/pages/IndexPage.tsx';
import MintTokenPage from '@/pages/MintTokenPage.tsx';
import MintNftPage from '@/pages/MintNftPage.tsx';
import AirdropPage from '@/pages/AirdropPage.tsx';
import ProposalPage from '@/pages/Proposal.jsx';
import CouncilPage from '@/pages/CouncilPage.jsx';
import TreasuryPage from '@/pages/TreasuryPage.jsx';
import MasterTreasuryPage from '@/pages/MasterTreasuryPage.jsx';
import InvestingDashBoard from '@/pages/InvestingDashboard.tsx';
import AboutUsPage from '@/pages/AboutUsPage.tsx';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';

const router = createHashRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <Navigate to='index' replace />,
      },
      {
        path: 'index',
        element: <IndexPage />,
      },
      {
        path: 'mint-token',
        element: <MintTokenPage />,
      },
      {
        path: 'mint-nft',
        element: <MintNftPage />,
      },
      {
        path: 'airdrop',
        element: <AirdropPage />,
      },
      {
        path: 'proposal',
        element: <ProposalPage />,
      },
      {
        path: 'council',
        element: <CouncilPage />,
      },
      {
        path: 'treasury',
        element: <TreasuryPage />,
      },
      {
        path: 'master_treasury',
        element: <MasterTreasuryPage />,
      },
      {
        path: 'investing-dashboard',
        element: <InvestingDashBoard />,
      },
      {
        path: 'about-us',
        element: <AboutUsPage />,
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
