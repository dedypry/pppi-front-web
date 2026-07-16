import { Avatar, Card, CardBody } from "@heroui/react";
import { UserRoundIcon } from "lucide-react";

import { IOrganizations } from "@/interface/IOrganization";
import { formatNia } from "@/utils/helpers/formater";

interface Props {
  item?: IOrganizations;
  title?: string;
}

export default function CardItemOrg({ item, title }: Props) {
  const fullName = [
    item?.user?.front_title,
    item?.user?.name,
    item?.user?.back_title,
  ]
    .filter(Boolean)
    .join(" ");
  const label = title || item?.title;

  return (
    <div className="relative inline-block">
      <Card className="min-w-[140px] border border-primary text-center shadow-sm">
        <CardBody className="flex flex-col items-center gap-2 px-3 py-3">
          {item?.user?.profile?.photo ? (
            <Avatar isBordered size="lg" src={item.user.profile.photo} />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-primary/40 bg-primary/5">
              <UserRoundIcon className="text-primary/60" size={24} />
            </div>
          )}

          {item?.user ? (
            <div className="text-center">
              <p className="m-0 max-w-[150px] p-0 text-xs font-semibold leading-snug text-gray-800">
                {fullName}
              </p>
              {item.user.nia && (
                <p className="m-0 p-0 text-[10px] text-cyan-700">
                  {formatNia(item.user.nia)}
                </p>
              )}
            </div>
          ) : null}

          <p className="m-0 p-0 text-sm font-medium text-primary">{label}</p>
        </CardBody>
      </Card>
    </div>
  );
}
