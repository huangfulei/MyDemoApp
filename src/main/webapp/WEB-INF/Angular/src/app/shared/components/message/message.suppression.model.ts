/*
 * Copyright (c) GM Global Technology Operations LLC. All rights reserved.
 * This information is confidential and proprietary to GM Global Technology
 * Operations LLC and may not be used, modified, copied or distributed.
 */

export class MessageSuppression {
    success = false;
    info = false;
    warning = false;
    systemFailure = false;
    error = false;

    // These are the only ones we use right now
    constructor(success, error, systemFailure) {
        this.success = success;
        this.error = error;
        this.systemFailure = systemFailure;
    }
}
