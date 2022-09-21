import LviBookDesign from 'generated/my-components/LviBook';

export default class LviBook extends LviBookDesign {
    pageName?: string ;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }

    static getHeight(): number {
    return 180; // Normally themeService's getStyle method should be used
    }

    // set setTitle (newTitle: string) {
    //     this.title = newTitle
    // }

    set titleText(value: string) {
        this.label1.text = typeof value === "string" ? value : "";
        // E.g. you can check its type to avoid wrong assignments
        this.__titleText = typeof value === "string" ? value : "";
    }
    
}