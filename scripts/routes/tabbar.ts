import { BottomTabBarRouter, NativeStackRouter, Route, NativeRouter } from '@smartface/router';
import Color from '@smartface/native/ui/color';
import * as Pages from 'pages';
import Image from '@smartface/native/ui/image';
import TabbarItem from '@smartface/native/ui/tabbaritem';

const bottomTabBarRouter = BottomTabBarRouter.of({
  path: '/btb',
  to: '/btb/tab1/page1',
  homeRoute: 0,
  items: [
    new TabbarItem({
        title: 'Home',
        icon: Image.createFromFile('images://close_icon.png')
      }),

    new TabbarItem({
        title: 'Settings',
        icon: Image.createFromFile('images://arrow_back.png')
    })
  ],
  // tab1
  routes: [
    // tab1
    NativeStackRouter.of({
      path: '/btb/tab1',
      routes: [
        Route.of<Pages.mainPage>({
          path: `/btb/tab1/page1`,
          build(router, route) {
            return new Pages.mainPage(router, route);
          },
          headerBarParams: () => ({
            visible: true
          })
        }),
        Route.of<Pages.detailsPage>({
            path: `/btb/tab1/page4`,
            build(router, route) {
              return new Pages.detailsPage(router, route);
            },
            headerBarParams: () => ({
              visible: true
            })
          })
      ]
    }),
    NativeStackRouter.of({
      path: '/btb/tab2',
      to: '/btb/tab2/page2',
      routes: [
        Route.of<Pages.savedPage>({
          path: `/btb/tab1/page2`,
          build(router, route) {
            return new Pages.savedPage(router, route);
          },
          headerBarParams: () => ({
            visible: true
          })
        })
      ]
    }),
  ]
});

export default bottomTabBarRouter;

