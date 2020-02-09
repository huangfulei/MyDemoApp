/*
 * Copyright (c) GM Global Technology Operations LLC. All rights reserved.
 * This information is confidential and proprietary to GM Global Technology
 * Operations LLC and may not be used, modified, copied or distributed.
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessagesService} from './message.service';

describe('MessageServiceComponent', () => {
    let component: MessagesService;
    let fixture: ComponentFixture<MessagesService>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MessagesService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessagesService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
