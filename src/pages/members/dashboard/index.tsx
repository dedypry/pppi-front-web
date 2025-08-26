import { Card, CardBody } from "@heroui/react";

import { apps } from "@/config/app";
import { useAppSelector } from "@/stores/hooks";

export default function MemberDashboardPage() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Card>
      <CardBody>
        <h1 className="text-center mb-2">Hai, {user?.name} </h1>
        <h3 className="text-center">Selamat Datang di {apps.short_name}</h3>
      </CardBody>
    </Card>
  );
}
