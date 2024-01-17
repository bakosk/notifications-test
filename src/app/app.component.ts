import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'notifications-test';

  private VAPID_PUBLIC_KEY = "";
  private readonly swPush = inject(SwPush);
  private readonly subService = inject(SubscriptionsService);

  ngOnInit() {
    this.subService.getVapidPublicKey().subscribe(vapidPublicKey => this.VAPID_PUBLIC_KEY = vapidPublicKey);
    this.swPush.messages.subscribe(msg => console.log(msg));
  }

  subscribeToNotifications() {
    console.log("Subscribing to notifications", this.VAPID_PUBLIC_KEY);
    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      console.log(JSON.stringify(sub));
      const subsscription: Subscription = JSON.parse(JSON.stringify(sub));
      console.log(subsscription)
      this.subService.subscribeToNotifications(subsscription).subscribe();
    })
    .catch(err => console.error("Could not subscribe to notifications", err));
  }
}

// https://angular.io/api/service-worker/SwPush
// https://github.com/web-push-libs/web-push-csharp
// https://github.com/thomasgalliker/PushNotifications.Server
