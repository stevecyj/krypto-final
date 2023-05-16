import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text textAlign={'center'} color={useColorModeValue('gray.600', 'gray.400')} fontSize={'sm'}>
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({ src, name, title }: { src: string; name: string; title: string }) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} size='2xl'/>
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function WithSpeechBubbles() {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading>Our Team</Heading>
          <Text></Text>
        </Stack>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 10, md: 4, lg: 10 }}>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Trend DAO 核心開發人員</TestimonialHeading>
              <TestimonialText>
                負責智能合約核心程式開發及前端治理、國庫畫面開發，是一個喜好接觸新技術的開發瘋子。
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://hackmd.io/_uploads/Sk1Pb34Nh.jpg'
              }
              name={'Paul'}
              title={'Founder'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>輔助開發 & NFT製圖</TestimonialHeading>
              <TestimonialText>
                輔助智能合約開發及前端空投頁面開發，同時也負責Trend Master NFT的製圖，是開發時的好夥伴及藝術總監。
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://i.imgur.com/eUF4nmh.png'
              }
              name={'Andrew'}
              title={'Founder'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>前端開發</TestimonialHeading>
              <TestimonialText>
                主要負責前端Token、NFT及質押頁面的程式撰寫，並協助前頁面畫面美化，是非常給力的前端工程師。
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://i.imgur.com/Yslc9A9.png'
              }
              name={'Steve'}
              title={'Founder'}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
}
