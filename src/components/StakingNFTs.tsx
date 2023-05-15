import {
  // chakra,
  Image,
  Flex,
  Text,
  Box,
  // Button,
  // Input,
  Skeleton,
  Spinner,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import {
  useContract,
  useContractRead,
  useAddress,
  Web3Button,
  useOwnedNFTs,
  useNFT,
} from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';
import * as TREND_ADDRESS from '@/const/contractAddress';
// import * as TREND_PRICE from '@/const/price';
// import { ethers } from 'ethers';
// import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from 'react-icons/io5';
// import { ReactElement } from 'react';
import { ethers } from 'ethers';

// import { NFT_STAKE_ADDRESS } from '@/const/contractAddress';
// import * as TREND_PRICE from '@/const/price.ts';
//
// import { MerkleTree } from 'merkletreejs';
// import keccak256 from 'keccak256';
// import { whitelist } from '@/const/whitelist.ts';

interface image {
  id: number;
  imgUrl: string;
}

export default function StakingNFTsPage() {
  const address = useAddress();
  // const [mintAmount, setMintAmount] = useState(1);
  // const [whitelistMintAmount, setWhitelistMintAmount] = useState(1);
  // const [proof, setProof] = useState([]);
  const [_stakeAmount, setStakeAmount] = useState(1);
  // const [inputValue, setInputValue] = useState('');
  // const [whitelistPrice] = useState(0.5);
  const [_tokenIdArr, setTokenIdArr] = useState([]);
  const [images, setImages] = useState([{ id: 0, imgUrl: '' }]);
  const [_stakeImageIds, setStakeImageIds] = useState(['']);
  const [_stakeImageMetadata, setStakeImageMetadata] = useState([{ id: 0, imgUrl: '' }]);

  const [_totalStakePrice, _setTotalStakePrice] = useState(ethers.utils.parseEther('1'));

  // display
  const [_totalNftSupplyDisplay, setTotalNftSupplyDisplay] = useState('0');
  const [stakingNftTotalSupplyDisplay, setStakingNftTotalSupplyDisplay] = useState('0');
  const [stakingNftBalanceOfDisplay, setStakingNftBalanceOfDisplay] = useState('0');

  const { contract: ERC721A_CONTRACT } = useContract(TREND_ADDRESS.ERC721A_ADDRESS);
  const { contract: NFT_STAKE_CONTRACT } = useContract(TREND_ADDRESS.NFT_STAKE_ADDRESS);

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
      ownedNFTs!
        .map((item) => {
          // @ts-ignore
          const image: image = { id: item.metadata.id, imgUrl: item.metadata.image };
          return image;
        })
        .reverse();

    // @ts-ignore
    setImages(NFTimages);
  }, [ownedNFTs, loadingOwnedNFTs]);

  // get stake nft by ownedNFTs
  const { data: stakeOwnedNFTs, isLoading: loadingStakeOwnedNFTs } = useOwnedNFTs(
    ERC721A_CONTRACT,
    TREND_ADDRESS.NFT_STAKE_ADDRESS,
  );
  useEffect(() => {
    stakeOwnedNFTs &&
      console.log('stakeOwnedNFTs', stakeOwnedNFTs, 'loadingStakeOwnedNFTs', loadingStakeOwnedNFTs);
    const tmpArr: any[] = [];
    stakeOwnedNFTs?.forEach((item) => {
      if (_stakeImageIds.includes(item.metadata.id)) {
        // @ts-ignore
        const image: image = { id: item.metadata.id, imgUrl: item.metadata.image };
        tmpArr.push(image);
      }
      // console.log('tmpArr', tmpArr);
      // @ts-ignore
    });
    setStakeImageMetadata(tmpArr.reverse());
    // const stakeNFTimages: { id: number }[] | undefined =
    //   stakeOwnedNFTs &&
    //   stakeOwnedNFTs!
    //     .map((item) => {
    //       // @ts-ignore
    //       const image: image = { id: item.metadata.id };
    //       return image;
    //     })
    //     .reverse();
    // @ts-ignore
    // setStakeImages(stakeNFTimages);
  }, [stakeOwnedNFTs, loadingStakeOwnedNFTs]);

  // get stake nft img
  const { data: stakeNFTs, isLoading: loadingStakeNFTs } = useContractRead(
    NFT_STAKE_CONTRACT,
    'getOwnerOfNfts',
    [address],
  );
  useEffect(() => {
    stakeNFTs && console.log('stakeNFTs', stakeNFTs, 'loadingStakeNFTs', loadingStakeNFTs);
    const stakeNFTimages: string[] | undefined =
      stakeNFTs &&
      stakeNFTs!.map((item: any) => {
        // @ts-ignore
        const image = item.toString();
        return image;
      });
    // @ts-ignore
    setStakeImageIds(stakeNFTimages);
    console.log('stakeNFTimages', stakeNFTimages);
    // stakeNFTs && stakeNFTs.map((item) => console.log('stakeNFTs', item.toString()));
    // const NFTimages: { id: number; imgUrl: string }[] | undefined =
    //   stakeNFTs &&
    //   stakeNFTs!
    //     .map((item) => {
    //       // @ts-ignore
    //       const image: image = { id: item.metadata.id, imgUrl: item.metadata.image };
    //       return image;
    //     })
    //     .reverse();

    // @ts-ignore
    // setImages(NFTimages);
  }, [stakeNFTs, loadingStakeNFTs]);

  // getOwnerOfNfts(stakingNftBalanceOf)
  // const { data: stakingNftOwnerOf, isLoading: loadingStakingNftOwnerOf } = useContractRead(
  //   ERC721A_CONTRACT,
  //   'getTokenURI',
  //   [id],
  // );

  // useNFTs
  const { data: nfts, isLoading: loadingNfts } = useNFT(ERC721A_CONTRACT, 0);
  useEffect(() => {
    nfts && console.log('nfts', nfts, 'loadingNfts', loadingNfts);
  }, [nfts, loadingNfts]);

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
  const inputBorderColor = useColorModeValue('green.600', 'green.300');
  const buttonBorderColor = useColorModeValue('green.600', 'green.300');
  const textColor = useColorModeValue('green.600', 'green.300');

  // @ts-ignore
  return (
    <>
      <Flex flexDirection={'column'}>
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
                <Flex
                  mb='10px'
                  w='fit-content'
                  borderRadius='12px'
                  borderColor={buttonBorderColor}
                  borderWidth='4px'
                  borderStyle='solid'
                >
                  <Web3Button
                    contractAddress={TREND_ADDRESS.NFT_STAKE_ADDRESS}
                    action={async () => {
                      await NFT_STAKE_CONTRACT!.call(
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
                        title: 'Stake 成功',
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

        {/* image */}
        <Flex justifyContent={'center'}>
          {loadingOwnedNFTs && <Spinner size={'xl'} />}
          <Flex justifyContent='start' flexWrap={'wrap'} className={'aaaaa'} width={'80vw'}>
            {images &&
              _stakeImageMetadata!.map((item, index) => {
                return (
                  <Flex
                    key={index}
                    className={'outer'}
                    w={'22%'}
                    flexDirection={'column'}
                    borderColor={inputBorderColor}
                    borderWidth='4px'
                    borderStyle='solid'
                    borderRadius={'10px'}
                    ml={'5px'}
                    mb={'5px'}
                  >
                    <Text>#{item.id}</Text>
                    <Flex
                      w='fit-content'
                      borderRadius='12px'
                      borderColor={buttonBorderColor}
                      borderWidth='4px'
                      borderStyle='solid'
                    >
                      <Web3Button
                        contractAddress={TREND_ADDRESS.NFT_STAKE_ADDRESS}
                        action={async () => {
                          // await ERC721A_CONTRACT!.call(
                          //   'approve',
                          //   [TREND_ADDRESS.NFT_STAKE_ADDRESS, item.id],
                          //   // {
                          //   //   value: ethers.utils.parseEther(stakeAmount.toString()),
                          //   // },
                          // );
                          await NFT_STAKE_CONTRACT!.call(
                            'withdraw',
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
                            title: 'UnStake 成功',
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
                        UnStake Now
                      </Web3Button>
                    </Flex>
                    <Image
                      rounded={'md'}
                      alt={'NFT image'}
                      src={item.imgUrl}
                      objectFit={'cover'}
                      // w={'25%'}
                    />
                  </Flex>
                );
              })}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
