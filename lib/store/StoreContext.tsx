'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CartItem,
  POSCartItem,
  POSBill,
  KhataTransaction,
  KhataCustomer,
  CashierShift,
  Order,
  WarrantyClaim,
  AppRole,
  AppTab,
  ViewportMode,
  UserAccount,
  Currency,
  PendingCartItem,
  B2BApprovalStatus
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_KHATA_LEDGER,
  INITIAL_KHATA_CUSTOMER,
  INITIAL_CASHIER_SHIFT,
  INITIAL_ORDERS,
  INITIAL_WARRANTY_CLAIMS
} from '../data/mockData';

export interface ToastItem {
  id: string;
  message: string;
  type?: 'normal' | 'success' | 'warning' | 'error';
}

interface StoreContextType {
  // State
  products: Product[];
  cart: CartItem[];
  posCart: POSCartItem[];
  khataCustomer: KhataCustomer;
  ledger: KhataTransaction[];
  cashierShift: CashierShift;
  orders: Order[];
  warrantyClaims: WarrantyClaim[];
  currentRole: AppRole;
  currentTab: AppTab;
  viewportMode: ViewportMode;
  offlineMode: boolean;
  offlineQueue: any[];
  selectedCategory: string;
  searchQuery: string;
  selectedProduct: Product | null;
  isCartOpen: boolean;
  isProductDetailOpen: boolean;
  isThermalReceiptOpen: boolean;
  isShiftModalOpen: boolean;
  isRecordPaymentOpen: boolean;
  isGiveCreditOpen: boolean;
  isAddNewProductOpen: boolean;
  isCreateAccountOpen: boolean;
  lastGeneratedBill: POSBill | null;
  toasts: ToastItem[];

  // Auth & Dual Persona State
  currentUser: UserAccount | null;
  pendingCartItem: PendingCartItem | null;
  currency: Currency;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  authPromptReason: 'checkout' | 'admin' | 'general' | null;

  // Setters & Actions
  setCurrency: (c: Currency) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setAuthModalTab: (tab: 'login' | 'register') => void;
  setAuthPromptReason: (reason: 'checkout' | 'admin' | 'general' | null) => void;
  registerUser: (userData: {
    fullName: string;
    email: string;
    phone: string;
    role: 'b2c' | 'b2b';
    businessName?: string;
    gstin?: string;
    businessType?: 'retailer' | 'repair_shop' | 'wholesaler' | 'corporate';
    address?: string;
    city?: string;
    pincode?: string;
  }) => void;
  loginUser: (emailOrPhone: string, asRole?: 'b2c' | 'b2b' | 'admin') => void;
  toggleB2BApproval: () => void;
  logoutUser: () => void;
  setRole: (role: AppRole) => void;
  setTab: (tab: AppTab) => void;
  setViewport: (mode: ViewportMode) => void;
  setCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsProductDetailOpen: (open: boolean) => void;
  setIsCreateAccountOpen: (open: boolean) => void;
  setIsThermalReceiptOpen: (open: boolean) => void;
  setIsShiftModalOpen: (open: boolean) => void;
  setIsRecordPaymentOpen: (open: boolean) => void;
  setIsGiveCreditOpen: (open: boolean) => void;
  setIsAddNewProductOpen: (open: boolean) => void;

  // Cart Operations
  addToCart: (productId: string, variant: string, color: string, qty?: number) => void;
  updateCartQty: (productId: string, variant: string, color: string, delta: number) => void;
  removeFromCart: (productId: string, variant: string, color: string) => void;
  clearCart: () => void;

  // POS Operations
  addToPosCart: (productId: string, imei?: string) => void;
  updatePosCartItem: (index: number, updates: Partial<POSCartItem>) => void;
  removePosCartItem: (index: number) => void;
  clearPosCart: () => void;
  generatePOSBill: (customerName: string, customerPhone: string, tender: 'cash' | 'upi' | 'khata') => POSBill | null;

  // Khata Operations
  recordKhataPayment: (amount: number, description: string, refNo?: string) => void;
  giveKhataCredit: (amount: number, description: string, refNo?: string) => void;

