export interface IUser {
    id: number;
    user_name: string;
    phone_number: string;
    email: string;
    isSelected?: boolean;
    enableEditing?: boolean;
  }