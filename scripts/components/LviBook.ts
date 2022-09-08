import LviBookDesign from 'generated/my-components/LviBook';

export default class LviBook extends LviBookDesign {
    pageName?: string ;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }

    static getHeight(): number {
    return 50; // Normally themeService's getStyle method should be used
    }
}