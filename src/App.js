import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import LoginForm from './components/LoginForm';
import TaskList from './screens/TaskList';
import { 
  LOGIN_FORM,
  TASK_LIST
} from './screens/names';

const store = configureStore();

// Register Screens
Navigation.registerComponent(
  LOGIN_FORM, 
  () => LoginForm, 
  store, 
  Provider
);

Navigation.registerComponent(
  TASK_LIST,
  () => TaskList,
  store,
  Provider
);

// Start App
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: LOGIN_FORM,
    title: 'Login'
  }
});

// import React, { Component } from 'react';
// import { View } from 'react-native';
// import { createStore, applyMiddleware } from 'redux';
// import ReduxThunk from 'redux-thunk';
// import { Provider } from 'react-redux';
// import Reducers from './reducers/';
// import LoginForm from './components/LoginForm';

// class App extends Component {
//   render() {
//     return (
//       <Provider store={createStore(Reducers, applyMiddleware(ReduxThunk))}>
//         <View>
//           <LoginForm />
//         </View>
//       </Provider>
//     );
//   }
// }

// export default App;
