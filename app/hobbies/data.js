import { Music } from "lucide-react";
import { FaHiking } from "react-icons/fa";
import { TbCricket } from "react-icons/tb";

export const hobbyCategories = [
  {
    id: "music",
    href: "/hobbies/music",
    label: "Music",
    tag: "Listening",
    top: "On repeat",
    bottom: "A collection of songs, artists, and sounds I keep coming back to.",
    description: "Genres, artists, and tracks on repeat.",
    accent: "#a855f7",
    image: "/music.png",
    icon: <Music size={18} />,
  },
  {
    id: "trekking",
    href: "/hobbies/trekking",
    label: "Trekking",
    tag: "Adventure",
    top: "Into the wild",
    bottom:
      "A few trails and adventures that have taken me closer to the mountains.",
    description: "Trails walked across Nepal's hills and mountains.",
    accent: "#12c971",
    image: "/adventure.png",
    icon: <FaHiking size={18} />,
  },
  {
    id: "sports",
    href: "/hobbies/sports",
    label: "Sports",
    tag: "Games",
    top: "Outside the Screen",
    bottom: "A few sports I enjoy playing whenever I get the chance.",
    description: "Football, cricket, and other games I enjoy playing.",
    accent: "#38bdf8",
    image: "/sports.png",
    icon: <TbCricket size={18} />,
  },
];
