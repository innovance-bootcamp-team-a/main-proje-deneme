import {
  Flex,
  Avatar,
  Text,
  Box,
  IconButton,
  systemProps,
} from '@chakra-ui/react';
import React from 'react';

import Icon from './Icon';

import { Link } from 'react-router-dom';

import chatAdd from '../icons/icons-chat-add.png';

export default function ListItem({
  showAddIcon,
  showPeopleCount,
  peopleCount,
  title,
  subtitle,
  avatar,
  handler,
  roomName,
  username,
  ...props
}) {
  return (
    <Link
      key={roomName}
      to={{
        pathname: `/rooms/${roomName}`,
        state: {
          username,
        },
      }}
    >
      <Flex
        // w="200px"
        alignItems="center"
        // backgroundColor="#F8F8F8"
        borderRadius="9px"
        px="9px"
        py="13px"
        {...props}
        onClick={handler}
      >
        <Flex>
          <Avatar
            w="large"
            h="large"
            src={avatar}
            borderRadius="7px"
            name="Deneme"
          />
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Box ml="10px">
            <Text fontSize="subtitle_1" fontWeight="bold">
              {title}
            </Text>
            <Text color="black_subtitle" fontSize="subtitle_1">
              {subtitle}
            </Text>
          </Box>
        </Flex>
        {showAddIcon && (
          <Flex ml="auto">
            <Icon size="medium" src={chatAdd} />
          </Flex>
        )}

        {showPeopleCount && (
          <Flex ml="auto" h="100%" alignItems="flex-end">
            <Text fontSize="subtitle_1">{peopleCount} People</Text>
          </Flex>
        )}
      </Flex>
    </Link>
  );
}
