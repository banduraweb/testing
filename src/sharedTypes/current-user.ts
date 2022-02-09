export class CurrentUserType {
  id: string;
  userName: string;
  password: string;
  createdAt: Date;
  role: {
    id: number;
    role: string;
    createdAt: Date;
  };
}
