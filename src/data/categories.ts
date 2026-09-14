export type CategoryId = "ifp" | "floor" | "wall" | "retail" | "software";

export type Category = {
  id: CategoryId;
  name: string;
  short: string;
  href: string;
  blurb: string;
  image: string;
  imageClass?: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "ifp",
    name: "Interactive Panels",
    short: "Panels",
    href: "/collections/ifp",
    blurb: "65\" to 98\" classroom and boardroom panels",
    image: "/images/products/education-plus/01.png",
    imageClass: "object-[center_58%]",
  },
  {
    id: "floor",
    name: "Floor Displays",
    short: "Floor",
    href: "/collections/floor",
    blurb: "Easels, totems, kiosks, and standees",
    image: "/images/products/angle-pro/05.jpg",
    imageClass: "object-[center_30%]",
  },
  {
    id: "wall",
    name: "Wall Displays",
    short: "Wall",
    href: "/collections/wall",
    blurb: "Flush-mount cinematic signage",
    image: "/images/products/adzoview/04.jpg",
    imageClass: "object-center",
  },
  {
    id: "retail",
    name: "Retail & POS",
    short: "Retail",
    href: "/collections/retail",
    blurb: "Counters, racks, and shelf screens",
    image: "/images/products/luma/05.jpg",
    imageClass: "object-[center_42%] scale-110",
  },
  {
    id: "software",
    name: "Software",
    short: "Software",
    href: "/collections/software",
    blurb: "Fleet IQ cloud control",
    image: "/images/products/fleet-iq/01.jpg",
    imageClass: "object-[center_18%] scale-125",
  },
];

export function categoryById(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}