  // Inventory & Orders
  addNewProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  resetCatalog: () => void;
  createOrder: (deliveryMode: 'pickup' | 'delivery', hub?: string) => Order | null;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  submitWarrantyClaim: (imei: string, description: string) => WarrantyClaim | null;

  // Offline & Notifications
  toggleOffline: () => void;
  syncOfflineQueue: () => void;
  showToast: (message: string, type?: 'normal' | 'success' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'dhyan_enterprise_state_v1';

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    {
      productId: 'prod_op12',
      variant: '512GB / 16GB',
      color: 'Flowy Emerald',
      qty: 1
    }
  ]);
  const [posCart, setPosCart] = useState<POSCartItem[]>([
    {
      productId: 'prod_op12',
      imei: '864920061234501',
      qty: 1,
      discountPct: 0
    }
  ]);
  const [khataCustomer, setKhataCustomer] = useState<KhataCustomer>(INITIAL_KHATA_CUSTOMER);
  const [ledger, setLedger] = useState<KhataTransaction[]>(INITIAL_KHATA_LEDGER);
  const [cashierShift, setCashierShift] = useState<CashierShift>(INITIAL_CASHIER_SHIFT);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [warrantyClaims, setWarrantyClaims] = useState<WarrantyClaim[]>(INITIAL_WARRANTY_CLAIMS);

  const [currentRole, setCurrentRole] = useState<AppRole>('b2c');
  const [currentTab, setCurrentTab] = useState<AppTab>('storefront');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [offlineMode, setOfflineMode] = useState<boolean>(false);
  const [offlineQueue, setOfflineQueue] = useState<any[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(INITIAL_PRODUCTS[0]);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState<boolean>(false);
  const [isThermalReceiptOpen, setIsThermalReceiptOpen] = useState<boolean>(false);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState<boolean>(false);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState<boolean>(false);
  const [isGiveCreditOpen, setIsGiveCreditOpen] = useState<boolean>(false);
  const [isAddNewProductOpen, _setIsAddNewProductOpen] = useState<boolean>(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState<boolean>(false);
  const [lastGeneratedBill, setLastGeneratedBill] = useState<POSBill | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Auth & Dual-Persona States
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [pendingCartItem, setPendingCartItem] = useState<PendingCartItem | null>(null);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('register');
  const [authPromptReason, setAuthPromptReason] = useState<'checkout' | 'admin' | 'general' | null>(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('techhub_dhyan_state_v3') || localStorage.getItem('techhub_dhyan_state_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.products && Array.isArray(parsed.products) && parsed.products.length > 0) {
          const initialMap = new Map(INITIAL_PRODUCTS.map((p) => [p.id, p]));
          const merged = INITIAL_PRODUCTS.map((initProd) => {
            const existing = parsed.products.find((p: any) => p.id === initProd.id);
            return existing ? { ...initProd, ...existing, imageUrl: initProd.imageUrl } : initProd;
          });
          const customProds = parsed.products.filter((p: any) => !initialMap.has(p.id));
          setProducts([...merged, ...customProds]);
        } else {
          setProducts(INITIAL_PRODUCTS);
        }
        if (parsed.currentUser) setCurrentUser(parsed.currentUser);
        if (parsed.currency) setCurrency(parsed.currency);
        if (parsed.cart) setCart(parsed.cart);
        if (parsed.posCart) setPosCart(parsed.posCart);
        if (parsed.khataCustomer) setKhataCustomer(parsed.khataCustomer);
        if (parsed.ledger) setLedger(parsed.ledger);
        if (parsed.cashierShift) setCashierShift(parsed.cashierShift);
        if (parsed.orders) setOrders(parsed.orders);
        if (parsed.warrantyClaims) setWarrantyClaims(parsed.warrantyClaims);
        if (parsed.offlineQueue) setOfflineQueue(parsed.offlineQueue);
      } else {
        setProducts(INITIAL_PRODUCTS);
      }
    } catch {
      setProducts(INITIAL_PRODUCTS);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const toSave = {
        products,
        currentUser,
        currency,
        cart,
        posCart,
        khataCustomer,
        ledger,
        cashierShift,
        orders,
        warrantyClaims,
        offlineQueue
      };
      localStorage.setItem('techhub_dhyan_state_v3', JSON.stringify(toSave));
    } catch {
      // ignore
    }
  }, [isHydrated, products, currentUser, currency, cart, posCart, khataCustomer, ledger, cashierShift, orders, warrantyClaims, offlineQueue]);

  const showToast = (message: string, type: 'normal' | 'success' | 'warning' | 'error' = 'normal') => {
    const id = 'toast_' + Date.now() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const registerUser = (userData: {
    fullName: string;
    email: string;
    phone: string;
    role: 'b2c' | 'b2b';
    businessName?: string;
    gstin?: string;
    businessType?: 'retailer' | 'repair_shop' | 'wholesaler' | 'corporate';
    address?: string;
    city?: string;
    pincode?: string;
  }) => {
    const isB2B = userData.role === 'b2b';
    const newUser: UserAccount = {
      id: 'usr_' + Date.now(),
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      b2bStatus: isB2B ? 'pending' : 'none',
      businessName: userData.businessName,
      gstin: userData.gstin,
      businessType: userData.businessType,
      address: userData.address,
      city: userData.city,
      pincode: userData.pincode,
      creditLimit: isB2B ? 50000 : 0,
      usedCredit: 0,
      registeredAt: new Date().toLocaleDateString()
    };
    setCurrentUser(newUser);
    setCurrentRole(userData.role);
    setIsAuthModalOpen(false);
    setAuthPromptReason(null);

    if (isB2B) {
      showToast('Registration submitted! B2B Wholesale account is under Admin Review.', 'warning');
    } else {
      showToast(`Welcome ${userData.fullName}! Your personal account is ready.`, 'success');
    }

    if (cart.length > 0) {
      setIsCartOpen(true);
      showToast(`Welcome, ${userData.fullName}! Your cart is ready for checkout.`, 'success');
    }

    if (pendingCartItem) {
      setCart((prev) => [...prev, { ...pendingCartItem }]);
      setPendingCartItem(null);
      setIsCartOpen(true);
    }
  };

  const loginUser = (emailOrPhone: string, asRole: 'b2c' | 'b2b' | 'admin' = 'b2c') => {
    const isB2B = asRole === 'b2b';
    const isAdmin = asRole === 'admin';
    const loggedUser: UserAccount = {
      id: isAdmin ? 'usr_admin_01' : 'usr_' + Date.now(),
      fullName: isAdmin ? 'Admin Inventory Manager' : isB2B ? 'Apex Electronics Store' : 'Alex Johnson',
      email: emailOrPhone.includes('@') ? emailOrPhone : isAdmin ? 'admin@techhub.me' : 'shopper@techhub.me',
      phone: emailOrPhone.includes('@') ? '9876543210' : emailOrPhone,
      role: asRole,
      b2bStatus: isB2B ? 'approved' : 'none',
      businessName: isAdmin ? 'TechHub HQ Admin Console' : isB2B ? 'Apex Electronics Store LLC' : undefined,
      gstin: isB2B ? '24AAACD1234F1Z5' : undefined,
      creditLimit: isB2B ? 200000 : 0,
      usedCredit: 0,
      registeredAt: 'Oct 2026'
    };
    setCurrentUser(loggedUser);
    setCurrentRole(asRole as any);
    setIsAuthModalOpen(false);
    setAuthPromptReason(null);
    showToast(`Welcome back, ${loggedUser.fullName}!`, 'success');

    if (cart.length > 0) {
      setIsCartOpen(true);
      showToast(`Welcome back, ${loggedUser.fullName}! Your cart is ready for checkout.`, 'success');
    }

    if (pendingCartItem) {
      setCart((prev) => [...prev, { ...pendingCartItem }]);
      setPendingCartItem(null);
      setIsCartOpen(true);
    }
  };

  const toggleB2BApproval = () => {
    if (!currentUser || currentUser.role !== 'b2b') return;
    const nextStatus: B2BApprovalStatus = currentUser.b2bStatus === 'approved' ? 'pending' : 'approved';
    setCurrentUser({
      ...currentUser,
      b2bStatus: nextStatus
    });
    if (nextStatus === 'approved') {
      showToast('Admin Simulation: Wholesale Dealer APPROVED! Bulk wholesale tiers unlocked.', 'success');
    } else {
      showToast('Admin Simulation: Wholesale Dealer set to PENDING admin review.', 'normal');
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setCurrentRole('b2c');
    showToast('Signed out successfully', 'normal');
  };

  const setRole = (role: AppRole) => {
    setCurrentRole(role);
    if (role === 'pos') {
      setCurrentTab('pos');
      showToast('Switched to In-Store POS Mode', 'normal');
    } else if (role === 'b2b') {
      setCurrentTab('b2b');
      showToast('Switched to B2B Wholesale Portal', 'normal');
    } else {
      setCurrentTab('storefront');
      showToast('Switched to Customer Storefront', 'normal');
    }
  };

  const setTab = (tab: AppTab) => {
    setCurrentTab(tab);
  };

  const setViewport = (mode: ViewportMode) => {
    setViewportMode(mode);
  };

  // Cart Operation: Anyone can add products freely; authentication is required at checkout!
  const addToCart = (productId: string, variant: string, color: string, qty: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === productId && item.variant === variant && item.color === color
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].qty += qty;
        return copy;
      }
      return [...prev, { productId, variant, color, qty }];
    });

    if (currentUser?.role === 'b2b') {
      if (currentUser.b2bStatus === 'approved') {
        showToast(`Added ${qty} items with wholesale dealer pricing!`, 'success');
      } else {
        showToast(`Added to cart. Note: Wholesale discount unlocks upon admin approval.`, 'normal');
      }
    } else {
      showToast('Added to shopping bag!', 'success');
    }
  };

  const updateCartQty = (productId: string, variant: string, color: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.productId === productId && item.variant === variant && item.color === color) {
            return { ...item, qty: Math.max(0, item.qty + delta) };
          }
          return item;
        })
        .filter((item) => item.qty > 0);
    });
  };

  const removeFromCart = (productId: string, variant: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.variant === variant && item.color === color)
      )
    );
    showToast('Item removed from bag', 'normal');
  };

  const clearCart = () => {
    setCart([]);
  };

  // POS Cart
  const addToPosCart = (productId: string, imei?: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const assignedImei = imei || (product.imeis && product.imeis[0]) || '';
    setPosCart((prev) => [
      ...prev,
      {
        productId,
        imei: assignedImei,
        qty: 1,
        discountPct: 0
      }
    ]);
    showToast(`Added ${product.title} to POS bill`, 'success');
  };

  const updatePosCartItem = (index: number, updates: Partial<POSCartItem>) => {
    setPosCart((prev) => {
      const copy = [...prev];
      if (copy[index]) {
        copy[index] = { ...copy[index], ...updates };
      }
      return copy;
    });
  };

  const removePosCartItem = (index: number) => {
    setPosCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const clearPosCart = () => {
    setPosCart([]);
  };

  const generatePOSBill = (
    customerName: string,
    customerPhone: string,
    tender: 'cash' | 'upi' | 'khata'
  ): POSBill | null => {
    if (posCart.length === 0) {
      showToast('POS Cart is empty!', 'error');
      return null;
    }

    let subtotal = 0;
    const items = posCart.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      const price = product ? product.retailPrice : 0;
      const discountedPrice = price * (1 - (item.discountPct || 0) / 100);
      const total = discountedPrice * item.qty;
      subtotal += total;
      return {
        productId: item.productId,
        sku: product?.sku || 'SKU-GEN',
        title: product?.title || 'Unknown Product',
        imei: item.imei,
        qty: item.qty,
        rate: price,
        total
      };
    });

    const gstTotal = Math.round(subtotal * 0.18);
    const grandTotal = subtotal;

    const billNo = 'DHY-POS-' + Math.floor(100000 + Math.random() * 900000);
    const date = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newBill: POSBill = {
      billNo,
      date,
      customerName: customerName || 'Walk-in Customer',
      customerPhone: customerPhone || '+91 98000 00000',
      items,
      subtotal,
      gstTotal,
      discount: 0,
      grandTotal,
      tender,
      synced: !offlineMode
    };

    if (offlineMode) {
      setOfflineQueue((prev) => [...prev, { type: 'POS_BILL', payload: newBill }]);
      showToast(`Bill ${billNo} generated and cached offline`, 'warning');
    } else {
      showToast(`Bill ${billNo} generated successfully!`, 'success');
    }

    // Update Cashier Shift
    setCashierShift((prev) => ({
      ...prev,
      cashCollected: tender === 'cash' ? prev.cashCollected + grandTotal : prev.cashCollected,
      upiCollected: tender === 'upi' ? prev.upiCollected + grandTotal : prev.upiCollected
    }));

    // If Khata tender, charge ledger
    if (tender === 'khata') {
      giveKhataCredit(grandTotal, `Counter POS Bill #${billNo}`, billNo);
    }

    setLastGeneratedBill(newBill);
    setIsThermalReceiptOpen(true);
    clearPosCart();
    return newBill;
  };

  // Khata Operations
  const recordKhataPayment = (amount: number, description: string, refNo?: string) => {
    if (amount <= 0) return;
    const newBalance = khataCustomer.currentBalance - amount;
    const date = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const newTx: KhataTransaction = {
      id: 'tx_' + Date.now(),
      date,
      description: description || 'Payment Received via RTGS/UPI',
      debit: 0,
      credit: amount,
      balance: Math.max(0, newBalance),
      refNo: refNo || 'PAY-REF-' + Math.floor(10000 + Math.random() * 90000)
    };

    setLedger((prev) => [newTx, ...prev]);
    setKhataCustomer((prev) => ({ ...prev, currentBalance: Math.max(0, newBalance) }));
    showToast(`Recorded payment of ₹${amount.toLocaleString('en-IN')}`, 'success');
  };

  const giveKhataCredit = (amount: number, description: string, refNo?: string) => {
    if (amount <= 0) return;
    const newBalance = khataCustomer.currentBalance + amount;
    const date = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const newTx: KhataTransaction = {
      id: 'tx_' + Date.now(),
      date,
      description: description || 'Wholesale Order Credit',
      debit: amount,
      credit: 0,
      balance: newBalance,
      refNo: refNo || 'INV-WH-' + Math.floor(1000 + Math.random() * 9000)
    };

    setLedger((prev) => [newTx, ...prev]);
    setKhataCustomer((prev) => ({ ...prev, currentBalance: newBalance }));
    showToast(`Added ₹${amount.toLocaleString('en-IN')} credit invoice`, 'warning');
  };

  // Add Product & Delete & Reset (Strictly Restricted to Admin)
  const setIsAddNewProductOpen = (open: boolean) => {
    if (open && currentUser?.role !== 'admin') {
      showToast('Restricted: Only verified store administrators can add new products', 'error');
      _setIsAddNewProductOpen(false);
      return;
    }
    _setIsAddNewProductOpen(open);
  };

  const addNewProduct = (product: Product) => {
    if (currentUser?.role !== 'admin') {
      showToast('Restricted: Administrator access required to publish products', 'error');
      return;
    }
    setProducts((prev) => [product, ...prev]);
    showToast(`Published "${product.title}" (${product.sku}) to catalog!`, 'success');
  };

  const deleteProduct = (productId: string) => {
    if (currentUser?.role !== 'admin') {
      showToast('Restricted: Administrator access required to delete products', 'error');
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog', 'normal');
  };

  const resetCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    showToast('Catalog restored to default factory products', 'normal');
  };

  // Orders
  const createOrder = (deliveryMode: 'pickup' | 'delivery', hub: string = 'Station Road Flagship Desk #02'): Order | null => {
    if (cart.length === 0) return null;

    if (!currentUser) {
      setAuthPromptReason('checkout');
      setAuthModalTab('register');
      setIsAuthModalOpen(true);
      showToast('Please sign in or register to complete your order checkout.', 'warning');
      return null;
    }

    let subtotal = 0;
    const items = cart.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      const isB2B = currentUser.role === 'b2b' && currentUser.b2bStatus === 'approved';
      const price = product ? (isB2B ? product.wholesalePrice : product.retailPrice) : 0;
      subtotal += price * item.qty;
      return {
        productId: item.productId,
        title: product?.title || 'Electronics Item',
        variant: item.variant,
        color: item.color,
        qty: item.qty,
        price,
        imei: product?.imeis[0] || '864920061234501'
      };
    });

    const gst = Math.round(subtotal * 0.18);
    const deliveryFee = deliveryMode === 'delivery' ? 149 : 0;
    const total = subtotal + deliveryFee;

    const orderId = 'DHY-' + Math.floor(10000 + Math.random() * 90000);
    const pickupPin = Math.floor(1000 + Math.random() * 9000).toString();
    const date = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newOrder: Order = {
      orderId,
      date,
      customerName: currentUser.fullName,
      customerPhone: currentUser.phone,
      items,
      deliveryMode,
      pickupHub: hub,
      pickupPin,
      pickupQr: `${orderId}-PIN${pickupPin}`,
      status: 'ready_for_pickup',
      subtotal,
      gst,
      deliveryFee,
      total
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCartOpen(false);
    showToast(`Order #${orderId} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) => (order.orderId === orderId ? { ...order, status } : order))
    );
    showToast(`Order ${orderId} updated to ${status.replace(/_/g, ' ')}`, 'normal');
  };

  const submitWarrantyClaim = (imei: string, description: string): WarrantyClaim | null => {
    const product = products.find((p) => p.imeis && p.imeis.includes(imei)) || products[0];
    const claimId = 'WAR-' + Math.floor(1000 + Math.random() * 9000);
    const newClaim: WarrantyClaim = {
      claimId,
      imei,
      productTitle: product.title,
      purchaseDate: '15 Jan 2026',
      warrantyStatus: 'Active',
      expiryDate: '14 Jan 2027',
      issueDescription: description,
      status: 'Submitted'
    };
    setWarrantyClaims((prev) => [newClaim, ...prev]);
    showToast(`Warranty claim #${claimId} submitted!`, 'success');
    return newClaim;
  };

  // Offline Simulator
  const toggleOffline = () => {
    setOfflineMode((prev) => {
      const next = !prev;
      if (next) {
        showToast('⚠️ Offline Mode active: Network disconnected', 'warning');
      } else {
        showToast('Online: Network restored!', 'success');
        syncOfflineQueue();
      }
      return next;
    });
  };

  const syncOfflineQueue = () => {
    if (offlineQueue.length === 0) {
      showToast('All local transactions are already synchronized', 'normal');
      return;
    }
    const count = offlineQueue.length;
    setOfflineQueue([]);
    showToast(`Successfully synchronized ${count} queued transaction(s) to cloud!`, 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        posCart,
        khataCustomer,
        ledger,
        cashierShift,
        orders,
        warrantyClaims,
        currentRole,
        currentTab,
        viewportMode,
        offlineMode,
        offlineQueue,
        selectedCategory,
        searchQuery,
        selectedProduct,
        isCartOpen,
        isProductDetailOpen,
        isThermalReceiptOpen,
        isShiftModalOpen,
        isRecordPaymentOpen,
        isGiveCreditOpen,
        isAddNewProductOpen,
        isCreateAccountOpen,
        lastGeneratedBill,
        toasts,
        currentUser,
        pendingCartItem,
        currency,
        isAuthModalOpen,
        authModalTab,
        authPromptReason,
        setCurrency,
        setIsAuthModalOpen,
        setAuthModalTab,
        setAuthPromptReason,
        registerUser,
        loginUser,
        toggleB2BApproval,
        logoutUser,
        setRole,
        setTab,
        setViewport,
        setCategory: setSelectedCategory,
        setSearchQuery,
        setSelectedProduct,
        setIsCartOpen,
        setIsProductDetailOpen,
        setIsCreateAccountOpen,
        setIsThermalReceiptOpen,
        setIsShiftModalOpen,
        setIsRecordPaymentOpen,
        setIsGiveCreditOpen,
        setIsAddNewProductOpen,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        addToPosCart,
        updatePosCartItem,
        removePosCartItem,
        clearPosCart,
        generatePOSBill,
        recordKhataPayment,
        giveKhataCredit,
        addNewProduct,
        deleteProduct,
        resetCatalog,
        createOrder,
        updateOrderStatus,
        submitWarrantyClaim,
        toggleOffline,
        syncOfflineQueue,
        showToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
