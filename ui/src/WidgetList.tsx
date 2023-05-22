import React, { DragEvent, useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import * as api from "./api";
import { WidgetConfig } from "./widgets/Widget";

type TreeItemProps = {
  label: string;
  children?: TreeItemProps[];
  config?: WidgetConfig | { type: "section" };
};

const TreeItem: React.FC<TreeItemProps> = ({ label, children, config }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDragStart = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (config) {
        e.stopPropagation();
      }
      const data = JSON.stringify(config);
      e.dataTransfer.setData("text/plain", data);
    },
    [config]
  );

  return (
    <div draggable={!!config} onDragStart={handleDragStart}>
      <div onClick={handleToggle} style={{ cursor: "pointer" }}>
        {label}
      </div>
      {isOpen &&
        children?.map((child, index) => (
          <div key={index} style={{ marginLeft: "20px" }}>
            <TreeItem {...child} />
          </div>
        ))}
    </div>
  );
};

export default function WidgetList() {
  const allProfilesQuery = useQuery("contacts", api.getContacts);
  const allPeersQuery = useQuery("ships", api.getPeers);
  const allAppsQuery = useQuery("apps", api.getInstalledApps);

  const allPeers = useMemo(() => {
    return allPeersQuery.data?.known ?? [];
  }, [allPeersQuery.data]);

  console.log(allAppsQuery.data);

  const treeItems: TreeItemProps[] = [
    {
      label: "Profiles",
      children: Object.keys(allProfilesQuery.data || {}).map((id) => ({
        label: id,
        config: {
          type: "profile",
          peerId: id,
        },
      })),
    },
    {
      label: "Statuses",
      children: allPeers.map((id) => ({
        label: id,
        config: {
          type: "peer-status",
          peerId: id,
        },
      })),
    },
    {
      label: "Apps",
      children: Object.entries(allAppsQuery.data?.initial ?? {}).map(
        ([name, data]) => ({
          label: name,
          config: {
            type: "app",
            path: data.href?.site ?? `/apps/${name}/`,
          },
        })
      ),
    },
  ];

  return (
    <div style={{ overflow: "auto", padding: 12, width: 300 }}>
      {treeItems.map((treeItem, index) => (
        <TreeItem key={index} {...treeItem} />
      ))}
    </div>
  );
}
