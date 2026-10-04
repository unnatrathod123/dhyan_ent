import { Product, KhataTransaction, KhataCustomer, CashierShift, Order, WarrantyClaim } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_duralink_cable',
    sku: 'ANK-DUR-CBL',
    title: 'DuraLink Braided Cable',
    brand: 'Anker',
    category: 'cables',
    subtitle: 'Navy',
    retailPrice: 1299,
    wholesalePrice: 699,
    retailPriceUSD: 15.99,
    wholesalePriceUSD: 8.5,
    mrp: 1999,
    discount: '-35% OFF',
    rating: 4.9,
    reviewsCount: 1420,
    stockCount: 150,
    warranty: '2 Year Anker Warranty',
    description: 'Ultra-durable nylon braided USB-C to USB-C cable tested to withstand 30,000+ bends. Supports 100W PD fast charging.',
    imageUrl: '/images/duralink_cable.jpg',
    specs: {
      powerOutput: '100W Max (20V/5A)',
      material: 'Double-braided Nylon & Aluminum Connectors',
      compatibility: 'Universal USB-C laptops, tablets, smartphones',
      warrantyPeriod: '24 Months Replacement'
    },
    variants: ['1.8m (6ft) • Navy', '1.0m (3.3ft) • Navy', '2.0m (6.6ft) • Black'],
    colors: [
      { name: 'Navy', hex: '#1e3a5f' },
      { name: 'Space Gray', hex: '#4b5563' }
    ],
    imeis: [],
    moq: 10,
    volumeTiers: [
      { minQty: 10, maxQty: 49, priceUSD: 8.5, priceINR: 699 },
      { minQty: 50, maxQty: 99, priceUSD: 7.2, priceINR: 599 },
      { minQty: 100, priceUSD: 5.99, priceINR: 499 }
    ]
  },
  {
    id: 'prod_swiftport_charger',
    sku: 'TH-SWF-GAN',
    title: 'SwiftPort GaN Charger',
    brand: 'Dhyan Enterprise',
    category: 'chargers',
    subtitle: 'White',
    retailPrice: 3499,
    wholesalePrice: 1899,
    retailPriceUSD: 45.99,
    wholesalePriceUSD: 24.0,
    mrp: 4999,
    discount: '-30% OFF',
    rating: 4.8,
    reviewsCount: 890,
    stockCount: 85,
    warranty: '18 Months Replacement Warranty',
    description: 'Next-gen GaNFast technology dual port charger. Super compact foldable prongs with intelligent dynamic power distribution.',
    imageUrl: '/images/swiftport_charger.jpg',
    specs: {
      powerOutput: '65W Max GaNFast Architecture',
      material: 'Flame-retardant PC Material',
      compatibility: 'MacBook, iPhone 15/16, Samsung Galaxy, SteamDeck',
      warrantyPeriod: '18 Months'
    },
    variants: ['65W Dual Port (USB-C + USB-A)', '100W Triple Port'],
    colors: [
      { name: 'Pure White', hex: '#ffffff' },
      { name: 'Matte Black', hex: '#18181b' }
    ],
    imeis: [],
    moq: 5,
    volumeTiers: [
      { minQty: 5, maxQty: 19, priceUSD: 24.0, priceINR: 1899 },
      { minQty: 20, maxQty: 49, priceUSD: 21.5, priceINR: 1699 },
      { minQty: 50, priceUSD: 18.0, priceINR: 1450 }
    ]
  },
  {
    id: 'prod_ip13_screen',
    sku: 'APL-SCR-13P',
    title: 'iPhone 13 Pro Screen Assembly',
    brand: 'Apple',
    category: 'spare_parts',
    subtitle: 'Screen',
    retailPrice: 15999,
    wholesalePrice: 9999,
    retailPriceUSD: 189.0,
    wholesalePriceUSD: 119.0,
    mrp: 22999,
    discount: '-30% OFF',
    rating: 4.7,
    reviewsCount: 312,
    stockCount: 40,
    warranty: '6 Months Dhyan Enterprise Warranty',
    description: 'OEM grade 120Hz ProMotion Super Retina XDR OLED replacement display. TrueTone and 3D Touch IC programmable.',
    imageUrl: '/images/screen_assembly.jpg',
    specs: {
      display: '6.1" Super Retina XDR OLED 120Hz ProMotion',
      material: 'Ceramic Shield Glass with Oleophobic coating',
      compatibility: 'iPhone 13 Pro (Models A2638, A2483, A2636, A2639)',
      warrantyPeriod: '6 Months Direct Replacement'
    },
    variants: ['OEM Grade OLED (Full Assembly)', 'Aftermarket Incell (Budget)'],
    colors: [{ name: 'Screen Assembly', hex: '#10b981' }],
    imeis: [],
    moq: 3,
    volumeTiers: [
      { minQty: 3, maxQty: 9, priceUSD: 119.0, priceINR: 9999 },
      { minQty: 10, maxQty: 24, priceUSD: 105.0, priceINR: 8800 },
      { minQty: 25, priceUSD: 95.0, priceINR: 7900 }
    ]
  },
  {
    id: 'prod_magboost_powerbank',
    sku: 'BLK-MAG-PB',
    title: 'MagBoost Power Bank',
    brand: 'Belkin',
    category: 'accessories',
    subtitle: 'Gray',
    retailPrice: 5499,
    wholesalePrice: 3199,
    retailPriceUSD: 69.99,
    wholesalePriceUSD: 39.5,
    mrp: 7999,
    discount: '-31% OFF',
    rating: 4.8,
    reviewsCount: 760,
    stockCount: 60,
    warranty: '1 Year Belkin Warranty',
    description: 'Slimline magnetic wireless power pack with built-in kickstand. Snap-and-charge convenience with 15W Qi2 wireless output.',
    imageUrl: '/images/magboost_powerbank.jpg',
    specs: {
      battery: '10,000 mAh Li-Polymer with LED Fuel Gauge',
      powerOutput: '15W Wireless Qi2 + 20W PD USB-C In/Out',
      material: 'Anodized Aluminum & Soft-touch Silicone',
      warrantyPeriod: '12 Months'
    },
    variants: ['10,000 mAh Slim', '5,000 mAh Ultra-Thin'],
    colors: [
      { name: 'Gray', hex: '#6b7280' },
      { name: 'Midnight', hex: '#0f172a' }
    ],
    imeis: [],
    moq: 5,
    volumeTiers: [
      { minQty: 5, maxQty: 19, priceUSD: 39.5, priceINR: 3199 },
      { minQty: 20, maxQty: 49, priceUSD: 34.0, priceINR: 2750 },
      { minQty: 50, priceUSD: 29.99, priceINR: 2450 }
    ]
  },
  {
    id: 'prod_s24u',
    sku: 'SAM-S24U-TI',
    title: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'phones',
    subtitle: 'Titanium',
    retailPrice: 106999,
    wholesalePrice: 98500,
    retailPriceUSD: 1199.0,
    wholesalePriceUSD: 999.0,
    mrp: 124999,
    discount: '-16% OFF',
    rating: 4.8,
    reviewsCount: 1800,
    stockCount: 11,
    warranty: '1 Year Brand Warranty',
    description: 'Galaxy AI is here. Titanium frame, built-in S Pen, 200MP Quad Telephoto camera, and flat Armor Aluminum display.',
    imageUrl: '/images/s24_ultra.jpg',
    specs: {
      processor: 'Snapdragon 8 Gen 3 for Galaxy',
      battery: '5000 mAh (45W Super Fast 2.0)',
      camera: '200MP Quad Telephoto with AI Zoom',
      display: '6.8" QHD+ Dynamic AMOLED 2X 2600nits'
    },
    variants: ['Titanium 256GB • 12GB', 'Titanium 512GB • 12GB'],
    colors: [
      { name: 'Titanium Gray', hex: '#636569' },
      { name: 'Titanium Black', hex: '#212121' }
    ],
    imeis: ['352904812398701', '352904812398702', '352904812398703'],
    moq: 2,
    volumeTiers: [
      { minQty: 2, maxQty: 4, priceUSD: 999.0, priceINR: 98500 },
      { minQty: 5, priceUSD: 949.0, priceINR: 94500 }
    ]
  },
  {
    id: 'prod_ip15p',
    sku: 'APL-IP15P-NT',
    title: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'phones',
    subtitle: 'Natural Titanium',
    retailPrice: 130990,
    wholesalePrice: 122500,
    retailPriceUSD: 999.0,
    wholesalePriceUSD: 899.0,
    mrp: 144990,
    discount: '-12% OFF',
    rating: 4.9,
    reviewsCount: 2400,
    stockCount: 8,
    warranty: '1 Year Apple Care',
    description: 'Forged in titanium with the cutting-edge A17 Pro chip, 48MP camera, and customizable Action button.',
    imageUrl: '/images/iphone_15_pro.jpg',
    specs: {
      processor: 'Apple A17 Pro (3nm 6-core)',
      battery: 'Up to 23 hrs video playback',
      camera: '48MP Main + 12MP Ultra-Wide + 3x Telephoto',
      display: '6.1" Super Retina XDR OLED ProMotion'
    },
    variants: ['Natural Titanium 256GB', 'Natural Titanium 512GB'],
    colors: [
      { name: 'Natural Titanium', hex: '#9e978e' },
      { name: 'Black Titanium', hex: '#232220' }
    ],
    imeis: ['359281098765401', '359281098765402', '359281098765403'],
    moq: 2,
    volumeTiers: [
      { minQty: 2, maxQty: 4, priceUSD: 899.0, priceINR: 122500 },
      { minQty: 5, priceUSD: 869.0, priceINR: 119000 }
    ]
  },
  {
    id: 'prod_op12',
    sku: 'OP12-512G-GRN',
    title: 'OnePlus 12 5G',
    brand: 'OnePlus',
    category: 'phones',
    subtitle: 'Flowy Emerald',
    retailPrice: 58499,
    wholesalePrice: 54900,
    retailPriceUSD: 799.0,
    wholesalePriceUSD: 699.0,
    mrp: 69999,
    discount: '-18% OFF',
    rating: 4.7,
    reviewsCount: 890,
    stockCount: 14,
    warranty: '1 Year Brand Warranty',
    description: 'Snapdragon 8 Gen 3 | 50MP Hasselblad Camera | 5400mAh 100W SUPERVOOC | Flowy Emerald finish.',
    imageUrl: '/images/oneplus_12.jpg',
    specs: {
      processor: 'Snapdragon 8 Gen 3 (4nm)',
      battery: '5400 mAh (100W SUPERVOOC + 50W AIRVOOC)',
      camera: '50MP Sony LYT-808 + 64MP Periscope OIS',
      display: '6.82" 2K 120Hz ProXDR LTPO AMOLED'
    },
    variants: [
      '12GB RAM + 256GB Storage (₹58,999)',
      '16GB RAM + 512GB Storage [POPULAR] (₹64,999)',
      '16GB RAM + 1TB Storage [Pro Creator Edition] (₹69,999)'
    ],
    colors: [
      { name: 'Flowy Emerald', hex: '#0e4438' },
      { name: 'Silky Black', hex: '#18181b' },
      { name: 'Glacial White', hex: '#f1f5f9' }
    ],
    imeis: ['864920061234501', '864920061234502', '864920061234503'],
    moq: 2,
    volumeTiers: [
      { minQty: 2, maxQty: 4, priceUSD: 699.0, priceINR: 54900 },
      { minQty: 5, priceUSD: 669.0, priceINR: 52900 }
    ]
  },
  {
    id: 'prod_redmi13p',
    sku: 'XIA-RN13P-PUR',
    title: 'Redmi Note 13 Pro',
    brand: 'Xiaomi',
    category: 'phones',
    subtitle: 'Coral Purple',
    retailPrice: 23499,
    wholesalePrice: 20900,
    retailPriceUSD: 299.0,
    wholesalePriceUSD: 249.0,
    mrp: 28999,
    discount: '-24% OFF',
    rating: 4.5,
    reviewsCount: 3100,
    stockCount: 19,
    warranty: '1 Year Brand Warranty',
    description: '200MP OIS Camera with 120Hz 1.5K Curved AMOLED, Snapdragon 7s Gen 2, and 67W Turbo Charge.',
    imageUrl: '/images/redmi_note_13.jpg',
    specs: {
      processor: 'Snapdragon 7s Gen 2 (4nm)',
      battery: '5100 mAh (67W Turbo Charge)',
      camera: '200MP OIS Ultra-Clear Camera',
      display: '6.67" 1.5K 120Hz Curved AMOLED'
    },
    variants: ['Coral Purple • 256GB', 'Midnight Black • 256GB'],
    colors: [
      { name: 'Coral Purple', hex: '#b8a9c9' },
      { name: 'Midnight Black', hex: '#1e293b' }
    ],
    imeis: ['869102938475601', '869102938475602'],
    moq: 3,
    volumeTiers: [
      { minQty: 3, maxQty: 5, priceUSD: 249.0, priceINR: 20900 },
      { minQty: 6, priceUSD: 235.0, priceINR: 19800 }
    ]
  },
  {
    id: 'prod_anker80w',
    sku: 'ANK-80W-DUAL',
    title: 'Anker 80W Dual USB-C Fast Charger',
    brand: 'Anker',
    category: 'chargers',
    subtitle: 'White',
    retailPrice: 1799,
    wholesalePrice: 1350,
    retailPriceUSD: 39.99,
    wholesalePriceUSD: 22.5,
    mrp: 2499,
    discount: '-28% OFF',
    rating: 4.9,
    reviewsCount: 420,
    stockCount: 32,
    warranty: '18 Months Warranty',
    description: 'GaN III technology dual port ultra fast charging for laptops, tablets, and phones.',
    imageUrl: '/images/swiftport_charger.jpg',
    specs: {
      powerOutput: '80W Max Power Delivery',
      material: 'GaN III IC Heat Dissipating',
      compatibility: 'Laptops, Tablets, Smartphones',
      warrantyPeriod: '18 Months'
    },
    variants: ['80W Dual Port'],
    colors: [{ name: 'Pure White', hex: '#ffffff' }],
    imeis: ['SN-ANK80W-01', 'SN-ANK80W-02'],
    moq: 5,
    volumeTiers: [
      { minQty: 5, maxQty: 19, priceUSD: 22.5, priceINR: 1350 },
      { minQty: 20, priceUSD: 19.99, priceINR: 1199 }
    ]
  },
  {
    id: 'prod_spigen_mag',
    sku: 'SPG-MAG-10K',
    title: 'Spigen Power 10000mAh MagPack Slim',
    brand: 'Accessories',
    category: 'accessories',
    subtitle: 'Black',
    retailPrice: 2200,
    wholesalePrice: 1650,
    retailPriceUSD: 49.99,
    wholesalePriceUSD: 28.0,
    mrp: 3499,
    discount: '-37% OFF',
    rating: 4.8,
    reviewsCount: 310,
    stockCount: 25,
    warranty: '1 Year Warranty',
    description: 'Magnetic wireless charging powerbank with 20W PD USB-C in/out and kickstand.',
    imageUrl: '/images/magboost_powerbank.jpg',
    specs: {
      battery: '10000 mAh Li-Polymer',
      powerOutput: '15W Wireless + 20W PD',
      material: 'Impact Resistant Polycarbonate',
      warrantyPeriod: '1 Year'
    },
    variants: ['10000mAh Slim'],
    colors: [{ name: 'Deep Black', hex: '#0f172a' }],
    imeis: ['SN-SPG10K-01'],
    moq: 5,
    volumeTiers: [
      { minQty: 5, maxQty: 19, priceUSD: 28.0, priceINR: 1650 },
      { minQty: 20, priceUSD: 24.5, priceINR: 1450 }
    ]
  },
  {
    id: 'prod_nothing_2a',
    sku: 'NOT-PH2A-GRY',
    title: 'Nothing Phone (2a) Plus',
    brand: 'Nothing',
    category: 'phones',
    subtitle: 'Metallic Grey • Glyph Interface',
    retailPrice: 27999,
    wholesalePrice: 23499,
    retailPriceUSD: 329.0,
    wholesalePriceUSD: 279.0,
    mrp: 31999,
    discount: '-13% OFF',
    rating: 4.8,
    reviewsCount: 1240,
    stockCount: 35,
    warranty: '1 Year Nothing Warranty',
    description: 'Distinctive transparent industrial design with customizable Glyph lights. Powered by Dimensity 7350 Pro 5G, 50MP dual cameras, and 50W fast charging.',
    imageUrl: '/images/nothing_phone_2a.jpg',
    specs: {
      processor: 'MediaTek Dimensity 7350 Pro 5G (4nm)',
      battery: '5000 mAh (50W Fast Charge)',
      camera: '50MP Main OIS + 50MP Ultra-Wide + 50MP Front',
      display: '6.7" Flexible AMOLED 120Hz 1300 nits'
    },
    variants: ['12GB RAM + 256GB Storage', '8GB RAM + 256GB Storage'],
    colors: [
      { name: 'Metallic Grey', hex: '#8c8f94' },
      { name: 'Black', hex: '#18181b' }
    ],
    imeis: ['862901928374001', '862901928374002'],
    moq: 2,
    volumeTiers: [
      { minQty: 2, maxQty: 4, priceUSD: 279.0, priceINR: 23499 },
      { minQty: 5, priceUSD: 265.0, priceINR: 22200 }
    ]
  },
  {
    id: 'prod_s24u_screen',
    sku: 'SAM-SCR-S24U',
    title: 'Galaxy S24 Ultra AMOLED Screen Assembly',
    brand: 'Samsung',
    category: 'spare_parts',
    subtitle: 'Dynamic AMOLED 2X with Frame',
    retailPrice: 21999,
    wholesalePrice: 14500,
    retailPriceUSD: 249.0,
    wholesalePriceUSD: 169.0,
    mrp: 28999,
    discount: '-24% OFF',
    rating: 4.9,
    reviewsCount: 215,
    stockCount: 28,
    warranty: '6 Months Dhyan Enterprise OEM Warranty',
    description: 'Original Service Pack replacement display assembly with pre-installed Titanium frame, Corning Gorilla Armor glass, 120Hz LTPO, and fingerprint sensor flex.',
    imageUrl: '/images/galaxy_screen_assembly.jpg',
    specs: {
      display: '6.8" Quad HD+ Dynamic AMOLED 2X 120Hz (2600 nits)',
      material: 'Corning Gorilla Armor Glass & Titanium Frame',
      compatibility: 'Samsung Galaxy S24 Ultra (SM-S928B, SM-S928U)',
      warrantyPeriod: '6 Months Direct Replacement'
    },
    variants: ['Original Service Pack with Frame', 'OLED Assembly (No Frame)'],
    colors: [
      { name: 'Titanium Gray', hex: '#636569' },
      { name: 'Titanium Black', hex: '#212121' }
    ],
    imeis: [],
    moq: 3,
    volumeTiers: [
      { minQty: 3, maxQty: 9, priceUSD: 169.0, priceINR: 14500 },
      { minQty: 10, maxQty: 24, priceUSD: 155.0, priceINR: 13200 },
      { minQty: 25, priceUSD: 142.0, priceINR: 12100 }
    ]
  },
  {
    id: 'prod_airpods_pro_2',
    sku: 'APL-APP2-USBC',
    title: 'AirPods Pro (2nd Gen, USB-C)',
    brand: 'Apple',
    category: 'accessories',
    subtitle: 'MagSafe Case (USB-C)',
    retailPrice: 24900,
    wholesalePrice: 18900,
    retailPriceUSD: 249.0,
    wholesalePriceUSD: 189.0,
    mrp: 26900,
    discount: '-8% OFF',
    rating: 4.9,
    reviewsCount: 3800,
    stockCount: 45,
    warranty: '1 Year Apple Brand Warranty',
    description: 'Up to 2x more Active Noise Cancellation, Adaptive Audio, Transparency mode, and Personalized Spatial Audio with dynamic head tracking. Dust, sweat, and water resistant.',
    imageUrl: '/images/airpods_pro_2.jpg',
    specs: {
      battery: 'Up to 6 hrs listening (30 hrs with MagSafe USB-C case)',
      powerOutput: 'MagSafe Wireless + Qi + USB-C fast charging',
      compatibility: 'iPhone, iPad, Mac, Apple Watch, Apple TV',
      warrantyPeriod: '1 Year Apple Warranty'
    },
    variants: ['USB-C MagSafe Case Edition'],
    colors: [{ name: 'Glossy White', hex: '#ffffff' }],
    imeis: ['SN-APLAPP2-01', 'SN-APLAPP2-02'],
    moq: 3,
    volumeTiers: [
      { minQty: 3, maxQty: 9, priceUSD: 189.0, priceINR: 18900 },
      { minQty: 10, priceUSD: 179.0, priceINR: 17900 }
    ]
  },
  {
    id: 'prod_cmf_65w_gan',
    sku: 'NOT-CMF-65W',
    title: 'CMF by Nothing 65W GaN Fast Charger',
    brand: 'Nothing',
    category: 'chargers',
    subtitle: 'Dark Grey & Orange • 3-Port',
    retailPrice: 2999,
    wholesalePrice: 1699,
    retailPriceUSD: 39.99,
    wholesalePriceUSD: 21.5,
    mrp: 3999,
    discount: '-25% OFF',
    rating: 4.8,
    reviewsCount: 920,
    stockCount: 70,
    warranty: '1 Year Nothing Warranty',
    description: 'Ultra-compact 65W fast charger powered by GaN technology. 3-in-1 multi-device power delivery with 2 USB-C and 1 USB-A ports. Intelligent heat control.',
    imageUrl: '/images/cmf_gan_charger.jpg',
    specs: {
      powerOutput: '65W Max (USB-C1/C2: 65W, USB-A: 36W)',
      material: 'Flame Retardant PC Architecture',
      compatibility: 'Universal Laptops, Tablets, Smartphones, Earbuds',
      warrantyPeriod: '12 Months'
    },
    variants: ['3-Port GaN (2x USB-C + 1x USB-A)'],
    colors: [
      { name: 'Orange / Dark Grey', hex: '#ea580c' },
      { name: 'Matte Black', hex: '#18181b' }
    ],
    imeis: [],
    moq: 5,
    volumeTiers: [
      { minQty: 5, maxQty: 19, priceUSD: 21.5, priceINR: 1699 },
      { minQty: 20, maxQty: 49, priceUSD: 18.5, priceINR: 1499 },
      { minQty: 50, priceUSD: 16.0, priceINR: 1299 }
    ]
  },
  {
    id: 'prod_belkin_boostcharge_cable',
    sku: 'BLK-BST-FLEX',
    title: 'Belkin BoostCharge Pro Flex Cable',
    brand: 'Belkin',
    category: 'cables',
    subtitle: 'Braided Silicone • 2m',
    retailPrice: 1899,
    wholesalePrice: 999,
    retailPriceUSD: 24.99,
    wholesalePriceUSD: 12.5,
    mrp: 2499,
    discount: '-24% OFF',
    rating: 4.9,
    reviewsCount: 610,
    stockCount: 120,
    warranty: '5 Year Belkin Warranty',
    description: 'Double-braided exterior with silicone jacket inside for extreme flexibility and tangle resistance. Includes magnetic cable management strap. Tested to 30,000+ bends.',
    imageUrl: '/images/belkin_braided_cable.jpg',
    specs: {
      powerOutput: '60W PD Fast Charging',
      material: 'Ultra-flexible Silicone & Double-braided Nylon',
      compatibility: 'Universal USB-C smartphones, laptops, power banks',
      warrantyPeriod: '5 Years Replacement'
    },
    variants: ['2.0m (6.6ft) USB-C to USB-C', '1.0m (3.3ft) USB-C to USB-C'],
    colors: [
      { name: 'Space Gray Braided', hex: '#4b5563' },
      { name: 'White Braided', hex: '#f1f5f9' }
    ],
    imeis: [],
    moq: 10,
    volumeTiers: [
      { minQty: 10, maxQty: 49, priceUSD: 12.5, priceINR: 999 },
      { minQty: 50, maxQty: 99, priceUSD: 10.5, priceINR: 849 },
      { minQty: 100, priceUSD: 8.9, priceINR: 699 }
    ]
  },
  {
    id: 'prod_oem_battery_pack',
    sku: 'TH-BAT-OEM',
    title: 'OEM High-Capacity Replacement Battery',
    brand: 'Dhyan Enterprise',
    category: 'spare_parts',
    subtitle: 'Internal Li-Ion Cell with Flex',
    retailPrice: 2499,
    wholesalePrice: 1299,
    retailPriceUSD: 29.99,
    wholesalePriceUSD: 15.0,
    mrp: 3499,
    discount: '-29% OFF',
    rating: 4.8,
    reviewsCount: 490,
    stockCount: 80,
    warranty: '1 Year Replacement Warranty',
    description: 'Zero-cycle fresh OEM grade lithium-ion replacement battery with Texas Instruments fuel gauge IC, pre-installed adhesive pull tabs, and over-current protection.',
    imageUrl: '/images/oem_battery_pack.jpg',
    specs: {
      battery: '100% Zero-Cycle Li-Ion (3200-5000 mAh)',
      material: 'Grade-A Cobalt Polymer with TI Battery IC',
      compatibility: 'iPhone 13/14/15, Samsung Galaxy S22/S23/S24',
      warrantyPeriod: '12 Months Direct Replacement'
    },
    variants: [
      'For iPhone 14 / 15 (3279 mAh)',
      'For Samsung Galaxy S23 / S24 (3900 mAh)',
      'For iPhone 13 Pro (3095 mAh)'
    ],
    colors: [{ name: 'Black Cell', hex: '#18181b' }],
    imeis: [],
    moq: 5,
    volumeTiers: [
      { minQty: 5, maxQty: 19, priceUSD: 15.0, priceINR: 1299 },
      { minQty: 20, maxQty: 49, priceUSD: 12.5, priceINR: 1099 },
      { minQty: 50, priceUSD: 9.99, priceINR: 899 }
    ]
  }
];

