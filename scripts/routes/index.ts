import { NativeRouter, NativeStackRouter, Route } from '@smartface/router';
import Application from '@smartface/native/application';
import TabbarRoute from './tabbar';

import mainPage from 'pages/mainPage';
import savedPage from 'pages/savedPage';
import cartPage from 'pages/cartPage';
import System from '@smartface/native/device/system';

Application.on('backButtonPressed', () => {
  NativeRouter.getActiveRouter()?.goBack();
});

  
const router = NativeRouter.of({
    path: '/',
    isRoot: true,
    routes: [TabbarRoute]
});
  
  
// const router = NativeRouter.of({
//   path: '/',
//   isRoot: true,
//   routes: [
//     NativeStackRouter.of({
//       path: '/pages',
//       routes: [
//         Route.of<mainPage>({
//           path: '/pages/mainPage',
//           build(router, route) {
//             return new mainPage(router, route);
//           }
//         }),
//         Route.of<savedPage>({
//           path: '/pages/savedPage',
//           build(router, route) {
//             return new savedPage(router, route);
//           }
//         }),
//         NativeStackRouter.of({
//           path: '/pages/cartPage',
//           to: '/pages/page3/main',
//           modal: true,
//           routes: [
//             Route.of<cartPage>({
//               path: '/pages/page3/main',
//               build(router, route) {
//                 return new cartPage(router, route);
//               }
//             })
//           ]
//         })
//       ]
//     })
//   ]
// });

// let listenerCounter = 0;
// router.listen((location, action) => {
//   if (System.isEmulator) {
//     console.log(`[ROUTER] Counter: ${listenerCounter++} | location url: ${location.url}`);
//   }
// });

export default router;
