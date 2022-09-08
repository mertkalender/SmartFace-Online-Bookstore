import GviBookDesign from 'generated/my-components/GviBook';

export default class GviBook extends GviBookDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }

  static getHeight(): number {
    return 200; // Normally themeService's getStyle method should be used
  }
}