export const INITIAL_KHATA_LEDGER: KhataTransaction[] = [
  {
    id: 'tx_101',
    date: '30 Sep 2026, 11:20 AM',
    description: 'Wholesale Invoice #WH-8841 (5x OnePlus 12 5G)',
    debit: 294500,
    credit: 0,
    balance: 294500,
    refNo: 'INV-WH-8841'
  },
  {
    id: 'tx_102',
    date: '28 Sep 2026, 04:45 PM',
    description: 'RTGS Payment Received - HDFC Bank Ref #99281',
    debit: 0,
    credit: 200000,
    balance: 94500,
    refNo: 'RTGS-HDFC-99281'
  },
  {
    id: 'tx_103',
    date: '25 Sep 2026, 02:15 PM',
    description: 'Wholesale Invoice #WH-8790 (Accessories & GaN Chargers)',
    debit: 45000,
    credit: 0,
    balance: 294500,
    refNo: 'INV-WH-8790'
  }
];

export const INITIAL_KHATA_CUSTOMER: KhataCustomer = {
  name: 'Shree Ganesh Mobiles & Telecom',
  contact: '+91 98201 44819',
  gstin: '27AABCS1429B1Z0',
  creditLimit: 1500000,
  currentBalance: 654800
};

export const INITIAL_CASHIER_SHIFT: CashierShift = {
  isOpen: true,
  cashFloat: 10000,
  cashCollected: 38400,
  upiCollected: 89000
};

