import { Button, ButtonProps, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';

function randomColor() {
  return Math.floor(Math.random() * 5);
}

const colorList: string[] = ['#E53E3E', '#38A169', '#00B5D8', '#44337A', '#ED64A6'];

export default function ClickMe(props: ButtonProps) {
  const [colorCode, setColorCode] = useState(colorList[randomColor()]);

  return (
    <Button
      {...props}
      px={8}
      bg={useColorModeValue('#151f21', 'red.900')}
      color={'white'}
      rounded={'md'}
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
      onClick={() => setColorCode(colorList[randomColor()])}
    >
      Connect Wallet
    </Button>
  );
}
