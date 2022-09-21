import DetailsPage from 'generated/pages/detailsPage';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import { Router, Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import Color from '@smartface/native/ui/color';
import { i18n } from '@smartface/i18n';
import { styleableContainerComponentMixin } from '@smartface/styling-context';
import FlexLayout from '@smartface/native/ui/flexlayout';
import { HeaderBarSystemItem } from '@smartface/native/ui/headerbaritem/headerbaritem';
import createRouteStore from '@smartface/router/lib/router/routeStore';

class StyleableFlexLayout extends styleableContainerComponentMixin(FlexLayout) {}

export default class detailsPage extends withDismissAndBackButton(DetailsPage) {
  itemContainerFl: StyleableFlexLayout;
  indicatorItem: HeaderBarItem;
  itemWithBadge: HeaderBarItem;
  myItem: HeaderBarItem;
  routeData: Record<string, any> = this.route.getState().routeData;
  parentController: any;
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  initBook() {
    this.image.loadFromUrl({
      url: this.routeData.book?.image,
      useHTTPCacheControl: true
    });
    this.author.text = this.routeData.book?.authors;
    this.title.text = this.routeData.book?.title;
  }

  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.headerBar.leftItemEnabled = false;
    this.headerBar.itemColor = Color.BLACK;
    this.initBackButton(this.router);
    this.routeData && console.info(this.routeData.message);
  }

  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();
    this.initBook();
    this.itemContainerFl = new StyleableFlexLayout();
    this.addChild(this.itemContainerFl, `itemContainerFl`, '.sf-flexLayout', {
      height: 50,
      width: 50,
      flexProps: {
        justifyContent: 'CENTER',
        alignItems: 'CENTER'
      }
    });

    this.indicatorItem = new HeaderBarItem({
      customView: this.itemContainerFl
    });

    this.itemWithBadge = new HeaderBarItem({
      color: Color.BLACK,
      android: {
        systemIcon: 17301545 // OR 'ic_dialog_email'
      },
      ios: {
        systemItem: HeaderBarSystemItem.BOOKMARKS
      },
      onPress: (): void => {}
    });
    this.headerBar.setItems([this.itemWithBadge]);

    this.itemWithBadge.badge.visible = true;
    this.itemWithBadge.badge.text = '7';
  }
}