export const INITIAL_ORDERS: Order[] = [
  {
    orderId: 'DHY-89021',
    date: '30 Sep 2026, 01:15 PM',
    customerName: 'Rajesh Sharma',
    customerPhone: '+91 98201 44819',
    items: [
      {
        productId: 'prod_op12',
        title: 'OnePlus 12 5G (Flowy Emerald)',
        variant: '16GB RAM + 512GB Storage',
        color: 'Flowy Emerald',
        qty: 1,
        price: 58499,
        imei: '864920061234501'
      }
    ],
    deliveryMode: 'pickup',
    pickupHub: 'Dhyan Enterprise Retail Hub Desk 02',
    pickupPin: '8492',
    pickupQr: 'DHY-89021-PIN8492',
    status: 'ready_for_pickup',
    subtotal: 58499,
    gst: 10529,
    deliveryFee: 0,
    total: 58499
  }
];

export const INITIAL_WARRANTY_CLAIMS: WarrantyClaim[] = [
  {
    claimId: 'WAR-7712',
    imei: '864920061234501',
    productTitle: 'OnePlus 12 5G (Flowy Emerald)',
    purchaseDate: '15 Jan 2026',
    warrantyStatus: 'Active',
    expiryDate: '14 Jan 2027',
    issueDescription: 'Ear-speaker crackling volume issue during calls',
    status: 'In Inspection'
  }
];
