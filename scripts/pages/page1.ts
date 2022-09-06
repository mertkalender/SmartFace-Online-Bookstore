import Page1Design from 'generated/pages/page1';
import Label from '@smartface/native/ui/label';
import { Route, Router } from '@smartface/router';
import { styleableComponentMixin } from '@smartface/styling-context';
import { i18n } from '@smartface/i18n';
import { Book, getBooks } from 'services/book';
import LviBook from "components/LviBook";
import $Simple_gridviewItem from "generated/my-components/Simple_gridviewItem"


class StyleableLabel extends styleableComponentMixin(Label) {}

export default class Page1 extends Page1Design {
  private GVIBook: $Simple_gridviewItem;
  private data: Book[] = []
  private disposeables: (() => void)[] = [];
  lbl: StyleableLabel;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.lbl = new StyleableLabel();
    console.log('[page1] constructor');
  }

  initListView() {
    // onRowHeight can be used as alternative
    this.GVIBook.rowHeight = LviBook.getHeight();
    this.GVIBook.onRowBind = (listViewItem: LviBook, index: number) => {
      listViewItem.title = this.data[index].name.first;
      listViewItem.imgName.loadFromUrl({
        url: this.data[index].image,
        useHTTPCacheControl: true,
      });
    };

    this.GVIBook.onPullRefresh = () => {
      this.refreshListView();
      this.GVIBook.stopRefresh();
    };
  }

  refreshListView() {
    this.GVIBook.itemCount = this.data.length;
    this.GVIBook.refreshData();
  }


    async getUsers() {
    try {
      const response = await getBooks();
      this.data = response.results;
      this.refreshListView();
    } catch (e) {
      alert(JSON.stringify(e, null, "\t"));
    }
  }

  setTexts() {
    this.lbl.text = i18n.instance.t('runtimeLabel');
  }

  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    console.log('[page1] onShow');
    this.disposeables.push(
    );
  }
  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();
    this.setTexts();
    console.log('[page1] onLoad');
    this.headerBar.leftItemEnabled = false;
    this.addChild(this.lbl, 'page1lbl1unique', 'sf-label', (userProps: Record<string, any>) => {
      return { ...userProps };
    });
  }

  onHide(): void {
    this.dispose();
  }

  dispose(): void {
    this.disposeables.forEach((item) => item());
  }
}
