import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { CopyIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getForm } from "@/stores/features/form/actions";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { dateFormat } from "@/utils/helpers/formater";
import config from "@/config/api";
import { http } from "@/config/axios";
import { notify, notifyError } from "@/utils/helpers/notify";
import EmptyContent from "@/components/empty-content";
import TableAction from "@/components/table-action";
import { copyClipboard } from "@/utils/helpers/global";

export default function FormPageMember() {
  const { forms } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();
  const route = useNavigate();
  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const [query, setQuery] = useState({
    q: "",
    pageSize: "10",
    page: 1,
    ...Object.fromEntries(queryParams.entries()),
  });

  useEffect(() => {
    dispatch(getForm(query));
  }, []);

  function handleDelete(id: number) {
    http
      .delete(`/form/${id}`)
      .then(({ data }) => {
        notify(data.message);
        dispatch(getForm(query));
      })
      .catch((err) => notifyError(err));
  }

  function setQueryParams(key: string, value: any) {
    setQuery((val) => ({
      ...val,
      [key]: value,
      ...(key === "q" && {
        page: 1,
      }),
    }));
  }

  function getStatus(status: string) {
    let color = "";

    switch (status) {
      case "submission":
        color = "default";
        break;
      case "active":
        color = "primary";
        break;
      case "reject":
        color = "danger";
        break;

      default:
        break;
    }

    return color;
  }

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <h4>Form List</h4>
        <div>
          <Button as={Link} color="primary" to="/member/form/create">
            Buat Form
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <Table removeWrapper>
          <TableHeader>
            <TableColumn>Title</TableColumn>
            <TableColumn>slug</TableColumn>
            <TableColumn>dibuat</TableColumn>
            <TableColumn>status</TableColumn>
            <TableColumn>Total Respon</TableColumn>
            <TableColumn className="text-right">aksi</TableColumn>
          </TableHeader>
          <TableBody emptyContent={<EmptyContent />}>
            {(forms?.data || []).map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-primary-50 cursor-pointer"
                onClick={() => route(`/member/form/${item.id}/view`)}
              >
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.slug}</TableCell>
                <TableCell>{dateFormat(item.created_at)}</TableCell>
                <TableCell>
                  <Chip color={getStatus(item.status) as any} variant="dot">
                    {item.status}
                  </Chip>
                </TableCell>
                <TableCell>{item.result_total}</TableCell>
                <TableCell className="flex items-center justify-end">
                  <div>
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() =>
                        copyClipboard(`${config.front}/form/${item.slug}`)
                      }
                    >
                      <CopyIcon />
                    </Button>
                  </div>
                  <TableAction
                    onDelete={() => handleDelete(item.id)}
                    onEdit={() => route(`/member/form/${item.id}`)}
                    onView={() => route(`/member/form/${item.id}/view`)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
      {forms?.data?.length! > 0 && (
        <CardFooter className="flex justify-between">
          <div>
            <p className="font-bold text-gray-600">
              Total : {forms?.total || 0} Data
            </p>
          </div>
          <Pagination
            isCompact
            showControls
            initialPage={forms?.current_page}
            radius="full"
            total={forms?.last_page!}
            onChange={(page) => setQueryParams("page", page)}
          />
          <div />
        </CardFooter>
      )}
    </Card>
  );
}
