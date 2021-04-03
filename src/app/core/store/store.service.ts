import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {
  public setItem<T>(name: string, data: T): void {
    localStorage.setItem(name, JSON.stringify(data));
  }

  public getItem<T>(name: string): T {
    try {
      return JSON.parse(localStorage.getItem(name));
    } catch (e) {
      console.error('Can not parse JSON', e);
      return null;
    }
  }

  public removeItem(name: string): void {
    localStorage.removeItem(name);
  }
}
