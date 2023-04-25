import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar.tsx';
import Footer from '@/components/Footer.tsx';

const DefaultLayout = () => {
  return (
    <Flex w='100%' minH='100vh' direction={{ lg: 'column' }}>
      <Box w={{ lg: '100%' }}>
        <Navbar />
      </Box>
      <Box flexGrow={1} justifyContent='center'>
        <Outlet />
      </Box>
      <Box w={{ lg: '100%' }}>
        <Footer />
      </Box>
    </Flex>
  );
};

export default DefaultLayout;
