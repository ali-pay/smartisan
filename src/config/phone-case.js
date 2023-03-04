import _ from 'lodash';

// spu: 手机壳
export const spu = {
  id: '1001857',
  title: '足迹系列保护套 Google 发布移动操作系统 Android',
  desc: '为了那些改变人类足迹的进程',
  cost: 79,
  price: 59,
  quantity: 100,
  image_pc: 'https://resource.smartisan.com/resource/b299d6201055876016f4aa3bedba3088.jpg',
  image_mobile: 'https://resource.smartisan.com/resource/405932e36a06388faa891d2bf7b55401.jpg',
};

// sku: 手机壳 Android
export const android = _.defaultsDeep(
  {
    spu: spu.id,
    id: '100185701',
    title: 'Google 发布移动操作系统 Android',
    image: 'https://resource.smartisan.com/resource/1d3331e0b97a9e9bcb184c57055957cb.jpg',
    images: [
      'https://resource.smartisan.com/resource/1d3331e0b97a9e9bcb184c57055957cb.jpg',
      'https://resource.smartisan.com/resource/0bbc4989bb0cff1bdf45883bad20669c.jpg',
    ],
  },
  spu,
);

// 加入skus
spu.skus = [android];
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
  android,
};
