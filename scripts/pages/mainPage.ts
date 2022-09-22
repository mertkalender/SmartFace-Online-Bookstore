import MainPage from 'generated/pages/mainPage';
import Label from '@smartface/native/ui/label';
import { Route, Router } from '@smartface/router';
import { styleableComponentMixin } from '@smartface/styling-context';
import { Book, getBooks } from 'services/book';
import LviBook from 'components/LviBook';
import GviBook from 'components/GviBook';

class StyleableLabel extends styleableComponentMixin(Label) {}

export default class mainPage extends MainPage {
  private data: Book[] = [];
  private disposeables: (() => void)[] = [];
  lbl: StyleableLabel;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.lbl = new StyleableLabel();
  }

  initListView() {
    // onRowHeight can be used as alternative
    this.newestBooksList.rowHeight = LviBook.getHeight();
    this.newestBooksList.onRowBind = (listViewItem: LviBook, index: number) => {
      listViewItem.title.text = this.data[index]?.title;
      listViewItem.author.text = this.data[index]?.authors;
      listViewItem.image.loadFromUrl({
        url: this.data[index]?.image,
        useHTTPCacheControl: true
      });
    };
    this.newestBooksList.onPullRefresh = () => {
      this.refreshGridView();
      this.newestBooksList.stopRefresh();
    };
    this.newestBooksList.onRowSelected = (listViewItem: LviBook, index) => {
      this.router.push(`page4`, { book: this.data[index] });
    };
  }

  refreshListView() {
    this.newestBooksList.itemCount = this.data.length;
    this.newestBooksList.refreshData();
  }

  initGridView() {
    // onRowHeight can be used as alternative
    this.popularBooksList.onItemBind = (gridViewItem: GviBook, index: number) => {
      gridViewItem.title.text = this.data[index]?.title;
      gridViewItem.author.text = this.data[index]?.authors;
      gridViewItem.image.loadFromUrl({
        url: this.data[index]?.image,
        useHTTPCacheControl: true
      });
    };

    this.popularBooksList.onPullRefresh = () => {
      this.refreshGridView();
      this.popularBooksList.stopRefresh();
    };

    this.popularBooksList.onItemSelected = (gridViewItem: GviBook, index) => {
      this.router.push(`page4`, { book: this.data[index] });
    };
  }

  refreshGridView() {
    this.popularBooksList.itemCount = this.data.length;
    this.popularBooksList.refreshData();
  }

  async getBooksData() {
    try {
      const response = await getBooks();
      this.data = response.data.books;
    } catch (e) {
      console.log(JSON.stringify(e, null, '\t'));
    }
    this.refreshGridView();
    this.refreshListView();
  }

  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.disposeables.push();
    this.getBooksData();
  }
  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();
    this.initGridView();
    this.initListView();
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
