import { Helmet } from "react-helmet-async";

import { apps } from "@/config/app";

interface Props {
  title?: string;
  description?: string;
}
export default function Head({ title, description }: Props) {
  return (
    <Helmet>
      <title>PPPI - {title || apps.full_name}</title>
      {description && <meta content={description} name="description" />}
    </Helmet>
  );
}
