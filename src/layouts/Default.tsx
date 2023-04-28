import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar.tsx';
import Footer from '@/components/Footer.tsx';

const DefaultLayout = () => {
  return (
    <Box w='100%' minH='100vh'>
      <Box w={{ lg: '100%' }}>
        <Navbar />
      </Box>
      <Box flexGrow={1} justifyContent='center'>
        <Outlet />
      </Box>
      <Box w={{ lg: '100%' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default DefaultLayout;
