/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Pagination,
} from "@heroui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ContentRight from "./content-right";

import HeaderContent from "@/components/layouts/landing/header-content";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getBlogs } from "@/stores/features/blogs/actions";
import { blogDate, dateHuman } from "@/utils/helpers/formater";
import { getCategories } from "@/stores/features/categories/actions";
import GoogleAds from "@/components/google-adsense";

export default function BlogsPage() {
  const { blogs } = useAppSelector((state) => state.blogs);
  const { categories } = useAppSelector((state) => state.categories);

  const dispatch = useAppDispatch();
  const route = useNavigate();

  useEffect(() => {
    dispatch(getBlogs({}));
    dispatch(getCategories({}));
  }, []);

  return (
    <>
      <HeaderContent
        subtitle="Landasan arah dan komitmen PPPI dalam membangun masa depan keperawatan Indonesia."
        title="Blogs PPPI"
      />

      <div className="container mx-auto flex flex-col gap-5 lg:px-10 px-5 my-10">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-9">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-12 gap-3">
                {(blogs?.data || []).map((blog) => (
                  <div
                    key={blog.id}
                    className="relative col-span-12 mt-10 lg:col-span-6"
                    onClick={() => route(`/blogs/${blog.slug}`)}
                  >
                    <Card
                      className="cursor-pointer hover:bg-primary-50"
                      radius="lg"
                    >
                      <CardHeader className="h-[260px]">
                        {/* <Image src={blog.cover} className="h-[300px] w-full object-cover" /> */}
                      </CardHeader>
                      <CardBody className="flex h-[130px] flex-col gap-3 px-5">
                        <p className="text-[20px] font-semibold text-gray-600">
                          {blog.title}
                        </p>
                        <p className="line-clamp-2 text-sm italic text-gray-400">
                          {blog.subtitle}
                        </p>
                      </CardBody>
                      <CardFooter className="flex gap-2 px-5">
                        <Avatar
                          isBordered
                          size="sm"
                          src={blog.writer?.profile?.photo || "/avatar.PNG"}
                        />
                        <p className="text-xs text-gray-600">
                          {blog.writer.name} - {blogDate(blog.created_at)} -{" "}
                          {dateHuman(blog.created_at)}
                        </p>
                      </CardFooter>
                    </Card>
                    <div className="absolute -top-10 px-5">
                      <Image
                        alt=""
                        className="h-[300px] w-full rounded-lg object-cover shadow-md"
                        src={blog.cover}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <Pagination
                  showControls
                  showShadow
                  initialPage={blogs?.current_page}
                  page={blogs?.current_page}
                  radius="full"
                  size="sm"
                  total={blogs?.last_page!}
                  onChange={(page) => dispatch(getBlogs({ page: page }))}
                />
              </div>
            </div>
          </div>
          <div className="col-span-12 pt-4 lg:col-span-3">
            <ContentRight categories={categories as any} />
          </div>
        </div>
      </div>
      <GoogleAds />
    </>
  );
}
