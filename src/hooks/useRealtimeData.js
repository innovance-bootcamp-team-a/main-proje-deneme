/* eslint-disable no-console */
import { useEffect, useState } from "react";
import firebase from "../firebase/firebase";
import _ from "lodash";
import Chat from "../models/Chat";
import Room from "../models/Rooms";
import User from "../models/Users"


export const GetRoomNames = (deps = []) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      var roomNamesRef = firebase.database().ref("rooms/");
      roomNamesRef.on("value", (snapshot) => {
        const roomData = snapshot.val();
        const rooms = [];
        for (const key in roomData) {
          rooms.push(new Room(_.toLower(key), _.startCase(_.toLower(key))));
        }
        setData(rooms);
      });
    }
    fetchData();
  }, deps);

  return [data, setData];
};

// Performans güncellemesi gelebilir.
export const GetData = (roomName) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      var messageRef = firebase.database().ref(`rooms/${roomName}`);
      messageRef.on("value", (snapshot) => {
        const posts = snapshot.val();
        const loadedPosts = [];
        for (const key in posts) {
          loadedPosts.push(new Chat(key, posts[key].name, posts[key].message));
        }
        setData(loadedPosts);
      });
    }
    roomName.length && fetchData();
  }, [roomName]);

  return [data, setData];
};
// Performans güncellemesi gelebilir.

export const setDataToDatabase = (name, message, roomName) => {
  console.log("clicked setDataToDatabase");
  if (roomName.length) {
    firebase.database().ref(`rooms/${roomName}`).push({
      name: name,
      message: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
};

export const createRoomDatabase = (name, message, roomName) => {
  firebase.database().ref(`rooms/${roomName}`).push({
    name: name,
    message: message,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};


export const GetOnlineNumber = (selectedRoom) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState([])
  useEffect(() => {

      const userOnlineRoomRef = firebase.database().ref("status/");
      userOnlineRoomRef.once("value", (snapshot) => {
        const roomData = snapshot.val();
        let users = [];
        let usersCount = []
        for (const key in roomData) {
          if (roomData[key].room.length) {
            usersCount.push(roomData[key].room);
          }
          if (roomData[key].room.length && roomData[key].room === selectedRoom) {
            users.push(new User(roomData[key].username, roomData[key].room));
          }
        }
        console.log("users", users)
        setData(users);
        usersCount.length &&
          setCount(
            usersCount.reduce((obj, key) => {
              obj[key] = (obj[key] || 0) + 1; 
              return obj;
            }, {})
          );
      });
      
  }, [selectedRoom]);
  return [count, data];
};
