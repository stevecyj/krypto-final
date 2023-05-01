import {
  Box,
  VStack,
  Button,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
  Text,
  Skeleton,
} from '@chakra-ui/react';
import {} from '@chakra-ui/react';
import { useContract, useContractRead, Web3Button } from '@thirdweb-dev/react';
import * as TRENDADDRESS from '@/const/contractAddress';
import { ethers } from 'ethers';
import './MintTokenPage.scss';

interface FeatureProps {
  heading: string;
  text: string;
}

const Feature = ({ heading, text }: FeatureProps) => {
  return (
    <GridItem>
      <chakra.h3 fontSize='xl' fontWeight='600'>
        {heading}
      </chakra.h3>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  );
};

export default function GridListWithCTA() {
  // get contract
  const { contract: BUYACOFFEE_CONTRACT } = useContract(TRENDADDRESS.BUYACOFFEE_ADDRESS);
  const { contract: ERC20_CONTRACT } = useContract(TRENDADDRESS.ERC20_ADDRESS);

  // method getTotalCoffee in contract
  const { data: totalCoffee, isLoading: loadingTotalCoffee } = useContractRead(
    BUYACOFFEE_CONTRACT,
    'getTotalCoffee',
  );

  // const { data: totalSupply, isLoading: loadingMint } = useContractRead(
  //   ERC20_CONTRACT,
  //   'getTotalSupply',
  // );

  return (
    <Box as={Container} maxW='7xl' mt={14} p={4}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        gap={4}
      >
        <GridItem colSpan={1}>
          <VStack alignItems='flex-start' spacing='20px'>
            <chakra.h2 fontSize='3xl' fontWeight='700'>
              Medium length title
            </chakra.h2>
            <Button colorScheme='green' size='md'>
              Call To Action
            </Button>
            <Web3Button
              contractAddress={TRENDADDRESS.BUYACOFFEE_ADDRESS}
              action={async () => {
                await ERC20_CONTRACT!.call('publicMint', [1], {
                  // here use string
                  value: ethers.utils.parseEther('0.00001'),
                });
              }}
              onSuccess={() => {
                alert('buying coffee success');
              }}
              onError={(error) => {
                alert(error);
              }}
            >
              買一杯咖啡
            </Web3Button>
            <Flex>
              <Text>Total Coffee：</Text>
              <Skeleton w={'20px'} isLoaded={!loadingTotalCoffee}>
                {totalCoffee?.toString()}
              </Skeleton>
            </Flex>
            {/*<Flex>*/}
            {/*  <Text>Total Supply：</Text>*/}
            {/*  <Skeleton w={'20px'} isLoaded={!loadingMint}>*/}
            {/*    {totalSupply?.toString()}*/}
            {/*  </Skeleton>*/}
            {/*</Flex>*/}
          </VStack>
        </GridItem>
        <GridItem>
          <Flex>
            <chakra.p>
              Provide your customers a story they would enjoy keeping in mind the objectives of your
              website. Pay special attention to the tone of voice.
            </chakra.p>
          </Flex>
        </GridItem>
      </Grid>
      <Divider mt={12} mb={12} />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        gap={{ base: '8', sm: '12', md: '16' }}
      >
        <Feature
          heading={'First Feature'}
          text={'Short text describing one of you features/service'}
        />
        <Feature
          heading={'Second Feature'}
          text={'Short text describing one of you features/service'}
        />
        <Feature
          heading={'Third Feature'}
          text={'Short text describing one of you features/service'}
        />
        <Feature
          heading={'Fourth Feature'}
          text={'Short text describing one of you features/service'}
        />
      </Grid>
    </Box>
  );
}
