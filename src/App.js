import React from "react"
import './App.css';
import "regenerator-runtime/runtime";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Chat from './components/Chat';
import TextBox from './components/TextBox';
import TopSection from './components/TopSection';
import List from './components/List';
import ListItem from './components/ListItem';
import { Flex } from '@chakra-ui/react';
import LoginPage from "./components/LoginPage"

function App() {
  return (
  
        <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/rooms/:id?">
            <Flex mt="20px">
            <List title="Chat Rooms" showIcon>
               <ListItem
                  showPeopleCount
                title="goygoy"
                  subtitle="Hasan: Nasılsın?"
                avatar="https://bit.ly/dan-abramov"
                />
             </List>
            <Chat />
             </Flex>
          </Route>
        </Switch>
      </Router>
    </React.StrictMode>
    // <Flex flexDir="column">
    //   <TopSection />

    //   <Flex mt="20px">
    //     <List title="Chat Rooms" showIcon>
    //       <ListItem
    //         showPeopleCount
    //         roomName="goygoy"
    //         lastMessage="Hasan: Nasılsın?"
    //         avatar="https://bit.ly/dan-abramov"
    //       />
    //     </List>
    //     <Chat>
    //       <TextBox
    //         avatar="https://bit.ly/dan-abramov"
    //         user="hasan"
    //         text="nasilsin"
    //       />
    //     </Chat>
    //     <List title="Members">
    //       <ListItem
    //         showAddIcon
    //         title="Hasan"
    //         subtitle="Front End Developer"
    //         avatar="https://bit.ly/dan-abramov"
    //       />
    //     </List>
    //   </Flex>
    // </Flex>
  );
}

export default App;
