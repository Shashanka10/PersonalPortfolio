import { TbReportSearch } from "react-icons/tb";
import { FolderOpen, BookOpen } from "lucide-react";

export const galleryCategories = [
  {
    id: "projects",
    href: "/portfolio/projects",
    image: "/projectt.png",
    icon: <FolderOpen size={18} />,
    label: "Projects",
    tag: "Work",
    description: "Projects built with coding.",
    accent: "#12c971",
    count: "View all",
  },
  {
    id: "researchs",
    href: "/portfolio/researchs",
    image: "/findings.jpg",
    icon: <TbReportSearch size={18} />,
    label: "Papers",
    tag: "Research",
    description: "Experiment findings on few topics.",
    accent: "#C0C0C0",
    count: "View all",
  },
  {
    id: "blogs",
    href: "/portfolio/blogs",
    image: "/apps.jpg",
    icon: <BookOpen size={18} />,
    label: "Blogs",
    tag: "Writing",
    description: "Thoughts and reflections on various topics.",
    accent: "#FABC9B",
    count: "View all",
  },
];
