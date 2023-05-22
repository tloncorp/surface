import React, { FC, useMemo } from "react";
import { useQuery } from "react-query";
import * as api from "../api";
import { WidgetConfig } from "./Widget";

export const IFrameContent = ({ config }: { config: WidgetConfig }) => {
  if (!config) return null;
  switch (config.type) {
    case "profile":
      return <ProfileWidget peerId={config.peerId} />;
    case "peer-status":
      return <PeerStatusWidget peerId={config.peerId} />;
    case "channel-list":
      return <ChannelListWidget groupId={config.groupId} />;
  }
  return null;
};

const PeerStatusWidget = ({ peerId }: { peerId?: string }) => {
  const query = useQuery(["peer", peerId], () =>
    peerId ? api.getPeer(peerId) : Promise.resolve(null)
  );
  const peer = query.data?.known;
  return peer ? (
    <div style={{ padding: 12 }}>
      {peerId}
      <br />
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: peer.qos.kind === "live" ? "green" : "red",
        }}
      />
      {peer.qos.kind}
      <br />
      <br />
      Last seen at {new Date(peer.qos["last-contact"]).toLocaleString()}
    </div>
  ) : (
    <div>loading...</div>
  );
};

const ProfileWidget: FC<{
  peerId?: string;
}> = React.memo(({ peerId = "" }) => {
  const contactQuery = useQuery(["contact", peerId], () =>
    peerId
      ? Promise.all([api.getContact(peerId), api.getPeer(peerId)])
      : Promise.resolve(null)
  );
  const { profile } = useMemo(() => {
    if (!contactQuery.data) return { profile: null, network: null };
    return {
      profile: contactQuery.data[0],
      network: contactQuery.data[1],
    };
  }, [contactQuery.data]);

  return (
    <div style={{ padding: 12, wordWrap: "break-word" }}>
      {peerId}
      <br />
      {Object.entries(profile || {}).map(([key, val]) => (
        <span key={key}>
          {key}: {val}
          <br />
        </span>
      ))}
    </div>
  );
});

const ChannelListWidget = ({ groupId }: { groupId?: string | null }) => {
  const query = useQuery(["group", groupId], () =>
    groupId
      ? Promise.all([api.getGroup(groupId), api.getGroupMembers(groupId)])
      : Promise.resolve(null)
  );
  return query.data ? <pre>{JSON.stringify(query.data, null, 2)}</pre> : null;
};
