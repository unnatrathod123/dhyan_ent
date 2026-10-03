export type ProductCategory =
  | 'phones'
  | 'cables'
  | 'chargers'
  | 'spare_parts'
  | 'accessories'
  | 'smartphones'
  | 'audio'
  | 'protection';

export type Currency = 'USD' | 'INR';

export interface VolumeTier {
  minQty: number;
  maxQty?: number;
  priceUSD: number;
  priceINR: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSpecs {
  processor?: string;
  battery?: string;
  camera?: string;
  display?: string;
  material?: string;
  compatibility?: string;
  powerOutput?: string;
  warrantyPeriod?: string;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  brand: string;
  category: ProductCategory;
  subtitle?: string; // e.g. "Navy", "White", "Screen", "Gray"
  retailPrice: number; // in INR
  wholesalePrice: number; // in INR
  retailPriceUSD?: number;
  wholesalePriceUSD?: number;
  mrp: number;
  discount: string;
  rating: number;
  reviewsCount: number;
  stockCount: number;
  warranty: string;
  description: string;
  imageUrl?: string;
  specs: ProductSpecs;
  variants: string[];
  colors: ProductColor[];
  imeis: string[];
  moq?: number; // Minimum order quantity for B2B
  volumeTiers?: VolumeTier[];
}

export type B2BApprovalStatus = 'none' | 'pending' | 'approved' | 'rejected';

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'b2c' | 'b2b';
  b2bStatus: B2BApprovalStatus;
  businessName?: string;
  gstin?: string;
  businessType?: 'retailer' | 'repair_shop' | 'wholesaler' | 'corporate';
  address?: string;
  city?: string;
  pincode?: string;
  creditLimit: number;
  usedCredit: number;
  registeredAt: string;
}

export interface PendingCartItem {
  productId: string;
  variant: string;
  color: string;
  qty: number;
}


export interface CartItem {
  productId: string;
  variant: string;
  color: string;
  qty: number;
}

export interface POSCartItem {
  productId: string;
  imei: string;
  qty: number;
  discountPct: number;
}

export interface POSBillItem {
  productId: string;
  sku: string;
  title: string;
  imei?: string;
  qty: number;
  rate: number;
  total: number;
}

export interface POSBill {
  billNo: string;
  date: string;
  customerName: string;
  customerPhone: string;
  items: POSBillItem[];
  subtotal: number;
  gstTotal: number;
  discount: number;
  grandTotal: number;
  tender: 'cash' | 'upi' | 'khata';
  synced: boolean;
}

export interface KhataTransaction {
  id: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  refNo?: string;
}

export interface KhataCustomer {
  name: string;
  contact: string;
  gstin: string;
  creditLimit: number;
  currentBalance: number;
}

export interface CashierShift {
  isOpen: boolean;
  cashFloat: number;
  cashCollected: number;
  upiCollected: number;
}

export type OrderStatus = 'placed' | 'packed' | 'ready_for_pickup' | 'collected';

export interface OrderItem {
  productId: string;
  title: string;
  variant: string;
  color: string;
  qty: number;
  price: number;
  imei?: string;
}

export interface Order {
  orderId: string;
  date: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  deliveryMode: 'pickup' | 'delivery';
  pickupHub: string;
  pickupPin: string;
  pickupQr: string;
  status: OrderStatus;
  subtotal: number;
  gst: number;
  deliveryFee: number;
  total: number;
}

export interface WarrantyClaim {
  claimId: string;
  imei: string;
  productTitle: string;
  purchaseDate: string;
  warrantyStatus: 'Active' | 'Expired';
  expiryDate: string;
  issueDescription: string;
  status: 'Submitted' | 'In Inspection' | 'Repaired / Replaced' | 'Closed';
}

export type AppRole = 'b2c' | 'b2b' | 'pos';
export type AppTab = 'storefront' | 'catalog' | 'pos' | 'khata' | 'inventory' | 'b2b' | 'warranty' | 'orders' | 'register';
export type ViewportMode = 'mobile' | 'desktop';
