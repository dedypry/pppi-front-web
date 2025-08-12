import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
  description?: string;
}
export default function Head({ title, description }: Props) {
  return (
    <Helmet>
      <title>PPPI - {title}</title>
      {description && <meta content={description} name="description" />}
    </Helmet>
  );
}
