import { Box, Flex } from '@chakra-ui/react';
import Navbar from '@/components/Navbar.tsx';
import Footer from '@/components/Footer.tsx';

const DefaultLayout = () => {
  return (
    <Flex w='100%' minH='100vh' direction={{ lg: 'column' }}>
      <Box w={{ lg: '100%' }}>
        <Navbar />
      </Box>
      <Box flexGrow={1}></Box>
      <Box w={{ lg: '100%' }}>
        <Footer />
      </Box>
    </Flex>
  );
};

export default DefaultLayout;
