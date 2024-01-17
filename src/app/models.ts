interface Subscription {
  endpoint: string;
  keys: Keys;
}

interface Keys {
    p256dh: string;
    auth: string;
}
