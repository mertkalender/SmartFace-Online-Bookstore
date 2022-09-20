import { NativeRouter, NativeStackRouter, Route } from '@smartface/router';
import Application from '@smartface/native/application';
import TabbarRoute from './tabbar';
import detailsPage from 'pages/detailsPage';

Application.on('backButtonPressed', () => {
  NativeRouter.getActiveRouter()?.goBack();
});

  
const router = NativeRouter.of({
    path: '/',
    isRoot: true,
    routes: [
        Route.of<detailsPage>({
            path: '/pages/page4',
            build(router, route) {
            return new detailsPage(router,route);
            }
        }),
        TabbarRoute
    ]
});
 
export default router;
