import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<{ visible: boolean, success: boolean}>();
  toastState$ = this.toastSubject.asObservable();

  showToast(success: boolean) {
    this.toastSubject.next({ visible: true, success });
    setTimeout(() => this.toastSubject.next({ visible: false, success }), 3000); 
  }
}