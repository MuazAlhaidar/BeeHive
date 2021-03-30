interface MemberInfo {
  id: string;
  Firstname: string;
  Lastname: string;
  email: string;
  userPoints: number;
}

interface EventInfo {
  id: string;
  creator: string;
  title: string;
  address: string;
  time: string;
  date: string;
  description: string;
  RSVP: Array<string>;
  SignIn: Array<string>;
}

interface GroupInfo {
  id: string;
  name: string;
  description: string;
  members: Array<string>;
}

export type {EventInfo, GroupInfo, MemberInfo};
