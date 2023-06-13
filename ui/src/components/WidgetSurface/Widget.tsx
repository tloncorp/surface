export type WidgetConfig =
  | {
      type: "profile";
      peerId: string;
    }
  | {
      type: "channel-list";
      groupId: string;
    }
  | {
      type: "peer-status";
      peerId: string;
    }
  | {
      type: "app";
      path: string;
    };

const Widget = ({ config }: { config: WidgetConfig }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 16,
          backgroundColor: "#CCC",
          borderRadius: 8,
          flex: 0,
        }}
      >
        &nbsp;
      </div>
      <iframe
        style={{
          flex: 1,
          border: 0,
          backgroundColor: "white",
          borderRadius: 16,
          overflow: "hidden",
          pointerEvents: "none",
          minHeight: 0,
          boxShadow: "0 0 5px rgba(0,0,0,.1)",
        }}
        src={
          config.type === "app"
            ? `${config.path}`
            : `?${new URLSearchParams({
                ...config,
                page: "widget",
              }).toString()}`
        }
      />
    </div>
  );
};

export default Widget;
