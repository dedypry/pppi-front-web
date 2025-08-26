import {
  ClipboardPlusIcon,
  FormInputIcon,
  LayoutDashboard,
  LayoutListIcon,
  RssIcon,
} from "lucide-react";

export const navigate = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/member",
  },

  {
    header: "Form",
    children: [
      {
        title: "List Form",
        icon: FormInputIcon,
        href: "/member/form",
      },
      {
        title: "Buat Form",
        icon: FormInputIcon,
        href: "/member/form/create",
      },
    ],
  },

  {
    header: "Blogs",
    children: [
      {
        title: "Blog",
        icon: RssIcon,
        href: "/member/blogs",
      },
      {
        title: "Buat Blog",
        icon: ClipboardPlusIcon,
        href: "/member/blogs/create",
      },
      {
        title: "Kategori",
        icon: LayoutListIcon,
        href: "/member/blogs/category",
      },
    ],
  },
];
