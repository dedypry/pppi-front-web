import { Adsense } from "@ctrl/react-adsense";

import { adds } from "@/config/app";

export default function GoogleAds() {
  return (
    <div className="fixed z-10 right-0">
      <Adsense
        client={adds.clientId}
        format="fluid"
        layout="in-article"
        slot={adds.slot}
        style={{ display: "block" }}
      />
    </div>
  );
}
