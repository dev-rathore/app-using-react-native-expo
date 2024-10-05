export type PushNotificationToken = {
  ios?: string;
  android?: string;
  web?: string;
};

export type UserSettings = {
  theme: "light" | "dark";
  emailNotifications: boolean;
  pushNotifications: boolean;
};

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  pushNotificationToken: PushNotificationToken;
  settings: UserSettings;
}
