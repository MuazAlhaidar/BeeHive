import { Relation } from "./store";

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
  rsvp: Array<MemberInfo> | Array<String>;
  signin: Array<string>;
}

interface EventInfo2 extends EventInfo {
  relation: Relation;
}

interface GroupInfo {
  id: string;
  name: string;
  description: string;
  members: Array<MemberInfo>;
}

interface MemberInfoSign extends MemberInfo {
  signin: boolean;
}

interface Message {
  data: any;
  msg: string | number;
}

export type {
  EventInfo,
  GroupInfo,
  MemberInfo,
  MemberInfoSign,
  EventInfo2,
  Message,
};
