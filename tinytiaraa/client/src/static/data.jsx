// navigation Data
import religiousimg from './religious.jpg'
import pendantimg from './pendents.jpg'
import setimg from './set.jpg'
import bangleimg from './bangles.jpg'
import earringimg from './earrings.jpg'
import pearlimg from './pearl.jpg'
import meandmomimg from './meandmon.jpg'


//product page bannner 

import earringbanner from './productpage/earringbanner.jpg'
import pendantbanner from './productpage/pendantbanner.jpg'
import braceletsbanner from './productpage/braceletsbanner.jpg'
import setsbanner from './productpage/setsbanner.jpg'
import mombanner from './productpage/mombanner.jpg'
import religiousbanner from './productpage/religiousbanner.jpg'







// categories data
export const categoriesData = [
  {
    id: 1,
    title: "Diamond Earrings",
    subTitle: "",
    bannerimg: earringimg,
    productbanner: earringbanner,
    image_Url:
      "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4320772799.png",
    subcategories: [
      { name: "Studs" },
      { name: "tops" },
      { name: "Hoops" },

    ]
  },
  {
    id: 2,
    title: "Diamond Pendants",
    subcategories: [
      { name: "Alphabet" },
      { name: "Numeric" },
      { name: "religious" },
      { name: "Generic" },


    ],
    bannerimg: pendantimg,
    productbanner: pendantbanner,

    subTitle: "",
    image_Url:
      "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4388144518.png",
  },
  // {
  //   id: 3,
  //   title: "Pearl Collection",
  //   subTitle: "",
  //   image_Url:
  //     "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4388136306.png",

  //   bannerimg: pearlimg,
  //   subcategories: [
  //     { name: "No Products" },


  //   ],
  // },
  {
    id: 4,
    title: "Diamond Black Bead Bracelets",
    subTitle: "",
    bannerimg: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw23b41aef/images/hi-res/50F1KPBCTAA32_1.jpg",
    productbanner: braceletsbanner,
    
    image_Url:
      "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4388143843.png",
    subcategories: [
      { name: "No Products" },


    ],
  },
  {
    id: 5,
    title: "Diamond Bracelets",
    subcategories: [
      { name: "Nazaria" },
      { name: "Bracelets" },
      { name: "Kada/Bangle" },

    ],
    subTitle: "",
    bannerimg: bangleimg,
    productbanner: braceletsbanner,


    image_Url:
      "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4388144522.png",
  },
  {
    id: 6,
    title: "Sets",
    subTitle: "",
    subcategories: [
      { name: "Pendant set" },


    ],
    bannerimg: setimg,
    productbanner:setsbanner,

    image_Url:
      "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4388136314.png",
  },
  {
    id: 7,
    title: "Religious Collections",
    subTitle: "",
    bannerimg: religiousimg,
    productbanner:religiousbanner,


    image_Url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4320761225.png",
    subcategories: [
      { name: "No Products" },


    ],
  },
  {
    id: 8,
    title: "Mom and Me Collection",
    bannerimg: meandmomimg,

    productbanner: mombanner,

    subTitle: "",
    image_Url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4320761225.png",
    subcategories: [
      { name: "No Products" },


    ],
  }
];

