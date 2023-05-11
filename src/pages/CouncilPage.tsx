import {
  ChakraProvider,
  Flex,
  SimpleGrid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import theme from '@/theme';
import { ColorModeSwitcher } from '@/theme/ColorModeSwitcher';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex justifyContent={'center'} position='relative' h='100vh' p={12}>
        <SimpleGrid columns={[1, 1, 1, 2]} spacing={12}>
          <GridItem>
            <Tabs>
              <TabList>
                <Tab>One</Tab>
                <Tab>Two</Tab>
                <Tab>Three</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>New default appearance defined by theme</p>
                </TabPanel>
                <TabPanel>
                  <p>Tab panel two</p>
                </TabPanel>
                <TabPanel>
                  <p>Tab panel three</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
        </SimpleGrid>
        <ColorModeSwitcher />
      </Flex>
    </ChakraProvider>
  );
}
