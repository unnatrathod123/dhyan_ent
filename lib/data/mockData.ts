import { Product, KhataTransaction, KhataCustomer, CashierShift, Order, WarrantyClaim } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_s24u',
    sku: 'SAM-S24U-TI',
    title: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'smartphones',
    retailPrice: 106999,
    wholesalePrice: 98500,
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
    imeis: ['352904812398701', '352904812398702', '352904812398703']
  },
  {
    id: 'prod_ip15p',
    sku: 'APL-IP15P-NT',
    title: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'smartphones',
    retailPrice: 130990,
    wholesalePrice: 122500,
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
    imeis: ['359281098765401', '359281098765402', '359281098765403']
  },
  {
    id: 'prod_op12',
    sku: 'OP12-512G-GRN',
    title: 'OnePlus 12 5G',
    brand: 'OnePlus',
    category: 'smartphones',
    retailPrice: 58499,
    wholesalePrice: 54900,
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
    imeis: ['864920061234501', '864920061234502', '864920061234503', '864920061234504', '864920061234505']
  },
  {
    id: 'prod_redmi13p',
    sku: 'XIA-RN13P-PUR',
    title: 'Redmi Note 13 Pro',
    brand: 'Xiaomi',
    category: 'smartphones',
    retailPrice: 23499,
    wholesalePrice: 20900,
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
    imeis: ['869102938475601', '869102938475602']
  },
  {
    id: 'prod_anker80w',
    sku: 'ANK-80W-DUAL',
    title: 'Anker 80W Dual USB-C Fast Charger',
    brand: 'Accessories',
    category: 'chargers',
    retailPrice: 1799,
    wholesalePrice: 1350,
    mrp: 2499,
    discount: '-28% OFF',
    rating: 4.9,
    reviewsCount: 420,
    stockCount: 32,
    warranty: '18 Months Warranty',
    description: 'GaN III technology dual port ultra fast charging for laptops, tablets, and phones.',
    specs: {
      processor: 'GaN III IC',
      battery: '80W Max Power Delivery',
      camera: 'ActiveShield 2.0 Temperature Monitor',
      display: 'Dual Port Smart Distribution'
    },
    variants: ['80W Dual Port'],
    colors: [{ name: 'Pure White', hex: '#ffffff' }],
    imeis: ['SN-ANK80W-01', 'SN-ANK80W-02']
  },
  {
    id: 'prod_spigen_mag',
    sku: 'SPG-MAG-10K',
    title: 'Spigen Power 10000mAh MagPack Slim',
    brand: 'Accessories',
    category: 'chargers',
    retailPrice: 2200,
    wholesalePrice: 1650,
    mrp: 3499,
    discount: '-37% OFF',
    rating: 4.8,
    reviewsCount: 310,
    stockCount: 25,
    warranty: '1 Year Warranty',
    description: 'Magnetic wireless charging powerbank with 20W PD USB-C in/out and kickstand.',
    specs: {
      processor: 'MagSafe Compatible Smart Coil',
      battery: '10000 mAh Li-Polymer',
      camera: 'Overcharge & Heat Protection',
      display: 'LED Battery Indicator'
    },
    variants: ['10000mAh Slim'],
    colors: [{ name: 'Deep Black', hex: '#0f172a' }],
    imeis: ['SN-SPG10K-01']
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
