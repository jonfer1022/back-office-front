export interface Error {
  message: string;
  status: number;
}

export interface IUser {
  userId: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  messageId: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  message: string;
  senderId: string;
  senderInfo: Object;
  receiverId: string;
  data: Object;
}

export interface IContacts extends IUser, IMessage {
  name: string;
  email: string;
}
