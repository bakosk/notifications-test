import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { SubscriptionsService } from './subscriptions.service';

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
    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      console.log(sub);
      this.subService.subscribeToNotifications(sub).subscribe();
    })
    .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
