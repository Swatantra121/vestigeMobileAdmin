//Category Model
export interface CategoryListModel {
    name: string;
    description: string;
    activeFor: Array<any>;
    activeFrom: string;
    activeTo: string;
    isDynamicKittingCategory: Boolean;
    isPublished: Boolean
    image: string;
    isIncludeInNavigation: Boolean;
    isActive: any;
    urlKey: string;
    childId: number;
    linkedProducts: Array<any>;
    checked: boolean;
    expand: boolean;
    // cmsId: number;
    metaInfo: Array<any>;
    levelId: number;
    parentId: number;
    subCategotList?: Array<CategoryListModel>
}