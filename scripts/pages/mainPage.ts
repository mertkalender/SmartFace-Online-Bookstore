import MainPage from 'generated/pages/mainPage';
import Label from '@smartface/native/ui/label';
import { Route, Router } from '@smartface/router';
import { styleableComponentMixin } from '@smartface/styling-context';
import { i18n } from '@smartface/i18n';
import { Book, getBooks } from 'services/book';
import LviBook from "components/LviBook";
import GviBook from "components/GviBook"

class StyleableLabel extends styleableComponentMixin(Label) {}

export default class mainPage extends MainPage {
  private GVIBook: GviBook;
  private LVIBook: LviBook;
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
    this.LVIBook.rowHeight = LviBook.getHeight();
    this.LVIBook.onRowBind = (listViewItem: LviBook, index: number) => {
      listViewItem.title = this.data[index].title;
      listViewItem.imgName.loadFromUrl({
        url: this.data[index].image,
        useHTTPCacheControl: true,
      });
    };

    this.LVIBook.onPullRefresh = () => {
      this.refreshGridView();
      this.GVIBook.stopRefresh();
    };
  }


  refreshListView() {
    this.LVIBook.itemCount = this.data.length;
    this.LVIBook.refreshData();
  }


  initGridView() {
    // onRowHeight can be used as alternative
    this.GVIBook.rowHeight = GviBook.getHeight();
    this.GVIBook.onRowBind = (gridViewItem: GviBook, index: number) => {
        gridViewItem.title = this.data[index].title;
        gridViewItem.imgName.loadFromUrl({
            url: this.data[index].image,
            useHTTPCacheControl: true,
        });
    };

    this.GVIBook.onPullRefresh = () => {
      this.refreshGridView();
      this.GVIBook.stopRefresh();
    };
  }

  refreshGridView() {
    this.GVIBook.itemCount = this.data.length;
    this.GVIBook.refreshData();
  }


  async getUsers() {
    try {
      const response = await getBooks();
      this.data = response.results;
      this.refreshGridView();
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
    console.log('mainPage onShow');
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
    console.log('mainPage onLoad');
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
