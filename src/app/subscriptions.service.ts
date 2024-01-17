import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, Observable, Subscription } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SubscriptionsService {
  private readonly http = inject(HttpClient);

  subscribeToNotifications(pushNotificationSub: Subscription): Observable<void> {
      return this.http.post<void>(`${environment.apiUrl}/subscriptions`, pushNotificationSub);
  }

  getVapidPublicKey(): Observable<string> {
      return this.http.get<{publicKey: string}>(`${environment.apiUrl}/vapidKey`).pipe(map(vapidKey => vapidKey.publicKey));
  }
}