// product Data
export const productData = [
  {
    id: 1,
    category: "Diamond Pendants",
    name: "Gold with Diamond Om Pendant for Kids",
    description:
      "This sacred Om Pendant serve your baby a cherished keepsake, symbolizing wishes for their well-being, happiness and growth. Suitable For Everyday Wear And Perfect Gift For Every Occasion.",
    image_Url: [
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4392716599",
      },
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4392719260.png",
      },
    ],
    extraimgurl: [
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4392719268"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4392717048"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4392719283"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4392716599"
      }
    ],
    metalcolor: [
      { colorname: "Yellow Gold" },
      { colorname: "Rose Gold" },
      { colorname: "White Gold" },


    ],
    Enamelcolor: [

    ],
    chain: [
      { yes: "With 1gm Chain ( 11 inches) (+₹7 200.00)" },
      { no: "Without Chain" }
    ],



    ratings: 4.2,
    rating: 4,
    price: 17270,
    discount_price: 15700,
    total_sell: 35,
    stock: 10,
    skuid: "SKU TPN-1036",
  },
  {
    id: 2,
    category: "Diamond Pendants",
    name: "Dazzling Flower Gold With Diamond Alphabet Pendant For Kids",
    description:
      "Welcome to our enchanting collection of flower alphabet gold with diamond pendant for your kids! Each pendant showcases a delicate flower with the perfect blend of elegance and playfulness, making them an ideal gift for any occasion.",
    image_Url: [
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4388878423.png",
      },
      {
        public_id: "test",
        url: "https://previews.dropbox.com/p/thumb/ACTu4yCedazFaliF8GXhtC5LnRZT7QICyqusUEGill7o7KDb2-0jKSqi8jJCMvbj5_d-0miV45GOMkhhM2JeDPyC7D-8lFUhto9t4psSqAse_09dSfWZxPkup_HPwcc0aR8VMcJytvuOE-T26yOQpUOiDuc4dOyvEC_OQLa4lec064ZQR886I3YORak_XuH-fQp69Q-0IuiA9Xuhdcz-Zq411TNwY3ySvybGt4BeeGUCIxPesVkWzc-w8hDKar_sOVmQ_QWR3aB-vrhk873xaeytaHEIPCArlDnEr_QBt31ybz2eWDMVQ9_J0eav2oy9Cgdl3mbSQL539OC8eMHABruZW7AmWAufqbxgpN0TRrjkujHDExdwoVBRhrW8ygY0eah0i0Ui9urjcriMmZjCFGmmOcUNudMHw6uJhuYDF9oBxB7rje3IOtCLO4iyPiBo6RNkApVZty7Hgia7P0tGVdyY/p.gif",
      },
    ],
    shop: {
      name: "Amazon Ltd",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    Enamelcolor: [

    ],
    extraimgurl: [
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4388886825.png"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4388887022.png"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4392719283"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4388887072.png"
      }
    ],
    metalcolor: [

    ],
    chain: [
      { yes: "With 1 gm Chain ( 11 inches) (+₹7 200.00)" },
      { no: "Without Chain" }
    ],
    price: 9735.00,
    discount_price: 8850.00,
    ratings: 4.2,
    rating: 4,
    total_sell: 80,
    stock: 10,
    skuid: "SKU TPN-1006"

    // category:"Mobile & Tablets"
  },
  {
    id: 3,
    category: "Diamond Pendants",
    name: "Silver Diamond Alphabet Diamond Alphabet Pendant For Kids",
    description:
      "Our exquisite collection of sliver alphabet pendants with diamond, specially designed for your little ones. Crafted with care and attention to detail, each pendant features a polished sliver letter adorned with a shimmering diamond, adding a touch of elegance and charm to any child's ensemble. Whether it's to celebrate a special occasion or simply to add a personalized touch to everyday wear, our pendant are perfect choice.",
    image_Url: [
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4239366834.png",
      },
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4239366834.png",
      },
    ],
    shop: {
      name: "Apple inc.",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    extraimgurl: [
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385456903.png"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385477764.jpg"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385453360.png"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385453368"
      }
    ],
    metalcolor: [
      { colorname: "Yellow Gold" },
      { colorname: "Rose Gold" },
      { colorname: "White Gold" },


    ],
    Enamelcolor: [
      { colorname: "Deep Blue" },
      { colorname: "Pink" },
      { colorname: "Turquoise" },
      { colorname: "Red" },
      { colorname: "Black" },
      { colorname: "Deep Green" },
      { colorname: "Lotus Green" }
    ],

    chain: [
      { yes: "With 1gm Chain ( 11 inches) (+₹7 200.00)" },
      { no: "Without Chain" }
    ],
    price: 2300,
    discount_price: 2099,
    ratings: 4.2,
    rating: 4,
    total_sell: 75,
    stock: 10,
    skuid: "SKU TOB-1007"

    // category:"Computers & Laptop"
  },
  {
    id: 4,
    category: "Diamond Pendants",
    name: "Jubilant Moments with Kid's J Letter Diamond with Gold Pendant",
    description:
      "Add a pop of colour and charm to your child's jewellery with our vibrant J pendant. The J alphabet pendant available in blue, pink and green enamel.",
    image_Url: [
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385456768.png",
      },
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385456768.png",
      },
    ],
    extraimgurl: [
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385456903.png"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385477764.jpg"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385453360.png"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385453368"
      }
    ],
    metalcolor: [
      { colorname: "Yellow Gold" },
      { colorname: "Rose Gold" },
      { colorname: "White Gold" },


    ],
    Enamelcolor: [
      { colorname: "Deep Blue" },
      { colorname: "Pink" },
      { colorname: "Turquoise" },
      { colorname: "Red" },
      { colorname: "Black" },
      { colorname: "Deep Green" },
      { colorname: "Lotus Green" }
    ],

    chain: [
      { yes: "With 1gm Chain ( 11 inches) (+₹7 200.00)" },
      { no: "Without Chain" }
    ],
    shop: {
      name: "Shahriar Watch House",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
      category: "Others"
    },
    price: 7975.0,
    discount_price: 7250,
    ratings: 4.2,
    rating: 4,
    total_sell: 12,
    stock: 10,
    skuid: "SKU TPN-1147"


  },
  {
    id: 5,
    category: "Diamond Pendants",
    name: "Journey in Style With J Gold Letter Children's Pendant",
    description:
      "Elevate your child's look with our stunning J Alphabet pendant, boasting curvy lines with a single sparkling diamond.",
    image_Url: [
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4382308582.png",
      },
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4382308582.png",
      },
    ],
    shop: {
      name: "Alisha Shoes Mart",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    extraimgurl: [
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385456903.png"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385477764.jpg"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385453360.png"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385453368"
      }
    ],
    metalcolor: [
      { colorname: "Yellow Gold" },
      { colorname: "Rose Gold" },
      { colorname: "White Gold" },


    ],
    Enamelcolor: [
      { colorname: "Deep Blue" },
      { colorname: "Pink" },
      { colorname: "Turquoise" },
      { colorname: "Red" },
      { colorname: "Black" },
      { colorname: "Deep Green" },
      { colorname: "Lotus Green" }
    ],

    chain: [
      { yes: "With 1gm Chain ( 11 inches) (+₹7 200.00)" },
      { no: "Without Chain" }
    ],
    price: 5940,
    discount_price: 5400,
    ratings: 4.2,
    rating: 4,
    total_sell: 49,
    stock: 10,
    skuid: "SKU TOB-1002"

  },
  {
    id: 6,
    category: "Diamond Bracelets",
    name: "Gold With Diamond Adjustable Bangle for kids",
    description:
      "The pendant features graceful letter S in design, adorning a diamond within bezel setting. The bezel setting frames the diamond offering not only stunning visual but also protection from impact.",
    image_Url: [

      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4382181822",
      },
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4394325839.gif",
      },
    ],
    shop: {
      name: "Alisha Shoes Mart",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    extraimgurl: [
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4382178062"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4382175956"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4382177958"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4382175961"
      }
    ],
    metalcolor: [
      { colorname: "Yellow Gold" },
      { colorname: "Rose Gold" },
      { colorname: "White Gold" },


    ],
    Enamelcolor: [

    ],

    chain: [
      { yes: "With 1gm Chain ( 11 inches) (+₹7 200.00)" },
      { no: "Without Chain" }
    ],
    price: 5940,
    discount_price: 5400,
    ratings: 4.2,
    rating: 4,
    total_sell: 49,
    stock: 10,
    skuid: "SKU TOB-1001"

  },
  {
    id: 7,
    category: "Diamond Pendants",
    name: "Heavenly H kid's Letter Pendant in Gold with Diamond",
    description:
      "Elevate your child's look with our stunning J Alphabet pendant, boasting curvy lines with a single sparkling diamond.",
    image_Url: [
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4382222644.png",
      },
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4382222644.png",
      },
    ],
    shop: {
      name: "Alisha Shoes Mart",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    extraimgurl: [
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385456903.png"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385477764.jpg"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385453360.png"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385453368"
      }
    ],
    metalcolor: [
      { colorname: "Yellow Gold" },
      { colorname: "Rose Gold" },
      { colorname: "White Gold" },


    ],
    Enamelcolor: [
      { colorname: "Deep Blue" },
      { colorname: "Pink" },
      { colorname: "Turquoise" },
      { colorname: "Red" },
      { colorname: "Black" },
      { colorname: "Deep Green" },
      { colorname: "Lotus Green" }
    ],

    chain: [
      { yes: "With 1gm Chain ( 11 inches) (+₹7 200.00)" },
      { no: "Without Chain" }
    ],
    price: 5940.00,
    discount_price: 5400,
    ratings: 4.2,
    rating: 4,
    total_sell: 49,
    stock: 10,
    skuid: "SKU TPN-1078"

  },

  {
    id: 8,
    category: "Diamond Earings",
    name: "Number 3 Pendant with Enamel and Diamonds",
    description:
      "Crafted with delicate enamel detailing in vibrant colors and accented with sparkling diamonds, this pendant adds a touch of elegance and charm to any outfit.",
    image_Url: [
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4390399404.png",
      },
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4390399404.png",
      },
    ],
    shop: {
      name: "Alisha Shoes Mart",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    extraimgurl: [
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385456903.png"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385477764.jpg"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385453360.png"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385453368"
      }
    ],
    metalcolor: [
      { colorname: "Yellow Gold" },
      { colorname: "Rose Gold" },
      { colorname: "White Gold" },


    ],
    Enamelcolor: [
      { colorname: "Deep Blue" },
      { colorname: "Pink" },
      { colorname: "Turquoise" },
      { colorname: "Red" },
      { colorname: "Black" },
      { colorname: "Deep Green" },
      { colorname: "Lotus Green" }
    ],

    chain: [
      { yes: "With 1gm Chain ( 11 inches) (+₹7 200.00)" },
      { no: "Without Chain" }
    ],
    price: 5940.00,
    discount_price: 5400,
    ratings: 4.2,
    rating: 4,
    total_sell: 49,
    stock: 10,
    skuid: "SKU TPN-1134"

  },

  {
    id: 9,
    category: "Diamond Earings",
    name: "Golden Pop Enamel Hoops With Diamond For Kids",
    description:
      "Golden pop enamel hoops with diamond for your little ones! These splendid earrings combine the vibrant charm of enamel, adorned with sparkling diamonds. Each pair is carefully crafted to add a touch of luxury to your little one's ensemble. With their secure closure, they're perfect for everyday wear or occasions. Let your child shine bright with our \"Golden Pop\" Hoops, a true treasure to cherish!",
    image_Url: [
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4243592984.png",
      },
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4243592984.png",
      },
    ],
    shop: {
      name: "Alisha Shoes Mart",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    extraimgurl: [
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385456903.png"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385477764.jpg"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385453360.png"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385453368"
      }
    ],
    metalcolor: [
      { colorname: "Yellow Gold" },
      { colorname: "Rose Gold" },
      { colorname: "White Gold" },


    ],
    Enamelcolor: [
      { colorname: "Deep Blue" },
      { colorname: "Pink" },
      { colorname: "Turquoise" },
      { colorname: "Red" },
      { colorname: "Black" },
      { colorname: "Deep Green" },
      { colorname: "Lotus Green" }
    ],

    chain: [
      { yes: "With 1gm Chain ( 11 inches) (+₹7 200.00)" },
      { no: "Without Chain" }
    ],
    price: 5940.00,
    discount_price: 5400,
    ratings: 4.2,
    rating: 4,
    total_sell: 49,
    stock: 10,
    skuid: "SKU THP-1003"

  },
  {
    id: 10,
    category: "Diamond Earings",
    name: "Number 6 Diamond Pendant for Kids",
    description:
      "Golden pop enamel hoops with diamond for your little ones! These splendid earrings combine the vibrant charm of enamel, adorned with sparkling diamonds. Each pair is carefully crafted to add a touch of luxury to your little one's ensemble. With their secure closure, they're perfect for everyday wear or occasions. Let your child shine bright with our \"Golden Pop\" Hoops, a true treasure to cherish!",
    image_Url: [
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4380460498.png",
      },
      {
        public_id: "test",
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4380460498.png",
      },
    ],
    shop: {
      name: "Alisha Shoes Mart",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    extraimgurl: [
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385456903.png"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385477764.jpg"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385453360.png"
      },
      {
        url: "https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4385453368"
      }
    ],
    metalcolor: [
      { colorname: "Yellow Gold" },
      { colorname: "Rose Gold" },
      { colorname: "White Gold" },


    ],
    Enamelcolor: [
      { colorname: "Deep Blue" },
      { colorname: "Pink" },
      { colorname: "Turquoise" },
      { colorname: "Red" },
      { colorname: "Black" },
      { colorname: "Deep Green" },
      { colorname: "Lotus Green" }
    ],

    chain: [
      { yes: "With 1gm Chain ( 11 inches) (+₹7 200.00)" },
      { no: "Without Chain" }
    ],
    price: 19635.00,
    discount_price: 16300.00,
    ratings: 4.2,
    rating: 4,
    total_sell: 49,
    stock: 10,
    skuid: "SKU TPN-1032"

  }

];

