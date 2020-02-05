import {BusinessObject} from "./business-object";

export class Permission {
    id: any;
    businessObject: BusinessObject = new BusinessObject();
    canRead = false;
    canCreate = false;
    canUpdate = false;
    canDelete = false;
}
