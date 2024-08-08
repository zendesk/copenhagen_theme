import { Button } from "@zendeskgarden/react-buttons";

export function ServiceCatalogItems({ items }: { items: any }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
      {items.map((item: any) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            width: "250px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <img
            src={item.custom_object_fields.icon_image}
            alt={item.name}
            height="70px"
          />
          <h3 style={{ textAlign: "center", margin: 0 }}>{item.name}</h3>
          <div
            style={{
              display: "-webkit-box",
              "-webkit-box-orient": "vertical",
              "-webkit-line-clamp": "3",
              overflow: "hidden",
            }}
          >
            {item.custom_object_fields.description}
          </div>
          <Button isPrimary>Request</Button>
        </div>
      ))}
    </div>
  );
}
