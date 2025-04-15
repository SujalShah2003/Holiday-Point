import HappyClient1 from "../assets/img/happy-client/Client 1.jpg";
import HappyClient2 from "../assets/img/happy-client/Client 2.jpg";
import HappyClient3 from "../assets/img/happy-client/Client 3.jpg";
import HappyClient4 from "../assets/img/happy-client/Client 4.jpg";
import HappyClient5 from "../assets/img/happy-client/Client 5.jpg";

export const LocationOption = [
  {
    group: "Domestic Packages",
    items: [
      { value: "Gujarat", label: "Gujarat" },
      { value: "Himachal Pradesh", label: "Himachal Pradesh" },
      { value: "Goa", label: "Goa" },
      { value: "Kerala", label: "Kerala" },
      { value: "Rajasthan", label: "Rajasthan" },
      { value: "Jammu Kashmir", label: "Jammu Kashmir" },
    ],
  },
  {
    group: "International Packages",
    items: [
      { value: "Vietnam", label: "Vietnam" },
      { value: "Dubai", label: "Dubai" },
      { value: "Singapore Malaysia", label: "Singapore Malaysia" },
      { value: "Maldives", label: "Maldives" },
      { value: "Bali", label: "Bali" },
      { value: "Sri Lanka", label: "Sri Lanka" },
    ],
  },
] as const;

export const happyClient = [
  {
    img_src: HappyClient1,
    img_alt: "Happy Client Image",
  },
  {
    img_src: HappyClient4,
    img_alt: "Happy Client Image",
  },
  {
    img_src: HappyClient5,
    img_alt: "Happy Client Image",
  },
  {
    img_src: HappyClient3,
    img_alt: "Happy Client Image",
  },
  {
    img_src: HappyClient2,
    img_alt: "Happy Client Image",
  },
];
