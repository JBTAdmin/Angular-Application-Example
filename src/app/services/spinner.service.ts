import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SpinnerService {
  private isLoadingSubject = new BehaviorSubject(false);
  public isLoading = this.isLoadingSubject.asObservable();

  setLoader(loading: boolean) {
    setTimeout(() => {
      this.isLoadingSubject.next(loading);
    }, 500);
  }
}
