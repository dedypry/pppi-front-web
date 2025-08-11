/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button, Card, Image } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/stores/hooks";
import { dateSchedule } from "@/utils/helpers/formater";

export default function ListBlogs() {
  const { blogs } = useAppSelector((state) => state.blogs);
  const route = useNavigate();

  return (
    <div className="flex flex-col gap-5 md:gap-2">
      {blogs?.data?.map((blog, i) => (
        <div key={i} onClick={() => route(`/blogs/${blog.slug}`)}>
          <Card
            key={blog.id}
            className="flex cursor-pointer flex-col hover:bg-primary-50 md:flex-row"
          >
            <Image
              className="h-[200px] w-auto object-cover md:h-[150px] md:w-[200px]"
              src={blog.cover}
            />
            <div className="flex flex-1 flex-col justify-between px-5 py-5">
              <div className="">
                <p className="text-[20px] font-semibold">{blog.title}</p>
                <p className="text-[14px] text-secondary-600 italic">
                  {blog.subtitle}
                </p>
              </div>
              <div className="flex items-end justify-between pt-10 md:pt-0">
                <Button
                  className="bg-primary-200 text-white shadow-md shadow-cyan-100"
                  radius="full"
                  size="sm"
                  onPress={() => route(`/blogs/${blog.slug}`)}
                >
                  Selengkapnya
                </Button>
                <p className="text-right text-sm italic text-gray-400">
                  {dateSchedule(blog.created_at)} WIB
                </p>
              </div>
            </div>
          </Card>
        </div>
      ))}

      {blogs?.total! > 10 && (
        <div className="my-5 flex justify-end">
          <Button color="primary" radius="full" size="sm">
            Lihat berita PPPI lebih banyak
          </Button>
        </div>
      )}
    </div>
  );
}
