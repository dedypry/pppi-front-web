import { Adsense } from "@ctrl/react-adsense";

import { adds } from "@/config/app";

export default function GoogleAds() {
  return (
    <Adsense
      client={adds.clientId}
      format="fluid"
      layout="in-article"
      slot={adds.slot}
      style={{ display: "block" }}
    />
  );
}
