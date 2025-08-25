import { Card, CardBody, CardHeader, Chip, Divider } from "@heroui/react";
import { CheckCircle } from "lucide-react";

import { useAppSelector } from "@/stores/hooks";

const colors = [
  "from-pink-400 to-red-400",
  "from-blue-400 to-indigo-500",
  "from-green-400 to-emerald-500",
  "from-yellow-400 to-orange-500",
];

const borderColors = [
  "border-pink-400",
  "border-blue-400",
  "border-green-400",
  "border-yellow-400",
];

export default function PackageSection() {
  const { packages } = useAppSelector((state) => state.packages);

  return (
    <section className="bg-gray-50 py-16" id="package">
      {packages.map((pckg) => (
        <div key={pckg.id} className="container mx-auto px-5 md:px-10 mb-20">
          <h2
            className="text-3xl font-bold text-center mb-10 text-gray-700"
            data-aos="fade-down"
          >
            {pckg.title}
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {pckg.types?.map((type, i) => (
              <Chip
                key={type}
                className={`border ${borderColors[i % borderColors.length]}`}
                data-aos="fade-down"
                size="lg"
                variant="bordered"
              >
                {type}
              </Chip>
            ))}
          </div>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${pckg.children.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-4"} gap-6`}
          >
            {pckg.children.map((item, i) => (
              <Card
                key={i}
                className={`w-full text-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer `}
                data-aos="fade-down"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                }}
              >
                <div
                  className={`bg-gradient-to-br h-full ${colors[i % colors.length]} p-5`}
                >
                  <CardHeader className="text-white font-bold text-2xl p-0 mb-4">
                    {item.title}
                  </CardHeader>
                  <CardBody className="bg-white rounded-xl p-4">
                    <p className="text-lg font-semibold text-gray-600 mb-3">
                      Benefit yang didapatkan:
                    </p>
                    <ul className="space-y-2">
                      {item.benefit?.map((benefit, j) => (
                        <li
                          key={j}
                          className="flex items-start text-gray-700 gap-2"
                        >
                          <div>
                            <CheckCircle className="text-green-500" size={18} />
                          </div>
                          <p className="text-gray-600 text-sm">{benefit}</p>
                        </li>
                      ))}
                    </ul>
                    <Divider className="my-5" />
                    <p className="text-lg font-semibold text-gray-600 mb-3">
                      Deskripsi :
                    </p>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </CardBody>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
      {/* <div className="container mx-auto px-5 md:px-10">
        <h2
          className="text-3xl font-bold text-center mb-10 text-gray-700"
          data-aos="fade-down"
        >
          Peningkatan Kompetensi
        </h2>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {types.map((type, i) => (
            <Chip
              key={type}
              className={`border ${borderColors[i % borderColors.length]}`}
              data-aos="fade-down"
              size="lg"
              variant="bordered"
            >
              {type}
            </Chip>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((item, i) => (
            <Card
              key={i}
              className={`w-full text-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer `}
              data-aos="fade-down"
              style={{
                backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
              }}
            >
              <div
                className={`bg-gradient-to-br h-full ${colors[i % colors.length]} p-5`}
              >
                <CardHeader className="text-white font-bold text-2xl p-0 mb-4">
                  {item.package}
                </CardHeader>
                <CardBody className="bg-white rounded-xl p-4">
                  <p className="text-lg font-semibold text-gray-600 mb-3">
                    Benefit yang didapatkan:
                  </p>
                  <ul className="space-y-2">
                    {item.benefit.map((benefit, j) => (
                      <li
                        key={j}
                        className="flex items-start text-gray-700 gap-2"
                      >
                        <div>
                          <CheckCircle className="text-green-500" size={18} />
                        </div>
                        <p className="text-gray-600 text-sm">{benefit}</p>
                      </li>
                    ))}
                  </ul>
                  <Divider className="my-5" />
                  <p className="text-lg font-semibold text-gray-600 mb-3">
                    Deskripsi :
                  </p>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </CardBody>
              </div>
            </Card>
          ))}
        </div>
      </div> */}
      {/* <Divider className="my-10 border border-primary" />
      <div className="container mx-auto px-5 md:px-10 mt-10">
        <h2
          className="text-3xl font-bold text-center mb-10 text-gray-700"
          data-aos="fade-down"
        >
          Pelatihan di PPPI
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {pelatihan.map((item, i) => (
            <Card
              key={i}
              className={`w-full text-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer `}
              data-aos="fade-down"
              style={{
                backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
              }}
            >
              <div
                className={`bg-gradient-to-br h-full ${colors[i % colors.length]} p-5`}
              >
                <CardHeader className="text-white font-bold text-2xl p-0 mb-4">
                  {item.package}
                </CardHeader>
                <CardBody className="bg-white rounded-xl p-4">
                  <p className="text-lg font-semibold text-gray-600 mb-3">
                    Benefit yang didapatkan:
                  </p>
                  <ul className="space-y-2">
                    {item.benefit.map((benefit, j) => (
                      <li
                        key={j}
                        className="flex items-start text-gray-700 gap-2"
                      >
                        <div>
                          <CheckCircle className="text-green-500" size={18} />
                        </div>
                        <p className="text-gray-600 text-sm">{benefit}</p>
                      </li>
                    ))}
                  </ul>
                  <Divider className="my-5" />
                  <p className="text-lg font-semibold text-gray-600 mb-3">
                    Deskripsi :
                  </p>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </CardBody>
              </div>
            </Card>
          ))}
        </div>
      </div> */}
    </section>
  );
}
