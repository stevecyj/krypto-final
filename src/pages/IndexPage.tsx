import { Box, Button, Container, Heading, Image, Stack, Text, Link } from '@chakra-ui/react';
import { Link as RouterDomLink } from 'react-router-dom';
import trendBg from '@/assets/trend.png';

const IndexPage = () => (
  <Box bg='bg-surface'>
    <Container py={{ base: '16', md: '24' }} maxW={'container.lg'}>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '12', lg: '16' }}>
        <Stack spacing={{ base: '8', md: '10' }} width='full' justify='center'>
          <Stack spacing={{ base: '4', md: '6' }}>
            <Heading size={{ base: 'sm', md: 'lg' }}>Web3.0 + Fund + DAO</Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} color='muted'>
              Trend DAO is a decentralized fund where investors can participate in future
              profit-sharing by purchasing Trend Tokens or Trend Master NFTs.
            </Text>
          </Stack>
          <Stack direction={{ base: 'column-reverse', md: 'row' }} spacing='3'>
            <Button variant='secondary' size='lg'>
              <Link as={RouterDomLink} to='/mint-token'>
                Your Token
              </Link>
            </Button>

            <Button variant='primary' size='lg'>
              <Link as={RouterDomLink} to='/mint-nft'>
                Your NFT
              </Link>
            </Button>
          </Stack>
        </Stack>
        <Image width='full' height={{ base: 'auto', md: 'lg' }} objectFit='cover' src={trendBg} />
      </Stack>
    </Container>
  </Box>
);
export default IndexPage;
