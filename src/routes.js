import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import MessageNotRead from './pages/MessageNotRead';
import MessageRead from './pages/MessageRead';

export default createAppContainer(
  createSwitchNavigator({
    Home,
    MessageRead,
    MessageNotRead,
    SignIn,
  }),
);
