import React, { useState } from 'react';
import { Product, Transaction } from '../types';
import { 
  Receipt, 
  Printer, 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Layers, 
  Award, 
  ShoppingBag,
  DollarSign
} from 'lucide-react';

interface ReportsProps {
  products: Product[];
  transactions: Transaction[];
  onOpenReceipt: (tx: Transaction) => void;
}

export default function Reports({ products, transactions, onOpenReceipt }: ReportsProps) {
  const [reportsSubTab, setReportsSubTab] = useState<'history' | 'charts'>('history');
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  // Sales Math
  const totalBills = transactions.length + 1245; // simulated baseline + real logged ones
  const realSalesTotal = transactions.reduce((sum, tx) => sum + tx.totalAmount, 0);
  const netSalesAmount = realSalesTotal + 142500; // simulated baseline + real logged ones
  const profitAmount = Math.round(netSalesAmount * 0.24); // 24% typical profit margin

  // Sort best sellers
  const topProducts = [...products]
    .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
    .slice(0, 5);

  const getLocalDateStr = () => {
    // Return Thai localized "วันนี้ (30 พ.ค.)"
    const d = new Date();
    const monthsThai = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    return `วันนี้ (${d.getDate()} ${monthsThai[d.getMonth()]})`;
  };

  // Simulated week chart heights for timeframe
  const barHeights = {
    daily: [
      { day: '08:00', pct: '20%', label: '2.5k' },
      { day: '10:00', pct: '45%', label: '6k' },
      { day: '12:00', pct: '95%', label: '12k' },
      { day: '14:00', pct: '75%', label: '9.4k' },
      { day: '16:00', pct: '60%', label: '7.5k' },
      { day: '18:00', pct: '85%', label: '10.8k' },
      { day: '20:00', pct: '40%', label: '5k' }
    ],
    weekly: [
      { day: 'จ.', pct: '60%', label: '24k' },
      { day: 'อ.', pct: '45%', label: '18k' },
      { day: 'พ.', pct: '85%', label: '34k' },
      { day: 'พฤ.', pct: '70%', label: '28k' },
      { day: 'ศ.', pct: '95%', label: '40k' },
      { day: 'ส.', pct: '30%', label: '12k' },
      { day: 'อา.', pct: '55%', label: '22k' }
    ],
    monthly: [
      { day: 'สัปดาห์ 1', pct: '70%', label: '35k' },
      { day: 'สัปดาห์ 2', pct: '85%', label: '42.5k' },
      { day: 'สัปดาห์ 3', pct: '55%', label: '27.4k' },
      { day: 'สัปดาห์ 4', pct: '98%', label: '49k' }
    ]
  };

  return (
    <div className="space-y-5">
      {/* Tab Navigation header */}
      <div className="flex border border-slate-200 bg-white rounded-xl overflow-hidden shadow-xs">
        <button
          onClick={() => setReportsSubTab('history')}
          className={`flex-1 py-3 text-center text-sm font-bold border-b-2 outline-none cursor-pointer transition-all ${
            reportsSubTab === 'history'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/20'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          ประวัติการขาย
        </button>
        <button
          onClick={() => setReportsSubTab('charts')}
          className={`flex-1 py-3 text-center text-sm font-bold border-b-2 outline-none cursor-pointer transition-all ${
            reportsSubTab === 'charts'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/20'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          รายงานวิเคราะห์
        </button>
      </div>

      {/* History Tab View */}
      {reportsSubTab === 'history' && (
        <section className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="font-extrabold text-slate-800 text-[11px] tracking-wider uppercase bg-slate-100 px-3 py-1 rounded-full">{getLocalDateStr()}</h2>
            <div className="text-indigo-600 font-extrabold font-mono text-xs bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              ยอดรวมบิล: ฿{realSalesTotal.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="space-y-2.5 pb-24">
            {transactions.map((tx) => (
              <div 
                key={tx.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 flex justify-between items-center shadow-xs hover:border-slate-350 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600 border border-indigo-100 shadow-2xs">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-805 text-sm">บิล #{tx.id}</h3>
                    <p className="text-xs text-slate-450 mt-0.5 font-medium">{tx.dateTime} • {tx.itemCount} ชิ้น</p>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-1.5">
                  <p className="font-bold text-md text-slate-800 font-mono">฿{tx.totalAmount.toFixed(2)}</p>
                  <button 
                    onClick={() => onOpenReceipt(tx)}
                    className="flex items-center gap-1 text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer outline-none"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-500" />
                    <span>พิมพ์ใบเสร็จ</span>
                  </button>
                </div>
              </div>
            ))}

            {transactions.length === 0 && (
              <div className="bg-white border border-dashed border-slate-200 rounded-2xl py-12 text-center text-slate-400">
                <Receipt className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="text-xs font-semibold">ยังไม่มีประวัติทำรายการในรอบครึ่งวันนี้</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Analytical Charts Tab View */}
      {reportsSubTab === 'charts' && (
        <section className="space-y-5 pb-24">
          {/* Timeframe selector */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar py-0.5">
            <button
              onClick={() => setTimeframe('daily')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                timeframe === 'daily'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-650/10'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              รายวัน
            </button>
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                timeframe === 'weekly'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-650/10'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              รายสัปดาห์
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                timeframe === 'monthly'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-650/10'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              รายเดือน
            </button>
          </div>

          {/* Bento Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-2 border border-slate-150 rounded-2xl">
            <div className="col-span-2 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-5 rounded-xl flex flex-col justify-between h-28 shadow-md">
              <span className="text-[10px] uppercase font-bold text-slate-350 tracking-wider">ยอดขายสุทธิสะสม</span>
              <h3 className="text-2xl font-extrabold tracking-tight font-mono">
                ฿{netSalesAmount.toLocaleString('th-TH')}
              </h3>
            </div>

            <div className="bg-emerald-50 border border-emerald-150 text-[#064e3b] p-5 rounded-xl flex flex-col justify-between h-28 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">กำไรประมาณการ</span>
              <h3 className="text-xl font-extrabold tracking-tight font-mono text-emerald-800">
                ฿{profitAmount.toLocaleString('th-TH')}
              </h3>
            </div>

            <div className="bg-white border border-slate-200 text-slate-700 p-5 rounded-xl flex flex-col justify-between h-28 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">จำนวนบิลขาย</span>
              <h3 className="text-xl font-extrabold tracking-tight font-mono text-slate-805">
                {totalBills.toLocaleString('th-TH')}
              </h3>
            </div>
          </div>

          {/* Business Chart Trend */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">แนวโน้มยอดขาย</h3>
                <p className="text-[10px] text-slate-450 mt-0.5">แบ่งตามเวลาจำแนกความต้องการร้านค้า</p>
              </div>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>

            {/* Custom SVG responsive chart */}
            <div className="relative h-44 flex items-end justify-between gap-2 px-1">
              {barHeights[timeframe].map((itm, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip on hover */}
                  <span className="absolute -top-7 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded transition-all whitespace-nowrap z-50 shadow-md font-mono">
                    {itm.label}
                  </span>
                  
                  {/* Bar */}
                  <div 
                    className="w-full bg-indigo-500/20 group-hover:bg-indigo-650 rounded-t-lg transition-all duration-200 shadow-2xs" 
                    style={{ height: itm.pct }}
                  ></div>
                  
                  <span className="text-[9px] font-extrabold text-slate-455 truncate w-full text-center">
                    {itm.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top 5 Best Sellers item listings */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2.5">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-800 text-sm">สินค้าขายดี 5 อันดับแรก</h3>
            </div>

            <div className="space-y-3.5">
              {topProducts.map((prod, idx) => (
                <div key={prod.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-5 h-5 flex items-center justify-center font-bold text-[11px] rounded-full ${
                      idx === 0 
                        ? 'bg-amber-100 text-amber-800 font-extrabold' 
                        : idx === 1 
                        ? 'bg-slate-100 text-slate-650 font-extrabold' 
                        : 'text-slate-400 font-medium'
                    }`}>
                      {idx + 1}
                    </span>
                    <img 
                      src={prod.imageUrl} 
                      alt={prod.name} 
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-lg object-cover border border-slate-150 bg-slate-50 flex-shrink-0" 
                    />
                    <span className="font-semibold text-xs text-slate-700 leading-tight truncate max-w-[150px] sm:max-w-xs">{prod.name}</span>
                  </div>
                  <span className="font-bold text-xs text-indigo-650 font-mono">{(prod.soldCount || 1) + 20} ชิ้น</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
