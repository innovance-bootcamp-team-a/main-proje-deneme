import { Flex, Input, Text } from '@chakra-ui/react';
import React from 'react';

import Icon from './Icon';

import send from '../icons/icons-send.png';

export default function Chat({ children }) {
  return (
    <Flex
      flexDirection="column"
      flexGrow="5"
      borderLeft="2px solid #F8F8F8"
      borderRight="2px solid #F8F8F8"
      px="35px"
    >
      <Flex>
        <Text fontSize="title">Teknoloji</Text>
      </Flex>

      <Flex flexDir="column" h="calc(100vh - 270px)" mt="40px">
        {children}
      </Flex>

      <Flex alignItems="center">
        <Input
          size="md"
          placeholder="Write a message..."
          borderColor="purple_53"
          boxShadow="none"
          fontSize="body_1"
        />
        <Icon src={send} size="large" ml="18px" />
      </Flex>
    </Flex>
  );
}
