/*
 * Copyright (c) GM Global Technology Operations LLC. All rights reserved.
 * This information is confidential and proprietary to GM Global Technology
 * Operations LLC and may not be used, modified, copied or distributed.
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessagesComponent} from './message.component';

describe('MessageComponent', () => {
    let component: MessagesComponent;
    let fixture: ComponentFixture<MessagesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MessagesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
