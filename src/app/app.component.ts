import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'notifications-test';

  private readonly VAPID_PUBLIC_KEY = "BFD5OmqY4gF1wvBs3KVylyE_XnG4lTywOH9sCcqeDFj2yLB1AOmzV9hGbm0FKdsCjjrFgcg4u0-hDrJW_kuHbM0";
  private readonly swPush = inject(SwPush);

    subscribeToNotifications() {
        this.swPush.requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY
        })
        .then(sub => console.log(sub))
        .catch(err => console.error("Could not subscribe to notifications", err));
    }
}
