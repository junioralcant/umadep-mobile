import React from 'react';
import CodePush from 'react-native-code-push';
import Routes from './routes';

const App = () => {
  return <Routes />;
};

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
