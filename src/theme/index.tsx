import { extendTheme } from '@chakra-ui/react';
import { tabsTheme } from './components/Tabs';

const theme = extendTheme({
  components: {
    Tabs: tabsTheme,
  },
});

export default theme;
