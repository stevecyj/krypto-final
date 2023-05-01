import { Button, ButtonProps, useColorMode } from '@chakra-ui/react';
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme-context';

export default function ColorModeToggle(props: ButtonProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  const { theme, setTheme } = useContext(ThemeContext);
  // const handleThemeChange = () => {
  //   const isCurrentDark = theme === 'dark';
  //   setTheme(isCurrentDark ? 'light' : 'dark');
  // };

  return (
    /**
     * Ideally, only the button component should be used (without Flex).
     * Props compatible with <Button /> are supported.
     */
    <Button
      aria-label='Toggle Color Mode'
      onClick={toggleColorMode}
      _focus={{ boxShadow: 'none' }}
      w='fit-content'
      {...props}
    >
      {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
    </Button>
  );
}
