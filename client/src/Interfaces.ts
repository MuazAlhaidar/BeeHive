interface MemberInfo {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  points: number;
  isowner: boolean;
}

interface EventInfo {
  id: string;
  title: string;
  creator: string;
  address: string;
  date: Date;
  description: string;
  rsvp: Array<MemberInfo>|Array<String>;
  signin: Array<string>;
}

interface GroupInfo {
  id: string;
  name: string;
  description: string;
  members: Array<string>;
}

export type { EventInfo, GroupInfo, MemberInfo, MemberInfoSign };
