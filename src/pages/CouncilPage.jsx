import { Skeleton, Card, CardBody, Stack, Container, Box, Flex, Text, Heading, SimpleGrid, Tabs, TabList, TabPanels, Tab, TabPanel, Center,Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Textarea,
  Button,
  Input,
  Tooltip,
  useDisclosure,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  } from '@chakra-ui/react';
import {tabs, recallPhasePrint, campaignPhasePrint} from '../data/data'
import {COUNCIL_ADDRESS} from '../const/contractAddress'
import {useState } from 'react';
import {  useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import { InfoOutlineIcon } from '@chakra-ui/icons'

export default function CouncilPage() {
  const {contract} = useContract(COUNCIL_ADDRESS);
  const {
    data: currentActivity,
    isLoading: loadingCurrentActivity
  } = useContractRead(contract, 'getCurrentActiviry');
  
  const {
    data: candidates,
    isLoading: loadingCandidates
  } = useContractRead(contract, 'getCandidate');

  const {
    data: campaign,
    isLoading: loadingCampaign
  } = useContractRead(contract, 'campaign')
  const {
    data: recall,
    isLoading: loadingRecall
  } = useContractRead(contract, 'recallActivity')
  const {
    data: memberNum,
    isLoading: loadingMemberNum
  } = useContractRead(contract, 'getMembersNum');
  const {
    data: campaignPhase,
    isLoading: loadingCampaignPhase
  } = useContractRead(contract, 'getCampaignPhase');
  const {
    data: recallPhase,
    isLoading: loadingRecallPhase
  } = useContractRead(contract, 'getRecallPhase');
  
  const {
    data: memberLimit,
    isLoading: loadingMemberLimit
  } = useContractRead(contract, 'getCouncilMemberNumLimit');
  const {
    data: votePowerPassThreshold,
    isLoading: loadingVotePowerPassThreshold
  } = useContractRead(contract, 'getVotePassThreshold');
  const {
    data: candidateTokenThreshold,
    isLoading: loadingCandidateTokenThreshold
  } = useContractRead(contract, 'getTokenNumThreshold');
  const {
    data: votePowerThreshold,
    isLoading: loadingVotePowerThreshold
  } = useContractRead(contract, 'getVotePowerThreshold');
  const [votePower, setVotePower] = useState(0)
  const [recallVotePower, setRecallVotePower] = useState(0)

  return (
    <Box bg='#FEFEFE' w={'100%'} h={'100%'} mb = '10px'>
      <Container maxW={'1200px'} w={'100%'}>
      <Center>
        <Heading>Council</Heading>
      </Center>
            <Box>
            <Card maxH={'40vh'} overflow={'scroll'} mb = '10px'>
        <CardBody>
          <Center>
            <Text mr = '10px'>成員: </Text>
            {!loadingMemberNum? (
              <Text mr='10px'>{parseInt(memberNum)}</Text>):(
                <Skeleton height='20px' width='20px' isLoaded={!loadingMemberNum}></Skeleton>
              )} / 
              {!loadingMemberLimit?(
                 <Text ml='10px'>{parseInt(memberLimit)}</Text>
              ):(<Skeleton height='20px' width='20px' isLoaded={!loadingMemberLimit}></Skeleton>)}
          </Center>
          <Center>
          <Text mr = '10px'>當前活動: </Text>
          {!loadingCurrentActivity? (
            <Box>
              {currentActivity == 0 ? (
                <Text>無</Text>
              ): null}
              {currentActivity ==1 ? (
                <Text>競選</Text>
              ): null}
              {currentActivity ==2 ? (
                <Text>罷免</Text>
              ): null}
              </Box>
              ):(<Skeleton height='20px' width='20px' isLoaded={!loadingCurrentActivity}></Skeleton>)}
          </Center>
        </CardBody>
      </Card>
      <VotePowerTable/>
      </Box> 
      <Tabs>
        <TabList>
          {tabs?.map(tab=>{
            return (<Tab key={tab.id}>{tab.label}</Tab>)
          })}
        </TabList>
  <TabPanels>
    {/* 競選理事會 */}
    <TabPanel>
    <SimpleGrid
            columns={2}
            spacing={10}
            mt={'40px'}
            w = {'100%'}
          >
            {/*左半邊的卡片 */}
            <Box>
              <Card maxH={'80vh'} overflow={'scroll'}>
                <CardBody>
                  <Heading
                      size={'md'}
                      mb={'5px'}
                    >
                      競選活動資訊
                    </Heading>  
                    <Divider orientation='horizontal' />
                    <Flex py = '10px'>
                      <Text mr = '10px'>狀態: </Text>
                      {!loadingCurrentActivity? (
                        <Box>
                        {currentActivity == 1 ? (
                          <Text>開啟</Text>
                        ): ( <Text>關閉</Text>)}
                        </Box>
                        ):(<Skeleton height='20px' width='50px' isLoaded={!loadingCurrentActivity}></Skeleton>)}  
                    </Flex> 
                    <Flex py = '10px'>
                      <Text mr = '10px'>階段: </Text>
                      {!loadingCampaignPhase? (
                        <Box>
                        {campaignPhasePrint[campaignPhase]}
                        </Box>
                        ):(<Skeleton height='20px' width='100px' isLoaded={!loadingCampaignPhase}></Skeleton>)}  
                    </Flex > 
                    <Flex py = '10px'>
                      <Text mr = '10px'>參與門檻: </Text>
                      {!loadingVotePowerThreshold? (
                        <Box>
                        {parseInt(votePowerThreshold._hex)} Vote Powers
                        </Box>
                        ):(<Skeleton height='20px' width='30px' isLoaded={!loadingVotePowerThreshold}></Skeleton>)}  
                    </Flex> 
                    <Flex py = '10px'>
                      <Text mr = '10px'>最低獲票門檻: </Text>
                      {!loadingVotePowerPassThreshold? (
                        <Box>
                        {parseInt(votePowerPassThreshold._hex)} Vote Powers
                        </Box>
                        ):(<Skeleton height='20px' width='30px' isLoaded={!loadingVotePowerPassThreshold}></Skeleton>)}  
                    </Flex> 
                    <Flex py = '10px' mb='15px'>
                      <Text mr = '10px'>參選門檻: </Text>
                      {!loadingCandidateTokenThreshold? (
                        <Box>
                        {parseInt(candidateTokenThreshold._hex) / 1e18} Trend Tokens
                        </Box>
                        ):(<Skeleton height='20px' width='30px' isLoaded={!loadingCandidateTokenThreshold}></Skeleton>)}  
                    </Flex> 
                    {currentActivity == 1?(
                      <Box>
                        <Heading 
                      size={'md'}
                      mb={'5px'}>
                        本次競選資訊
                      </Heading>
                      <Divider orientation='horizontal' />
                      </Box>
                      
                        ):(<Skeleton height='20px' width='30px' isLoaded={!loadingCampaign}></Skeleton>)}  
                    {currentActivity == 1?(
                      <Flex py = '10px'>
                      <Text mr = '10px'>候選人上限: </Text>
                      {!loadingCampaign? (
                        <Box>
                        {parseInt(campaign[2]._hex)} 人
                        </Box>
                        ):(<Skeleton height='20px' width='30px' isLoaded={!loadingCampaign}></Skeleton>)}  
                    </Flex>                    
                    ): null}
                    {currentActivity == 1?(
                      <Flex py = '10px'>
                      <Text mr = '10px'>可當選人數: </Text>
                      {!loadingCampaign? (
                        <Box>
                        {parseInt(campaign[1]._hex)} 人
                        </Box>
                        ):(<Skeleton height='20px' width='30px' isLoaded={!loadingCampaign}></Skeleton>)}  
                    </Flex>
                     
                    ): null}
                    {currentActivity == 1?(
                      <Flex py = '10px'>
                      <Text mr = '10px'>目前參與Vote Powers: </Text>
                      {!loadingCampaign? (
                        <Box>
                        {parseInt(campaign[3]._hex)} Vote Powers
                        </Box>
                        ):(<Skeleton height='20px' width='30px' isLoaded={!loadingCampaign}></Skeleton>)}  
                    </Flex>
                     
                    ): null}
                    
                </CardBody>
              </Card>
            </Box>
            {/* 右半邊卡片 */}
            <Box>
              <Card maxH={'50vh'} overflow={'scroll'}>
                <CardBody>
                <Heading
                      size={'md'}
                      mb={'20px'}
                    >
                      參選候選人 {currentActivity == 1 ?(
                        <Participate />
                      ):null}
                    </Heading>
                    {!loadingCandidates?(
                      <Box>
                        {candidates && candidates?.map((candi, index)=>{
                          return (
                            <Card key={index} my={'10px'}>
                              <CardBody>
                              <Flex alignItems={'center'} mb='10px'>
                                  <Text fontWeight={'bold'} mr='10px'>
                                    得票： {parseInt(candi[3]._hex)}
                                  </Text>
                                </Flex>
                                <Flex alignItems={'center'} mb='10px'>
                                  <Text mr='10px'>
                                    暱稱： {candi[1]}
                                  </Text>
                                  <Tooltip
                                    label={`錢包地址：${candi[0]}`}
                                    bg={'gray.200'}
                                    color='black'
                                  >
                                    <InfoOutlineIcon />
                                  </Tooltip>
                                </Flex>
                                <Flex alignItems={'center'} mb='10px'>
                                  <Text mr='10px'>
                                    政見： {candi[2]}
                                  </Text>
                                </Flex>
                                {campaignPhase == 2 ? (
                                  <>
                                  <Text></Text>
                                  <Input
                                    bg={'gray.100'}
                                    maxLength= {4}
                                    
                                    width = '20%'
                                    onChange= {(e)=> setVotePower(e.target.value)}
                                  />
                                  <Web3Button
                                    contractAddress={COUNCIL_ADDRESS}
                                    action={async()=>{
                                      await contract.call('campaignVote', [index, votePower]);
                                      }
                                    }
                                    onSuccess={()=>{
                                      alert('投票成功')
                                      setVotePower(0)
                                    }}
                                    onError={(error)=>{
                                      alert(error)
                                    }}
                                  >
                                  投票
                                  </Web3Button>
                                </>
                                ):<Text fontWeight = {'bold'}>此階段無法投票</Text>}
                                
                              </CardBody>
                            </Card>
                            
                            
                          )
                        })}
                      </Box>
                    ):(
                      <Stack>
                      <Skeleton height={'100px'} />
                      <Skeleton height={'100px'} />
                      <Skeleton height={'100px'} />
                    </Stack>
                    )}


                </CardBody>
              </Card>
            </Box>
          </SimpleGrid>
    </TabPanel>
    {/* 競選理事會 */}
    <TabPanel>
    <SimpleGrid
            columns={2}
            spacing={10}
            mt={'40px'}
            w = {'100%'}
          >
            {/*左半邊的卡片 */}
            <Box>
              <Card maxH={'80vh'} overflow={'scroll'}>
                <CardBody>
                  <Heading
                      size={'md'}
                      mb={'10px'}
                    >
                      罷免活動資訊
                    </Heading> 
                    <Divider orientation='horizontal' />
                    <Flex py = '10px'>
                      <Text mr = '10px'>狀態: </Text>
                      {!loadingCurrentActivity? (
                        <Box>
                        {currentActivity == 2 ? (
                          <Text>開啟</Text>
                        ): ( <Text>關閉</Text>)}
                        </Box>
                        ):(<Skeleton height='20px' width='50px' isLoaded={!loadingCurrentActivity}></Skeleton>)}  
                    </Flex> 
                    <Flex py = '10px'>
                      <Text mr = '10px'>階段: </Text>
                      {!loadingRecallPhase? (
                        <Box>
                        {recallPhasePrint[recallPhase]}
                        </Box>
                        ):(<Skeleton height='20px' width='100px' isLoaded={!loadingRecallPhase}></Skeleton>)}  
                    </Flex > 
                    <Flex py = '10px' mb = '5px'>
                      <Text mr = '10px'>最低參與門檻: </Text>
                      {!loadingVotePowerThreshold? (
                        <Box>
                        {parseInt(votePowerThreshold._hex)} Vote Powers
                        </Box>
                        ):(<Skeleton height='20px' width='30px' isLoaded={!loadingVotePowerThreshold}></Skeleton>)}  
                    </Flex>
                    {currentActivity == 2?(
                     <Box>
                      <Heading 
                      size={'md'}
                      mb={'5px'}
                      >
                        本次罷免資訊
                      </Heading>
                      <Divider orientation='horizontal' />
                     </Box>
                      
                        ):(<Skeleton height='20px' width='30px' isLoaded={!loadingCampaign}></Skeleton>)}  
                    {currentActivity == 2?(
                      <Flex py='5px'>
                      <Text mr = '10px'>目前參與Vote Powers: </Text>
                      {!loadingRecall? (
                        <Box>
                        {parseInt(recall[2]._hex)} Vote Powers
                        </Box>
                        ):(<Skeleton height='20px' width='30px' isLoaded={!loadingRecall}></Skeleton>)}  
                    </Flex>
                     
                    ): null}
                </CardBody>
              </Card>
            </Box>
            {/* 右半邊卡片 */}
            <Box>
              <Card maxH={'80vh'} overflow={'scroll'}>
                <CardBody>
                <Heading
                  size={'md'}
                  mb={'20px'}
                >
                  遭罷免者
                </Heading>
                {currentActivity == 2?(
                      <Box>
                        <Card my={'10px'}>
                              <CardBody>
                                <Flex py = '10px'>
                                  <Text>對象： {recall[1]}</Text>
                                </Flex>
                                <Flex py = '10px'>
                                  <Text>得票： {parseInt(recall[2]._hex)}</Text>
                                </Flex>
                                {recallPhase == 1 ? (
                                  <Box py = '10px'>
                                  <Input
                                    bg={'gray.100'}
                                    maxLength= {4}
                                    value= {recallVotePower}
                                    width = '20%'
                                    onChange= {(e)=> setRecallVotePower(e.target.value)}
                                  />
                                  <Web3Button
                                    contractAddress={COUNCIL_ADDRESS}
                                    action={async()=>{
                                      await contract.call('recallVote', [recallVotePower]);
                                      }
                                    }
                                    onSuccess={()=>{
                                      alert('投票成功')
                                      setRecallVotePower(0)
                                    }}
                                    onError={(error)=>{
                                      alert(error)
                                      setRecallVotePower(0)
                                    }}
                                  >
                                  投票
                                  </Web3Button>
                                </Box>
                                ):<Text fontWeight = {'bold'}>此階段無法投票</Text>}
                              </CardBody>
                            </Card>
                      </Box>
                    ):(
                      null
                    )}

                </CardBody>
              </Card>
            </Box>
          </SimpleGrid>
    </TabPanel>
    
  </TabPanels>
</Tabs>
      </Container>
    </Box>
  );
}

function Participate() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('')
  const [brief, setBrief] = useState('')
  const {contract} = useContract(COUNCIL_ADDRESS);


  return (
    <>
      
      <Button colorScheme='blue' onClick={onOpen}>
        參選
      </Button>
      <Drawer  onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>參選</DrawerHeader>
          <DrawerBody>
          <Text>暱稱：</Text>
            <Flex>
              <Input
                bg={'gray.100'}
                maxLength= {20}
                value={name}
                onChange= {(e)=> setName(e.target.value)}
              />
            </Flex>
            <Text>政見：</Text>
            <Flex>
              <Textarea
                value={brief}
                size={'lg'}
                bg={'gray.100'}
                height = '500px'
                onChange= {(e)=>setBrief(e.target.value)}
              />
            </Flex>
              <Center>
            <Web3Button
              contractAddress={COUNCIL_ADDRESS}
              action={async()=>{
                await contract.call('participate', [name, brief]);
                }
              }
              onSuccess={()=>{
                alert('參選成功')
                setBrief('')
                setName('')
              }}
              onError={(error)=>{
                alert(error)
                setBrief('')
                setName('')
              }}
            >
            參選
            </Web3Button>
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

function VotePowerTable(){
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {contract} = useContract(COUNCIL_ADDRESS);
  const {
    data: level1,
    isLoading: loadingLevel1
  } = useContractRead(contract, 'getLevelOfVotePower', [0]);
  const {
    data: level2,
    isLoading: loadingLevel2
  } = useContractRead(contract, 'getLevelOfVotePower', [1]);
  const {
    data: level3,
    isLoading: loadingLevel3
  } = useContractRead(contract, 'getLevelOfVotePower', [2]);
  const {
    data: level4,
    isLoading: loadingLevel4
  } = useContractRead(contract, 'getLevelOfVotePower', [3]);
  const {
    data: level5,
    isLoading: loadingLevel5
  } = useContractRead(contract, 'getLevelOfVotePower', [4]);

  return (
    <>
      
      <Button colorScheme='blue' onClick={onOpen}>
        查詢Vote Powers
      </Button>
      <Drawer  onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Vote Powers</DrawerHeader>
          <DrawerBody>
          <Center>
          {!loadingLevel1 && !loadingLevel2 && !loadingLevel3 && !loadingLevel4 && !loadingLevel5? (
            <TableContainer>
            <Table variant='simple'>
              <TableCaption>Vote Power Table</TableCaption>
              <Thead>
                <Tr>
                  <Th>質押幣量</Th>
                  <Th><Text fontSize='8px' mr='10px'>票數</Text></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td><Text fontSize='8px' mr='10px'> {"<"} {Math.round(level1/1e18)}</Text></Td>
                  <Td><Text fontSize='8px' mr='10px'>0</Text></Td>
                </Tr>
                <Tr>
                  <Td><Text fontSize='8px' mr='10px'> {Math.round(level1/1e18)} ~ {Math.round(level2/1e18)} </Text></Td>
                  <Td><Text fontSize='8px' mr='10px'>1</Text></Td>
                </Tr>
                <Tr>
                  <Td><Text fontSize='8px' mr='10px'> {Math.round(level2/1e18)} ~ {Math.round(level3/1e18)} </Text></Td>
                  <Td><Text fontSize='8px' mr='10px'>4</Text></Td>
                </Tr>
                <Tr>
                  <Td><Text fontSize='8px' mr='10px'> {Math.round(level3/1e18)} ~ {Math.round(level4/1e18)} </Text></Td>
                  <Td><Text fontSize='8px' mr='10px'>9</Text></Td>
                </Tr>
                <Tr>
                  <Td><Text fontSize='8px' mr='10px'> {Math.round(level4/1e18)} ~ {Math.round(level5/1e18)} </Text></Td>
                  <Td><Text fontSize='8px' mr='10px'>16</Text></Td>
                </Tr>
                <Tr>
                  <Td><Text fontSize='8px' mr='10px'> {">"} {level5/1e18} </Text></Td>
                  <Td><Text fontSize='8px' mr='10px'>25</Text></Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          ):(
            <Stack>
                        <Skeleton height={'100px'} isLoaded = {!loadingLevel1} />
                        <Skeleton height={'100px'} isLoaded = {!loadingLevel3}/>
                        <Skeleton height={'100px'} isLoaded = {!loadingLevel5} />
            </Stack>
          )}
          
            
          </Center>

          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}


