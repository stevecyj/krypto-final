import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/react';
import { tabsAnatomy } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  tabsAnatomy.keys,
);
export default function StatsGridWithImage() {
  return (
    <Box bg={''} position={'relative'}>
      <Container maxW={'7xl'} zIndex={0} position={'relative'}>
        123
      </Container>
    </Box>
  );
}
