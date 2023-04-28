import { extendTheme } from '@chakra-ui/react';
import colors from './color.ts';

const customTheme = {
  colors,
};
const theme = extendTheme(customTheme);

export default theme;
