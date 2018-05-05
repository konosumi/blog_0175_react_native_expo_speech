import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import ChatScreen from './ChatScreen';

export default StackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: '褒められ設定',
    }),
  },
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.modeName}`,
    }),
  }
});