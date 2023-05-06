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
  Input,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useContract, useContractRead, Web3Button, useAddress } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import * as TREND_ADDRESS from '@/const/contractAddress';
import * as TREND_PRICE from '@/const/price';
import { ethers } from 'ethers';
import './MintTokenPage.scss';

// interface FeatureProps {
//   heading: string;
//   text: string;
// }

// const Feature = ({ heading, text }: FeatureProps) => {
//   return (
//     <GridItem>
//       <chakra.h3 fontSize='xl' fontWeight='600'>
//         {heading}
//       </chakra.h3>
//       <chakra.p>{text}</chakra.p>
//     </GridItem>
//   );
// };

export default function GridListWithCTA() {
  const address = useAddress();
  const [mintAmount, setMintAmount] = useState(1);
  // @ts-ignore
  const [totalPrice, setTotalPrice] = useState(ethers.utils.parseEther('1'));

  // display
  const [balanceOfDisplay, setBalanceOfDisplay] = useState('0');
  const [maxSupplyDisplay, setMaxSupplyDisplay] = useState('0');
  const [totalSupplyDisplay, setTotalSupplyDisplay] = useState('0');
  const [stakingTotalSupplyDisplay, setStakingTotalSupplyDisplay] = useState('0');
  const [stakingBalanceOfDisplay, setStakingBalanceOfDisplay] = useState('0');

  // get contract
  // const { contract: BUYACOFFEE_CONTRACT } = useContract(TREND_ADDRESS.BUYACOFFEE_ADDRESS);
  const { contract: ERC20_CONTRACT } = useContract(TREND_ADDRESS.ERC20_ADDRESS);
  const { contract: TOKEN_STAKE_CONTRACT } = useContract(TREND_ADDRESS.TOKEN_STAKE_ADDRESS);

  // read contract
  // const { data: totalCoffee, isLoading: loadingTotalCoffee } = useContractRead(
  //   BUYACOFFEE_CONTRACT,
  //   'getTotalCoffee',
  // );

  const { data: maxSupply, isLoading: loadingMaxSupply } = useContractRead(
    ERC20_CONTRACT,
    'maxSupply',
  );

  const { data: totalSupply, isLoading: loadingTotalSupply } = useContractRead(
    ERC20_CONTRACT,
    'totalSupply',
  );

  const { data: balanceOf, isLoading: loadingBalanceOf } = useContractRead(
    ERC20_CONTRACT,
    'balanceOf',
    [address],
  );

  const { data: stakingTotalSupply, isLoading: loadingStakingTotalSupply } = useContractRead(
    TOKEN_STAKE_CONTRACT,
    'totalSupply',
  );

  const { data: stakingBalanceOf, isLoading: loadingStakingBalanceOf } = useContractRead(
    TOKEN_STAKE_CONTRACT,
    'balanceOf',
    [address],
  );

  // test 先看取得內容
  useEffect(() => {
    console.log('ERC20', ERC20_CONTRACT);
  }, [ERC20_CONTRACT]);

  useEffect(() => {
    stakingTotalSupply &&
      console.log(
        'stakingTotalSupply',
        stakingTotalSupply,
        'loadingStakingTotalSupply',
        loadingStakingTotalSupply,
      );
    // @ts-ignore
    setStakingTotalSupplyDisplay((stakingTotalSupply / ethers.utils.parseEther('1')).toString());
    console.log('TOKEN_STAKING_DISPLAY', stakingTotalSupplyDisplay);
  }, [stakingTotalSupply, loadingStakingTotalSupply, stakingTotalSupplyDisplay]);

  useEffect(() => {
    stakingBalanceOf &&
      // @ts-ignore
      setStakingBalanceOfDisplay((stakingBalanceOf / ethers.utils.parseEther('1')).toString());
  }, [stakingBalanceOf, loadingStakingBalanceOf]);

  // transfer to display
  useEffect(() => {
    console.log('balanceOf', balanceOf?.toString());
    // @ts-ignore
    setBalanceOfDisplay((balanceOf / ethers.utils.parseEther('1')).toString());
  }, [balanceOf]);

  useEffect(() => {
    // @ts-ignore
    setMaxSupplyDisplay((maxSupply / ethers.utils.parseEther('1')).toString());
  }, [maxSupply]);

  useEffect(() => {
    // @ts-ignore
    setTotalSupplyDisplay((totalSupply / ethers.utils.parseEther('1')).toString());
  }, [totalSupply]);

  // useEffect(() => {
  //   console.log('totalCoffee', totalCoffee);
  // }, [totalCoffee]);

  // toast
  const toast = useToast();

  // button area
  const buttonBackgroundColor = useColorModeValue('green.600', 'green.300');
  const btnHover = useColorModeValue('red.600', 'red.300');
  const inputBorderColor = useColorModeValue('green.600', 'green.300');
  const buttonBorderColor = useColorModeValue('green.600', 'green.300');
  const textColor = useColorModeValue('green.600', 'green.300');
  const handleDecrement = () => {
    if (mintAmount <= 1) return;

    setMintAmount(mintAmount - 1);
    setTotalPrice(ethers.utils.parseEther((mintAmount - 1).toString()));
  };

  const handleIncrement = () => {
    // if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
    setTotalPrice(ethers.utils.parseEther((mintAmount + 1).toString()));
  };
  // handleInput
  const handleInputChange = (e: any) => {
    // if (mintAmount == 0) {
    //   setMintAmount(1);
    // }
    console.log(mintAmount, e.target.value);
    setMintAmount(Number(e.target.value));
  };
  useEffect(() => {
    if (mintAmount < 1) {
      setMintAmount(1);
    }
    setTotalPrice(ethers.utils.parseEther(mintAmount.toString()));
    console.log('mintAmount', mintAmount);
  }, [mintAmount]);

  return (
    <Box as={Container} maxW='7xl' mt={14} p={4}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        gap={4}
      >
        <GridItem colSpan={1}>
          <VStack alignItems='flex-start' spacing='20px'>
            <chakra.h2 fontSize='3xl' fontWeight='700'>
              Mint Token
            </chakra.h2>
            {/* test area */}
            {/*<Button colorScheme='green' size='md'>*/}
            {/*  Call To Action*/}
            {/*</Button>*/}
            {/*<Box>*/}
            {/*  <Box*/}
            {/*    borderRadius='12px'*/}
            {/*    borderColor={useColorModeValue('green.600', 'green.300')}*/}
            {/*    borderWidth='4px'*/}
            {/*    borderStyle='solid'*/}
            {/*  >*/}
            {/*    <Web3Button*/}
            {/*      contractAddress={TREND_ADDRESS.BUYACOFFEE_ADDRESS}*/}
            {/*      action={async () => {*/}
            {/*        await BUYACOFFEE_CONTRACT!.call('buyCoffee', ['', ''], {*/}
            {/*          // here use string*/}
            {/*          value: ethers.utils.parseEther(TREND_PRICE.COFFEE_PRICE),*/}
            {/*        });*/}
            {/*      }}*/}
            {/*      onSuccess={() => {*/}
            {/*        toast({*/}
            {/*          title: '謝謝惠顧',*/}
            {/*          status: 'success',*/}
            {/*          position: 'top',*/}
            {/*          duration: 2000,*/}
            {/*          isClosable: true,*/}
            {/*        });*/}
            {/*      }}*/}
            {/*      onError={(error) => {*/}
            {/*        toast({*/}
            {/*          title: error.message,*/}
            {/*          status: 'error',*/}
            {/*          position: 'top',*/}
            {/*          duration: 2000,*/}
            {/*          isClosable: true,*/}
            {/*        });*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      買一杯咖啡*/}
            {/*    </Web3Button>*/}
            {/*  </Box>*/}

            {/*  <Flex>*/}
            {/*    <Text>Total Coffee：</Text>*/}
            {/*    <Skeleton w={'20px'} isLoaded={!loadingTotalCoffee}>*/}
            {/*      {totalCoffee?.toString()}*/}
            {/*    </Skeleton>*/}
            {/*  </Flex>*/}
            {/*</Box>*/}

            {/*  mint area */}
            {address ? (
              <Box display='flex' flexDirection='column' alignItems='flex-start'>
                {/* button increase, decrease */}
                <Box display='flex' flexDirection='column' alignItems='center' className='12345'>
                  <Flex align='center' justify='center'>
                    <Button
                      backgroundColor={buttonBackgroundColor}
                      borderRadius='5px'
                      boxShadow='0px 2px 2px 1px #0f0f0f'
                      color='white'
                      cursor='pointer'
                      fontFamily='inherit'
                      padding='15px'
                      marginTop='10px'
                      _hover={{ bg: btnHover }}
                      onClick={handleDecrement}
                    >
                      -
                    </Button>
                    <Input
                      // readOnly
                      borderColor={inputBorderColor}
                      borderWidth='4px'
                      borderStyle='solid'
                      zIndex='-1'
                      fontFamily='inherit'
                      width='100px'
                      height='40px'
                      textAlign='center'
                      paddingLeft='19px'
                      marginTop='10px'
                      type='number'
                      value={mintAmount}
                      onChange={handleInputChange}
                    />
                    <Button
                      backgroundColor={buttonBackgroundColor}
                      borderRadius='5px'
                      boxShadow='0px 2px 2px 1px #0f0f0f'
                      color='white'
                      cursor='pointer'
                      fontFamily='inherit'
                      padding='15px'
                      marginTop='10px'
                      _hover={{ bg: btnHover }}
                      onClick={handleIncrement}
                    >
                      +
                    </Button>
                  </Flex>

                  {/* Token Mint */}
                  <Flex
                    w='fit-content'
                    borderRadius='12px'
                    borderColor={buttonBorderColor}
                    borderWidth='4px'
                    borderStyle='solid'
                  >
                    <Web3Button
                      contractAddress={TREND_ADDRESS.ERC20_ADDRESS}
                      action={async () => {
                        await ERC20_CONTRACT!.call('publicMint', [totalPrice], {
                          value: ethers.utils.parseEther(
                            (mintAmount * TREND_PRICE.TOKEN_PRICE).toString(),
                          ),
                        });
                      }}
                      onSuccess={() => {
                        setMintAmount(1);
                        setTotalPrice(ethers.utils.parseEther('1'));
                        toast({
                          title: 'Mint 成功',
                          status: 'success',
                          position: 'top',
                          duration: 2000,
                          isClosable: true,
                        });
                      }}
                      onError={(error) => {
                        setMintAmount(1);
                        setTotalPrice(ethers.utils.parseEther('1'));
                        toast({
                          title: error.message,
                          status: 'error',
                          position: 'top',
                          duration: 2000,
                          isClosable: true,
                        });
                      }}
                    >
                      Mint Now
                    </Web3Button>
                  </Flex>
                </Box>
              </Box>
            ) : (
              <Text
                marginTop='70px'
                fontSize='30px'
                fontWeight='bold'
                letterSpacing='-5.5%'
                fontFamily='VT323'
                textShadow='0 3px #000'
                color='#D6517D'
              >
                You must be connected to Mint
              </Text>
            )}
          </VStack>
        </GridItem>
        <GridItem colSpan={2}>
          <Flex>
            <Box>
              {address ? (
                <Box>
                  <Box
                    fontSize='26px'
                    letterSpacing='0.5%'
                    fontFamily='VT323'
                    textShadow='0 2px 2px #000'
                    lineHeight={'26px'}
                    marginTop='20px'
                  >
                    {/*<Flex mb='10px'>*/}
                    {/*  /!* right side *!/*/}
                    {/*  <Text color={textColor}>Total Coffee：</Text>*/}
                    {/*  <Skeleton w={'60px'} isLoaded={!loadingTotalCoffee}>*/}
                    {/*    {totalCoffee?.toString()}*/}
                    {/*  </Skeleton>*/}
                    {/*</Flex>*/}
                    <Flex mb='10px'>
                      <Text color={textColor}>Token MaxSupply：</Text>
                      <Skeleton w={'450px'} isLoaded={!loadingMaxSupply}>
                        {maxSupplyDisplay == 'NaN' ? '' : maxSupplyDisplay}
                      </Skeleton>
                    </Flex>
                    <Flex mb='10px'>
                      <Text color={textColor}>Token TotalSupply：</Text>
                      <Skeleton w={'450px'} isLoaded={!loadingTotalSupply}>
                        {totalSupplyDisplay == 'NaN' ? '' : totalSupplyDisplay}
                      </Skeleton>
                    </Flex>
                    <Flex mb='10px'>
                      <Text color={textColor}>Balance：</Text>
                      <Skeleton w={'450px'} isLoaded={!loadingBalanceOf}>
                        {balanceOfDisplay == 'NaN' ? '' : balanceOfDisplay}
                      </Skeleton>
                    </Flex>
                  </Box>
                </Box>
              ) : (
                <Text
                  marginTop='70px'
                  fontSize='30px'
                  fontWeight='bold'
                  letterSpacing='-5.5%'
                  fontFamily='VT323'
                  textShadow='0 3px #000'
                  color='#D6517D'
                >
                  You must be connected to Mint
                </Text>
              )}
            </Box>
          </Flex>
        </GridItem>
      </Grid>
      <Divider mt={12} mb={12} />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        gap={4}
      >
        <GridItem colSpan={1}>
          <VStack alignItems='flex-start' spacing='20px'>
            <chakra.h2 fontSize='3xl' fontWeight='700'>
              Mint Token
            </chakra.h2>

            {/*  mint area */}
            {address ? (
              <Box display='flex' flexDirection='column' alignItems='flex-start'>
                {/* button increase, decrease */}
                <Box display='flex' flexDirection='column' alignItems='center' className='12345'>
                  <Flex align='center' justify='center'>
                    <Button
                      backgroundColor={buttonBackgroundColor}
                      borderRadius='5px'
                      boxShadow='0px 2px 2px 1px #0f0f0f'
                      color='white'
                      cursor='pointer'
                      fontFamily='inherit'
                      padding='15px'
                      marginTop='10px'
                      _hover={{ bg: btnHover }}
                      onClick={handleDecrement}
                    >
                      -
                    </Button>
                    <Input
                      // readOnly
                      borderColor={inputBorderColor}
                      borderWidth='4px'
                      borderStyle='solid'
                      zIndex='-1'
                      fontFamily='inherit'
                      width='100px'
                      height='40px'
                      textAlign='center'
                      paddingLeft='19px'
                      marginTop='10px'
                      type='number'
                      value={mintAmount}
                      onChange={handleInputChange}
                    />
                    <Button
                      backgroundColor={buttonBackgroundColor}
                      borderRadius='5px'
                      boxShadow='0px 2px 2px 1px #0f0f0f'
                      color='white'
                      cursor='pointer'
                      fontFamily='inherit'
                      padding='15px'
                      marginTop='10px'
                      _hover={{ bg: btnHover }}
                      onClick={handleIncrement}
                    >
                      +
                    </Button>
                  </Flex>

                  {/* Token Mint */}
                  <Flex
                    w='fit-content'
                    borderRadius='12px'
                    borderColor={buttonBorderColor}
                    borderWidth='4px'
                    borderStyle='solid'
                  >
                    <Web3Button
                      contractAddress={TREND_ADDRESS.ERC20_ADDRESS}
                      action={async () => {
                        await ERC20_CONTRACT!.call('publicMint', [totalPrice], {
                          value: ethers.utils.parseEther(
                            (mintAmount * TREND_PRICE.TOKEN_PRICE).toString(),
                          ),
                        });
                      }}
                      onSuccess={() => {
                        setMintAmount(1);
                        setTotalPrice(ethers.utils.parseEther('1'));
                        toast({
                          title: 'Mint 成功',
                          status: 'success',
                          position: 'top',
                          duration: 2000,
                          isClosable: true,
                        });
                      }}
                      onError={(error) => {
                        setMintAmount(1);
                        setTotalPrice(ethers.utils.parseEther('1'));
                        toast({
                          title: error.message,
                          status: 'error',
                          position: 'top',
                          duration: 2000,
                          isClosable: true,
                        });
                      }}
                    >
                      Mint Now
                    </Web3Button>
                  </Flex>
                </Box>
              </Box>
            ) : (
              <Text
                marginTop='70px'
                fontSize='30px'
                fontWeight='bold'
                letterSpacing='-5.5%'
                fontFamily='VT323'
                textShadow='0 3px #000'
                color='#D6517D'
              >
                You must be connected to Mint
              </Text>
            )}
          </VStack>
        </GridItem>
        <GridItem colSpan={2}>
          <Flex>
            <Box>
              {address ? (
                <Box>
                  <Box
                    fontSize='26px'
                    letterSpacing='0.5%'
                    fontFamily='VT323'
                    textShadow='0 2px 2px #000'
                    lineHeight={'26px'}
                    marginTop='20px'
                  >
                    <Flex mb='10px'>
                      <Text color={textColor}>Token Staking Supply：</Text>
                      <Skeleton w={'450px'} isLoaded={!loadingMaxSupply}>
                        {stakingTotalSupplyDisplay == 'NaN' ? '' : stakingTotalSupplyDisplay}
                      </Skeleton>
                    </Flex>
                    <Flex mb='10px'>
                      <Text color={textColor}>My Token Balance：</Text>
                      <Skeleton w={'450px'} isLoaded={!loadingBalanceOf}>
                        {balanceOfDisplay == 'NaN' ? '' : balanceOfDisplay}
                      </Skeleton>
                    </Flex>
                    <Flex mb='10px'>
                      <Text color={textColor}>My Staking：</Text>
                      <Skeleton w={'450px'} isLoaded={!loadingBalanceOf}>
                        {stakingTotalSupplyDisplay == 'NaN' ? '' : stakingBalanceOfDisplay}
                      </Skeleton>
                    </Flex>
                  </Box>
                </Box>
              ) : (
                <Text
                  marginTop='70px'
                  fontSize='30px'
                  fontWeight='bold'
                  letterSpacing='-5.5%'
                  fontFamily='VT323'
                  textShadow='0 3px #000'
                  color='#D6517D'
                >
                  You must be connected to Mint
                </Text>
              )}
            </Box>
          </Flex>
        </GridItem>
      </Grid>
      {/*<Grid*/}
      {/*  templateColumns={{*/}
      {/*    base: 'repeat(1, 1fr)',*/}
      {/*    sm: 'repeat(2, 1fr)',*/}
      {/*    md: 'repeat(4, 1fr)',*/}
      {/*  }}*/}
      {/*  gap={{ base: '8', sm: '12', md: '16' }}*/}
      {/*>*/}
      {/*  <Feature*/}
      {/*    heading={'First Feature'}*/}
      {/*    text={'Short text describing one of you features/service'}*/}
      {/*  />*/}
      {/*  <Feature*/}
      {/*    heading={'Second Feature'}*/}
      {/*    text={'Short text describing one of you features/service'}*/}
      {/*  />*/}
      {/*  <Feature*/}
      {/*    heading={'Third Feature'}*/}
      {/*    text={'Short text describing one of you features/service'}*/}
      {/*  />*/}
      {/*  <Feature*/}
      {/*    heading={'Fourth Feature'}*/}
      {/*    text={'Short text describing one of you features/service'}*/}
      {/*  />*/}
      {/*</Grid>*/}
    </Box>
  );
}
