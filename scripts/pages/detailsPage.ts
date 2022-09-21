import DetailsPage from 'generated/pages/detailsPage';
import { Router, Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';

export default class detailsPage extends withDismissAndBackButton(DetailsPage) {
  routeData: Record<string, any> = this.route.getState().routeData;
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
  }
}
