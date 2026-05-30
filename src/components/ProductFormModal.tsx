import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../data';
import { X, Save, Image as ImageIcon } from 'lucide-react';

interface ProductFormModalProps {
  product: Product | null; // Null means adding new product
  onClose: () => void;
  onSave: (p: any) => void;
}

// Preset product image library so users can easily tap and pick high resolution realistic assets
const PRESET_IMAGES = [
  {
    name: 'กะทิกระป๋อง / เครื่องดื่มกระป๋องแดง',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMTPXSfoG3_7L9wBewxZq3U1bgX9jq78TNNqgaxV_JqJdupxv1bkkb2QkAOXHgUI888OAYacFlOXjJ_a1HF8ET4kUcpEaBsnR-ehT835xvpDMILqmJIGFvMJ_5fVfXCDfd7GTdFUEMChAIBnJoB-Q9YAKsMjZC5R9uhXzOO5abyNQ6LQQhxKvvva1RZ4XVjP8uzhyKxp08hZeRVuHd5I1ZecshV_HuZ5Y_hXW2b7-mKEi5-ozNxPkB4rEqczUmPZ8JT1A4e8zaXxX5'
  },
  {
    name: 'มันฝรั่งถุงเหลือง',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAghQc3tAs4dqmQWp8uK5gf0A3aCD_Fp6S8XiqYvtLL-Lkm9xzdR53bYongSFc2fgOjVttgmZEMGvdQnrjcg1Y1HaZ_EX8hJJnKqshCRcfeRk6s1LeDXZhTDq99bZxCHEVab141ppwMIEq8Kn6RRCbNO7WkcOBYOrT7JZretBRjFWBG12QLqjRAX0CyHqBSRrYg5kLC13C1CUWw8cdcKfx5hDJvRp4fhKaUzvE3DMvDX-wYGAqj1qMSENFaGEOVFIC29OtogNAeby_n'
  },
  {
    name: 'น้ำยาซักผ้าขาว',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC42MW9aVp4G8XLtQuTLaNYPo1EyJn827GNoJCLxQHhn6V82ZXOKqYIWV7q0HqcWz5mht2LBihh0MH8_SeQwFIbLiAsrp317e2VqprKOf0OByZN0u6AuRgovkgdgBmUGe9szHFP2bmTVcqzlTgC88uwS4C8-9AX-_laKOrxqakzKH_rH4Q3eTGLmq9HJgwNLlgkVilxKRZoOejAO04gZxElLnb_LEB4-Lebytn63eAa5IDqdu-umI5WdAvOQ9w117ZfuElhjIrGZILu'
  },
  {
    name: 'บะหมี่คัพ',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKpf11iAUcPdSYdxQ9_iquuofuD49QJeUzWJBhXhxFZRqD1DFdXyxGHyV55Tlq7weyxckFQLW9L3Q1N6z9ZEKx-EOZ3UBxOb6ursNOM9MvDwdOZTm8HrNm9sREtaR5UbZQHMaVVfPuTbyDGfsOTuR-9QK9QePt2q3cO_ndty7JpwKvStGlb4ZaCT7EOh4w6nUq3iwKGyreKsezVm1ssNBZtjKW7r138tyBrPB4Te1XyBi_-yLeO-4o-lB30CEL30Vn_i8G5_JaFQZh'
  },
  {
    name: 'ชาเขียวโออิชิขวดแก้ว',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-tiOFfRbAyMFrJGjetFqUTv6sucXm7SrvQaxj3gRvKQJmAvuuwGDhAfWvk9a3bweCIDUo4IG0NgisOLCWRt26lc7dgYegH1X90CewoTi6ooVorf8Kl6HoJDmXDAX7jFfA4-7EAMVhPFdb1wBb7pGiwSgRCgh8zN_MQYPMtPlMuY_939hPz1-nAcrcV0d7WVqx2n7rfZ9ZyCKyYpQfH0MDFvk-VPWbJcJjUVcmif2u9ywaEdHo7EoqyrDh2khTrkWIMUNzwQONw5AU'
  },
  {
    name: 'เลย์สาหร่าย',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRa4QaTfxmNUtjV3f76MzQ-5SgEWHG9H7GrHmZ3X4fQwDpwMYGDw0XLe8-ClbqrrMh4yzsuLuEwU-HxLjvRFj0LXYkuiM9_xXdfANqsPvjvmVECTWmuxzij_T-k5_a1hck3SZ1UbL-uUB-gS5McRIx7hth7LOUiKPSDseSKYCkYKVIQXy_qtd5MLvGWqmI4uhvQT2Dx74XGySTbjzFxQ3bIy5DPxKI-xYGH9hzM-iTGvUlplSvHy1Em1AcsyNs2Zo2TJ5uG2ReITfA'
  },
  {
    name: 'น้ำดื่มสิงห์ขวดสกรีน',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdr1q0X_ENAls5m0-DMcrzI3KFSvTEee7htUhtM46srzZpiRK0wIO9kcjrA60nRY_1y9nTjjYcRTvLCg7359Er7CUSz6lT60z1kPjkCqoeTRecuzTpKzDWh_Vmed21xAVXAPfmZbikJ0hqMUa9tUaOHzxGkTiPdnkzwkFVwbHlKHq6-kT2ovlo-Qo0zZGJQ3Il-bPUAsPCrTVLxAE49_5jsb7gLmw4Vv3ioOnanxkkv0QzjKybK-r4A00z0e1A5YULBPZyGoT6vmyQ'
  },
  {
    name: 'กาแฟกระป๋องกระตุ้นพลัง',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgrw4lhzD-f7Um6-CtEThzh1Z3_lMoRL_Gi3_pxD2N7V4skSLliNfkccPrtBgW4eDANPhW_rviz5fF4LIk1fER7aNpILJ1hg0U1oj5zAEr4ClhXe4Z3bRviPipBHCYusMoCoScs2ur2Sd7iu7wacI0m41RFt9cesUWQ0c3V71shmbyv7rJxRMpR86WfF0n5uFnDzpZz8z05B9kT3LZfuCloIvSCK4X-IUra9Lq9ssjn84bMHoJB3zimBI5zmjw-XUSxplcmZTLBNGP'
  },
  {
    name: 'นมกล่องขาว 450ml',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYuf3xCwLDsctgWKGVAdidXUXR3s2e0r2_5RtRqYlBorWg1zYKyO8P5jCiok61d6suabzhtzlElqQIk3LDDW-Cw0WJ7KCelG1DjOl8qvlIx_i_4So0f3N4mrNtYxdYIGmJ7yys8qDEfRcFf1O2z7ewKASoTB4gClmspmp2y8f_ehlxSaDipctWln2WeEK1flUcBhn-GSe29aVv2_4fZVeWGdqY2AERkFjN08IlfSusYCPF_S3evlewsESQpah0qQ7IuoxxUuVEeMIM'
  },
  {
    name: 'น้ำดื่มใสทรงตราเพชร',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUME3lW4pyWTpf1kYnguE7KNNcX2dD2fzhmWV2JYB5HYDnDaqZph-_kB9CXIKjG-wLK5_H8n3oxBDfgoNDsIvGWj6b9eafgyczXRaC1yPcwmmKip7g60GJO-5MTUe9Qg4q2lCkdCTkyvWRiY_V7-DhkmGTWJEpL6UmiQpWTxEoxRk-kNM6E4WxW7J86Kh-CL9EQ5A6ILRBBhMbunMCpba07-mYt4rSk9BQ5Lk0-nIE5Xeo7nHH-Uc3bXqN0WjjO1MR3wXQc2KkIj06'
  },
  {
    name: 'ขนมปังโฮลวีทนุ่ม',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvr4Ha00Pn0LN3V8BPQ7xrfpAkExAhp0nWO4G1hiTN6wlyLHgRJFQpuTw-rqoWVTjdBbeJ7zptLOZB_dokCmGpAzz_IEPrXY6Zz0M-LesXZvX7lxqutGV6LQMIdg1uWLW4kZL8waRaY7PCHF3RDygjCNNiH2RDHNRbNw8hd6aQxaRZUcmg_YWO0UcIabCGhrUbVQewXru9fD7yM4Iq4w2KsvxNOfMFAYdpFjNRre-ety4BcEEB5-qlJvF3W75GpeTzmTIV6tu1m8CR'
  }
];

