import { decToUd, deSig, preSig } from "@urbit/api";
import { Pikes } from "@urbit/api/dist/api";
import { Patp } from "@urbit/http-api";
import {
  ChatPerm,
  ChatWrits,
  Club,
  Clubs,
  Pins,
} from "../../../landscape-apps/ui/src/types/chat";
import {
  Contact,
  ContactRolodex,
} from "../../../landscape-apps/ui/src/types/contact";
import {
  Gangs,
  Group,
  Groups,
} from "../../../landscape-apps/ui/src/types/groups";
import { Blanket, Carpet } from "../../../landscape-apps/ui/src/types/hark";
import urbit from "./urbit";

export const getInstalledApps = async () => {
  return await urbit.scry<Pikes>({
    app: "docket",
    path: "/charges",
  });
};

export const getPinnedChats = async () => {
  return await urbit.scry<Pins>({
    app: "chat",
    path: "/pins",
  });
};

export const getChatPermissions = async (chatId: string) => {
  return await urbit.scry<ChatPerm>({
    app: "chat",
    path: `/chat/${chatId}/perm`,
  });
};

export const getChats = async () => {
  return await urbit.scry<Clubs>({
    app: "chat",
    path: "/dms",
  });
};

// export const getChatMessages = async (shipId: Patp, count: number) => {
//   return await urbit.scry<Clubs>({
//     app: "chat",
//     path: `/dm/${shipId}/writs/newest/${count}.json`,
//   });
// };

export const getGroupChats = async () => {
  return await urbit.scry<Clubs>({
    app: "chat",
    path: "/clubs",
  });
};

export const getGroupChat = async (groupChatId: string) => {
  return await urbit.scry<Club>({
    app: "chat",
    path: `/club/${groupChatId}/crew`,
  });
};

export const getGroupMetas = async () => {
  return await urbit.scry<Gangs>({
    app: "groups",
    path: "/gangs",
  });
};

export const getGroups = async () => {
  return await urbit.scry<Groups>({
    app: "groups",
    path: "/groups",
  });
};

export const getGroupMeta = async (groupId: string) => {
  return await urbit.scry<Gangs>({
    app: "groups",
    path: `/gangs/${groupId}`,
  });
};

export const getGroup = async (groupId: string) => {
  return await urbit.scry<Group>({
    app: "groups",
    path: `/groups/${groupId}`,
  });
};

export const getGroupMembers = async (groupId: string) => {
  return await urbit.scry<Group>({
    app: "groups",
    path: `/groups/${groupId}/fleet/ships`,
  });
};

export const getContacts = async () => {
  return await urbit.scry<ContactRolodex>({
    app: "contacts",
    path: "/all",
  });
};

export const getContact = async (ship: string) => {
  return await urbit.scry<Contact>({
    app: "contacts",
    path: `/contact/${preSig(ship)}`,
  });
};

export const getNotifications = async () => {
  const carpet = await urbit.scry<Carpet>({
    app: "hark",
    path: `/all/latest`,
  });
  return await urbit.scry<Blanket>({
    app: "hark",
    path: `/all/quilt/${decToUd(carpet.stitch.toString())}`,
  });
};

export interface Peer {
  known?: {
    life: number;
    qos: { "last-contact": number; kind: string };
    scries: [];
    route: { lane: string; direct: boolean };
    nax: [];
    rift: number;
    heeds: string[][];
    flows: { backward: []; forward: [] };
  };
  alien?: {
    keens: [];
    messages: number;
    packets: number;
    heeds: string[][];
  };
}

export const getPeers = async (): Promise<{
  known: Patp[];
  unknown: Patp[];
}> => {
  return await fetch("/~debug/ames/peer.json").then((res) => res.json());
};

export const getPeer = async (peer: string): Promise<Peer> => {
  return await fetch(`/~debug/ames/peer/${deSig(peer)}.json`).then((res) =>
    res.json()
  );
};

export const getChatMessages = ({
  type,
  conversation,
  count,
}: {
  type: "dm" | "club" | "chat";
  conversation: string;
  count: number;
}) => {
  return urbit.scry<ChatWrits>({
    app: "chat",
    path: `/${type}/${conversation}/writs/newest/${count}`,
  });
};

export const subscribeToChatUpdates = () => {
  return urbit.subscribe({
    app: "chat",
    path: "/briefs",
    event: (data, mark) => {
      console.log(data, mark);
    },
  });
};
