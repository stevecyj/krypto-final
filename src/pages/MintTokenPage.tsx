import {
  Box,
  VStack,
  // Button,
  Flex,
  Divider,
  chakra,
  SimpleGrid,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Container,
  Text,
  Skeleton,
  Input,
  useColorModeValue,
  useToast,
  ChakraProvider,
  TabPanel,
} from '@chakra-ui/react';
import theme from '@/theme';
import { ColorModeSwitcher } from '@/theme/ColorModeSwitcher';
import { useContract, useContractRead, Web3Button, useAddress } from '@thirdweb-dev/react';
import { useState, useEffect, ChangeEventHandler } from 'react';
import * as TREND_ADDRESS from '@/const/contractAddress';
import * as TREND_PRICE from '@/const/price';
import { ethers } from 'ethers';
import './MintTokenPage.scss';

export default function MintTokenPage() {
  const address = useAddress();
  const [mintAmount, setMintAmount] = useState(1);
  const [stakeAmount, setStakeAmount] = useState(1);
  const [unStakeAmount, setUnStakeAmount] = useState(1);
  // @ts-ignore
  const [totalPrice, setTotalPrice] = useState(ethers.utils.parseEther('1'));
  const [totalStakePrice, setTotalStakePrice] = useState(ethers.utils.parseEther('1'));
  const [totalUnStakePrice, setTotalUnStakePrice] = useState(ethers.utils.parseEther('1'));

  // display
  const [balanceOfDisplay, setBalanceOfDisplay] = useState('0');
  const [maxSupplyDisplay, setMaxSupplyDisplay] = useState('0');
  const [totalSupplyDisplay, setTotalSupplyDisplay] = useState('0');
  const [stakingTotalSupplyDisplay, setStakingTotalSupplyDisplay] = useState('0');
  const [stakingBalanceOfDisplay, setStakingBalanceOfDisplay] = useState('0');

  // get contract
  const { contract: ERC20_CONTRACT } = useContract(TREND_ADDRESS.ERC20_ADDRESS);
  const { contract: TOKEN_STAKE_CONTRACT } = useContract(TREND_ADDRESS.TOKEN_STAKE_ADDRESS);

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
      console.log(
        'stakingBalanceOf',
        stakingBalanceOf,
        'loadingStakingBalanceOf',
        loadingStakingBalanceOf,
      );
    // @ts-ignore
    setStakingBalanceOfDisplay((stakingBalanceOf / ethers.utils.parseEther('1')).toString());
    console.log('stakingBalanceOfDisplay', stakingBalanceOfDisplay);
  }, [stakingBalanceOf, loadingStakingBalanceOf]);

  // transfer to display
  useEffect(() => {
    console.log('balanceOf', balanceOf?.toString());
    // @ts-ignore
    setBalanceOfDisplay((balanceOf / ethers.utils.parseUnits('1.0', 18)).toString());
    // setBalanceOfDisplay((balanceOf / ethers.utils.parseEther('1')).toString());
  }, [balanceOf]);

  useEffect(() => {
    // @ts-ignore
    setMaxSupplyDisplay((maxSupply / ethers.utils.parseEther('1')).toString());
  }, [maxSupply]);

  useEffect(() => {
    // @ts-ignore
    setTotalSupplyDisplay((totalSupply / ethers.utils.parseEther('1')).toString());
  }, [totalSupply]);

  // toast
  const toast = useToast();

  // button area
  // const buttonBackgroundColor = useColorModeValue('green.600', 'green.300');
  // const btnHover = useColorModeValue('red.600', 'red.300');
  const inputBorderColor = useColorModeValue('green.600', 'green.300');
  const buttonBorderColor = useColorModeValue('green.600', 'green.300');
  const textColor = useColorModeValue('green.600', 'green.300');
  // const handleDecrement = () => {
  //   if (mintAmount <= 1) return;
  //
  //   setMintAmount(mintAmount - 1);
  //   setTotalPrice(ethers.utils.parseEther((mintAmount - 1).toString()));
  // };
  //
  // const handleIncrement = () => {
  //   // if (mintAmount >= 3) return;
  //   setMintAmount(mintAmount + 1);
  //   setTotalPrice(ethers.utils.parseEther((mintAmount + 1).toString()));
  // };

  // handleInput
  const handleInputChange = (e: any, type: any) => {
    console.log('inputChange');
    // if (mintAmount == 0) {
    //   setMintAmount(1);
    // }
    let val = e.target.value;
    const t = val.charAt(0);
    if (type === 'int') {
      // 限制只能输入数字
      val = val.replace(/[^\d+]/g, '');
    } else {
      // 先把非数字的都替换掉，除了数字和.
      val = val.replace(/[^\d.]/g, '');
      // 保证只有出现一个.而没有多个.
      val = val.replace(/\.{2,}/g, '.');
      // 必须保证第一个为数字而不是.
      val = val.replace(/^\./g, '');
      // 保证.只出现一次，而不能出现两次以上
      val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    }
    // 负数处理
    if (t === '-') {
      e.target.value = '-' + val;
    } else {
      e.target.value = val;
    }

    console.log('mintAmount', e.target.value);
    setMintAmount(Number(e.target.value));
  };
  // @ts-ignore
  const changeEventHandler: ChangeEventHandler<HTMLInputElement> = handleInputChange;
  useEffect(() => {
    // if (mintAmount < 1) {
    //   setMintAmount(1);
    // }
    setTotalPrice(ethers.utils.parseEther(mintAmount.toString()));
    console.log('mintAmount', mintAmount);
  }, [mintAmount]);

  // stake handle
  // const handleStakeDecrement = () => {
  //   if (stakeAmount <= 1) return;
  //
  //   setStakeAmount(stakeAmount - 1);
  //   setTotalStakePrice(ethers.utils.parseEther((stakeAmount - 1).toString()));
  // };
  //
  // const handleStakeIncrement = () => {
  //   // if (mintAmount >= 3) return;
  //   setStakeAmount(stakeAmount + 1);
  //   setTotalStakePrice(ethers.utils.parseEther((stakeAmount + 1).toString()));
  // };

  // stake handle input
  const handleStakeInputChange = (e: any, type: any) => {
    // if (mintAmount == 0) {
    //   setMintAmount(1);
    // }
    let val = e.target.value;
    const t = val.charAt(0);
    if (type === 'int') {
      // 限制只能输入数字
      val = val.replace(/[^\d+]/g, '');
    } else {
      // 先把非数字的都替换掉，除了数字和.
      val = val.replace(/[^\d.]/g, '');
      // 保证只有出现一个.而没有多个.
      val = val.replace(/\.{2,}/g, '.');
      // 必须保证第一个为数字而不是.
      val = val.replace(/^\./g, '');
      // 保证.只出现一次，而不能出现两次以上
      val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    }
    // 负数处理
    if (t === '-') {
      e.target.value = '-' + val;
    } else {
      e.target.value = val;
    }

    setStakeAmount(Number(e.target.value));
    console.log('stakeTokenAmount', e.target.value);
    // @ts-ignore
  };
  // @ts-ignore
  const handleStakeChangeEventHandler: ChangeEventHandler<HTMLInputElement> =
    handleStakeInputChange;
  useEffect(() => {
    // if (mintAmount < 1) {
    //   setMintAmount(1);
    // }
    setTotalStakePrice(ethers.utils.parseEther(stakeAmount.toString()));
    // console.log('totalStakePrice', totalStakePrice);
  }, [stakeAmount]);

  // unstake handle input
  const handleUnstakeInputChange = (e: any, type: any) => {
    // if (mintAmount == 0) {
    //   setMintAmount(1);
    // }
    let val = e.target.value;
    const t = val.charAt(0);
    if (type === 'int') {
      // 限制只能输入数字
      val = val.replace(/[^\d+]/g, '');
    } else {
      // 先把非数字的都替换掉，除了数字和.
      val = val.replace(/[^\d.]/g, '');
      // 保证只有出现一个.而没有多个.
      val = val.replace(/\.{2,}/g, '.');
      // 必须保证第一个为数字而不是.
      val = val.replace(/^\./g, '');
      // 保证.只出现一次，而不能出现两次以上
      val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    }
    // 负数处理
    if (t === '-') {
      e.target.value = '-' + val;
    } else {
      e.target.value = val;
    }

    setUnStakeAmount(Number(e.target.value));
    console.log('unstakeTokenAmount', e.target.value);
    // @ts-ignore
  };
  // @ts-ignore
  const handleUnStakeChangeEventHandler: ChangeEventHandler<HTMLInputElement> =
    handleUnstakeInputChange;
  useEffect(() => {
    // if (mintAmount < 1) {
    //   setMintAmount(1);
    // }
    setTotalUnStakePrice(ethers.utils.parseEther(unStakeAmount.toString()));
    // console.log('totalStakePrice', totalStakePrice);
  }, [unStakeAmount]);

  return (
    <Box as={Container} maxW='100vw' mt={14} p={4}>
      <ChakraProvider theme={theme}>
        <Flex justifyContent={'center'} position='relative' p={12}>
          <SimpleGrid columns={[1, 1, 1, 1]} spacing={12}>
            <GridItem>
              <Tabs>
                <TabList>
                  <Tab>Mint Token</Tab>
                  <Tab>Stake Token</Tab>
                  {/*<Tab>Three</Tab>*/}
                </TabList>
                <TabPanels>
                  <TabPanel>
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
                              <Box
                                display='flex'
                                flexDirection='column'
                                alignItems='center'
                                className='12345'
                              >
                                <Flex align='center' justify='center'>
                                  {/*<Button*/}
                                  {/*  backgroundColor={buttonBackgroundColor}*/}
                                  {/*  borderRadius='5px'*/}
                                  {/*  boxShadow='0px 2px 2px 1px #0f0f0f'*/}
                                  {/*  color='white'*/}
                                  {/*  cursor='pointer'*/}
                                  {/*  fontFamily='inherit'*/}
                                  {/*  padding='15px'*/}
                                  {/*  marginTop='10px'*/}
                                  {/*  _hover={{ bg: btnHover }}*/}
                                  {/*  onClick={handleDecrement}*/}
                                  {/*>*/}
                                  {/*  -*/}
                                  {/*</Button>*/}
                                  <Input
                                    // readOnly
                                    borderColor={inputBorderColor}
                                    borderWidth='4px'
                                    borderStyle='solid'
                                    _hover={{ borderColor: 'red.500' }}
                                    _focus={{ borderColor: 'red.500' }}
                                    // zIndex='10'
                                    fontFamily='inherit'
                                    width='100%'
                                    height='40px'
                                    textAlign='center'
                                    paddingLeft='19px'
                                    marginTop='10px'
                                    type='number'
                                    value={mintAmount}
                                    onChange={changeEventHandler}
                                  />
                                  {/*<Button*/}
                                  {/*  backgroundColor={buttonBackgroundColor}*/}
                                  {/*  borderRadius='5px'*/}
                                  {/*  boxShadow='0px 2px 2px 1px #0f0f0f'*/}
                                  {/*  color='white'*/}
                                  {/*  cursor='pointer'*/}
                                  {/*  fontFamily='inherit'*/}
                                  {/*  padding='15px'*/}
                                  {/*  marginTop='10px'*/}
                                  {/*  _hover={{ bg: btnHover }}*/}
                                  {/*  onClick={handleIncrement}*/}
                                  {/*>*/}
                                  {/*  +*/}
                                  {/*</Button>*/}
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
                                          (mintAmount * TREND_PRICE.TOKEN_PRICE)
                                            .toFixed(18)
                                            .toString(),
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
                  </TabPanel>
                  <TabPanel>
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
                            Stake Token
                          </chakra.h2>

                          {/*  stake area */}
                          {address ? (
                            <Box display='flex' flexDirection='column' alignItems='flex-start'>
                              {/* button increase, decrease */}
                              <Box
                                display='flex'
                                flexDirection='column'
                                alignItems='center'
                                className='12345'
                              >
                                <Flex align='center' justify='center'>
                                  {/*<Button*/}
                                  {/*  backgroundColor={buttonBackgroundColor}*/}
                                  {/*  borderRadius='5px'*/}
                                  {/*  boxShadow='0px 2px 2px 1px #0f0f0f'*/}
                                  {/*  color='white'*/}
                                  {/*  cursor='pointer'*/}
                                  {/*  fontFamily='inherit'*/}
                                  {/*  padding='15px'*/}
                                  {/*  marginTop='10px'*/}
                                  {/*  _hover={{ bg: btnHover }}*/}
                                  {/*  onClick={handleStakeDecrement}*/}
                                  {/*>*/}
                                  {/*  -*/}
                                  {/*</Button>*/}
                                  <Input
                                    borderColor={inputBorderColor}
                                    borderWidth='4px'
                                    borderStyle='solid'
                                    _hover={{ borderColor: 'red.500' }}
                                    _focus={{ borderColor: 'red.500' }}
                                    fontFamily='inherit'
                                    width='100%'
                                    height='40px'
                                    textAlign='center'
                                    paddingLeft='19px'
                                    marginTop='10px'
                                    type='number'
                                    value={stakeAmount}
                                    onChange={handleStakeChangeEventHandler}
                                  />
                                  {/*<Button*/}
                                  {/*  backgroundColor={buttonBackgroundColor}*/}
                                  {/*  borderRadius='5px'*/}
                                  {/*  boxShadow='0px 2px 2px 1px #0f0f0f'*/}
                                  {/*  color='white'*/}
                                  {/*  cursor='pointer'*/}
                                  {/*  fontFamily='inherit'*/}
                                  {/*  padding='15px'*/}
                                  {/*  marginTop='10px'*/}
                                  {/*  _hover={{ bg: btnHover }}*/}
                                  {/*  onClick={handleStakeIncrement}*/}
                                  {/*>*/}
                                  {/*  +*/}
                                  {/*</Button>*/}
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
                                    contractAddress={TREND_ADDRESS.TOKEN_STAKE_ADDRESS}
                                    action={async () => {
                                      await ERC20_CONTRACT!.call(
                                        'approve',
                                        [TREND_ADDRESS.TOKEN_STAKE_ADDRESS, totalStakePrice],
                                        // {
                                        //   value: ethers.utils.parseEther(stakeAmount.toString()),
                                        // },
                                      );
                                      await TOKEN_STAKE_CONTRACT!.call(
                                        'stake',
                                        [totalStakePrice],
                                        //   {
                                        //   value: ethers.utils.parseEther(stakeAmount.toString()),
                                        // }
                                      );
                                    }}
                                    onSuccess={() => {
                                      setStakeAmount(1);
                                      toast({
                                        title: 'Stake 成功',
                                        status: 'success',
                                        position: 'top',
                                        duration: 2000,
                                        isClosable: true,
                                      });
                                    }}
                                    onError={(error) => {
                                      setStakeAmount(1);
                                      toast({
                                        title: error.message,
                                        status: 'error',
                                        position: 'top',
                                        duration: 2000,
                                        isClosable: true,
                                      });
                                    }}
                                  >
                                    Stake Now
                                  </Web3Button>
                                </Flex>

                                {/* get reward */}
                                <Flex
                                  mb='10px'
                                  w='fit-content'
                                  borderRadius='12px'
                                  borderColor={buttonBorderColor}
                                  borderWidth='4px'
                                  borderStyle='solid'
                                >
                                  <Web3Button
                                    contractAddress={TREND_ADDRESS.TOKEN_STAKE_ADDRESS}
                                    action={async () => {
                                      await TOKEN_STAKE_CONTRACT!.call(
                                        'getReward',
                                        // [item.id],
                                        //   {
                                        //   value: ethers.utils.parseEther(stakeAmount.toString()),
                                        // }
                                      );
                                    }}
                                    onSuccess={() => {
                                      setStakeAmount(1);
                                      // setTotalPrice(ethers.utils.parseEther('1'));
                                      toast({
                                        title: 'Get Reward Success',
                                        status: 'success',
                                        position: 'top',
                                        duration: 2000,
                                        isClosable: true,
                                      });
                                    }}
                                    onError={(error) => {
                                      // setStakeAmount(1);
                                      // setTotalPrice(ethers.utils.parseEther('1'));
                                      console.log('error', error.message);
                                      toast({
                                        title: error.message,
                                        status: 'error',
                                        position: 'top',
                                        duration: 2000,
                                        isClosable: true,
                                      });
                                    }}
                                  >
                                    Get Reward
                                  </Web3Button>
                                </Flex>

                                {/*  stake area */}
                                <Flex align='center' justify='center'>
                                  {/*<Button*/}
                                  {/*  backgroundColor={buttonBackgroundColor}*/}
                                  {/*  borderRadius='5px'*/}
                                  {/*  boxShadow='0px 2px 2px 1px #0f0f0f'*/}
                                  {/*  color='white'*/}
                                  {/*  cursor='pointer'*/}
                                  {/*  fontFamily='inherit'*/}
                                  {/*  padding='15px'*/}
                                  {/*  marginTop='10px'*/}
                                  {/*  _hover={{ bg: btnHover }}*/}
                                  {/*  onClick={handleStakeDecrement}*/}
                                  {/*>*/}
                                  {/*  -*/}
                                  {/*</Button>*/}
                                  <Input
                                    borderColor={inputBorderColor}
                                    borderWidth='4px'
                                    borderStyle='solid'
                                    _hover={{ borderColor: 'red.500' }}
                                    _focus={{ borderColor: 'red.500' }}
                                    fontFamily='inherit'
                                    width='100%'
                                    height='40px'
                                    textAlign='center'
                                    paddingLeft='19px'
                                    marginTop='10px'
                                    type='number'
                                    value={unStakeAmount}
                                    onChange={handleUnStakeChangeEventHandler}
                                  />
                                  {/*<Button*/}
                                  {/*  backgroundColor={buttonBackgroundColor}*/}
                                  {/*  borderRadius='5px'*/}
                                  {/*  boxShadow='0px 2px 2px 1px #0f0f0f'*/}
                                  {/*  color='white'*/}
                                  {/*  cursor='pointer'*/}
                                  {/*  fontFamily='inherit'*/}
                                  {/*  padding='15px'*/}
                                  {/*  marginTop='10px'*/}
                                  {/*  _hover={{ bg: btnHover }}*/}
                                  {/*  onClick={handleStakeIncrement}*/}
                                  {/*>*/}
                                  {/*  +*/}
                                  {/*</Button>*/}
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
                                    contractAddress={TREND_ADDRESS.TOKEN_STAKE_ADDRESS}
                                    action={async () => {
                                      // await ERC20_CONTRACT!.call(
                                      //   'approve',
                                      //   [TREND_ADDRESS.TOKEN_STAKE_ADDRESS, totalStakePrice],
                                      //   // {
                                      //   //   value: ethers.utils.parseEther(stakeAmount.toString()),
                                      //   // },
                                      // );
                                      await TOKEN_STAKE_CONTRACT!.call(
                                        'withdraw',
                                        [totalUnStakePrice],
                                        //   {
                                        //   value: ethers.utils.parseEther(stakeAmount.toString()),
                                        // }
                                      );
                                    }}
                                    onSuccess={() => {
                                      setUnStakeAmount(1);
                                      toast({
                                        title: 'UnStake Success',
                                        status: 'success',
                                        position: 'top',
                                        duration: 2000,
                                        isClosable: true,
                                      });
                                    }}
                                    onError={(error) => {
                                      setUnStakeAmount(1);
                                      toast({
                                        title: error.message,
                                        status: 'error',
                                        position: 'top',
                                        duration: 2000,
                                        isClosable: true,
                                      });
                                    }}
                                  >
                                    UnStake
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
                                    <Skeleton w={'50%'} isLoaded={!loadingMaxSupply}>
                                      {stakingTotalSupplyDisplay == 'NaN'
                                        ? ''
                                        : stakingTotalSupplyDisplay}
                                    </Skeleton>
                                  </Flex>
                                  <Flex mb='10px'>
                                    <Text color={textColor}>My Token Balance：</Text>
                                    <Skeleton w={'50%'} isLoaded={!loadingBalanceOf}>
                                      {balanceOfDisplay == 'NaN' ? '' : balanceOfDisplay}
                                    </Skeleton>
                                  </Flex>
                                  <Flex mb='10px'>
                                    <Text color={textColor}>My Staking：</Text>
                                    <Skeleton w={'450px'} isLoaded={!loadingBalanceOf}>
                                      {stakingTotalSupplyDisplay == 'NaN'
                                        ? ''
                                        : stakingBalanceOfDisplay}
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

      <Divider mt={12} mb={12} />
    </Box>
  );
}
