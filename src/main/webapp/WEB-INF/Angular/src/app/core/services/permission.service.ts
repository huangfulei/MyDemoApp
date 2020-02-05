import {Injectable} from '@angular/core';
import {UserSessionService} from "./user-session.service";

@Injectable({
    providedIn: 'root'
})
export class PermissionService {
    constructor(private readonly userService: UserSessionService) {
    }

    public hasReadPermission(businessObjectName: string): boolean {
        const permission = this.userService.getPermissionByBusinessObject(businessObjectName);
        return permission.canRead;
    }

    public hasAddPermission(businessObjectName: string): boolean {
        const permission = this.userService.getPermissionByBusinessObject(businessObjectName);
        return permission.canCreate;
    }

    public hasEditPermission(businessObjectName: string): boolean {
        const permission = this.userService.getPermissionByBusinessObject(businessObjectName);
        return permission.canUpdate;
    }

    public hasDeletePermission(businessObjectName: string): boolean {
        const permission = this.userService.getPermissionByBusinessObject(businessObjectName);
        return permission.canDelete;
    }
}

