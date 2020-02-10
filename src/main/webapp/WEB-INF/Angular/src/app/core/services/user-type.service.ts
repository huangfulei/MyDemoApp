import { Injectable } from '@angular/core';
import {isNotNull, isNull} from "../../shared/utility/common.utility";
import {GlobalData} from "./global-data";

//todo: add types if necessary
@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  constructor(private readonly globalData: GlobalData) {
  }

  public setUserTypeToUser() {
    if (isNotNull(this.globalData.getUser())) {
      // this.globalData.user.isInternal = this.isUserGMInternal();
      // this.globalData.user.isSupplier = this.isUserSupplier();
      // this.globalData.user.isJointVenture = this.isUserJointVenture();
    } else {
      console.log('User object is null in Global Data!');
    }
  }

  /*public isUserSupplier(): boolean {
    // If No user exists in global data, assume false
    if (isNull(this.globalData.user)) {
      return false;
    }
    return isNotNull(this.globalData.user.ultimateDuns);
  }

  public isUserGMInternal(): boolean {
    // If No user exists in global data, assume false
    if (isNull(this.globalData.user)) {
      return false;
    }
    return isNull(this.globalData.user.ultimateDuns);
  }
*/
  public isUserJointVenture(): boolean {
    // TODO: determine how to determine if a user is a JV user.
    return false;
  }
}
