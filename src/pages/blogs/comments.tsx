import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@heroui/react";
import dayjs from "dayjs";
import { ReplyIcon } from "lucide-react";

import FormComment from "./form-comment";

import { IBlog } from "@/interface/IBlogs";

interface Props {
  blog: IBlog;
}

export default function Comment({ blog }: Props) {
  return (
    <Card className="mt-5 p-3">
      <CardHeader>
        <p className="text-[20px] font-bold">
          {" "}
          {blog?.comments.length} Comment
        </p>
      </CardHeader>
      <CardBody>
        {blog?.comments?.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-2">
            <div className="flex gap-5">
              <div>
                <Avatar
                  isBordered
                  size="lg"
                  src={comment?.user?.profile?.photo}
                />
              </div>
              <div>
                <p className="text-md font-semibold">
                  {comment.name}{" "}
                  {dayjs(comment.created_at).format("MMMM, DD YYYY")}
                </p>
                <p className="mt-1 text-sm text-gray-500">{comment.content}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                color="primary"
                radius="full"
                size="sm"
                startContent={<ReplyIcon />}
                variant="bordered"
              >
                Balas Comment
              </Button>
            </div>
          </div>
        ))}

        <Divider className="my-5" />

        <CardHeader className="flex flex-col items-start">
          <p className="text-[20px] font-bold">Tinggalkan Comentar</p>
          <p className="text-sm italic text-gray-400">
            Alamat email Anda tidak akan dipublikasikan. Kolom yang wajib diisi
            ditandai dengan tanda
          </p>
        </CardHeader>
        <CardBody>
          <FormComment />
        </CardBody>
      </CardBody>
    </Card>
  );
}
