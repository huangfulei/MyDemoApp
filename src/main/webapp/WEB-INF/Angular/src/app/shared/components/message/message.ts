import {isNotEmpty} from "../../utility/common.utility";

export class Message {
    success: any = {};
    info: any = {};
    warning: any = {};
    systemFailure: any = {};
    error: any = {};
    showMessages = false;

    isEmpty() {
        if (isNotEmpty(this.success)) {
            return false;
        }
        if (isNotEmpty(this.info)) {
            return false;
        }
        if (isNotEmpty(this.warning)) {
            return false;
        }
        if (isNotEmpty(this.systemFailure)) {
            return false;
        }
        if (isNotEmpty(this.error)) {
            return false;
        }
        return true;
    }
}
