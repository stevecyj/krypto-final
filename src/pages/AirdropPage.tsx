import {
    Container,
    SimpleGrid,
    Flex,
    Heading,
    Text,
    Box,
    Center,
    Card,
    CardBody,
  } from '@chakra-ui/react';
  import {
    useContract,
    Web3Button,
  } from '@thirdweb-dev/react';

  import {AIRDROP_ADDRESS} from '@/const/contractAddress';
  import { ethers } from 'ethers';
 
  
  export default function stakePage() {


    const { contract: AIRDROP } = useContract(AIRDROP_ADDRESS);
    


    return (
      <Box bg = '#FEFEFE' w={'100%'} h={'100%'}>
        <Container maxW={'1800px'} w={'100%'}>
            
            <SimpleGrid columns={1} spacingX='100px' spacingY='10px'>

           
            
            <Box >
                <Card bg='gray.100' height='700px' >
                <CardBody>
                {/* <Container maxW={'500px'} w={'100%'}> */}
                <Flex alignItems="center" justifyContent="center">
                <Box
                mt={'10px'}
                boxShadow='lg'
                bg='yellow' 
                h="50px" 
                w="600px" 
                borderRadius='lg'
                >
                    <Center 
                        w={'100%'}
                        as='b'
                        fontSize='3xl'
                        color='red'>
                            Donate to get Airdrop!!   
                    </Center>
                </Box>
                </Flex>
                <Center>
                <Card mt={'40px'} bg='lightgray' height='200px' boxShadow='dark-lg' w="600px">
                <CardBody>
                <Center>
                    <Heading color={'blue.800'} fontSize='3xl'>
                        What qualifications can donate to get the airdrop?
                    </Heading>
                    </Center>
                <Flex mt={'30px'}>
                
                    <Text color={'black'} display='inline-block' fontSize='2x1'>
                        1. You must be in the top 100 of the whitelist !!
                        {/* <Skeleton w={'20px'} isLoaded={!loadingtotalSupply}>{realtotalSupply?.toString()}</Skeleton> */}
                    </Text>
                
                </Flex>
                <Flex mt={'10px'}>
                    <Text color={'black'} display='inline-block' fontSize='2x1'>
                        2. You must donate 1 ETH !!
                        {/* <Skeleton w={'20px'} isLoaded={!loadingBalanceOf}>{realbalanceOf?.toString()}</Skeleton> */}
                    </Text>
                </Flex>
                
                </CardBody>
                </Card>
                </Center>
                <SimpleGrid mt={'40px'} columns={2} spacingX='10px' spacingY='10px'>
                    
                    <Box boxShadow='dark-lg' ml={'300px'} w={'500px'} h="250px" bg='lightpink' borderRadius='lg'>
                    <Container maxW={'500px'} w={'100%'}>
                    <Heading  mt={'10px'} >
                        Donate
                    </Heading>
                    <Text mt={'25px'} color={'blackAlpha.800'}>
                        Donate 1 ETH by pressing the button below.
                    </Text>
                   
                    <Flex mt={'25px'}>
                    <Web3Button
                        contractAddress={AIRDROP_ADDRESS}
                        action={async () => {
                            await AIRDROP!.call("donate", [] ,
                            {value: ethers.utils.parseEther('1')})
                        }}
                        onSuccess={() => {
                            alert('Donate Success')
                            }}
                            onError={(error) => {
                            alert(error) 
                            }}
                        >
                        Donate 1 ETH ~
                    </Web3Button>
                    
                    </Flex>

                    </Container>
                </Box>
                
                <Center>
                <Box boxShadow='dark-lg' mr={'300px'} w={'500px'} h="250px" bg='lightpink' borderRadius='lg'>
                    <Container maxW={'500px'} w={'100%'}>
                    <Heading  mt={'10px'} >
                        Get Airdrop
                    </Heading>
                    <Text mt={'25px'} color={'blackAlpha.800'}>
                        Get the airdrop by pressing the button below.
                    </Text>
                    
                    <Flex mt={'25px'} width={'600px'}>
                    
                    <Web3Button
                        contractAddress={AIRDROP_ADDRESS}
                        action={async () => {
                            await AIRDROP!.call("getAirdrop", ['proof'])
                        }}
                        onSuccess={() => {

                            alert('Get Airdrop Success')
                            }}
                            onError={(error) => {
                            alert(error) 
                            }}
                        >
                        Get Airdrop ~
                    </Web3Button> 
                    </Flex>
                    </Container>
                </Box>
                </Center>
                </SimpleGrid>
                

                {/* </Container> */}
                </CardBody>
                </Card>
            </Box>
            
            
            
        </SimpleGrid>
        

       
            
            </Container>
      </Box>
    );
  }
  