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
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useContract, useContractRead, Web3Button, useAddress } from '@thirdweb-dev/react';
import { useState } from 'react';
import * as TREND_ADDRESS from '@/const/contractAddress';
import * as TRENT_PRICE from '@/const/price';
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
  const [mintAmount, setMintAmount] = useState(1);
  // get contract
  const { contract: BUYACOFFEE_CONTRACT } = useContract(TREND_ADDRESS.BUYACOFFEE_ADDRESS);
  // const { contract: ERC20_CONTRACT } = useContract(TREND_ADDRESS.ERC20_ADDRESS);

  // method getTotalCoffee in contract
  const { data: totalCoffee, isLoading: loadingTotalCoffee } = useContractRead(
    BUYACOFFEE_CONTRACT,
    'getTotalCoffee',
  );

  const address = useAddress();
  console.log(address);

  // const { data: totalSupply, isLoading: loadingMint } = useContractRead(
  //   ERC20_CONTRACT,
  //   'getTotalSupply',
  // );

  // toast
  const toast = useToast();


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
            <Box>
              <Box
                borderRadius='12px'
                borderColor={useColorModeValue('green.600', 'green.300')}
                borderWidth='4px'
                borderStyle='solid'
              >
                <Web3Button
                  contractAddress={TREND_ADDRESS.BUYACOFFEE_ADDRESS}
                  action={async () => {
                    await BUYACOFFEE_CONTRACT!.call('buyCoffee', ['', ''], {
                      // here use string
                      value: ethers.utils.parseEther(TRENT_PRICE.COFFEE_PRICE),
                    });
                  }}
                  onSuccess={() => {
                    toast({
                      title: '謝謝惠顧',
                      status: 'success',
                      position: 'top',
                      duration: 2000,
                      isClosable: true,
                    });
                  }}
                  onError={(error) => {
                    toast({
                      title: error.message,
                      status: 'error',
                      position: 'top',
                      duration: 2000,
                      isClosable: true,
                    });
                  }}
                >
                  買一杯咖啡
                </Web3Button>
              </Box>

              <Flex>
                <Text>Total Coffee：</Text>
                <Skeleton w={'20px'} isLoaded={!loadingTotalCoffee}>
                  {totalCoffee?.toString()}
                </Skeleton>
              </Flex>
            </Box>
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
