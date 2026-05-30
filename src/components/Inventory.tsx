import React, { useState } from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../data';
import { 
  Search, 
  Plus, 
  Minus, 
  Edit3, 
  Trash2, 
  AlertTriangle,
  Layers,
  Archive,
  AlertCircle
} from 'lucide-react';

interface InventoryProps {
  products: Product[];
  onOpenEdit: (p: Product) => void;
  onDelete: (id: string) => void;
  onUpdateStock: (id: string, newStock: number) => void;
  onOpenAddProduct: () => void;
}

export default function Inventory({ 
  products, 
  onOpenEdit, 
  onDelete, 
  onUpdateStock, 
  onOpenAddProduct 
}: InventoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');

  // Count items
  const totalItemsCount = products.length;
  const lowStockCount = products.filter(p => p.stock <= 12).length;

  // Filter products
  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (prod.barcode && prod.barcode.includes(searchTerm));
    
    const matchesCat = selectedCategory === 'ทั้งหมด' || prod.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-4">
      {/* Search Input Area */}
      <section className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="ค้นหาสินค้าหรือคีย์บาร์โค้ดสแกน..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 text-sm outline-none transition-all"
          />
        </div>

        {/* Horizontal Category Scroll */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold leading-tight flex-shrink-0 transition-all cursor-pointer border ${
                  isActive 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/10' 
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-500'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Stats Counter Overview Cards */}
      <section className="grid grid-cols-2 gap-3">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">สินค้าทั้งหมด</span>
          <span className="text-2xl font-extrabold text-slate-800 mt-1 font-mono">{totalItemsCount}</span>
        </div>
        
        <div className={`p-5 rounded-2xl border shadow-xs flex flex-col justify-between transition-colors ${
          lowStockCount > 0 
            ? 'bg-rose-50/40 border-rose-200 text-slate-800' 
            : 'bg-white border-slate-200 text-slate-500'
        }`}>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">สินค้าใกล้หมด / หมด</span>
          <span className={`text-2xl font-extrabold mt-1 font-mono ${lowStockCount > 0 ? 'text-rose-600' : 'text-slate-705'}`}>
            {lowStockCount}
          </span>
        </div>
      </section>

      {/* Grid of Inventory Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-24">
        {filteredProducts.map((prod) => {
          const isCritical = prod.stock <= 5;
          const isOutOfStock = prod.stock === 0;

          // Status Badge details
          let badgeColor = 'bg-emerald-50 text-emerald-700 border border-emerald-150';
          let badgeText = 'In Stock';
          if (isOutOfStock) {
            badgeColor = 'bg-rose-50 text-rose-700 border border-rose-150';
            badgeText = 'Out of stock';
          } else if (isCritical) {
            badgeColor = 'bg-amber-50 text-amber-700 border border-amber-150';
            badgeText = 'Low Stock';
          }

          return (
            <div 
              key={prod.id} 
              className={`bg-white border rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-350 transition-all ${
                isOutOfStock ? 'opacity-90 border-rose-200 bg-rose-50/10' : 'border-slate-205'
              }`}
            >
              {/* Product Card Top: Image Area */}
              <div className="h-44 w-full bg-slate-50 overflow-hidden relative border-b border-slate-100">
                <img 
                  alt={prod.name} 
                  src={prod.imageUrl} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />

                {isOutOfStock && (
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center backdrop-blur-3xs">
                    <span className="bg-rose-600 text-white font-extrabold text-[10px] px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                      สินค้าหมด / Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info Block */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase font-bold text-slate-550 bg-slate-100 border border-slate-200/50 px-2 py-0.5 rounded">
                      {prod.category.split(' ')[0]}
                    </span>
                    <h3 className="font-bold text-sm text-slate-805 leading-tight mt-1 items-stretch line-clamp-1">{prod.name}</h3>
                  </div>
                  
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider ${badgeColor}`}>
                    {badgeText}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 items-end">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">ราคาขาย</span>
                    <span className="text-lg font-bold text-indigo-600 font-mono">฿{prod.price.toFixed(2)}</span>
                  </div>

                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">คงเหลือ</span>
                    <span className={`text-sm font-bold font-mono ${isOutOfStock ? 'text-rose-600' : isCritical ? 'text-amber-600' : 'text-slate-800'}`}>
                      {prod.stock} ชิ้น
                    </span>
                  </div>
                </div>

                {/* Direct Action Stepper & Triggers */}
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-xl border border-slate-200/50">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onUpdateStock(prod.id, Math.max(0, prod.stock - 1))}
                      className="w-7 h-7 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 font-bold shadow-2xs cursor-pointer active:scale-90 transition-all"
                      title="ลดสต็อก"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold px-2 min-w-[24px] text-center font-mono text-slate-700">
                      {prod.stock}
                    </span>
                    <button
                      onClick={() => onUpdateStock(prod.id, prod.stock + 1)}
                      className="w-7 h-7 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 font-bold shadow-2xs cursor-pointer active:scale-90 transition-all"
                      title="เพิ่มสต็อก"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onOpenEdit(prod)}
                      className="p-1.5 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 rounded-lg text-indigo-600 cursor-pointer transition-all"
                      title="แก้ไขข้อมูลสินค้า"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(prod.id)}
                      className="p-1.5 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg text-rose-600 cursor-pointer transition-all"
                      title="ลบออกจากสต็อก"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="col-span-full py-16 bg-white border border-dashed border-slate-200 rounded-2xl text-center text-slate-400">
            <Archive className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-semibold">ไม่พบรายการสินค้าที่ค้นหา</p>
            <p className="text-xs text-slate-400 mt-1">กรุณากรอกคำค้นใหม่ หรือเพิ่มขบวนการสินค้าใหม่ในปุ่มเพิ่มด้านล่าง</p>
          </div>
        )}
      </div>

    </div>
  );
}
