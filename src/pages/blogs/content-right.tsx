import { Avatar, Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";

import ContentDivide from "@/components/content-divide";
import { ICategory } from "@/interface/IBlogs";
import { IPagination } from "@/interface/IPagination";
import GoogleAds from "@/components/google-adsense";
import { useAppSelector } from "@/stores/hooks";
import { decodeHtml } from "@/utils/helpers/decode-html";

interface Props {
  categories: IPagination<ICategory[]>;
}
export default function ContentRight({ categories }: Props) {
  const { blog } = useAppSelector((state) => state.blogs);

  return (
    <div className="flex flex-col gap-5 sticky top-20">
      <GoogleAds />
      <Card>
        <CardBody className="flex items-center justify-center p-5">
          <Avatar
            isBordered
            className="h-32 w-32"
            src={blog?.writer?.profile?.photo}
          />
          <p className="my-5 text-[20px] font-bold">
            Hi, Saya {blog?.writer.name}
          </p>
          <p className="text-center text-xs leading-relaxed text-gray-400">
            <div
              dangerouslySetInnerHTML={{
                __html: decodeHtml(blog?.writer?.bio!),
              }}
            />
          </p>
          <div className="mt-5 flex gap-2">
            <FacebookIcon className="text-blue-700" />
            <InstagramIcon className="text-red-600" />
            <TwitterIcon className="text-cyan-600" />
          </div>
        </CardBody>
      </Card>

      <Card className="p-2">
        <CardHeader className="flex flex-col items-start">
          <ContentDivide />
          <p className="text-[20px] font-bold">Kategori</p>
        </CardHeader>
        <CardBody className="flex flex-col gap-2">
          {(categories?.data || []).map((category) => (
            <Card key={category.id} className="bg-gray-100 shadow-none">
              <CardBody className="flex flex-row items-center justify-between">
                <Chip className="bg-primary-500 text-white" size="sm">
                  {category.name}
                </Chip>
                <p className="text-xs text-gray-500">
                  {category.blogs_count} Post
                </p>
              </CardBody>
            </Card>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
