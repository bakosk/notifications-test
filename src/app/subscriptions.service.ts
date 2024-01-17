import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SubscriptionsService {
  private readonly http = inject(HttpClient);

  subscribeToNotifications(pushNotificationSub: PushSubscription): Observable<void> {
      return this.http.post<void>(`${environment.apiUrl}/subscriptions`, pushNotificationSub);
  }

  getVapidPublicKey(): Observable<string> {
      return this.http.get<string>(`${environment.apiUrl}/vapidKey`);
  }
}
