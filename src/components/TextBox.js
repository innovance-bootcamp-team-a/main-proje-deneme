import React from 'react';

import { Flex, Avatar, Text } from '@chakra-ui/react';
import TextArea from './TextArea';

export default function TextBox({ user, text, avatar, ...props }) {
  return (
    <Flex alignItems="flex-end" mb="17px" {...props}>
      <Avatar
        w="large"
        h="large"
        src={avatar}
        borderRadius="7px"
        name="Deneme"
      />
      <Flex flexDir="column" ml="10px">
        <Text fontSize="subtitle_1" pl="15px">
          {user}
        </Text>
        <TextArea>{text}</TextArea>
      </Flex>
    </Flex>
  );
}
