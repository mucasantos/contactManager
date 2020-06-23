//import screens

import HomeScreen from './screens/HomeScreen'
import ViewContact from './screens/ViewContact'
import AddNewContact from './screens/AddNewContact'
import EditContact from './screens/EditContact'

//import react-navigation

import { createAppContainer} from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'

const MainNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Add: {screen: AddNewContact},
    View: {screen: ViewContact},
    Edit: {screen: EditContact}
  }, 
  {
    defaultNavigationOptions: {
      headerTintColor: 'blue',
      headerStyle: {
       // backgoundColor: 'blue'
      },
      headerTitleStyle: {
        color: 'blue'
      }
    } 
  },
  {
    initialRouteName: 'HomeScreen'
  }
)

const App = createAppContainer(MainNavigator)
export default App
