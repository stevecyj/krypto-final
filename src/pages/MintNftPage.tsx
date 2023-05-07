import {
  chakra,
  Container,
  SimpleGrid,
  Image,
  Flex,
  // Heading,
  Text,
  // Stack,
  // StackDivider,
  // Icon,
  Box,
  Button,
  Input,
  Skeleton,
  Divider,
  Spinner,
  useColorModeValue,
  useToast,
  GridItem,
  VStack,
  Grid,
} from '@chakra-ui/react';
import {
  useContract,
  useContractRead,
  useAddress,
  Web3Button,
  useOwnedNFTs,
} from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import * as TREND_ADDRESS from '@/const/contractAddress';
// import * as TREND_PRICE from '@/const/price';
// import { ethers } from 'ethers';
// import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from 'react-icons/io5';
// import { ReactElement } from 'react';
import { ethers } from 'ethers';
// import { NFT_STAKE_ADDRESS } from '@/const/contractAddress';
// import * as TREND_PRICE from '@/const/price.ts';

// interface FeatureProps {
//   text: string;
//   iconBg: string;
//   icon?: ReactElement;
// }

interface image {
  id: number;
  imgUrl: string;
}
// const Feature = ({ text, icon, iconBg }: FeatureProps) => {
//   return (
//     <Stack direction={'row'} align={'center'}>
//       <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
//         {icon}
//       </Flex>
//       <Text fontWeight={600}>{text}</Text>
//     </Stack>
//   );
// };

