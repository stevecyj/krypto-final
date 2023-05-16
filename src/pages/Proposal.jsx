import { ReactNode, useContext } from 'react';
import {
  Container,
  Box,
  Flex,
  Text,
  Center,
  SimpleGrid,
  Card, CardBody,
  Heading,
  Skeleton,
  Input,
  Textarea,
  Stack,
  Tooltip,
  Select,
  FormLabel
} from '@chakra-ui/react'


import { InfoOutlineIcon } from '@chakra-ui/icons'
import { ConnectWallet, useContract, useContractRead, Web3Button, useContractWrite } from "@thirdweb-dev/react";
import {PROPOSAL_ADDRESS} from '../const/contractAddress'
import {useEffect, useState} from 'react'
import {ethers} from 'ethers'
import {proposalTypeOptions, councilOptions, proposalOptions, treasuryOptions, masterTreasuryOptions, typePrint, detailPrint, proposalState} from '../data/data'

function timestampToString(timestamp){
  const date = new Date(timestamp);
  return date.toLocaleString();
}


export default function ProposalPage() {

  const [description, setDescription] = useState('');

  const {contract} = useContract(PROPOSAL_ADDRESS);

  const [proposalType, setProposalType] = useState('');
  const [detail, setDetail] = useState(100);
  const [title, setTitle] = useState('');
  var uintArr = new Array();
  var addrArr = new Array();
  const [cadnidateNum, setCandidateNum] = useState(0);
  const [winNum, setWinNum] = useState(0);
  const [recallAddr, setRecallAddr] = useState('');
  const [candidateTokenThreshold, setCandidateTokenThreshold] = useState('');
  const [campaignParticipateNum, setcampaignParticipateNum] = useState(0);
  const [councilMemberLimit, setCouncilMemberLimit] = useState(0);
  const [level1, setLevel1] = useState(0);
  const [level2, setLevel2] = useState(0);
  const [level3, setLevel3] = useState(0);
  const [level4, setLevel4] = useState(0);
  const [level5, setLevel5] = useState(0);
  const [passThreshold, setPassThreshold] = useState(0);
  const [campaignPrepareTime, setCampaignPrepareTime] = useState(0);
  const [campaignCandidateTime, setCampaignCandidateTime] = useState(0);
  const [campaignVotingTime, setCampaignVotingTime] = useState(0);
  const [recallPrepareTime, setRecallPrepareTime] = useState(0);
  const [recallVotingTime, setRecallVotingTime] = useState(0);
  const [proposerTokenStakingThreshold, setProposerTokenStakingThreshold] = useState(0);
  const [votePowerThreshold, setVotePowerThreshold] = useState(0);
  const [proposePrepareTime, setProposePrepareTime] = useState(0);
  const [proposeVotingTime, setProposeVotingTime] = useState(0);
  const [treasuryConfirmNum, setTreasuryConfirmNum] = useState(0);
  const [masterTreasuryConfirmNum, setMasterTreasuryConfirmNum] = useState(0);
  const [votePower, setVotePower] = useState(0);

  const {
    data: props,
    isLoading: loadingProps
  } = useContractRead(contract, 'getAllProposal');


  useEffect(()=>{
    console.log('contract', contract)
  }, [contract])

  return (
    <Box bg='#FEFEFE' w={'100%'} h={'100%'}>
      <Center>
        <Heading>Proposal</Heading>
      </Center>
      <Container maxW={'1200px'} w={'100%'}>
        <Flex
          w = {'100%'}
          alignItems= {'center'}
          justifyContent = {'speace-between'}
          py= {'20px'}
          height='100px'
          flexDirection={'column'}
        >
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
                      mb={'20px'}
                    >
                      新提案
                    </Heading>
                
                    <Text
                      fontSize={'xl'}
                      py={'10px'}
                    >
                      提案種類
                    </Text>
                    <Stack spacing={2}>
                      <Select  
                        placeholder="請選擇"
                        size='md' 
                        value = {proposalType}
                        onChange={(e)=> setProposalType(e.target.value)}
                      >
                          {proposalTypeOptions.map((pType)=>{
                              return (<option key= {pType.id} value={pType.value} label= {pType.label}>{pType.label}</option>)
                          })}
                        </Select>
                      <Select 
                        placeholder='請選擇' 
                        size='md' 
                        value= {detail}
                        onChange = {(e)=>setDetail(e.target.value)}
                      >
                        {proposalType == "council"? 
                          councilOptions.map((councilProposal)=>{
                            return (<option key= {councilProposal.id} value={councilProposal.value} label= {councilProposal.label}></option>);
                          }) : null
                        }
                        {proposalType == "proposal"? 
                          proposalOptions.map((proposal)=>{
                            return (<option key= {proposal.id} value={proposal.value} label= {proposal.label}></option>);
                          }) : null
                        }
                        {proposalType == "treasury"? 
                          treasuryOptions.map((treasury)=>{
                            return (<option key= {treasury.id} value={treasury.value} label= {treasury.label}></option>);
                          }) : null
                        }
                        {proposalType == "masterTreasury"? 
                          masterTreasuryOptions.map((masterTreasury)=>{
                            return (<option key= {masterTreasury.id} value={masterTreasury.value} label= {masterTreasury.label}></option>);
                          }) : null
                        }
                      </Select>
                    </Stack>
                    <Text
                      fontSize={'xl'}
                      py={'10px'}
                    >
                      標題
                    </Text>
                    <Input
                      bg={'gray.100'}
                      maxLength= {16}
                      value={title}
                      onChange= {(e)=> setTitle(e.target.value)}
                    />
                  
                    <Text
                      fontSize={'xl'}
                      py={'10px'}
                    >
                      描述
                    </Text>
                    <Textarea
                      value={description}
                      size={'lg'}
                      bg={'gray.100'}
                      onChange= {(e)=>setDescription(e.target.value)}

                    />
                    {detail == 0 ? 
                      (<>
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        當選人數
                        </Text>
                        <Input
                          bg={'gray.100'}
                          maxLength= {16}
                          value={winNum}
                          onChange= {(e)=> {
                            setWinNum(e.target.value);
                          }
                        }
                        />
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        候選人數
                        </Text>
                        <Input
                          bg={'gray.100'}
                          maxLength= {16}
                          value={cadnidateNum}
                          onChange= {(e)=> {
                            setCandidateNum(e.target.value)
                          }
                        }
                        />
                      </>
                      ): null
                    }
                    {detail == 1 ? 
                      (<>
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        罷免對象(錢包地址)
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={recallAddr}
                          onChange= {(e)=> {
                            setRecallAddr(e.target.value);
                            addrArr.push(e.target.value);
                          }
                        }
                        />
                      </>
                      ): null
                    }
                    {detail == 2 ? 
                      (<>
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        質押門檻
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={candidateTokenThreshold}
                          onChange= {(e)=> {
                            setCandidateTokenThreshold(e.target.value);
                          }
                        }
                        />
                      </>
                      ): null
                    }
                    {detail == 3 ? 
                      (<>
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        最低參與投票門檻
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={campaignParticipateNum}
                          onChange= {(e)=> {
                            setcampaignParticipateNum(e.target.value);
                          }
                        }
                        />
                      </>
                      ): null
                    }
                    {detail == 4 ? 
                      (<>
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        理事會人數上限
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={councilMemberLimit}
                          onChange= {(e)=> {
                            setCouncilMemberLimit(e.target.value);
                          }
                        }
                        />
                      </>
                      ): null
                    }
                    {detail == 5 ? 
                      (<>
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        Level1
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={level1}
                          onChange= {(e)=> {
                            setLevel1(e.target.value);
                          }
                        }
                        />
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        Level2
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={level2}
                          onChange= {(e)=> {
                            setLevel2(e.target.value);
                          }
                        }
                        />
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        Level3
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={level3}
                          onChange= {(e)=> {
                            setLevel3(e.target.value);
                          }
                        }
                        />
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        Level4
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={level4}
                          onChange= {(e)=> {
                            setLevel4(e.target.value);
                          }
                        }
                        />
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        Level5
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={level5}
                          onChange= {(e)=> {
                            setLevel5(e.target.value);
                          }
                        }
                        />
                      </>
                      ): null
                    }
                    {detail == 6 ? 
                      (<>
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        當選獲票最低門檻
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={passThreshold}
                          onChange= {(e)=> {
                            setPassThreshold(e.target.value);
                          }
                        }
                        />
                      </>
                      ): null
                    }
                    {detail == 7 ? 
                      (<>
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        準備時間
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={campaignPrepareTime}
                          onChange= {(e)=> {
                            setCampaignPrepareTime(e.target.value);
                          }
                        }
                        />
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        參選時間
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={campaignCandidateTime}
                          onChange= {(e)=> {
                            setCampaignCandidateTime(e.target.value);
                          }
                        }
                        />
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        投票時間
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={campaignVotingTime}
                          onChange= {(e)=> {
                            setCampaignVotingTime(e.target.value);
                          }
                        }
                        />
                      </>
                      ): null
                    }
                    {detail == 8 ? 
                      (<>
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        準備時間
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={recallPrepareTime}
                          onChange= {(e)=> {
                            setRecallPrepareTime(e.target.value);
                          }
                        }
                        />
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        投票時間
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={recallVotingTime}
                          onChange= {(e)=> {
                            setRecallVotingTime(e.target.value);
                          }
                        }
                        />
                      </>
                      
                      ): null
                    }
                    {detail == 9 ? 
                      (<>
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        質押門檻
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={proposerTokenStakingThreshold}
                          onChange= {(e)=> {
                            setProposerTokenStakingThreshold(e.target.value);
                          }
                        }
                        />
                      </>
                      ): null
                    }
                    {detail == 10 ? 
                      (<>
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        通過門檻
                        </Text>
                        <Input
                          bg={'gray.100'}
                          onChange= {(e)=> {
                            setVotePowerThreshold(e.target.value);
                          }
                        }
                        />
                      </>
                      ): null
                    }
                    {detail == 11 ? 
                      (<>
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        準備時間
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={proposePrepareTime}
                          onChange= {(e)=> {
                            setProposePrepareTime(e.target.value);
                          }
                        }
                        />
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        投票時間
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={proposeVotingTime}
                          onChange= {(e)=> {
                            setProposeVotingTime(e.target.value);
                          }
                        }
                        />
                      </>
                      ): null
                    }
                    {detail == 12 ? 
                      (<>
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        Level1
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={level1}
                          onChange= {(e)=> {
                            setLevel1(e.target.value);
                          }
                        }
                        />
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        Level2
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={level2}
                          onChange= {(e)=> {
                            setLevel2(e.target.value);
                          }
                        }
                        />
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        Level3
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={level3}
                          onChange= {(e)=> {
                            setLevel3(e.target.value);
                          }
                        }
                        />
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        Level4
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={level4}
                          onChange= {(e)=> {
                            setLevel4(e.target.value);
                          }
                        }
                        />
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        Level5
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={level5}
                          onChange= {(e)=> {
                            setLevel5(e.target.value);
                          }
                        }
                        />
                      </>
                      ): null
                    }
                    {detail == 13 ? 
                      (<>
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        確認次數
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={treasuryConfirmNum}
                          onChange= {(e)=> {
                            setTreasuryConfirmNum(e.target.value);
                          }
                        }
                        />
                      </>
                      ): null
                    }
                    {detail == 14 ? 
                      (<>
                        <Text
                          fontSize={'xl'}
                          py={'10px'}
                        >
                        確認次數
                        </Text>
                        <Input
                          bg={'gray.100'}
                          value={masterTreasuryConfirmNum}
                          onChange= {(e)=> {
                            setMasterTreasuryConfirmNum(e.target.value);
                          }
                        }
                        />
                      </>
                      ): null
                    }
 
                    <Box mt={'20px'}>
                      <Center>
                        <Web3Button
                          contractAddress={PROPOSAL_ADDRESS}
                          action={async()=>{
                            if (detail == 0){
                              await uintArr.push(winNum);
                              await uintArr.push(cadnidateNum);
                            }else if (detail == 1){
                              await addrArr.push(recallAddr);
                            }else if (detail == 2){
                              await uintArr.push(candidateTokenThreshold);
                            }else if (detail == 3){
                              await uintArr.push(campaignParticipateNum);
                            }else if (detail == 4){
                              await uintArr.push(councilMemberLimit);
                            }else if (detail == 5){
                              await uintArr.push(level1);
                              await uintArr.push(level2);
                              await uintArr.push(level3);
                              await uintArr.push(level4);
                              await uintArr.push(level5);
                            }else if (detail == 6){
                              await uintArr.push(passThreshold);
                            }else if (detail == 7){
                              await uintArr.push(campaignPrepareTime);
                              await uintArr.push(campaignCandidateTime);
                              await uintArr.push(campaignVotingTime);
                            }else if (detail == 8){
                              await uintArr.push(recallPrepareTime);
                              await uintArr.push(recallVotingTime);
                            }else if (detail == 9){
                              await uintArr.push(proposerTokenStakingThreshold);
                            }else if (detail == 10){
                              await uintArr.push(votePowerThreshold);
                            }else if (detail == 11){
                              await uintArr.push(proposePrepareTime);
                              await uintArr.push(proposeVotingTime);
                            }else if (detail == 12){
                              await uintArr.push(level1);
                              await uintArr.push(level2);
                              await uintArr.push(level3);
                              await uintArr.push(level4);
                              await uintArr.push(level5);
                            }else if (detail == 13){
                              await uintArr.push(treasuryConfirmNum);
                            }else if (detail == 14){
                              await uintArr.push(masterTreasuryConfirmNum);
                            }

                            await contract.call('propose', [detail, title, description, uintArr, addrArr, Math.ceil(Date.now()/1000)+60] )
                            uintArr = new Array();
                            addrArr = new Array();
                          }}
                          onSuccess={()=>{
                            alert('成功提案')
                            setTitle('')
                            setDescription('');
                          }}
                          onError= {(error)=>{
                            alert(error)
                          }}
                        >
                          發起提案
                        </Web3Button>
                      </Center>
                    </Box>

                    
                </CardBody>
              </Card>
            </Box>
            {/* 右半邊卡片 */}
            <Box>
              <Card maxH={'80vh'} overflow={'scroll'}>
                <CardBody>
                  <Text fontWeight={'bold'}>全部提案</Text>
                  {!loadingProps ?
                    (
                      <Box>
                        {props && props?.map((prop, index) => {
                          return (
                            <Card key={index} my={'10px'}>
                              <CardBody>
                              <Flex alignItems={'center'} mb='10px'>
                                  <Text fontWeight={'bold'} mr='10px'>
                                    種類： {typePrint[prop[0]]}
                                  </Text>
                                </Flex>
                                <Flex alignItems={'center'} mb='10px'>
                                  <Text fontWeight={'bold'} mr='10px'>
                                    細項： {detailPrint[prop[0]]}
                                  </Text>
                                </Flex>
                                <Flex alignItems={'center'} mb='10px'>
                                  <Text fontWeight={'bold'} mr='10px'>
                                    標題： {prop[3]}
                                  </Text>
                                </Flex>
                                <Flex alignItems={'center'} mb='10px'>
                                  <Text fontWeight={'bold'} mr='10px'>
                                    描述： {prop[4]}
                                  </Text>
                                </Flex>
                                <Flex alignItems={'center'} mb='10px'>
                                  <Text fontWeight={'bold'} mr='10px'>
                                    狀態： {proposalState[prop[1]]}
                                  </Text>
                                </Flex>

                                <Flex alignItems={'center'} mb='10px'>
                                  <Text fontWeight={'bold'} mr='10px'>
                                    得票： {parseInt(prop[7]._hex)}
                                  </Text>
                                </Flex>
                                
                                <Flex alignItems={'center'} mb='10px'>
                                  {prop[1] == 1 ? (
                                    <>
                                    <Text></Text>
                                    <Web3Button
                                      contractAddress={PROPOSAL_ADDRESS}
                                      action={async()=>{
                                        await contract.call('proposalVote', [index]);
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
                                  </>) : null
                                  }
                                </Flex>
                                <Flex alignItems={'center'} mb='10px'>
                                  <Text fontSize='xs' mr='10px'>
                                    {prop[2]}
                                  </Text>
                                </Flex>
                                <Flex alignItems={'center'} mb='10px'>
                                  <Text fontSize='xs' mr='10px'>
                                    {timestampToString(parseInt(prop[8]._hex)*1000)}
                                  </Text>
                                </Flex>                           
                              </CardBody>
                            </Card>
                          )
                        })}
                      </Box>
                    ) : (
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
          
        </Flex>
      </Container>
    </Box>
  );
}


