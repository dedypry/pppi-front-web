import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
} from "@heroui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ContentRight from "./content-right";
import Comment from "./comments";

import HeaderContent from "@/components/layouts/landing/header-content";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getCategories } from "@/stores/features/categories/actions";
import { getBlogDetail } from "@/stores/features/blogs/actions";

dayjs.extend(relativeTime);

export default function BlogsDetail() {
  const { blog } = useAppSelector((state) => state.blogs);
  const { categories } = useAppSelector((state) => state.categories);

  const { slug } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories({}));
    dispatch(getBlogDetail({ slug: slug as any }));
  }, []);

  function decodeHtml(html: string) {
    const txt = document.createElement("textarea");

    txt.innerHTML = html;

    return txt.value;
  }

  return (
    <>
      <HeaderContent
        subtitle={blog?.category?.description || ""}
        title={blog?.category?.name}
      />
      <div className="container mx-auto flex flex-col gap-5 px-5 md:px-10">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-9">
            <Card className="p-2 md:p-3">
              <CardHeader>
                <Image className="w-full object-cover" src={blog?.cover} />
              </CardHeader>
              <CardBody>
                <div className="flex gap-1">
                  {blog?.tags.map((e: string) => (
                    <Chip
                      key={e}
                      className="bg-danger-300 text-white"
                      size="sm"
                    >
                      {e}
                    </Chip>
                  ))}
                </div>
                <p className="my-2 text-[36px] font-bold">{blog?.title}</p>
                <div className="flex items-center gap-2">
                  <Avatar
                    isBordered
                    size="sm"
                    src={blog?.writer?.profile?.photo || "/avatar.PNG"}
                  />
                  <p className="text-xs text-gray-800">
                    {blog?.writer.name} -{" "}
                    {dayjs(blog?.created_at).format("MMMM DD, YYYY")} -{" "}
                    {dayjs(blog?.created_at).fromNow()}
                  </p>
                </div>
              </CardBody>
              <CardBody>
                <p className="mb-5 text-sm italic text-gray-400">
                  {blog?.subtitle}
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(blog?.content!),
                  }}
                />
              </CardBody>
            </Card>

            <Comment blog={blog!} />
          </div>
          <div className="col-span-12 md:col-span-3">
            <ContentRight categories={categories!} />
          </div>
        </div>
      </div>
    </>
  );
}
