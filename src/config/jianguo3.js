import _ from 'lodash';

// spu: 坚果3
export const spu = {
  id: '1000406',
  title: '坚果 3',
  desc: '漂亮得不像实力派',
  price: 1299.0,
  quantity: 100,
  image_pc: 'https://resource.smartisan.com/resource/d5a1453ad115e15bd79579e8bdb20ba0.jpg',
  image_pc_params: 'https://resource.smartisan.com/resource/dfb3cfc644fb5d9ec774f04a967be5a2.jpg',
  image_mobile: 'https://resource.smartisan.com/resource/d5a1453ad115e15bd79579e8bdb20ba0.jpg',
  image_mobile_params: 'https://resource.smartisan.com/resource/dfb3cfc644fb5d9ec774f04a967be5a2.jpg',
  tips: [
    '激活后不支持七天无理由退货；',
    '您选购的现货商品将在订单成功付款后的 3 天内通过顺丰速运发货；',
    '为防止“黄牛”的恶意刷单行为，特此约定：一个账号每天至多可购买两台坚果 Pro 手机，若遇不同ID但具备下列现象之一：批量相同（包括雷同、临近、虚构）的收货地址、联系号码、付款行号、收件人（巧合重名除外）、均视为同一客户，锤子科技官方商城有权利取消其订单。',
  ],
  payment_huabei: [
    { key: '3期', value: '3', id: 1 },
    { key: '6期', value: '6', id: 2 },
    { key: '12期', value: '12', id: 3 },
  ],
};

// sku: 坚果3 碳黑色 4G + 32GB
export const black432 = _.defaultsDeep(
  {
    spu: spu.id,
    id: '100040601',
    title: '坚果 3（碳黑色，4G + 32GB，全网通）',
    image: 'https://resource.smartisan.com/resource/13e91511f6ba3227ca5378fd2e93c54b.png',
    images: ['https://resource.smartisan.com/resource/13e91511f6ba3227ca5378fd2e93c54b.png'],
    specs: [
      { key: '颜色', value: '碳黑色', hex: '#161111' },
      { key: '容量', value: '4G + 32GB' },
    ],
    discount: 999,
  },
  spu,
);

// sku: 坚果3 碳黑色 4G + 64GB
export const black464 = _.defaultsDeep(
  {
    spu: spu.id,
    id: '100040602',
    title: '坚果 3（碳黑色，4G + 64GB，全网通）',
    image: 'https://resource.smartisan.com/resource/13e91511f6ba3227ca5378fd2e93c54b.png',
    images: ['https://resource.smartisan.com/resource/13e91511f6ba3227ca5378fd2e93c54b.png'],
    specs: [
      { key: '颜色', value: '碳黑色', hex: '#161111' },
      { key: '容量', value: '4G + 64GB' },
    ],
  },
  spu,
);

// sku: 坚果3 酒红色 4G + 32GB
export const red432 = _.defaultsDeep(
  {
    spu: spu.id,
    id: '100040603',
    title: '坚果 3（酒红色，4G + 32GB，全网通）',
    image: 'https://resource.smartisan.com/resource/fac4130efc39ed4db697cc8d137890e9.png',
    images: ['https://resource.smartisan.com/resource/fac4130efc39ed4db697cc8d137890e9.png'],
    specs: [
      { key: '颜色', value: '酒红色', hex: '#ad4147' },
      { key: '容量', value: '4G + 32GB' },
    ],
    discount: 999,
  },
  spu,
);

// sku: 坚果3 酒红色 4G + 64GB
export const red464 = _.defaultsDeep(
  {
    spu: spu.id,
    id: '100040604',
    title: '坚果 3（酒红色，4G + 64GB，全网通）',
    image: 'https://resource.smartisan.com/resource/fac4130efc39ed4db697cc8d137890e9.png',
    images: ['https://resource.smartisan.com/resource/fac4130efc39ed4db697cc8d137890e9.png'],
    specs: [
      { key: '颜色', value: '酒红色', hex: '#ad4147' },
      { key: '容量', value: '4G + 64GB' },
    ],
  },
  spu,
);

// sku: 坚果3 浅金色 4G + 32GB
export const gold432 = _.defaultsDeep(
  {
    spu: spu.id,
    id: '100040605',
    title: '坚果 3（浅金色，4G + 32GB，全网通）',
    image: 'https://resource.smartisan.com/resource/91dc3f577960e30ca11b632e7b6ebd0f.png',
    images: ['https://resource.smartisan.com/resource/91dc3f577960e30ca11b632e7b6ebd0f.png'],
    specs: [
      { key: '颜色', value: '浅金色', hex: '#e7e6df' },
      { key: '容量', value: '4G + 32GB' },
    ],
    discount: 999,
  },
  spu,
);

// sku: 坚果3 浅金色 4G + 64GB
export const gold464 = _.defaultsDeep(
  {
    spu: '1000406',
    id: '100040606',
    title: '坚果 3（浅金色，4G + 64GB，全网通）',
    image: 'https://resource.smartisan.com/resource/91dc3f577960e30ca11b632e7b6ebd0f.png',
    images: ['https://resource.smartisan.com/resource/91dc3f577960e30ca11b632e7b6ebd0f.png'],
    specs: [
      { key: '颜色', value: '浅金色', hex: '#e7e6df' },
      { key: '容量', value: '4G + 64GB' },
    ],
  },
  spu,
);

// 加入skus
spu.skus = [black432, black464, red432, red464, gold432, gold464];

// 加入specs
const specs = [];
spu?.skus?.forEach((sku) => {
  sku?.specs?.forEach((spec) => {
    const temp = _.cloneDeep(spec);
    if (!temp.skus) temp.skus = [sku.id];
    const item = specs.find((item) => item.key === spec.key && item.value === temp.value);
    if (!item) specs.push(temp);
    else item.skus.push(sku.id);
  });
});
spu.specs = specs;

export default {
  spu,
  black432,
  black464,
  red432,
  red464,
  gold432,
  gold464,
};
