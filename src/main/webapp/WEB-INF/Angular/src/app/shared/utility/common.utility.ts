/**
 * Checks if a property of an object is not null or not undefined.
 *
 * @param baseObject The base object to which the property belongs.
 * @param propertyName The property of that baseObject to be tested.
 * @returns True if not null, false otherwise.
 */
export function isNotNullNested(baseObject: any, propertyName: string): boolean {
    return isNotNull(propertyName.split('.').reduce(function (o, x) {
            return (typeof o === 'undefined' || o === null) ? o : o[x];
        }, baseObject)
    );
}

/**
 * Checks if a value is not null, not undefined or not empty.
 *
 * @param value The value to be to be tested.
 * @returns True if not null, false otherwise.
 */
export function isNotNull(value: any): boolean {
    let isNotNullFlag = true;
    try {
        if (value == null || typeof value === 'undefined' || value === 'undefined' || value === '' || value === '[object Object]') {
            isNotNullFlag = false;
        }
    } catch (err) {
        isNotNullFlag = false;
    }
    return isNotNullFlag;
}

/**
 * Checks if a value is null.
 *
 * @param value The value to be tested.
 * @returns True if null, false otherwise.
 */
export function isNull(value: any): boolean {
    return !isNotNull(value);
}

/**
 * Checks if a value, array or object is empty.
 *
 * @param obj The value, array or object to be tested.
 * @returns True if empty, false otherwise.
 */
export function isEmpty(obj: any): boolean {
    if (isNull(obj)) {
        return true;
    }
    if (obj.constructor === Array) {
        return isEmptyArray(obj);
    } else {
        return isEmptyObject(obj);
    }

}

/**
 * Checks if a value, array or object is not empty.
 *
 * @param obj The value, array or object to be tested.
 * @returns True if not empty, false otherwise.
 */
export function isNotEmpty(obj: any): boolean {
    return !isEmpty(obj);
}

/**
 * Checks if an object is empty.
 *
 * @param obj The object to be tested.
 * @returns True if empty, false otherwise.
 */
export function isEmptyObject(obj: any): boolean {
    return (Object.keys(obj).length === 0);
}

/**
 * Checks if an object is not empty.
 *
 * @param obj The object to be tested.
 * @returns True if not empty, false otherwise.
 */
export function isNotEmptyObject(obj: any): boolean {
    return !isEmptyObject(obj);
}

/**
 * Checks if an array is empty.
 *
 * @param value The array to be tested.
 * @returns True if empty, false otherwise.
 */
export function isEmptyArray(value: any[]): boolean {
    if (isNull(value)) {
        return true;
    }
    return !(value.length > 0);
}

/**
 * Checks if an array is not empty.
 *
 * @param value The array to be tested.
 * @returns True if not empty, false otherwise.
 */
export function isNotEmptyArray(value: any[]): boolean {
    return !isEmpty(value);
}

/**
 * TODO not sure the purpose of this method...
 *
 * @param text
 * @param size
 * @param padChar
 * @returns True or false
 */
export function leftPad(text: any, size: number, padChar?: string): string {
    return (String(padChar || '0').repeat(size) + text).substr((size * -1), size);
}

/**
 * Checks if the value is a date.
 *
 * @param value Value to be tested.
 * @returns True if a date, false otherwise.
 */
export function isDate(value): boolean {
    /*
    So Javascript is odd and identifies numbers as dates if they are 6 digits or less, but it just applies them to years.
    I'm going to just do a quick override check until another solution is found.
    Might do a regex check
     */

    if (isNull(value) || isNull(value.toString()) || isNull(value.toString().length) || value.toString().length <= 6) {
        return false;
    }

    const tempDate = convertDate(value);
    // Check if the value is a date
    return !isNaN(tempDate.getTime());
}

/**
 * Removes spaces from a string.
 *
 * @param value The string to have spaces removed.
 * @returns The new string with the spaces removed.
 */
// TODO delete this if never used
export function removeSpacesFromString(value: string): string {
    return value.replace(/\s+/g, '');
}

/**
 * Removes space character from a string.
 *
 * @param value The string to have space characters removed.
 * @returns The new string with the space characters removed.
 */
// TODO delete this if never used
export function removeSpaceCharactersFromString(value: string): string {
    return value.replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Converts a date for the Kendo Date Picker.
 *
 * @param value Value to be converted to a date.
 * @returns Date, or null if there is an error.
 */
// TODO delete this if never used
export function convertDateForKendoDatePicker(value: any): Date | null {
    try {
        if (value instanceof Date) {
            return value;
        } else {
            const thisDate = value.slice(0, -9).split('-');
            return new Date(thisDate[0], thisDate[1] - 1, thisDate[2]);
        }
    } catch (err) {
        return null;
    }
}

/**
 * Converts a value to a date.
 *
 * @param value Value to be converted to a date.
 * @return Date, or null if there is an error.
 */
// Have to do this hacky junk so IE won't flag things as invalid dates.
export function convertDate(value) {
    try {
        if (isNull(value) || isNull(value.toString()) || isNull(value.toString().length) || value.toString().length <= 6) {
            return null;
        }

        let year, month, day, hour, minute, second;
        if (value instanceof Date) {
            year = value.getFullYear();
            month = value.getMonth();
            day = value.getDate();
            hour = value.getHours();
            minute = value.getMinutes();
            second = value.getSeconds();
        } else {
            const dateArray = value.toString().split(/-| |:|T|\\./);
            year = dateArray[0];
            month = dateArray[1] - 1;
            day = dateArray[2];
            hour = parseInt(dateArray[3]);
            minute = dateArray[4];
            second = dateArray[5];
        }

        return new Date(year, month, day, hour, minute, second);
    } catch (err) {
        return null;
    }
}

/**
 * Converts a value to a time.
 *
 * @param value Value to be converted to a time.
 * @returns The value converted to a time.
 */
// TODO delete this if never used
export function convertToTime(value: any): number {
    let dateTime: number = null;
    if (isNotNull(value)) {
        const date: Date = convertDate(value);
        dateTime = date.getTime();
    }
    return dateTime;
}

/**
 * Gets today's date.
 *
 * @returns Today's date.
 */
// TODO delete this if never used
export function getTodayDate(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

/**
 * Checks if a string contains a character.
 *
 * @param text The text string to be searched for the character param.
 * @param character The character to be sreached for in the text param.
 * @returns True if the character is found in the text, false otherwise.
 */
// TODO delete this if never used
export function contains(text: string, character: string): boolean {
    if (isNull(text) || isNull(character)) {
        return false;
    }
    return text.indexOf(character) > -1;
}

/**
 * Checks if an element contains elements.
 *
 * @param elementsToIgnore Elements to be ignored.
 * @param elementsToEnforce Elements to be enforced.
 * @param target The target element.
 * @returns True if found, false otherwise.
 */
// TODO delete this if never used
export function elementContainsElements(elementsToIgnore: any[], elementsToEnforce: any[], target: any) {
    if (isNotEmpty(elementsToEnforce)) {
        for (const x in elementsToEnforce) {
            if (elementsToEnforce[x].nativeElement.contains(target)) {
                return false;
            }
        }
    }
    if (isNotEmpty(elementsToIgnore)) {
        for (const x in elementsToIgnore) {
            if (elementsToIgnore[x].nativeElement.contains(target)) {
                return true;
            }
        }
    }
    return false;
}
