import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from './message';
import {MessageService} from './message.service';
import {isNotEmpty} from "../../utility/common.utility";

@Component({
    selector: 'app-messages',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.less']
})
export class MessagesComponent implements OnInit, OnDestroy {

    public messages: any = new Message();

    private sub: any;

    constructor(private readonly messageService: MessageService) {
    }

    // Used in HTML
    hasValidMessage(obj: any) {
        return isNotEmpty(obj);
    }

    // Used in HTML
    asArray(obj: any) {
        const arr: any = [];
        for (const name of Object.keys(obj)) {
            arr.push({message: obj[name], _id: name});
        }
        return arr;
    }

    ngOnInit() {
        this.sub = this.messageService.subscribe((messages: string) => {
            console.log(messages);
            this.messages = messages;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    close(type: string) {
        for (const id of Object.keys(this.messages[type])) {
            this.messageService.remove(id);
        }
    }

}
