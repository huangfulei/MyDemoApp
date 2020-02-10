import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Message} from './message';
import {MessageSuppression} from './message.suppression.model';
import {SharedConstants} from "../../constants/SharedConstants";
import {isNotNull, isNull} from "../../utility/common.utility";

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private readonly _messages: any;
    private readonly successMessageParameter = SharedConstants.SUCCESS_MESSAGE;
    private readonly systemFailureMessageParameter = SharedConstants.SYSTEM_FAILURE_MESSAGE;
    private readonly errorMessageParameter = SharedConstants.ERROR_MESSAGE;

    private readonly messagesSubject = new Subject<any>();
    public messages = this.messagesSubject.asObservable();

    constructor() {
        this._messages = new Message();
    }

    // if we just want to subscribe
    subscribe(fn: any) {
        return this.messages.subscribe(fn);
    }

    private guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    private add(type: string, msg: string) {
        const guid = this.guid();
        this._messages[type][guid] = msg;
        this.showMessageCheck();
        this.messagesSubject.next(this._messages);

        // control the closing of messages
        setTimeout(() => {
            this.remove(guid);
        }, SharedConstants.MESSAGE_TIMEOUT_MILLISECONDS);

        return guid;
    }

    private showMessageCheck() {
        if (!this._messages.showMessages && !this._messages.isEmpty()) {
            this._messages.showMessages = true;
        }
    }

    private hideMessageCheck() {
        if (this._messages.showMessages && this._messages.isEmpty()) {
            this._messages.showMessages = false;
        }
    }

    public remove(id: string): any | undefined {
        const info = Object.keys(this._messages.info);
        if (info.indexOf(id) > -1) {
            delete this._messages.info[id];
            this.hideMessageCheck();
            return this.messagesSubject.next(this._messages);
        }

        const success = Object.keys(this._messages.success);
        if (success.indexOf(id) > -1) {
            delete this._messages.success[id];
            this.hideMessageCheck();
            return this.messagesSubject.next(this._messages);
        }

        const error = Object.keys(this._messages.error);
        if (error.indexOf(id) > -1) {
            delete this._messages.error[id];
            this.hideMessageCheck();
            return this.messagesSubject.next(this._messages);
        }

        const systemFailure = Object.keys(this._messages.systemFailure);
        if (systemFailure.indexOf(id) > -1) {
            delete this._messages.systemFailure[id];
            this.hideMessageCheck();
            return this.messagesSubject.next(this._messages);
        }

        const warning = Object.keys(this._messages.warning);
        if (warning.indexOf(id) > -1) {
            delete this._messages.warning[id];
            this.hideMessageCheck();
            return this.messagesSubject.next(this._messages);
        }
    }

    private info(message: string) {
        return this.add('info', message);
    }

    private error(message: string) {
        return this.add('error', message);
    }

    public systemFailure(message: string) {
        return this.add('systemFailure', message);
    }

    private warning(message: string) {
        return this.add('warning', message);
    }

    private success(message: string) {
        return this.add('success', message);
    }

    public processMessage(model: any, messageSuppression?: MessageSuppression) {
        if (isNull(messageSuppression) || !messageSuppression.success) {
            this.processSuccessMessages(model);
        }
        if (isNull(messageSuppression) || !messageSuppression.error) {
            this.processErrorMessages(model);
        }
        if (isNull(messageSuppression) || !messageSuppression.systemFailure) {
            this.processSystemFailureMessages(model);
        }
        return this.isSuccess(model);
    }

    private isSuccess(model: any) {
        // If there is a success message, then it's a success
        if (isNotNull(model[this.successMessageParameter])) {
            return true;
            // If there is an error message or system failure, then it's an error
        } else if (isNotNull(model[this.errorMessageParameter])
            || isNotNull(model[this.systemFailureMessageParameter])) {
            return false;
            // Otherwise assume a success
        } else {
            return true;
        }
    }

    private processSuccessMessages(model: any) {
        if (isNotNull(model[this.successMessageParameter])) {
            this.success(model[this.successMessageParameter]);
        }
    }

    private processErrorMessages(model: any, dontShowErrorMessage?: boolean) {
        if (isNotNull(model[this.errorMessageParameter])) {
            this.error(model[this.errorMessageParameter]);
        }
    }

    private processSystemFailureMessages(model: any) {
        if (isNotNull(model[this.systemFailureMessageParameter])) {
            this.systemFailure(model[this.systemFailureMessageParameter]);
        }
    }
}
