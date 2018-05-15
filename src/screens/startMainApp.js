import { Navigation } from 'react-native-navigation';
import { TASK_LIST } from './names';

const startApp = () => {
    Navigation.startSingleScreenApp({
        screen: {
          screen: TASK_LIST, 
          title: 'Tasks'
        }
      });
};

export default startApp;
