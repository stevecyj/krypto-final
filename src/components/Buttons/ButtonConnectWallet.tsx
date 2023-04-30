import { Box, useColorModeValue } from '@chakra-ui/react';
import { ConnectWallet } from '@thirdweb-dev/react';
import './ButtonConnectWallet.scss';

export default function ClickMe() {
  return (
    <Box
      bg={useColorModeValue('black', 'red.900')}
      color={'white'}
      rounded={'12px'}
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
      borderColor={useColorModeValue('gray.500', 'gray.300')}
      borderWidth='3px'
      borderStyle='solid'
    >
      <ConnectWallet className={'wallet'} btnTitle='連接錢包' />
    </Box>
  );
}
