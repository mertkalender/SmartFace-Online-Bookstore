import { NativeRouter, NativeStackRouter, Route } from '@smartface/router';
import Application from '@smartface/native/application';
import TabbarRoute from './tabbar';
import detailsPage from 'pages/detailsPage';
import System from '@smartface/native/device/system';

Application.on('backButtonPressed', () => {
  NativeRouter.getActiveRouter()?.goBack();
});

  
const router = NativeRouter.of({
    path: '/',
    isRoot: true,
    routes: [TabbarRoute]
});
 
router.listen((location, action) => {
    System.isEmulator && console.log(`location: ${location.url} action : ${action}`);
    Application.hideKeyboard();
});

export default router;
