/* eslint-disable no-console */
import { useEffect, useState } from "react";
import firebase, { firestore } from "../firebase/firebase";
import _ from "lodash";
import Chat from "../models/Chat";
import Room from "../models/Rooms";

export const GetOnlineNumber = (selectedRoom) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      var userOnlineRoomRef = firebase.database().ref("status/");
      userOnlineRoomRef.on("value", (snapshot) => {
        const roomData = snapshot.val();
        let rooms = [];
        for (const key in roomData) {
          if (roomData[key].room.length) {
            rooms.push(roomData[key].room);
          }
        }
        rooms.length &&
          setData(
            rooms.reduce((obj, lang) => {
              obj[lang] = (obj[lang] || 0) + 1; // obj[lang] : count
              return obj;
            }, {})
          );
      });
    }
    fetchData();
  }, [selectedRoom]);
  return [data, setData];
};

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
        console.log("gel buraya", rooms);
        setData(rooms);
      });
    }
    fetchData();
  }, deps);

  return [data, setData];
};

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
        console.log("loadedPosts", loadedPosts);
      });
    }
    roomName.length && fetchData();
  }, [roomName]);

  return [data, setData];
};

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
