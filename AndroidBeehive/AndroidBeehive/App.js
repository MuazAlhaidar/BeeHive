import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {NavigationContainer} from '@react-navigation/native';
import LoginPage from './Pages/LoginPage';
import ContactUsPage from './Pages/ContactPage';
import Welcome from './Pages/WelcomePage';
import EventPage from './Pages/EventsPage';
import SignUp from './Pages/SignUp';
import MyEventPage from './Pages/Events/MyEventsPage';
import ForgotPassword from './Pages/ForgotPassword';
import GuestEvents from './Pages/Events/ViewGuestEvents';
import AddEvent from './components/AddEvent';
import GroupPage from './Pages/GroupsPage';
import AddGroup from './components/AddGroup';
import MyGroupPage from './Pages/Groups/MyGroupsPage';
import GuestGroups from './Pages/Groups/ViewGuestGroups';
import ChangeEmail from './Pages/ChangeEmail';
import LeaderboardPage from './Pages/LeaderboardPage';
import firebase from 'firebase';
import Logout from './Pages/Logout';
//this is for the drawer that pops us
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
//this is the stack for the initial screens and the screens after loggin in
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Welcome" component={MyDrawer} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ViewGuest" component={GuestEvents} />
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveBackgroundColor: '#ffa347',
        activeBackgroundColor: '#FF8000',
        labelStyle: {
          color: '#fff',
          fontSize: 20,
        },
      }}>
      <Tab.Screen name="Events" component={EventPage} />
      <Tab.Screen name="MyEvents" component={MyEventPage} />
    </Tab.Navigator>
  );
}
// bottom tab for the groups and events
const newTab = createBottomTabNavigator();
function MyNewTabs() {
  return (
    <newTab.Navigator
      tabBarOptions={{
        inactiveBackgroundColor: '#ffa347',
        activeBackgroundColor: '#FF8000',
        labelStyle: {
          color: '#fff',
          fontSize: 20,
        },
      }}>
      <newTab.Screen name="Groups" component={GroupPage} />
      <newTab.Screen name="MyGroups" component={MyGroupPage} />
    </newTab.Navigator>
  );
}
function MyDrawerAdmin() {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#FF8000',
        width: 240,
      }}
      drawerContentOptions={{
        labelStyle: {
          fontFamily: 'SomeFont',
          color: 'white',
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Welcome" component={Welcome} />
      <Drawer.Screen name="Events" component={MyTabs} />
      <Drawer.Screen name="Groups" component={MyNewTabs} />
      <Drawer.Screen name="Leaderboard" component={LeaderboardPage} />
      <Drawer.Screen name="Contact Us" component={ContactUsPage} />
      <Drawer.Screen name="Change Email" component={ChangeEmail} />
      <Drawer.Screen name="Log out" component={Logout} />
    </Drawer.Navigator>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#FF8000',
        width: 240,
      }}
      drawerContentOptions={{
        labelStyle: {
          fontFamily: 'SomeFont',
          color: 'white',
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Welcome" component={Welcome} />
      <Drawer.Screen name="Events" component={MyTabs} />
      <Drawer.Screen name="Groups" component={MyNewTabs} />
      <Drawer.Screen name="Leaderboard" component={LeaderboardPage} />
      <Drawer.Screen name="Contact Us" component={ContactUsPage} />
      <Drawer.Screen name="Change Email" component={ChangeEmail} />
      <Drawer.Screen name="Log out" component={Logout} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
