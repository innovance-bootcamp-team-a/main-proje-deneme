import { Flex, Avatar } from '@chakra-ui/react';
import React from 'react';
import Icon from './Icon';

import Logo from './Logo';

import Bell from '../icons/icons-notification.png';

export default function TopSection() {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      px="58px"
      borderBottom="2px solid #F8F8F8"
      pb="45px"
      pt="34px"
    >
      <Logo />
      <Flex alignItems="center">
        <Icon src={Bell} mr="31px" />
        <Avatar
          w="large"
          h="large"
          src="https://bit.ly/dan-abramov"
          borderRadius="full"
          name="Deneme"
        />
      </Flex>
    </Flex>
  );
}
