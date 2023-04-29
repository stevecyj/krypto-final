import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar.tsx';
import Footer from '@/components/Footer.tsx';

const DefaultLayout = () => {
  return (
    <Box w='100%' minH='100vh' display={'flex'} flexDirection={'column'}>
      <Box w={{ lg: '100%' }}>
        <Navbar />
      </Box>
      <Box justifyContent='center' flexGrow={1}>
        <Outlet />
      </Box>
      <Box w={{ lg: '100%' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default DefaultLayout;
