import React from 'react';
import { Transaction } from '../types';
import { X, Printer, CheckCircle } from 'lucide-react';

interface ReceiptModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export default function ReceiptModal({ transaction, onClose }: ReceiptModalProps) {
  if (!transaction) return null;

  const handlePrint = () => {
    // Actually trigger window.print() or simulate it beautifully
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt ${transaction.id}</title>
            <style>
              body { font-family: monospace; padding: 20px; line-height: 1.5; color: #000; }
              .center { text-align: center; }
              .bold { font-weight: bold; }
              .line { border-bottom: 1px dashed #000; margin: 10px 0; }
              table { width: 100%; border-collapse: collapse; }
              .right { text-align: right; }
            </style>
          </head>
          <body>
            <div class="center">
              <h2 class="bold">SmartMinimart</h2>
              <p>สาขาหลัก (กรุงเทพมหานคร)</p>
              <p>โทร. 02-123-4567</p>
            </div>
            <div class="line"></div>
            <p>ใบเสร็จรับเงิน / Receipt</p>
            <p>เลขที่บิล: #${transaction.id}</p>
            <p>วันที่: ${transaction.dateStr} เวลา: ${transaction.dateTime}</p>
            <div class="line"></div>
            <table>
              <thead>
                <tr>
                  <th align="left">รายการ</th>
                  <th align="right">จำนวน</th>
                  <th align="right">ราคา</th>
                  <th align="right">รวม</th>
                </tr>
              </thead>
              <tbody>
                ${transaction.items
                  .map(
                    (it) => `
                  <tr>
                    <td>${it.name}</td>
                    <td align="right">${it.quantity}</td>
                    <td align="right">฿${it.price.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
                    <td align="right">฿${it.total.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
            <div class="line"></div>
            <p class="right bold">รวมทั้งสิ้น: ฿${transaction.totalAmount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</p>
            <p class="right">ชำระเงินโดย: QR PromptPay</p>
            <div class="line"></div>
            <div class="center">
              <p>*** ขอบคุณที่อุดหนุน / Thank You ***</p>
              <p>แอปพลิเคชันระบบจัดการคลังและจุดขาย</p>
            </div>
            <script>
              window.onload = function() {
                window.print();
                setTimeout(function() { window.close(); }, 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      // Fallback alert or message in case popup blocker is on
      alert('เพื่อการพิมพ์ใบเสร็จ กรุณาอนุญาตหน้าต่างป็อปอัปในเบราว์เซอร์ของคุณ');
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0f172a]/60 backdrop-blur-xs z-55 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-scale-up border border-slate-205">
        {/* Header */}
        <div className="bg-[#0f172a] text-white px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-indigo-400" />
            <h3 className="font-sans font-bold text-md">ใบเสร็จรับเงิน #{transaction.id}</h3>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1.5 rounded-full transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Paper Receipt view */}
        <div className="p-6 bg-slate-50 overflow-y-auto max-h-[60vh]">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-inner font-mono text-xs text-slate-700">
            <div className="text-center mb-4">
              <h4 className="font-bold text-base text-slate-900 font-sans tracking-tight">SmartMinimart</h4>
              <p className="text-[11px] text-slate-500 font-sans">สาขาหลัก (กรุงเทพมหานคร)</p>
              <p className="text-[11px] text-slate-500 font-sans">โทร. 02-123-4567</p>
            </div>

            <div className="border-b border-dashed border-slate-300 my-3"></div>

            <div className="space-y-1">
              <p><span className="text-slate-400">เลขที่บิล:</span> #{transaction.id}</p>
              <p><span className="text-slate-400">วันที่:</span> {transaction.dateStr} ({transaction.dateTime})</p>
              <p><span className="text-slate-400">ผู้ขาย:</span> พนักงานขาย (POS)</p>
            </div>

            <div className="border-b border-dashed border-slate-300 my-3"></div>

            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200 pb-1">
                  <th className="text-left font-bold py-1">รายการ</th>
                  <th className="text-right font-bold py-1">จำนวน</th>
                  <th className="text-right font-bold py-1">รวม</th>
                </tr>
              </thead>
              <tbody>
                {transaction.items.map((it, idx) => (
                  <tr key={idx} className="border-b border-slate-100/50">
                    <td className="py-2 pr-2">
                      <div className="font-medium text-slate-900">{it.name}</div>
                      <div className="text-[10px] text-slate-400">฿{it.price.toFixed(2)} / ชิ้น</div>
                    </td>
                    <td className="text-right py-2 text-slate-500">{it.quantity}</td>
                    <td className="text-right py-2 font-bold text-slate-900">฿{(it.total).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-b border-dashed border-slate-300 my-3"></div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-500">
                <span>จำนวนชิ้นทั้งหมด:</span>
                <span>{transaction.itemCount} ชิ้น</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-100">
                <span>ยอดสุทธิ:</span>
                <span className="text-indigo-600">฿{transaction.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-b border-dashed border-slate-300 my-3"></div>

            <div className="text-center text-[10px] text-slate-400 space-y-1 font-sans">
              <p className="font-bold text-emerald-700 bg-emerald-50 py-1 rounded inline-block px-3.5 border border-emerald-150/40">ชำระเงินสำเร็จด้วย QR PromptPay</p>
              <div className="py-1">
                <CheckCircle className="w-4 h-4 text-emerald-600 inline-block" />
              </div>
              <p className="mt-1 font-bold text-slate-500">*** ขอบคุณที่อุดหนุน / Thank You ***</p>
            </div>
          </div>
        </div>

        {/* Actions inside modal */}
        <div className="bg-slate-100 px-6 py-4 flex gap-3 justify-end border-t border-slate-205">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-xl text-slate-600 hover:text-slate-800 font-bold bg-white hover:bg-slate-50 transition-all text-xs cursor-pointer"
          >
            ปิดหน้าจอ
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-md shadow-emerald-500/10 text-xs cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4" />
            พิมพ์ใบเสร็จจริง
          </button>
        </div>
      </div>
    </div>
  );
}
