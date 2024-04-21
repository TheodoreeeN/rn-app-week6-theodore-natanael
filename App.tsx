/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Menu1 from './components/screens/Menu1';
import Menu2 from './components/screens/Menu2';
import React from 'react';
// import AppNavigator from './AppNavigator/Navigator';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Touchable,
  TouchableNativeFeedback,
  TouchableHighlight,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-ionicons';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from './components/screens/SplashScreen';
import Register from './components/screens/Register';
import Login from './components/screens/Login';
import HomeScreen from './components/screens/HomeScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator backBehavior='none'>
      <Tab.Screen name="Home" 
      component={HomeScreen} 
      options={{
      tabBarLabel: 'Home',
      tabBarIcon: () => (
        <Image source={require('./Icons/home.png')} style={{width: 30, height: 30}}/>
      ),
      }}
    />
      <Tab.Screen name="Profile" component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: () => (
          <Image source={require('./Icons/profile.png')} style={{width: 30, height: 30}}/>
        ),
        }}
      />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  return <NavigationContainer>
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Tabs" component={Tabs} />
  </Stack.Navigator>
</NavigationContainer>
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
