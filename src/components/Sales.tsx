import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { 
  Search, 
  QrCode, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  Barcode, 
  Check, 
  Sparkles, 
  ShoppingCart,
  PlusCircle
} from 'lucide-react';

interface SalesProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (productId: string) => void;
  onUpdateCartQty: (productId: string, quantity: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export default function Sales({ 
  products, 
  cart, 
  onAddToCart, 
  onUpdateCartQty, 
  onClearCart, 
  onCheckout 
}: SalesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showScannerSimulator, setShowScannerSimulator] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [scanStatus, setScanStatus] = useState<string | null>(null);

  // Cart math
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // Filter products for catalog selector
  const filteredProducts = products.filter(p => {
    const term = searchTerm.toLowerCase();
    return p.name.toLowerCase().includes(term) || (p.barcode && p.barcode.includes(term));
  });

  // Handle barcode scanning simulation
  const handleSimulateScan = (prod: Product) => {
    onAddToCart(prod.id);
    setScanStatus(`สแกนพบสินค้า: ${prod.name}`);
    
    // Auto clear alert
    setTimeout(() => {
      setScanStatus(null);
    }, 2500);
  };

  const currentDateTimeStr = () => {
    const d = new Date();
    return d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.';
  };

  const handleCheckoutSuccess = () => {
    setShowPaymentModal(false);
    onCheckout(); // triggers parent checkout
  };

  return (
    <div className="space-y-4">
      {/* Search & Scan Header */}
      <section className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="ค้นหาสินค้าหรือคีย์บาร์โค้ด..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-550/15 focus:border-indigo-500 text-sm outline-none transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-0.5 hover:bg-slate-100 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <button 
            onClick={() => setShowScannerSimulator(true)}
            className="w-11 h-11 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-md shadow-indigo-600/15"
            title="เครื่องจำลองเลเซอร์สแกน"
          >
            <Barcode className="w-5 h-5 animate-pulse" />
          </button>
        </div>

        {/* Scan Alert feedback banner */}
        {scanStatus && (
          <div className="bg-emerald-50 border border-emerald-100 text-[#006d43] px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2 animate-bounce shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
            <span className="font-semibold">{scanStatus}</span>
          </div>
        )}
      </section>

      {/* Grid of quick catalog items (Select from store) */}
      <section className="bg-slate-100/50 p-3.5 rounded-2xl border border-slate-200">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">เลือกสินค้าหยิบลงตะกร้า</span>
          <span className="text-[10px] text-slate-400 bg-white/70 border border-slate-200 rounded-full px-2 py-0.5">มีทั้งหมด {filteredProducts.length} ชิ้น</span>
        </div>
        
        <div className="flex gap-2.5 overflow-x-auto pb-2 hide-scrollbar">
          {filteredProducts.map((prod) => {
            const isOutOfStock = prod.stock === 0;
            return (
              <button
                key={prod.id}
                onClick={() => !isOutOfStock && onAddToCart(prod.id)}
                disabled={isOutOfStock}
                className={`flex-shrink-0 bg-white border rounded-xl p-2 flex items-center gap-2.5 text-left transition-all ${
                  isOutOfStock 
                    ? 'opacity-40 border-slate-200 cursor-not-allowed' 
                    : 'border-slate-200 hover:border-indigo-500 hover:shadow-xs cursor-pointer active:scale-95'
                }`}
                style={{ width: '190px' }}
              >
                <div className="w-10 h-10 rounded-lg bg-slate-50 overflow-hidden flex-shrink-0 border border-slate-100">
                  <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-850 truncate">{prod.name}</h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[11px] font-bold text-indigo-600">฿{prod.price.toFixed(2)}</span>
                    <span className="text-[9px] text-slate-500 font-bold bg-slate-100 px-1.5 py-0.5 rounded border border-slate-100">
                      สต็อก: {prod.stock}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Cart Active List */}
      <section className="space-y-2.5 flex-1 pb-32">
        <div className="flex justify-between items-center px-1 border-b border-slate-100 pb-2">
          <h3 className="font-bold text-slate-800 text-sm">รายการสินค้าชำระเงิน</h3>
          {cart.length > 0 && (
            <button 
              onClick={onClearCart}
              className="text-slate-400 border border-slate-200 hover:text-rose-650 hover:border-rose-100 hover:bg-rose-50 px-2 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              ล้างตะกร้า
            </button>
          )}
        </div>

        <div className="space-y-2">
          {cart.map((item) => (
            <div 
              key={item.product.id}
              className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3 shadow-2xs hover:border-indigo-200 transition-all"
            >
              <div className="w-14 h-14 rounded-lg bg-slate-50 overflow-hidden flex-shrink-0 border border-slate-100">
                <img 
                  src={item.product.imageUrl} 
                  alt={item.product.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-slate-800 truncate">{item.product.name}</h4>
                <p className="text-xs text-slate-450 mt-1 font-medium">฿{item.product.price.toFixed(2)} / ชิ้น</p>
              </div>

              {/* Stepper qty controls */}
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
                  <button 
                    onClick={() => onUpdateCartQty(item.product.id, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-600 font-bold hover:bg-white rounded transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-800 min-w-[20px] text-center">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => onUpdateCartQty(item.product.id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-indigo-600 font-bold hover:bg-white rounded transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="font-bold text-xs text-indigo-600 font-mono">
                  ฿{(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <div className="bg-white border border-slate-200/65 rounded-2xl py-12 px-6 text-center text-slate-400 flex flex-col items-center justify-center">
              <div className="p-3 bg-indigo-50/50 rounded-full text-indigo-500 mb-2">
                <ShoppingCart className="w-7 h-7" />
              </div>
              <p className="text-sm font-bold text-slate-500">ตะกร้าสินค้าว่างเปล่า</p>
              <p className="text-xs text-slate-400 mt-1">กรุณากดเลือกสินค้าจากรายการแนะนำด้านบน หรือสแกนเพื่อเพิ่มสินค้า</p>
            </div>
          )}
        </div>
      </section>

      {/* Fixed Checkout Summary Panel */}
      {cart.length > 0 && (
        <div className="fixed bottom-[72px] left-0 right-0 z-10 px-4 pb-4 pt-4 bg-white border-t border-slate-200/80 shadow-[0_-8px_20px_rgba(0,0,0,0.06)] max-w-lg mx-auto">
          <div className="px-2">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">รวมทั้งสิ้น ({totalItemCount} รายการ)</span>
              <span className="font-bold text-2xl text-indigo-600 font-mono">฿{totalAmount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</span>
            </div>
            
            <button 
              onClick={() => setShowPaymentModal(true)}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/15 active:scale-[0.99] transition-all cursor-pointer outline-none"
            >
              <QrCode className="w-5 h-5 text-emerald-100" />
              <span className="tracking-wide">ชำระเงิน (Checkout)</span>
            </button>
          </div>
        </div>
      )}

      {/* Scanner Simulator Dialog Box */}
      {showScannerSimulator && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-55 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl border border-slate-200 animate-scale-up">
            <div className="bg-slate-900 text-slate-100 px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 uppercase tracking-wider">
                <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping"></span>
                <span>ระบบจำลองยิงเลเซอร์สแกนเนอร์</span>
              </div>
              <button 
                onClick={() => setShowScannerSimulator(false)} 
                className="hover:bg-slate-800 p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="text-center p-5 border border-dashed border-slate-200 rounded-xl bg-slate-50">
                <Barcode className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-500 mt-2">จำลองแท่นสแกนเนอร์บาร์โค้ด</p>
                <p className="text-[10px] text-slate-400 mt-0.5">เลือกสินค้าด้านล่างเพื่อสมมุติว่าบาร์โค้ดผ่านเครื่องยิง</p>
              </div>

              <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-100">
                {products.filter(p => p.stock > 0).map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      handleSimulateScan(prod);
                      setShowScannerSimulator(false);
                    }}
                    className="w-full p-2.5 flex items-center justify-between hover:bg-slate-50 rounded-lg text-left text-xs transition-colors cursor-pointer group"
                  >
                    <span className="font-semibold text-slate-700 group-hover:text-[#003d9b]">{prod.name}</span>
                    <span className="font-mono text-slate-400 group-hover:text-slate-600">[{prod.barcode}] ⚡</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR code payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-[#0f172a]/60 backdrop-blur-xs z-55 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md rounded-t-[28px] sm:rounded-2xl p-6 flex flex-col gap-5 animate-scale-up border border-slate-200 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-sans font-bold text-slate-805 text-lg">ชำระเงินด้วย QR Code</h3>
              <button 
                onClick={() => setShowPaymentModal(false)} 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            
            <div className="flex flex-col items-center gap-4 py-4 border-2 border-dashed border-slate-200 rounded-2xl bg-white p-4">
              <div className="w-44 h-44 bg-white p-2 border border-slate-200 flex items-center justify-center overflow-hidden rounded-xl shadow-inner">
                <img 
                  alt="QR Code Payment" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZkCPcxfNPUw5dl9cOqJp4Jl82zloXFVXjosKb2-P3FjDSitOw7STwYNzE4kFdtgZsYw699wApIC9bje2gR6QkagE-0nbSnolpgkgRbGH90IkZFzRU9svyWObt8jBBFHgD6-3pdDlZr95t1iGc29c0gEK8fRhip3qKwORy4q9tkfzhyvsmVFk_lMld_TWzBoSXvpkO8_JyvN10-PSSGB8aLD55GbWYice_2OnCNH2Tr-dyXFdfNspJIq0K8vgFQhwYCdK2E0zm8wdH" 
                />
              </div>
              
              <div className="text-center space-y-1">
                <p className="text-2xl font-bold tracking-tight text-indigo-650 font-mono">
                  ฿{totalAmount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                </p>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full inline-block animate-pulse">
                  สแกนผ่านแอปธนาคาร (PromptPay)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pb-2">
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="h-11 border border-slate-350 text-slate-455 font-bold hover:bg-slate-50 hover:text-slate-700 rounded-xl transition-all outline-none cursor-pointer text-sm"
              >
                ยกเลิก
              </button>
              <button 
                onClick={handleCheckoutSuccess}
                className="h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/15 transition-all active:scale-[0.98] outline-none cursor-pointer flex items-center justify-center gap-1.5 text-sm"
              >
                <Check className="w-4 h-4" />
                <span>ชำระเงินสำเร็จ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
