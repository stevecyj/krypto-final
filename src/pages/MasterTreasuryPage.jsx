import { Stack, Container, Box, Flex, Text, Heading, SimpleGrid, CardBody, Card, Select, Input, Center, Skeleton } from '@chakra-ui/react';

import { useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import {NFT_TREASURY_ADDRESS} from '../const/contractAddress'
import { useState} from 'react'
import {transactionTypeOptionsForMaster, transactionTypePrintForMaster} from '../data/data'


export default function MasterTreasuryPage() {
  const {contract} = useContract(NFT_TREASURY_ADDRESS);
  const [transactionType, setTransactionType] = useState(0);
  const [buyToken, setBuyToken] = useState('');
  const [saleToken, setSaleToken] = useState('');
  const [tokenAmount, setTokenAmount] = useState(0);
  const [ethValue, setEthValue] = useState(0);
  var buyAddressPath = new Array();
  buyAddressPath.push("0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6");
  var saleAddressPath = new Array();
//getTxRequireConfirmedNum
  const {
    data: transactions,
    isLoading: loadingTransactions
  } = useContractRead(contract, 'getAllTransactions');

  const {
    data: confirmNum
  } = useContractRead(contract, 'getTxRequireConfirmedNum');

  const {
    data: owners,
    isLoading: loadingOwners
  } = useContractRead(contract, 'getOwner');

  const {
    data: rewards,
    isLoading: loadingRewards
  } = useContractRead(contract, 'getRewardContracts');



  return (
    <Box bg='#FEFEFE' w={'100%'} h={'100%'}>
      <Center>
        <Heading>Master Treasury</Heading>
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
            rows={3}
            spacing={10}
            mt={'40px'}
            w = {'100%'}
          >
            {/*新交易 */}
            <Box>
              <Card maxH={'50vh'} overflow={'scroll'}>
                  <CardBody>
                      <Heading
                        size={'md'}
                        mb={'20px'}
                      >
                        新交易
                      </Heading>
                      <Text
                        fontSize={'lg'}
                        py={'10px'}
                      >
                        交易種類
                      </Text>
                      <Stack spacing={2}>
                      <Select  
                          placeholder="請選擇"
                          size='md' 
                          value = {transactionType}
                          onChange={(e)=> setTransactionType(e.target.value)}
                        >
                          {transactionTypeOptionsForMaster.map((tx)=>{
                            return (<option key= {tx.id} value={tx.value} label= {tx.label}></option>)
                          })}
                         </Select>
                      </Stack>
                      {transactionType == 0?(
                        <>
                          <Text
                          fontSize={'xl'}
                          py={'10px'}
                          >
                          投資項目地址
                          </Text>
                          <Input
                            bg={'gray.100'}
                            maxLength= {100}
                            value={buyToken}
                            onChange= {(e)=> {
                              setBuyToken(e.target.value)
                            }
                          }
                          />
                          <Text
                          fontSize={'xl'}
                          py={'10px'}
                          >
                          投資ETH數量
                          </Text>
                          <Input
                            bg={'gray.100'}
                            maxLength= {100}
                            value={ethValue}
                            onChange= {(e)=> {
                              setEthValue(e.target.value)
                            }
                          }
                          />
                        </>
                      ): null}
                      {transactionType == 1?(
                        <>
                          <Text
                          fontSize={'xl'}
                          py={'10px'}
                          >
                          賣出項目地址
                          </Text>
                          <Input
                            bg={'gray.100'}
                            maxLength= {100}
                            value={saleToken}
                            onChange= {(e)=> {
                              setSaleToken(e.target.value)
                            }
                          }
                          />
                          <Text
                          fontSize={'xl'}
                          py={'10px'}
                          >
                          賣出幣量
                          </Text>
                          <Input
                            bg={'gray.100'}
                            maxLength= {100}
                            value={tokenAmount}
                            onChange= {(e)=> {
                              setTokenAmount(e.target.value)
                            }
                          }
                          />
                        </>
                      ) : null}

                      <Center
                        py={'10px'}>
                        <Web3Button
                          contractAddress={NFT_TREASURY_ADDRESS}
                          action={async()=>{
                            if (transactionType == 0){
                              await buyAddressPath.push(buyToken)
                              await contract.call('submitTransaction', [transactionType, buyAddressPath, ethValue, 0])
                            }else if (transactionType == 1){
                              await saleAddressPath.push(saleToken)
                              await saleAddressPath.push("0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6");
                              await contract.call('submitTransaction', [transactionType, saleAddressPath, tokenAmount, 0])
                            }
                            //await contract.call('submitTransaction', [transactionType, buyAddressPath, ethValue, tokenAmount, 0])
                            
                            buyAddressPath = new Array();
                            buyAddressPath.push("0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6");
                            saleAddressPath = new Array();

                          }}
                          onSuccess={()=>{
                            alert('成功提交交易')
                            setBuyToken('')
                            setEthValue(0)
                            setTokenAmount(0)
                            setSaleToken('')
                          }}
                          onError= {(error)=>{
                            alert(error)
                            setBuyToken('')
                            setEthValue(0)
                            setTokenAmount(0)
                            setSaleToken('')
                          }}
                        >
                          發起交易
                        </Web3Button>
                      </Center>

                  </CardBody>
              </Card>
            </Box>
            {/*交易清單 */}
            <Box>
              <Card maxH={'50vh'} overflow={'scroll'}>
                  <CardBody>
                      <Heading
                        size={'md'}
                        mb={'20px'}
                      >
                        交易清單
                      </Heading>
                      {!loadingTransactions ?
                    (
                      <Box>

                        {transactions && transactions?.filter(tx => !tx[4]).map((tx, index) => {
                          if (tx[0] == 0){
                            return (
                              <Card key={index} my={'10px'}>
                                <CardBody>
                                <Flex alignItems={'center'} mb='10px'>
                                    <Text fontWeight={'bold'} mr='10px'>
                                      種類： {transactionTypePrintForMaster[tx[0]]}
                                    </Text>
                                  </Flex> 
                                  <Flex alignItems={'center'} mb='10px'>                                
                                    <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                    投資幣：{tx[1][1]}
                                    </Text>
                                  </Flex> 
                                  <Flex alignItems={'center'} mb='10px'>                                
                                    <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                    投資份額：{parseInt(tx[2]._hex) / 1e18} ETH
                                    </Text>
                                  </Flex> 
                                  <Flex alignItems={'center'} mb='10px'>                                
                                    <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                    確認次數：{parseInt(tx[5]._hex) } 次
                                    </Text>
                                  </Flex>
                                  <Flex alignItems={'center'} mb='10px'>          
                                  {tx[4]? (
                                    <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                    是否執行： 是
                                    </Text>
                                  ): (
                                    <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                    是否執行： 否
                                    </Text>
                                  )}                       
                                    
                                  </Flex>
                                  {!tx[4]?(
                                    <>
                                    <Web3Button
                                    contractAddress={NFT_TREASURY_ADDRESS}
                                    action={async()=>{
                                      await contract.call('confirmTransaction', [index]);
                                      }
                                    }
                                    onSuccess={()=>{
                                      alert('確認交易')
                                      
                                    }}
                                    onError={(error)=>{
                                      alert(error)
                                    }}
                                  >
                                  確認
                                  </Web3Button>
                                  <span >
                                  <Web3Button
                                    contractAddress={NFT_TREASURY_ADDRESS}
                                    action={async()=>{
                                      await contract.call('revokeTransactionConfirmed', [index]);
                                      }
                                    }
                                    onSuccess={()=>{
                                      alert('取消確認')
                                      
                                    }}
                                    onError={(error)=>{
                                      alert(error)
                                    }}
                                  >
                                  取消確認
                                  </Web3Button>
                                  </span>
                                  </>
                                  ): null}
                                
                                  {(parseInt(tx[5]._hex) >=confirmNum && !tx[4])?(
                                    <>
                                      <Web3Button
                                      contractAddress={NFT_TREASURY_ADDRESS}
                                      action={async()=>{
                                        await contract.call('executeTransaction', [index]);
                                        }
                                      }
                                      onSuccess={()=>{
                                        alert('完成執行交易')
                                        
                                      }}
                                      onError={(error)=>{
                                        alert(error)
                                      }}
                                    >
                                    執行
                                    </Web3Button>
                                    </>
                                  ): null}                                                   
                                </CardBody>
                              </Card>
                            )
                          }else if (tx[0] == 1){
                            return (
                              <Card key={index} my={'10px'}>
                                <CardBody>
                                <Flex alignItems={'center'} mb='10px'>
                                    <Text fontWeight={'bold'} mr='10px'>
                                      種類： {transactionTypePrintForMaster[tx[0]]}
                                    </Text>
                                  </Flex> 
                                  <Flex alignItems={'center'} mb='10px'>                                
                                    <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                    賣出幣：{tx[1][0]}
                                    </Text>
                                  </Flex> 
                                  <Flex alignItems={'center'} mb='10px'>                                
                                    <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                    賣出幣量：{parseInt(tx[2]._hex) / 1e18} 顆
                                    </Text>
                                  </Flex> 
                                  <Flex alignItems={'center'} mb='10px'>                                
                                    <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                    確認次數：{parseInt(tx[5]._hex) } 次
                                    </Text>
                                  </Flex>
                                  <Flex alignItems={'center'} mb='10px'>                                
                                  {tx[4]? (
                                    <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                    是否執行： 是
                                    </Text>
                                  ): (
                                    <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                    是否執行： 否
                                    </Text>
                                  )}  
                                  </Flex>
                                  {!tx[4]?(
                                    <>
                                    <Web3Button
                                    contractAddress={NFT_TREASURY_ADDRESS}
                                    action={async()=>{
                                      await contract.call('confirmTransaction', [index]);
                                      }
                                    }
                                    onSuccess={()=>{
                                      alert('確認交易')
                                      
                                    }}
                                    onError={(error)=>{
                                      alert(error)
                                    }}
                                  >
                                  確認
                                  </Web3Button>
                                  <span >
                                  <Web3Button
                                    contractAddress={NFT_TREASURY_ADDRESS}
                                    action={async()=>{
                                      await contract.call('revokeTransactionConfirmed', [index]);
                                      }
                                    }
                                    onSuccess={()=>{
                                      alert('取消確認')
                                      
                                    }}
                                    onError={(error)=>{
                                      alert(error)
                                    }}
                                  >
                                  取消確認
                                  </Web3Button>
                                  </span>
                                  </>
                                  ): null}
                                  {(parseInt(tx[5]._hex) >=confirmNum && !tx[4])?(
                                    <>
                                      <Web3Button
                                      contractAddress={NFT_TREASURY_ADDRESS}
                                      action={async()=>{
                                        await contract.call('executeTransaction', [index]);
                                        }
                                      }
                                      onSuccess={()=>{
                                        alert('完成執行交易')
                                        
                                      }}
                                      onError={(error)=>{
                                        alert(error)
                                      }}
                                    >
                                    執行
                                    </Web3Button>
                                    </>
                                  ): null}                                                   
                                </CardBody>
                              </Card>
                            )
                          }
                          
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
            {/*已執行交易 */}
            <Box>
              <Card maxH={'50vh'} overflow={'scroll'}>
                  <CardBody>
                      <Heading
                        size={'md'}
                        mb={'20px'}
                      >
                        已執行交易
                      </Heading>
                      {!loadingTransactions ? (
                        <Box>
                          {transactions && transactions?.filter(tx => tx[4]).map((tx, index)=>{
                            if (tx[0] == 0){
                              return (
                                <Card key={index} my={'10px'}>
                                  <CardBody>
                                  <Flex alignItems={'center'} mb='10px'>
                                      <Text fontWeight={'bold'} mr='10px'>
                                        種類： {transactionTypePrintForMaster[tx[0]]}
                                      </Text>
                                    </Flex> 
                                    <Flex alignItems={'center'} mb='10px'>                                
                                      <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                      投資幣：{tx[1][1]}
                                      </Text>
                                    </Flex> 
                                    <Flex alignItems={'center'} mb='10px'>                                
                                      <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                      投資份額：{parseInt(tx[2]._hex) / 1e18} ETH
                                      </Text>
                                    </Flex> 
                                    <Flex alignItems={'center'} mb='10px'>                                
                                      <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                      確認次數：{parseInt(tx[5]._hex) } 次
                                      </Text>
                                    </Flex>
                                    <Flex alignItems={'center'} mb='10px'>          
                                    {tx[4]? (
                                      <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                      是否執行： 是
                                      </Text>
                                    ): (
                                      <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                      是否執行： 否
                                      </Text>
                                    )}                         
                                    </Flex>                                               
                                  </CardBody>
                                </Card>
                              )
                            }else if (tx[0] == 1){
                              return (
                                <Card key={index} my={'10px'}>
                                  <CardBody>
                                  <Flex alignItems={'center'} mb='10px'>
                                      <Text fontWeight={'bold'} mr='10px'>
                                        種類： {transactionTypePrintForMaster[tx[0]]}
                                      </Text>
                                    </Flex> 
                                    <Flex alignItems={'center'} mb='10px'>                                
                                      <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                      賣出幣：{tx[1][1]}
                                      </Text>
                                    </Flex> 
                                    <Flex alignItems={'center'} mb='10px'>                                
                                      <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                      賣出幣量：{parseInt(tx[3]._hex) / 1e18} 顆
                                      </Text>
                                    </Flex> 
                                    <Flex alignItems={'center'} mb='10px'>                                
                                    {tx[4]? (
                                      <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                      是否執行： 是
                                      </Text>
                                    ): (
                                      <Text fontWeight={'bold'} fontSize='' mr='10px'>
                                      是否執行： 否
                                      </Text>
                                    )}  
                                    </Flex>
                                                                                       
                                  </CardBody>
                                </Card>
                              )
                            }
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
            {/*獎勵領取 */}
            <Box>
              <Card maxH={'50vh'} overflow={'scroll'}>
                  <CardBody>
                      <Heading
                        size={'md'}
                        mb={'20px'}
                      >
                        獎勵領取
                      </Heading>
                      {!loadingRewards? (
                        <Box>
                          {rewards && rewards?.map((reward, index)=>{
                            return (
                              <Flex>
                                <Text 
                                  fontSize={'xl'}
                                  py={'10px'}
                                  px= {'130px'}>
                                第{index+1}個紅包
                                </Text>
                                
                                <Web3Button
                                  contractAddress={NFT_TREASURY_ADDRESS}
                                  action={async()=>{
                                    await console.log("Thirdweb一定要上傳的合約才可以呼叫，所以這邊不能領！");
                                  }
                                }
                                onSuccess={()=>{
                                  alert('領取成功: Thirdweb一定要上傳的合約才可以呼叫，所以這編無法實際領取！')
                                }}
                                onError= {(error)=>{
                                  alert(error)
                                }}
                              >
                                領紅包
                                </Web3Button>
                              </Flex>
                              
                              
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
            {/*Owners */}
            <Box>
              <Card maxH={'50vh'} overflow={'scroll'}>
                  <CardBody>
                      <Heading
                        size={'md'}
                        mb={'20px'}
                      >
                        Owners
                      </Heading>
                      
                      {!loadingOwners? (
                        <Box>
                          {owners && owners?.map((own, index)=>{
                            return (<Text key={index}>{index+1}. {own}</Text>)
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
        </Flex>
      </Container>
    </Box>
  );
}

