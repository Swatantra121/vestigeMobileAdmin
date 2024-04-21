import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { VESTIGE_ADMIN_PANEL_KEYS } from 'src/app/globals';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    /**
     * @method set
     * @param key key by which value is store in localStorage.
     * @param value value that is to be stored.
     * @description returns encrypted string.
     * @return {void}
     */
    set(key: string, value: any) {
        const encryptData = this.encryptData(value);
        localStorage.setItem(key, encryptData);
    }

    /**
     * @method get
     * @param key Key by which value is stored in localstorage.
     * @description returns encrypted string
     * @return Value from localstorage.
     */
    get(key: string) {
        const item = localStorage.getItem(key);
        const decryptData = this.decryptData(item);
        return JSON.parse(decryptData);
    }

    /**
     * @method remove
     * @param key Key by which value is stored in localstorage.
     * @description returns encrypted string
     * @return {void}
     */
    remove(key: string) {
        localStorage.removeItem(key);
    }

    /**
     * @method clear
     * @description returns encrypted string
     * @return {void}
     */
    clear() {
        localStorage.clear();
    }

    /**
     * @method encryptData
     * @param data which is going to be encrypted
     * @description returns encrypted string
     * @return encrypted data.
     */
    private encryptData(data) {
        if (data === '') {
            return '';
        }
        const string: any = JSON.stringify(data);
        return AES.encrypt(string, VESTIGE_ADMIN_PANEL_KEYS.VESTIGE_ENCRYPTION_KEY).toString();
    }

    /**
     * @method decryptData
     * @param data encrypted data which is going to be decrypted
     * @description returns string
     * @return dencrypted data.
     */
    private decryptData(data) {
        if (!data) {
            return data;
        }
        const string: any = AES.decrypt(data, VESTIGE_ADMIN_PANEL_KEYS.VESTIGE_ENCRYPTION_KEY);
        return string.toString(enc.Utf8);
    }
}
