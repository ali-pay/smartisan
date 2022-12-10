import _ from 'lodash';

// spu: 耳机
export const spu = {
  id: '1000358',
  title: 'Smartisan 半入耳式耳机 心动版',
  desc: '哑光表面、专业级调音',
  price: 199.0,
  discount: 89.0,
  quantity: 100,
  image_pc: 'https://resource.smartisan.com/resource/2ccc8116b408313d033a9ff50e8aa508.jpg',
  image_mobile: 'https://resource.smartisan.com/resource/3bdd8d5c24b6601d22d359c337c1bf05.jpg',
  tips: ['适用于坚果 Pro 系列；', '拆封后不支持七天无理由退货。'],
  payment_huabei: [
    { key: '3期', value: '3', id: 1 },
    { key: '6期', value: '6', id: 2 },
    { key: '12期', value: '12', id: 3 },
  ],
};

// sku: 耳机 黑色
export const black = _.defaultsDeep(
  {
    spu: spu.id,
    id: '100035801',
    title: 'Smartisan 半入耳式耳机心动版（黑色）',
    image: 'https://resource.smartisan.com/resource/e9a27b0fa0e6bc3b81db28d891ec9468.jpg',
    images: [
      'https://resource.smartisan.com/resource/e9a27b0fa0e6bc3b81db28d891ec9468.jpg',
      'https://resource.smartisan.com/resource/e4def867578b1115c320a3712b5edce0.jpg',
      'https://resource.smartisan.com/resource/d60744f229c2a9fc607b573021083006.jpg',
      'https://resource.smartisan.com/resource/9c684bb38c214e2343bef0080f204eb8.jpg',
      'https://resource.smartisan.com/resource/4461c61d6a0db03fc0d75c43ed4739ea.jpg',
    ],
    specs: [
      {
        key: '颜色',
        value: '黑色',
        hex: '#000000',
        image: 'https://resource.smartisan.com/resource/dddd334ee9e667503425b40cc9c0320b.jpg',
      },
    ],
  },
  spu,
);

// sku: 耳机 红色
export const red = _.defaultsDeep(
  {
    spu: spu.id,
    id: '100035802',
    title: 'Smartisan 半入耳式耳机心动版（红色）',
    image: 'https://resource.smartisan.com/resource/d9a4019f575264674c7826645ca7d33a.jpg',
    images: [
      'https://resource.smartisan.com/resource/d9a4019f575264674c7826645ca7d33a.jpg',
      'https://resource.smartisan.com/resource/0e4a168af691b2978bd4e238d2a54e0c.jpg',
      'https://resource.smartisan.com/resource/8007c3170253347f585189c82b1a81b6.jpg',
      'https://resource.smartisan.com/resource/2bfbe11fb24a6668f5ef8a80e20b5800.jpg',
      'https://resource.smartisan.com/resource/82042cc29fc9c4cb6161094b2513a08f.jpg',
    ],
    specs: [
      {
        key: '颜色',
        value: '红色',
        hex: '#ea0809',
        image: 'https://resource.smartisan.com/resource/2759ecdbac0e68a9e145637aa58d0c58.jpg',
      },
    ],
  },
  spu,
);

// sku: 耳机 蓝色
export const blue = _.defaultsDeep(
  {
    spu: spu.id,
    id: '100035803',
    title: 'Smartisan 半入耳式耳机心动版（蓝色）',
    image: 'https://resource.smartisan.com/resource/90be7779c2454407ee5f4b6184c929ed.jpg',
    images: [
      'https://resource.smartisan.com/resource/90be7779c2454407ee5f4b6184c929ed.jpg',
      'https://resource.smartisan.com/resource/e72d9ae9f6e23383c0ddb3ad2e9c5a85.jpg',
      'https://resource.smartisan.com/resource/6d038c027b67f8b2aa82fd0db4bfcb8d.jpg',
      'https://resource.smartisan.com/resource/935a518945458cf6375eeb2f878091fc.jpg',
      'https://resource.smartisan.com/resource/803aad2fed639e92ad651f0968f3e8cd.jpg',
    ],
    specs: [
      {
        key: '颜色',
        value: '蓝色',
        hex: '#5f8ded',
        image: 'https://resource.smartisan.com/resource/57c95c4cb5d5facf2bd9ad03f1cee0da.jpg',
      },
    ],
  },
  spu,
);

// 加入skus
spu.skus = [black, red, blue];
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
  black,
  red,
  blue,
};
