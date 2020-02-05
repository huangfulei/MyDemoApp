import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
  private isLoading_ = false;
  private readonly loadingSubject = new Subject<boolean>();
  private readonly loadingObservable = this.loadingSubject.asObservable();

  constructor() {
  }

  // if we just want to subscribe
  subscribe(fn: any) {
    return this.loadingObservable.subscribe(fn);
  }

  public startLoading(): void {
    this.isLoading_ = true;
    this.loadingSubject.next(this.isLoading_);
  }

  public finishLoading(): void {
    this.isLoading_ = false;
    this.loadingSubject.next(this.isLoading_);
  }

  public isLoading(): boolean {
    return this.isLoading_;
  }
}
