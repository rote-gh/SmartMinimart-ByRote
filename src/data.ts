import { Product, Transaction } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'ชาเขียวโออิชิ ต้นตำรับ',
    category: 'เครื่องดื่ม (Drinks)',
    price: 25.0,
    stock: 25,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-tiOFfRbAyMFrJGjetFqUTv6sucXm7SrvQaxj3gRvKQJmAvuuwGDhAfWvk9a3bweCIDUo4IG0NgisOLCWRt26lc7dgYegH1X90CewoTi6ooVorf8Kl6HoJDmXDAX7jFfA4-7EAMVhPFdb1wBb7pGiwSgRCgh8zN_MQYPMtPlMuY_939hPz1-nAcrcV0d7WVqx2n7rfZ9ZyCKyYpQfH0MDFvk-VPWbJcJjUVcmif2u9ywaEdHo7EoqyrDh2khTrkWIMUNzwQONw5AU',
    barcode: '8850029012311',
    soldCount: 95
  },
  {
    id: 'prod-2',
    name: 'เลย์ รสมันฝรั่งแท้',
    category: 'ขนมขบเคี้ยว (Snacks)',
    price: 30.0,
    stock: 35,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRa4QaTfxmNUtjV3f76MzQ-5SgEWHG9H7GrHmZ3X4fQwDpwMYGDw0XLe8-ClbqrrMh4yzsuLuEwU-HxLjvRFj0LXYkuiM9_xXdfANqsPvjvmVECTWmuxzij_T-k5_a1hck3SZ1UbL-uUB-gS5McRIx7hth7LOUiKPSDseSKYCkYKVIQXy_qtd5MLvGWqmI4uhvQT2Dx74XGySTbjzFxQ3bIy5DPxKI-xYGH9hzM-iTGvUlplSvHy1Em1AcsyNs2Zo2TJ5uG2ReITfA',
    barcode: '8850029012328',
    soldCount: 220
  },
  {
    id: 'prod-3',
    name: 'น้ำดื่มสิงห์ 600มล.',
    category: 'เครื่องดื่ม (Drinks)',
    price: 7.0,
    stock: 4,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdr1q0X_ENAls5m0-DMcrzI3KFSvTEee7htUhtM46srzZpiRK0wIO9kcjrA60nRY_1y9nTjjYcRTvLCg7359Er7CUSz6lT60z1kPjkCqoeTRecuzTpKzDWh_Vmed21xAVXAPfmZbikJ0hqMUa9tUaOHzxGkTiPdnkzwkFVwbHlKHq6-kT2ovlo-Qo0zZGJQ3Il-bPUAsPCrTVLxAE49_5jsb7gLmw4Vv3ioOnanxkkv0QzjKybK-r4A00z0e1A5YULBPZyGoT6vmyQ',
    barcode: '8850029012335',
    soldCount: 450
  },
  {
    id: 'prod-4',
    name: 'น้ำอัดลมโคล่า (325มล.)',
    category: 'เครื่องดื่ม (Drinks)',
    price: 15.0,
    stock: 5,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMTPXSfoG3_7L9wBewxZq3U1bgX9jq78TNNqgaxV_JqJdupxv1bkkb2QkAOXHgUI888OAYacFlOXjJ_a1HF8ET4kUcpEaBsnR-ehT835xvpDMILqmJIGFvMJ_5fVfXCDfd7GTdFUEMChAIBnJoB-Q9YAKsMjZC5R9uhXzOO5abyNQ6LQQhxKvvva1RZ4XVjP8uzhyKxp08hZeRVuHd5I1ZecshV_HuZ5Y_hXW2b7-mKEi5-ozNxPkB4rEqczUmPZ8JT1A4e8zaXxX5',
    barcode: '8850029012342',
    soldCount: 180
  },
  {
    id: 'prod-5',
    name: 'มันฝรั่งทอดกรอบ (50ก.)',
    category: 'ขนมขบเคี้ยว (Snacks)',
    price: 20.0,
    stock: 42,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAghQc3tAs4dqmQWp8uK5gf0A3aCD_Fp6S8XiqYvtLL-Lkm9xzdR53bYongSFc2fgOjVttgmZEMGvdQnrjcg1Y1HaZ_EX8hJJnKqshCRcfeRk6s1LeDXZhTDq99bZxCHEVab141ppwMIEq8Kn6RRCbNO7WkcOBYOrT7JZretBRjFWBG12QLqjRAX0CyHqBSRrYg5kLC13C1CUWw8cdcKfx5hDJvRp4fhKaUzvE3DMvDX-wYGAqj1qMSENFaGEOVFIC29OtogNAeby_n',
    barcode: '8850029012359',
    soldCount: 110
  },
  {
    id: 'prod-6',
    name: 'น้ำยาซักผ้า สูตรเข้มข้น',
    category: 'ของใช้ในบ้าน (Household)',
    price: 89.0,
    stock: 18,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC42MW9aVp4G8XLtQuTLaNYPo1EyJn827GNoJCLxQHhn6V82ZXOKqYIWV7q0HqcWz5mht2LBihh0MH8_SeQwFIbLiAsrp317e2VqprKOf0OByZN0u6AuRgovkgdgBmUGe9szHFP2bmTVcqzlTgC88uwS4C8-9AX-_laKOrxqakzKH_rH4Q3eTGLmq9HJgwNLlgkVilxKRZoOejAO04gZxElLnb_LEB4-Lebytn63eAa5IDqdu-umI5WdAvOQ9w117ZfuElhjIrGZILu',
    barcode: '8850029012366',
    soldCount: 45
  },
  {
    id: 'prod-7',
    name: 'บะหมี่กึ่งสำเร็จรูป คัพ',
    category: 'ขนมขบเคี้ยว (Snacks)',
    price: 13.0,
    stock: 0,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKpf11iAUcPdSYdxQ9_iquuofuD49QJeUzWJBhXhxFZRqD1DFdXyxGHyV55Tlq7weyxckFQLW9L3Q1N6z9ZEKx-EOZ3UBxOb6ursNOM9MvDwdOZTm8HrNm9sREtaR5UbZQHMaVVfPuTbyDGfsOTuR-9QK9QePt2q3cO_ndty7JpwKvStGlb4ZaCT7EOh4w6nUq3iwKGyreKsezVm1ssNBZtjKW7r138tyBrPB4Te1XyBi_-yLeO-4o-lB30CEL30Vn_i8G5_JaFQZh',
    barcode: '8850029012373',
    soldCount: 312
  },
  {
    id: 'prod-8',
    name: 'นมสดรสจืด 450ml',
    category: 'เครื่องดื่ม (Drinks)',
    price: 22.0,
    stock: 5,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYuf3xCwLDsctgWKGVAdidXUXR3s2e0r2_5RtRqYlBorWg1zYKyO8P5jCiok61d6suabzhtzlElqQIk3LDDW-Cw0WJ7KCelG1DjOl8qvlIx_i_4So0f3N4mrNtYxdYIGmJ7yys8qDEfRcFf1O2z7ewKASoTB4gClmspmp2y8f_ehlxSaDipctWln2WeEK1flUcBhn-GSe29aVv2_4fZVeWGdqY2AERkFjN08IlfSusYCPF_S3evlewsESQpah0qQ7IuoxxUuVEeMIM',
    barcode: '8850029012380',
    soldCount: 125
  },
  {
    id: 'prod-9',
    name: 'น้ำดื่มตราเพชร 600ml',
    category: 'เครื่องดื่ม (Drinks)',
    price: 6.0,
    stock: 12,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUME3lW4pyWTpf1kYnguE7KNNcX2dD2fzhmWV2JYB5HYDnDaqZph-_kB9CXIKjG-wLK5_H8n3oxBDfgoNDsIvGWj6b9eafgyczXRaC1yPcwmmKip7g60GJO-5MTUe9Qg4q2lCkdCTkyvWRiY_V7-DhkmGTWJEpL6UmiQpWTxEoxRk-kNM6E4WxW7J86Kh-CL9EQ5A6ILRBBhMbunMCpba07-mYt4rSk9BQ5Lk0-nIE5Xeo7nHH-Uc3bXqN0WjjO1MR3wXQc2KkIj06',
    barcode: '8850029012397',
    soldCount: 220
  },
  {
    id: 'prod-10',
    name: 'ขนมปังโฮลวีท',
    category: 'ขนมขบเคี้ยว (Snacks)',
    price: 35.0,
    stock: 2,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvr4Ha00Pn0LN3V8BPQ7xrfpAkExAhp0nWO4G1hiTN6wlyLHgRJFQpuTw-rqoWVTjdBbeJ7zptLOZB_dokCmGpAzz_IEPrXY6Zz0M-LesXZvX7lxqutGV6LQMIdg1uWLW4kZL8waRaY7PCHF3RDygjCNNiH2RDHNRbNw8hd6aQxaRZUcmg_YWO0UcIabCGhrUbVQewXru9fD7yM4Iq4w2KsvxNOfMFAYdpFjNRre-ety4BcEEB5-qlJvF3W75GpeTzmTIV6tu1m8CR',
    barcode: '8850029012403',
    soldCount: 88
  },
  {
    id: 'prod-11',
    name: 'กาแฟกระป๋อง (240มล.)',
    category: 'เครื่องดื่ม (Drinks)',
    price: 17.0,
    stock: 45,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgrw4lhzD-f7Um6-CtEThzh1Z3_lMoRL_Gi3_pxD2N7V4skSLliNfkccPrtBgW4eDANPhW_rviz5fF4LIk1fER7aNpILJ1hg0U1oj5zAEr4ClhXe4Z3bRviPipBHCYusMoCoScs2ur2Sd7iu7wacI0m41RFt9cesUWQ0c3V71shmbyv7rJxRMpR86WfF0n5uFnDzpZz8z05B9kT3LZfuCloIvSCK4X-IUra9Lq9ssjn84bMHoJB3zimBI5zmjw-XUSxplcmZTLBNGP',
    barcode: '8850029012410',
    soldCount: 452
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TRX-9012',
    dateTime: '14:30 น.',
    dateStr: '24 พ.ค.',
    items: [
      { productId: 'prod-1', name: 'ชาเขียวโออิชิ ต้นตำรับ', price: 25.0, quantity: 2, total: 50.0 },
      { productId: 'prod-2', name: 'เลย์ รสมันฝรั่งแท้', price: 30.0, quantity: 5, total: 150.0 },
      { productId: 'prod-4', name: 'น้ำอัดลมโคล่า (325มล.)', price: 15.0, quantity: 3, total: 45.0 }
    ],
    totalAmount: 245.0,
    itemCount: 10
  },
  {
    id: 'TRX-9011',
    dateTime: '14:15 น.',
    dateStr: '24 พ.ค.',
    items: [
      { productId: 'prod-5', name: 'มันฝรั่งทอดกรอบ (50ก.)', price: 20.0, quantity: 12, total: 240.0 },
      { productId: 'prod-6', name: 'น้ำยาซักผ้า สูตรเข้มข้น', price: 89.0, quantity: 5, total: 445.0 },
      { productId: 'prod-11', name: 'กาแฟกระป๋อง (240มล.)', price: 17.0, quantity: 25, total: 435.0 }
    ],
    totalAmount: 1120.0,
    itemCount: 42
  },
  {
    id: 'TRX-9010',
    dateTime: '13:50 น.',
    dateStr: '24 พ.ค.',
    items: [
      { productId: 'prod-3', name: 'น้ำดื่มสิงห์ 600มล.', price: 7.0, quantity: 5, total: 35.0 },
      { productId: 'prod-9', name: 'น้ำดื่มตราเพชร 600ml', price: 6.0, quantity: 2, total: 13.0 }
    ],
    totalAmount: 48.0,
    itemCount: 7
  }
];

export const CATEGORIES = [
  'ทั้งหมด',
  'เครื่องดื่ม (Drinks)',
  'ขนมขบเคี้ยว (Snacks)',
  'ของใช้ในบ้าน (Household)'
];
