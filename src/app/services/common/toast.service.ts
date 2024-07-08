import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<{ visible: boolean, success: boolean, message: string }>();
  toastState$ = this.toastSubject.asObservable();

  showToast(success: boolean, message: string) {
    this.toastSubject.next({ visible: true, success, message });
    setTimeout(() => this.toastSubject.next({ visible: false, success, message }), 3000); 
  }
}