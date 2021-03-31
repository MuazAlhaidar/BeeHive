interface MemberInfo {
  firstname: string;
  lastname: string;
  email: string;
  points: number;
}

interface EventInfo {
  title: string;
  creator: string;
  address: string;
  date: Date;
  description: string;
  rsvp: Array<string>;
  sigin: Array<string>;
}

interface GroupInfo {
  name: string;
  description: string;
  members: Array<string>;
}

export type { EventInfo, GroupInfo, MemberInfo };
