import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

import Icon from './Icon';

import search from '../icons/icons-search.png';
import add from '../icons/icons-add.png';

export default function List({ title, showIcon, children }) {
  return (
    <Flex px="45px" width="auto" flexDirection="column" flexGrow="1">
      <Flex>
        <Text fontSize="title">{title}</Text>
        {showIcon && (
          <Flex ml="auto">
            <Icon mr="10px" size="small" src={search} />
            <Icon size="small" src={add} />
          </Flex>
        )}
      </Flex>
      <Flex flexDirection="column">{children}</Flex>
    </Flex>
  );
}