import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { CalendarCheckIcon } from "lucide-react";

import { dateSchedule } from "@/utils/helpers/formater";

interface Props {
  agendas: any[];
}
export default function ListAgenda({ agendas }: Props) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {agendas?.map((item) => (
        <Card key={item.id} className="w-full">
          <CardHeader className="flex flex-col items-start">
            <p className="text-[20px] font-semibold">{item.title}</p>
            <p className="text-sm italic text-gray-500">{item.subtitle}</p>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <CalendarCheckIcon />
              <p>{dateSchedule(item.start_at)}</p>-
              <p>{dateSchedule(item.end_at)}</p>
            </div>
          </CardBody>
          <CardFooter className="flex justify-between">
            <Button
              className="bg-primary-200 text-white shadow-md shadow-cyan-100"
              radius="full"
              size="sm"
            >
              Selengkapnya
            </Button>
          </CardFooter>
        </Card>
      ))}
      <Card>
        <iframe
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="h-[220px] w-full"
          referrerPolicy="strict-origin-when-cross-origin"
          src="https://www.youtube.com/embed/d4ge0pwucxc?si=H2dw4ftzTLlJlPh5"
          title="YouTube video player"
        />
        <CardBody>
          <p className="text-[16px] font-semibold">
            NURSING ZOOMINAR #292 FOOTCARE & P
          </p>
          <p className="text-gray-600 text-sm">Dr. BM.PK & Astuti Yuri Nurs</p>
        </CardBody>
      </Card>
    </div>
  );
}
