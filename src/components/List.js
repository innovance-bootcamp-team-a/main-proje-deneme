import { Flex, Input, Text } from '@chakra-ui/react';
import React from 'react';

import Icon from './Icon';

import add from '../icons/icons-add.png';

export default function List({
  title,
  showIcon,
  value,
  onChange,
  handler,
  children,
}) {
  return (
    <Flex px="45px" width="330px" flexDirection="column" flexGrow="1">
      <Flex alignItems="center">
        <Text fontSize="title">{title}</Text>
        {showIcon && (
          <Flex ml="auto" alignItems="center">
            <Input
              value={value}
              onChange={onChange}
              placeholder="Create a room"
              borderColor="purple_53"
              w="140px"
              h="33px"
              mr="10px"
            />
            <Icon size="small" src={add} handler={handler} />
          </Flex>
        )}
      </Flex>
      <Flex flexDirection="column">{children}</Flex>
    </Flex>
  );
}
