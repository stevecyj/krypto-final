import { extendTheme } from '@chakra-ui/react';
import colors from './color.js';

const customTheme = {
  colors,
};
const theme = extendTheme(customTheme);

export default theme;
