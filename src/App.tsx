import React, { useState, useEffect } from 'react';
import { Product, CartItem, Transaction } from './types';
import { INITIAL_PRODUCTS, INITIAL_TRANSACTIONS } from './data';

// Subcomponents
import Dashboard from './components/Dashboard';
import Sales from './components/Sales';
import Inventory from './components/Inventory';
import Reports from './components/Reports';
import ReceiptModal from './components/ReceiptModal';
import ProductFormModal from './components/ProductFormModal';

// Icons
import { 
  Store, 
  CircleUser, 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  BarChart3,
  Plus
} from 'lucide-react';

export default function App() {
  // 1. Core State with Local Storage fallback persistence
  const [products, setProducts] = useState<Product[]>(() => {
    const local = localStorage.getItem('sm_products_sys');
    return local ? JSON.parse(local) : INITIAL_PRODUCTS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const local = localStorage.getItem('sm_transactions_sys');
    return local ? JSON.parse(local) : INITIAL_TRANSACTIONS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const local = localStorage.getItem('sm_cart_active');
    return local ? JSON.parse(local) : [];
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'sales' | 'inventory' | 'reports'>('dashboard');

  // Trigger modals
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedReceiptTx, setSelectedReceiptTx] = useState<Transaction | null>(null);

  // Success Feedback status toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sm_products_sys', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sm_transactions_sys', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('sm_cart_active', JSON.stringify(cart));
  }, [cart]);

  // Toast timeout helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // 2. Inventory State Management Operations
  const handleAddNewProduct = (newProdData: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id,
      soldCount: 0
    };
    setProducts((prev) => [newProduct, ...prev]);
    setShowAddModal(false);
    showToast(`เพิ่ม "${newProduct.name}" เข้าสต็อกสินค้าเรียบร้อยแล้ว`);
  };

  const handleEditProduct = (updatedProd: Product) => {
    setProducts((prev) => 
      prev.map((p) => (p.id === updatedProd.id ? updatedProd : p))
    );
    setEditingProduct(null);
    showToast(`แก้ไขข้อมูล "${updatedProd.name}" สำเร็จ`);
  };

  const handleDeleteProduct = (id: string) => {
    const targetProduct = products.find(p => p.id === id);
    if (!targetProduct) return;

    if (window.confirm(`คุณแน่ใจหรือไม่ที่จะลบสินค้า "${targetProduct.name}" ออกจากคลัง?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      // also clear from cart if inside
      setCart((prev) => prev.filter((it) => it.product.id !== id));
      showToast(`ลบสินค้าเรียบร้อยแล้ว`);
    }
  };

  const handleUpdateStockQuantity = (id: string, newStock: number) => {
    setProducts((prev) => 
      prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
    );
  };

  // 3. POS Cart Operations
  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (product.stock <= 0) {
      showToast(`สินค้าหมด ไม่สามารถจำหน่ายได้`);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (existing) {
        // limit by stock check
        if (existing.quantity >= product.stock) {
          showToast(`จำนวนสินค้าเกินสินค้าในสต็อกที่มีคู่กระทำการ (${product.stock} ชิ้น)`);
          return prev;
        }
        return prev.map((item) => 
          item.product.id === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });

    showToast(`หยิบ "${product.name}" ลงตะกร้า`);
  };

  const handleUpdateCartQty = (productId: string, quantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      showToast(`ลบสินค้าออกจากตะกร้าแล้ว`);
      return;
    }

    if (quantity > product.stock) {
      showToast(`มีจำนวนสต็อกไม่เพียงพอจำหน่าย (${product.stock} ชิ้น)`);
      return;
    }

    setCart((prev) => 
      prev.map((item) => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
    showToast(`ล้างรายการตะกร้าเรียบร้อย`);
  };

  // Checkout and process stock changes
  const handlePOSCheckoutCommit = () => {
    if (cart.length === 0) return;

    // Deduct stock levels inproducts state
    const updatedProducts = products.map((prod) => {
      const cartMatch = cart.find((item) => item.product.id === prod.id);
      if (cartMatch) {
        return {
          ...prod,
          stock: Math.max(0, prod.stock - cartMatch.quantity),
          soldCount: (prod.soldCount || 0) + cartMatch.quantity
        };
      }
      return prod;
    });

    // Create unique Transaction object
    const idNum = Math.floor(1000 + Math.random() * 9000);
    const d = new Date();
    const monthsThai = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    const hour = d.getHours().toString().padStart(2, '0');
    const min = d.getMinutes().toString().padStart(2, '0');

    const newTx: Transaction = {
      id: `TRX-${idNum}`,
      dateTime: `${hour}:${min} น.`,
      dateStr: `${d.getDate()} ${monthsThai[d.getMonth()]}`,
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        total: item.product.price * item.quantity
      })),
      totalAmount: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
      itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
    };

    setProducts(updatedProducts);
    setTransactions((prev) => [newTx, ...prev]);
    setCart([]);
    
    // Switch to Receipt displaying and redirect to reports tab history
    setSelectedReceiptTx(newTx);
    setActiveTab('reports');
    showToast(`ชำระเงินบิล #${newTx.id} สำเร็จ! หักสต็อกคลังสินค้าเรียบร้อย`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-28 font-sans">
      {/* 4. Top AppBar Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 h-16 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/15">
            <Store className="w-5 h-5 text-white stroke-[2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-sans font-bold text-base tracking-tight text-slate-800">SmartMinimart</h1>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-bold rounded uppercase tracking-wider">Online</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => showToast('โปรไฟล์ผู้จัดการร้านค้าร้านขาย:mr.pairote')}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 border border-slate-200 transition-colors"
        >
          <CircleUser className="w-5.5 h-5.5 text-slate-500" />
        </button>
      </header>

      {/* 5. Main Canvas Tab Container routers */}
      <main className="px-4 py-4 max-w-lg mx-auto">
        {activeTab === 'dashboard' && (
          <Dashboard 
            products={products}
            transactions={transactions}
            onSwitchTab={setActiveTab}
            onOpenAddProduct={() => setShowAddModal(true)}
          />
        )}

        {activeTab === 'sales' && (
          <Sales 
            products={products}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onClearCart={handleClearCart}
            onCheckout={handlePOSCheckoutCommit}
          />
        )}

        {activeTab === 'inventory' && (
          <Inventory 
            products={products}
            onOpenEdit={setEditingProduct}
            onDelete={handleDeleteProduct}
            onUpdateStock={handleUpdateStockQuantity}
            onOpenAddProduct={() => setShowAddModal(true)}
          />
        )}

        {activeTab === 'reports' && (
          <Reports 
            products={products}
            transactions={transactions}
            onOpenReceipt={setSelectedReceiptTx}
          />
        )}
      </main>

      {/* 6. Success dynamic feedback Alert Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 left-4 right-4 z-50 text-center animate-fade-in pointer-events-none">
          <div className="inline-block bg-slate-900/95 text-slate-100 text-xs font-bold px-4 py-2.5 rounded-full shadow-lg border border-slate-700 backdrop-blur-xs">
            {toastMessage}
          </div>
        </div>
      )}

      {/* Floating Action Button (Only on Inventory page) */}
      {activeTab === 'inventory' && (
        <button
          onClick={() => setShowAddModal(true)}
          className="fixed right-6 bottom-22 w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 outline-none cursor-pointer hover:bg-[#0052cc]"
          title="เพิ่มสินค้าใหม่เข้าคลัง"
        >
          <Plus className="w-7 h-7 stroke-[2.5]" />
        </button>
      )}

      {/* 7. Persistent Bottom Navigation Menu Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-45 bg-white border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] px-4 py-2.5 flex justify-around items-center rounded-t-2xl max-w-lg mx-auto">
        {/* Dashboard */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center text-center p-1 px-3.5 py-1.5 outline-none transition-all cursor-pointer ${
            activeTab === 'dashboard'
              ? 'bg-[#0f172a] text-white rounded-xl font-bold shadow-md shadow-slate-900/10'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold mt-1">Dashboard</span>
        </button>

        {/* Sales POS */}
        <button
          onClick={() => setActiveTab('sales')}
          className={`flex flex-col items-center justify-center text-center p-1 px-3.5 py-1.5 outline-none transition-all cursor-pointer ${
            activeTab === 'sales'
              ? 'bg-[#0f172a] text-white rounded-xl font-bold shadow-md shadow-slate-900/10'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <ShoppingBag className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold mt-1">POS Sales</span>
        </button>

        {/* Inventory */}
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex flex-col items-center justify-center text-center p-1 px-3.5 py-1.5 outline-none transition-all cursor-pointer ${
            activeTab === 'inventory'
              ? 'bg-[#0f172a] text-white rounded-xl font-bold shadow-md shadow-slate-900/10'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Package className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold mt-1">Inventory</span>
        </button>

        {/* Reports */}
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex flex-col items-center justify-center text-center p-1 px-3.5 py-1.5 outline-none transition-all cursor-pointer ${
            activeTab === 'reports'
              ? 'bg-[#0f172a] text-white rounded-xl font-bold shadow-md shadow-slate-900/10'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <BarChart3 className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold mt-1">Reports</span>
        </button>
      </nav>

      {/* 8. Portal Modals Overlay */}
      {showAddModal && (
        <ProductFormModal 
          product={null}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddNewProduct}
        />
      )}

      {editingProduct && (
        <ProductFormModal 
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleEditProduct}
        />
      )}

      {selectedReceiptTx && (
        <ReceiptModal 
          transaction={selectedReceiptTx}
          onClose={() => setSelectedReceiptTx(null)}
        />
      )}
    </div>
  );
}