export default function MintNftPage() {
  const address = useAddress();
  const [mintAmount, setMintAmount] = useState(1);
  const [stakeAmount, setStakeAmount] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [auctionPrice] = useState(0.01);
  const [_tokenIdArr, setTokenIdArr] = useState([]);
  const [images, setImages] = useState([{ id: 0, imgUrl: '' }]);

  const [totalStakePrice, setTotalStakePrice] = useState(ethers.utils.parseEther('1'));

  // display
  const [_totalNftSupplyDisplay, setTotalNftSupplyDisplay] = useState('0');
  const [stakingNftTotalSupplyDisplay, setStakingNftTotalSupplyDisplay] = useState('0');
  const [stakingNftBalanceOfDisplay, setStakingNftBalanceOfDisplay] = useState('0');

  const { contract: ERC721A_CONTRACT } = useContract(TREND_ADDRESS.ERC721A_ADDRESS);
  const { contract: NFT_STAKE_CONTRACT } = useContract(TREND_ADDRESS.NFT_STAKE_ADDRESS);

  // transfer to display
  // useEffect(() => {
  //   // @ts-ignore
  //   setTotalNftSupplyDisplay((totalNftSupplyDisplay / ethers.utils.parseEther('1')).toString());
  // }, [totalNftSupplyDisplay]);

  // read contract
  // auction
  const { data: auction, isLoading: loadingAuction } = useContractRead(ERC721A_CONTRACT, 'auction');
  useEffect(() => {
    auction && console.log('auction:', auction?.toString(), 'loadingAuction', loadingAuction);
  }, [auction, loadingAuction]);

  // balanceOf
  const { data: balanceOf, isLoading: loadingBalanceOf } = useContractRead(
    ERC721A_CONTRACT,
    'balanceOf',
    [address],
  );
  useEffect(() => {
    balanceOf &&
      console.log('NFTbalanceOf:', balanceOf?.toString(), 'loadingBalanceOf:', loadingBalanceOf);
  }, [balanceOf, loadingBalanceOf]);

  // totalSupply
  const { data: totalSupply, isLoading: loadingSupply } = useContractRead(
    ERC721A_CONTRACT,
    'totalSupply',
  );
  useEffect(() => {
    totalSupply &&
      console.log('NFTtotalSupply:', totalSupply?.toString(), 'loadingSupply:', loadingSupply);
    setTotalNftSupplyDisplay(totalSupply);
  }, [totalSupply, loadingSupply]);

  // white list param
  const { data: whitelistMintParam, isLoading: loadingWhitelistMintParam } = useContractRead(
    ERC721A_CONTRACT,
    'whitelistMintParam',
  );
  useEffect(() => {
    whitelistMintParam &&
      console.log(
        'whitelistMintParam:',
        whitelistMintParam?.toString(),
        'loadingWhitelistParam:',
        loadingWhitelistMintParam,
      );
  }, [whitelistMintParam, loadingWhitelistMintParam]);

  // tokensOfOwner
  const { data: tokensOfOwner, isLoading: loadingTokensOfOwner } = useContractRead(
    ERC721A_CONTRACT,
    'tokensOfOwner',
    [address],
  );
  useEffect(() => {
    // tokensOfOwner &&
    console.log(
      'tokensOfOwner',
      tokensOfOwner?.toString(),
      'loadingTokensOfOwner:',
      loadingTokensOfOwner,
    );
    const idArr = tokensOfOwner && tokensOfOwner.toString().split(',').map(Number);
    idArr && console.log(idArr);

    setTokenIdArr(idArr);
  }, [tokensOfOwner, loadingTokensOfOwner]);

  // get nft img
  const { data: ownedNFTs, isLoading: loadingOwnedNFTs } = useOwnedNFTs(ERC721A_CONTRACT, address);
  useEffect(() => {
    ownedNFTs && console.log('ownedNFTS', ownedNFTs, 'loadingOwnedNFTs', loadingOwnedNFTs);
    const NFTimages: { id: number; imgUrl: string }[] | undefined =
      ownedNFTs &&
      ownedNFTs!.map((item) => {
        // @ts-ignore
        const image: image = { id: item.metadata.id, imgUrl: item.metadata.image };
        return image;
      });

    // @ts-ignore
    setImages(NFTimages);
  }, [ownedNFTs, loadingOwnedNFTs]);

  // total supply of nft staking
  const { data: nftStakeTotalSupply, isLoading: loadingNftStakeTotalSupply } = useContractRead(
    NFT_STAKE_CONTRACT,
    'totalSupply',
  );
  useEffect(() => {
    nftStakeTotalSupply &&
      console.log(
        'nftStakeTotalSupply:',
        nftStakeTotalSupply.toString(),
        'loadingNftTotalSupply:',
        loadingNftStakeTotalSupply,
      );
    nftStakeTotalSupply && setStakingNftTotalSupplyDisplay(nftStakeTotalSupply.toString());
  }, [nftStakeTotalSupply, loadingNftStakeTotalSupply]);

  // balance of nft staking
  const { data: stakingNftBalanceOf, isLoading: loadingStakingNftBalanceOf } = useContractRead(
    NFT_STAKE_CONTRACT,
    'balanceOf',
    [address],
  );
  useEffect(() => {
    stakingNftBalanceOf &&
      console.log(
        'stakingNftBalanceOf',
        stakingNftBalanceOf.toString(),
        'loadingStakingNftBalanceOf',
        loadingStakingNftBalanceOf,
      );
    // @ts-ignore
    stakingNftBalanceOf && setStakingNftBalanceOfDisplay(stakingNftBalanceOf.toString());
  }, [stakingNftBalanceOf, loadingStakingNftBalanceOf]);

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
    console.log(mintAmount);
  };

  const handleIncrement = () => {
    // if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
    console.log(typeof mintAmount);
  };

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    const newValue = value.replace(/\D/g, ''); // 只允许输入数字
    if (newValue.charAt(0) === '0') {
      // 如果第一位是0则删除

      setInputValue(newValue.slice(1));
    } else {
      setInputValue(newValue);
    }
    setMintAmount(Number(inputValue));
  };

  // handle stake amount
  const handleStakeDecrement = () => {
    if (stakeAmount <= 1) return;

    setStakeAmount(stakeAmount - 1);
    setTotalStakePrice(ethers.utils.parseEther((stakeAmount - 1).toString()));
  };

  const handleStakeIncrement = () => {
    // if (mintAmount >= 3) return;
    setStakeAmount(stakeAmount + 1);
    setTotalStakePrice(ethers.utils.parseEther((stakeAmount + 1).toString()));
  };

  // @ts-ignore
  return (
    <Container maxW={'7xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb='20px'>
        <Flex flexDirection='row'>
          {/*  mint area */}
          {address ? (
            <>
              <Box>
                <chakra.h2 fontSize='3xl' fontWeight='700'>
                  Mint NFT
                </chakra.h2>
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

                    {/* nft Mint */}
                    <Flex
                      w='fit-content'
                      borderRadius='12px'
                      borderColor={buttonBorderColor}
                      borderWidth='4px'
                      borderStyle='solid'
                    >
                      <Web3Button
                        contractAddress={TREND_ADDRESS.ERC721A_ADDRESS}
                        action={async () => {
                          await ERC721A_CONTRACT!.call('publicAuctionMint', [mintAmount], {
                            value: ethers.utils.parseEther((mintAmount * auctionPrice).toString()),
                          });
                        }}
                        onSuccess={() => {
                          toast({
                            title: 'NFT Mint 成功',
                            status: 'success',
                            position: 'top',
                            duration: 2000,
                            isClosable: true,
                          });
                        }}
                        onError={(error) => {
                          console.log(error);
                          toast({
                            title: 'Oops!',
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
              </Box>
              <Box ml='20px'>
                {/* nft info */}
                <Box
                  fontSize='26px'
                  letterSpacing='0.5%'
                  fontFamily='VT323'
                  textShadow='0 2px 2px #000'
                  lineHeight={'26px'}
                  marginTop='20px'
                >
                  <Flex mb='10px'>
                    <Text color={textColor}>NFT TotalSupply：</Text>
                    <Skeleton w={'100px'} isLoaded={!loadingBalanceOf}>
                      {totalSupply?.toString()}
                    </Skeleton>
                  </Flex>
                </Box>
                <Box
                  fontSize='26px'
                  letterSpacing='0.5%'
                  fontFamily='VT323'
                  textShadow='0 2px 2px #000'
                  lineHeight={'26px'}
                  marginTop='20px'
                >
                  <Flex mb='10px'>
                    <Text color={textColor}>Balance of NFT：</Text>
                    <Skeleton w={'100px'} isLoaded={!loadingBalanceOf}>
                      {balanceOf?.toString()}
                    </Skeleton>
                  </Flex>
                </Box>
              </Box>
            </>
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
        </Flex>
        <Flex>{/* nft info */}</Flex>
      </SimpleGrid>
      <Flex justifyContent={'center'}>
        {loadingOwnedNFTs && <Spinner size={'xl'} />}
        <Flex justifyContent='start' flexWrap={'wrap'} className={'aaaaa'}>
          {images &&
            images.map((item, index) => {
              return (
                <>
                  <Flex
                    key={index}
                    w={'22%'}
                    flexDirection={'column'}
                    borderColor={inputBorderColor}
                    borderWidth='4px'
                    borderStyle='solid'
                    borderRadius={'10px'}
                    ml={'5px'}
                    mb={'5px'}
                  >
                    <Text>{item.id}</Text>
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
                          await ERC721A_CONTRACT!.call(
                            'approve',
                            [TREND_ADDRESS.NFT_STAKE_ADDRESS, item.id],
                            // {
                            //   value: ethers.utils.parseEther(stakeAmount.toString()),
                            // },
                          );
                          await NFT_STAKE_CONTRACT!.call(
                            'stake',
                            [item.id],
                            //   {
                            //   value: ethers.utils.parseEther(stakeAmount.toString()),
                            // }
                          );
                        }}
                        onSuccess={() => {
                          setStakeAmount(1);
                          // setTotalPrice(ethers.utils.parseEther('1'));
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
                          // setTotalPrice(ethers.utils.parseEther('1'));
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
                    <Image
                      key={index}
                      rounded={'md'}
                      alt={'NFT image'}
                      src={item.imgUrl}
                      objectFit={'cover'}
                      // w={'25%'}
                    />
                  </Flex>
                </>
              );
            })}
        </Flex>
      </Flex>
      <Divider mb='30px' />
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
                      onClick={handleStakeDecrement}
                    >
                      -
                    </Button>
                    <Input
                      readOnly
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
                      value={stakeAmount}
                      // onChange={handleInputChange}
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
                      onClick={handleStakeIncrement}
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
                      contractAddress={TREND_ADDRESS.TOKEN_STAKE_ADDRESS}
                      action={async () => {
                        await ERC721A_CONTRACT!.call(
                          'approve',
                          [TREND_ADDRESS.NFT_STAKE_ADDRESS, totalStakePrice],
                          // {
                          //   value: ethers.utils.parseEther(stakeAmount.toString()),
                          // },
                        );
                        await NFT_STAKE_CONTRACT!.call(
                          'stake',
                          [totalStakePrice],
                          //   {
                          //   value: ethers.utils.parseEther(stakeAmount.toString()),
                          // }
                        );
                      }}
                      onSuccess={() => {
                        setStakeAmount(1);
                        // setTotalPrice(ethers.utils.parseEther('1'));
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
                        // setTotalPrice(ethers.utils.parseEther('1'));
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
                      <Text color={textColor}>NFT Staking Supply：</Text>
                      <Skeleton w={'450px'} isLoaded={!loadingNftStakeTotalSupply}>
                        {stakingNftTotalSupplyDisplay == 'NaN' ? '' : stakingNftTotalSupplyDisplay}
                      </Skeleton>
                    </Flex>
                    <Flex mb='10px'>
                      <Text color={textColor}>My NFT Balance：</Text>
                      <Skeleton w={'450px'} isLoaded={!loadingBalanceOf}>
                        {balanceOf?.toString() == 'NaN' ? '' : balanceOf?.toString()}
                      </Skeleton>
                    </Flex>
                    <Flex mb='10px'>
                      <Text color={textColor}>My NFT Staking：</Text>
                      <Skeleton w={'450px'} isLoaded={!loadingStakingNftBalanceOf}>
                        {stakingNftBalanceOfDisplay}
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
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {/* nft stake */}

        {/*<Stack spacing={4}>*/}
        {/*  <Text*/}
        {/*    textTransform={'uppercase'}*/}
        {/*    color={'blue.400'}*/}
        {/*    fontWeight={600}*/}
        {/*    fontSize={'sm'}*/}
        {/*    bg={useColorModeValue('blue.50', 'blue.900')}*/}
        {/*    p={2}*/}
        {/*    alignSelf={'flex-start'}*/}
        {/*    rounded={'md'}*/}
        {/*  >*/}
        {/*    Your Nft*/}
        {/*  </Text>*/}
        {/*  <Heading>A digital Product design agency</Heading>*/}
        {/*  <Text color={'gray.500'} fontSize={'lg'}>*/}
        {/*    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor*/}
        {/*    invidunt ut labore*/}
        {/*  </Text>*/}
        {/*  <Stack*/}
        {/*    spacing={4}*/}
        {/*    divider={<StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />}*/}
        {/*  >*/}
        {/*    <Feature*/}
        {/*      icon={<Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />}*/}
        {/*      iconBg={useColorModeValue('yellow.100', 'yellow.900')}*/}
        {/*      text={'Business Planning'}*/}
        {/*    />*/}
        {/*    <Feature*/}
        {/*      icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}*/}
        {/*      iconBg={useColorModeValue('green.100', 'green.900')}*/}
        {/*      text={'Financial Planning'}*/}
        {/*    />*/}
        {/*    <Feature*/}
        {/*      icon={<Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />}*/}
        {/*      iconBg={useColorModeValue('purple.100', 'purple.900')}*/}
        {/*      text={'Market Analysis'}*/}
        {/*    />*/}
        {/*  </Stack>*/}
        {/*</Stack>*/}
        {/*<Flex>*/}
        {/*  <Image*/}
        {/*    rounded={'md'}*/}
        {/*    alt={'feature image'}*/}
        {/*    src={*/}
        {/*      'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'*/}
        {/*    }*/}
        {/*    objectFit={'cover'}*/}
        {/*  />*/}
        {/*</Flex>*/}
      </SimpleGrid>
    </Container>
  );
}
