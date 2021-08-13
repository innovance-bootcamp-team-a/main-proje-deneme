import React, { useState } from 'react';

import { GetOnlineMembersData, UsePresence } from '../hooks/usePresence';
import {
  GetOnlineNumber,
  GetRoomNames,
  GetData,
  setDataToDatabase,
  createRoomDatabase,
} from '../hooks/useRealtimeData';

import { useLocation } from 'react-router';
import _ from 'lodash';
import firebase from '../firebase/firebase';

import Chat from './Chat';
import TextBox from './TextBox';
import TopSection from './TopSection';
import List from './List';
import ListItem from './ListItem';
import { Flex, Text } from '@chakra-ui/react';

export default function ChatPage() {
  // Username from Login Page ( Main Page )
  const location = useLocation();
  const [username] = useState(location.state.username);

  // Chat Text Area - Input
  const [message, setMessage] = useState('');

  // Add New Room Input - Create new Room
  const [createRoomName, setCreateRoomName] = useState('');

  // Click on Rooms - Shows chats.
  const [selectedRoom, setSelectedRoom] = useState('');
  const [roomNames] = GetRoomNames();

  const createRoom = () => {
    createRoomName.length &&
      createRoomDatabase(
        username,
        'Odayı oluşturdu.',
        _.toLower(createRoomName)
      );

    setCreateRoomName('');
  };

  const selectRoom = (roomId) => {
    console.log('selectRoom çalıştı');
    setSelectedRoom(roomId);
    firebase
      .database()
      .ref('status/' + firebase.auth().currentUser.uid)
      .set({
        username: username,
        room: roomId,
        state: 'online',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      });
  };

  const [data] = GetData(selectedRoom);
  const [userData] = GetOnlineMembersData(selectedRoom);
  const [onlineNumbers] = GetOnlineNumber(selectedRoom);

  const handleSendData = () => {
    message.length && setDataToDatabase(username, message, selectedRoom);

    setMessage('');
  };

  // UsePresence();
  return (
    <Flex flexDir="column">
      <TopSection />
      <Flex mt="20px">
        <List
          title="Chat Rooms"
          showIcon
          onChange={(e) => setCreateRoomName(e.target.value)}
          value={createRoomName}
          handler={createRoom}
        >
          {roomNames.length ? (
            roomNames.map(({ id, roomName }) => (
              <ListItem
                showPeopleCount
                title={roomName}
                subtitle={'12.03.2021 15:45'}
                avatar="https://bit.ly/dan-abramov"
                handler={() => selectRoom(id)}
                roomName={roomName}
                username={username}
                peopleCount={
                  onlineNumbers[id] !== undefined ? onlineNumbers[id] : '0'
                }
              />
            ))
          ) : (
            <Text>Oda Oluşturunuz</Text>
          )}
        </List>
        <Chat
          roomTitle={_.startCase(_.toLower(selectedRoom))}
          handler={handleSendData}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        >
          {data.length ? (
            data.map(({ id, name, message }) => (
              <TextBox
                avatar="https://bit.ly/dan-abramov"
                user={name}
                text={message}
              />
            ))
          ) : (
            <Text>Mesaj yok</Text>
          )}
        </Chat>
        <List title={`Members ${userData.length}`}>
          {userData.length &&
            userData.map(({ username }) => (
              <ListItem
                showAddIcon
                title={username}
                subtitle="Kodluyoruz"
                avatar="https://bit.ly/dan-abramov"
              />
            ))}
        </List>
      </Flex>
    </Flex>
  );
}
