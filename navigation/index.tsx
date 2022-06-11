/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome, FontAwesome5} from '@expo/vector-icons'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import * as React from 'react'
import {ColorSchemeName, Pressable} from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import Home from '../screens/Home'
import TabTwoScreen from '../screens/Activity'
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types'
import LinkingConfiguration from './LinkingConfiguration'

export default function Navigation({colorScheme}: {colorScheme: ColorSchemeName}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}} />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={({navigation}: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          tabBarIcon: ({color}) => <TabBarIcon name="compass" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({pressed}) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{marginRight: 15}}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Activity"
        component={TabTwoScreen}
        options={{
          title: 'Activity',
          tabBarIcon: ({color}) => <TabBarIcon name="history" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Payment"
        component={TabTwoScreen}
        options={{
          title: 'Payment',
          tabBarIcon: ({color}) => <TabBarIcon name="wallet" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={TabTwoScreen}
        options={{
          title: 'Messages',
          tabBarIcon: ({color}) => <TabBarIcon name="comments" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={TabTwoScreen}
        options={{
          title: 'Account',
          tabBarIcon: ({color}) => <TabBarIcon name="user-circle" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={24} fixedWidth style={{marginBottom: -5}} {...props} />
}
