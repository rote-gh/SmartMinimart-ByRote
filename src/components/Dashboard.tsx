import React from 'react';
import { Product, Transaction } from '../types';
import { 
  TrendingUp, 
  ShoppingCart, 
  PlusSquare, 
  ChevronRight, 
  AlertTriangle,
  ArrowUpRight,
  Package,
  Sparkles
} from 'lucide-react';

interface DashboardProps {
  products: Product[];
  transactions: Transaction[];
  onSwitchTab: (tab: 'dashboard' | 'sales' | 'inventory' | 'reports') => void;
  onOpenAddProduct: () => void;
}

export default function Dashboard({ products, transactions, onSwitchTab, onOpenAddProduct }: DashboardProps) {
  // Let's compute some real numbers!
  // Sum of transactions today (or in history)
  const todaySales = transactions.reduce((sum, tx) => sum + tx.totalAmount, 0);
  
  // Count of total unique products
  const totalCount = products.length;

  // Products with low stock (stock <= 12)
  const lowStockItems = products.filter(p => p.stock <= 12);
  const lowStockCount = lowStockItems.length;

  // Prepare simple 7-day visualization data
  // Let's assume today is Wednesday (พ.) and show Wednesday as highlighted, matching the mock screenshots
  const days = [
    { name: 'จ.', height: 'h-16', active: false },
    { name: 'อ.', height: 'h-24', active: false },
    { name: 'พ.', height: 'h-32', active: true }, // active color
    { name: 'พฤ.', height: 'h-20', active: false },
    { name: 'ศ.', height: 'h-28', active: false },
    { name: 'ส.', height: 'h-12', active: false },
    { name: 'อา.', height: 'h-14', active: false }
  ];

  return (
    <div className="space-y-6">
      {/* Daily Sales Hero Canvas */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-6 shadow-xl shadow-slate-950/10 border border-slate-800/20">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-emerald-500 rounded-full opacity-10 blur-xl"></div>
        
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-slate-300 uppercase bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              สรุปยอดขายวันนี้
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight mt-3">
              ฿{todaySales.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
            </h2>
          </div>
          
          <div className="flex items-center gap-2 mt-4 bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium text-slate-200">+15% จากเมื่อวาน</span>
          </div>
        </div>

        {/* Decorative Watermark Tablet Graphic */}
        <div className="absolute right-4 bottom-0 opacity-20 pointer-events-none transform translate-y-3 hidden sm:block">
          <div className="w-24 h-24 border-4 border-white/10 rounded-xl bg-slate-900 shadow-xl overflow-hidden p-1">
            <div className="w-full h-full bg-slate-800 rounded-lg flex flex-col items-center justify-center">
              <div className="w-8 h-1 bg-white/20 rounded mt-1"></div>
              <div className="w-12 h-6 bg-indigo-500/30 rounded-sm mt-3 animate-pulse"></div>
              <div className="flex gap-1 mt-3">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                <span className="w-2 h-2 bg-slate-600 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onSwitchTab('sales')}
          className="flex flex-col items-center justify-center text-center gap-2 p-5 bg-emerald-50/60 border border-emerald-100 text-emerald-800 rounded-2xl shadow-xs hover:bg-emerald-100/50 hover:border-emerald-200 transition-all active:scale-[0.98] outline-none cursor-pointer"
        >
          <div className="bg-emerald-500 text-white p-2.5 rounded-xl shadow-md shadow-emerald-500/10">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <span className="font-bold text-sm tracking-wide mt-1">เริ่ม POS ขาย</span>
        </button>
        
        <button
          onClick={onOpenAddProduct}
          className="flex flex-col items-center justify-center text-center gap-2 p-5 bg-indigo-50/60 border border-indigo-100 text-indigo-800 rounded-2xl shadow-xs hover:bg-indigo-100/50 hover:border-indigo-200 transition-all active:scale-[0.98] outline-none cursor-pointer"
        >
          <div className="bg-indigo-500 text-white p-2.5 rounded-xl shadow-md shadow-indigo-500/10">
            <PlusSquare className="w-6 h-6" />
          </div>
          <span className="font-bold text-sm tracking-wide mt-1">เพิ่มสินค้า</span>
        </button>
      </section>

      {/* Sales Trend Chart Placeholder */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-slate-800 text-sm tracking-wide">แนวโน้มยอดขาย</h3>
          <span className="text-xs text-slate-450 font-semibold font-mono bg-slate-100 px-2 py-0.5 rounded-full text-slate-500">ข้อมูล 7 วันที่ผ่านมา</span>
        </div>
        
        <div className="flex items-end justify-between h-28 gap-2 px-1">
          {days.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1 gap-2">
              <div 
                className={`w-full rounded-t-lg transition-colors duration-200 ${
                  day.active 
                    ? 'bg-indigo-500 shadow-lg shadow-indigo-500/25' 
                    : 'bg-indigo-50 hover:bg-indigo-100'
                } ${day.height}`}
              ></div>
              <span className={`text-[10px] font-extrabold ${day.active ? 'text-indigo-600' : 'text-slate-400'}`}>
                {day.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Low Stock Alert Section */}
      <section className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <span>แจ้งเตือนสินค้าใกล้หมด</span>
            <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              {lowStockCount} รายการ
            </span>
          </h3>
          <button 
            onClick={() => onSwitchTab('inventory')}
            className="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-0.5"
          >
            <span>ดูทั้งหมด</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {lowStockItems.slice(0, 3).map((prod) => {
            const isCritical = prod.stock <= 5;
            const isOutOfStock = prod.stock === 0;

            return (
              <div 
                key={prod.id} 
                onClick={() => onSwitchTab('inventory')}
                className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs hover:border-indigo-200 hover:shadow-xs transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100">
                  <img 
                    src={prod.imageUrl} 
                    alt={prod.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-800 truncate">{prod.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">คงเหลือ: {prod.stock} ชิ้น</p>
                </div>

                <div className="flex-shrink-0">
                  {isOutOfStock ? (
                    <span className="px-2.5 py-1 bg-red-100 text-red-700 font-bold text-[10px] rounded-full uppercase tracking-wider">
                      สินค้าหมด
                    </span>
                  ) : isCritical ? (
                    <span className="px-2.5 py-1 bg-rose-50 text-rose-600 border border-rose-200 font-bold text-[10px] rounded-full uppercase tracking-wider">
                      เติมด่วน
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[10px] rounded-full uppercase tracking-wider">
                      ใกล้หมด
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {lowStockItems.length === 0 && (
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-400">
              <Package className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-semibold">ยอดเยี่ยม! สินค้าทุกชิ้นมีสต็อกเพียงพอ</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
