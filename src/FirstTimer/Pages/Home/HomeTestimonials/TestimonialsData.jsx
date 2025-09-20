// Testimonials data: Kenyan names, diverse locations, and roles
import img1 from "../../../assets/user1.webp"
import img2 from "../../../assets/user2.webp"
import img3 from "../../../assets/user3.webp"
import img4 from "../../../assets/user4.webp"
import img5 from "../../../assets/user5.webp"
import img6 from "../../../assets/user6.webp"
import img7 from "../../../assets/user7.webp"
import img9 from "../../../assets/user9.webp"
import img10 from "../../../assets/user10.webp"
import img14 from "../../../assets/user14.webp"
import img15 from "../../../assets/user15.webp"

const testimonalsData = [
  {
    id: 1,
    personName: "Achieng' Atieno",
    role: "Farmer",
    testimony:
      "Through Kilimo Link I found steady buyers for my tomatoes in Kisumu. Payments are timely and I negotiate directly—no brokers.",
    image: img1,
    location: "Kisumu, Kisumu County",
    rating: 5,
  },
  {
    id: 2,
    personName: "John Mwangi",
    role: "Restaurant Owner", // Fixed: was img2
    testimony:
      "I source fresh vegetables for my restaurant in Nakuru at fair prices. The platform makes comparing offers very easy.",
    image: img2, // Fixed: was empty string
    location: "Nakuru Town, Nakuru County",
    rating: 4,
  },
  {
    id: 3,
    personName: "Faith Wanjiru",
    role: "Dairy Farmer", // Fixed: was img3
    testimony:
      "My dairy products now reach buyers in Nairobi directly. Transport planning and messaging on the platform are a big plus.",
    image: img3, // Fixed: was empty string
    location: "Nyeri, Nyeri County",
    rating: 5,
  },
  {
    id: 4,
    personName: "Brian Odhiambo",
    role: "Buyer",
    testimony:
      "Finding bulk suppliers of potatoes has saved my chips business in Eldoret 15% monthly. Clear profiles build trust.",
    image: img4,
    location: "Eldoret, Uasin Gishu County",
    rating: 4,
  },
  {
    id: 5,
    personName: "Muthoni Njeri",
    role: "Farmer",
    testimony:
      "I list avocados during peak season and get better prices. I also learn storage tips from other farmers on the platform.",
    image: img5,
    location: "Murang'a, Murang'a County",
    rating: 5,
  },
  {
    id: 6,
    personName: "Abdullahi Hussein",
    role: "Livestock Farmer",
    testimony:
      "Goat keepers in Garissa now access wider demand. I appreciate the transparency and quick buyer responses.",
    image: img6,
    location: "Garissa, Garissa County",
    rating: 4,
  },
  {
    id: 7,
    personName: "Peter Kiptoo",
    role: "Farmer",
    testimony:
      "Selling maize directly has improved my income. The ratings system helps me stand out with reliable deliveries.",
    image: img7,
    location: "Kericho, Kericho County",
    rating: 5,
  },
  {
    id: 8,
    personName: "Zainab Ahmed",
    role: "Hotel Buyer",
    testimony:
      "We procure fruits for our hotel in Mombasa from verified farmers. Quality has improved and waste has dropped.",
    image: img9,
    location: "Mombasa Island, Mombasa County",
    rating: 5,
  },
  {
    id: 9,
    personName: "Kevin Ouma",
    role: "Poultry Farmer",
    testimony:
      "Poultry buyers now reach me directly. I schedule deliveries and confirm orders right from my phone.",
    image: img10,
    location: "Kisii, Kisii County",
    rating: 4,
  },
  {
    id: 10,
    personName: "Mercy Naliaka",
    role: "Fruit Farmer",
    testimony:
      "Through the community, I learned better banana ripening techniques and reached new buyers in Kakamega.",
    image: img14,
    location: "Kakamega, Kakamega County",
    rating: 5,
  },
  {
    id: 11,
    personName: "Sammy Njoroge",
    role: "Grocery Shop Owner",
    testimony:
      "Our grocery shop in Kiambu gets consistent supply of fresh kale. Messaging and order tracking are seamless.",
    image: img15,
    location: "Ruiru, Kiambu County",
    rating: 4,
  },
  {
    id: 12,
    personName: "Lucy Wambui",
    role: "Small-scale Farmer",
    testimony:
      "I sell strawberries from my small farm and set my own price. The visibility has grown my customer base.",
    image: img6,
    location: "Limuru, Kiambu County",
    rating: 5,
  },
];

export default testimonalsData;