export default function ProductFormModal({ product, onClose, onSave }: ProductFormModalProps) {
  const isEdit = !!product;

  const [name, setName] = useState('');
  const [category, setCategory] = useState('เครื่องดื่ม (Drinks)');
  const [price, setPrice] = useState(10);
  const [stock, setStock] = useState(20);
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [barcode, setBarcode] = useState('');

  // Sync state when editing product
  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setPrice(product.price);
      setStock(product.stock);
      setImageUrl(product.imageUrl || '');
      setBarcode(product.barcode || '');
    } else {
      // Create random barcode for new product
      setBarcode(Math.floor(1000000000000 + Math.random() * 900000000000).toString());
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: product?.id, // kept if edit
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200',
      barcode,
      soldCount: product?.soldCount || 0
    });
  };

  return (
    <div className="fixed inset-0 bg-[#0f172a]/60 backdrop-blur-xs z-55 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl animate-scale-up border border-slate-200">
        {/* Header */}
        <div className="bg-[#0f172a] text-white px-6 py-4 flex justify-between items-center">
          <h3 className="font-sans font-bold text-md text-white">
            {isEdit ? `แก้ไขสินค้า: ${product?.name}` : 'เพิ่มสินค้าใหม่'}
          </h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1.5 rounded-full transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Main info row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-450 uppercase tracking-wider mb-1">
                ชื่อสินค้า *
              </label>
              <input
                type="text"
                required
                placeholder="เช่น นมสดรสหวาน 300มล."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-450 uppercase tracking-wider mb-1">
                หมวดหมู่สินค้า *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 outline-none transition-all"
              >
                {CATEGORIES.filter(cat => cat !== 'ทั้งหมด').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-450 uppercase tracking-wider mb-1">
                ราคาขาย (฿) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.25"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-450 uppercase tracking-wider mb-1">
                จำนวนสต็อกเริ่มต้น *
              </label>
              <input
                type="number"
                required
                min="0"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-450 uppercase tracking-wider mb-1">
                บาร์โค้ดสินค้า (เลขที่สแกน)
              </label>
              <input
                type="text"
                placeholder="เว้นหลักเพื่อสุ่ม"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono tracking-wider focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 outline-none bg-slate-50 transition-all font-bold text-slate-705"
              />
            </div>
          </div>

          {/* Image URL with Preset Pickers */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-slate-450 uppercase tracking-wider">
                ลิงก์รูปภาพสินค้า *
              </label>
              <span className="text-[10px] text-slate-400">กรอกลิงก์หรือเลือกรูปสำเร็จรูปด้านล่าง</span>
            </div>
            
            <div className="flex gap-2">
              <input
                type="url"
                required
                placeholder="กรอก URL หรือคลิกเลือกเทมเพลตรูปด้านล่าง"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 outline-none font-mono transition-all text-slate-600"
              />
              <div className="w-10 h-10 border border-slate-200 rounded-lg overflow-hidden flex-shrink-0 bg-slate-50 flex items-center justify-center">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200';
                    }}
                  />
                ) : (
                  <ImageIcon className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </div>

            {/* Presets Slider */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="block text-[11px] font-bold text-slate-500 mb-2">เลือกจากคลังสินค้า SmartMinimart:</span>
              <div className="grid grid-cols-4 gap-2 max-h-[110px] overflow-y-auto hide-scrollbar p-1">
                {PRESET_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(img.url)}
                    className={`relative p-1 rounded-lg border-2 overflow-hidden flex flex-col items-center justify-center h-16 cursor-pointer focus:outline-none transition-all ${
                      imageUrl === img.url ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-200 bg-white hover:border-slate-350'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-10 object-cover rounded"
                    />
                    <span className="block text-[9px] text-slate-500 truncate w-full text-center mt-1 font-bold">
                      {img.name.split('/')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons Foot */}
          <div className="pt-4 border-t border-slate-100 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-xl text-slate-650 hover:text-slate-800 font-bold bg-white hover:bg-slate-50 transition-colors text-xs cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/10 cursor-pointer text-xs active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>{isEdit ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้าเข้าสต็อก'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
