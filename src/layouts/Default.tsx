import { Box } from '@chakra-ui/react';
import Navbar from '@/components/Navbar.tsx';

const DefaultLayout = () => {
  return (
    <Box w='100%'>
      <Navbar></Navbar>;
    </Box>
  );
};

export default DefaultLayout;
