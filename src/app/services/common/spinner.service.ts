import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SpinnerService {

  private spinnerSubject = new Subject<{ visible: boolean}>();
  spinnerState$ = this.spinnerSubject.asObservable();

  showSpinner(visible : boolean) {
    this.spinnerSubject.next({ visible });
  }
}
