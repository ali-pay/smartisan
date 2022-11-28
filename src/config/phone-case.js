import _ from 'lodash';

// spu: 手机壳
export const phoneCase = {
  id: '1001857',
  title: '足迹系列保护套 Google 发布移动操作系统 Android',
  desc: '为了那些改变人类足迹的进程',
  price: 19.0,
  discount: 59.0,
  quantity: 100,
  image_pc: 'https://resource.smartisan.com/resource/b299d6201055876016f4aa3bedba3088.jpg',
  image_mobile: 'https://resource.smartisan.com/resource/405932e36a06388faa891d2bf7b55401.jpg',
};

// sku: 手机壳 Android
export const phoneCaseAndroid = _.defaultsDeep(
  {
    id: '100185701',
    title: 'Google 发布移动操作系统 Android',
    image: 'https://resource.smartisan.com/resource/1d3331e0b97a9e9bcb184c57055957cb.jpg',
    images: [
      'https://resource.smartisan.com/resource/1d3331e0b97a9e9bcb184c57055957cb.jpg',
      'https://resource.smartisan.com/resource/0bbc4989bb0cff1bdf45883bad20669c.jpg',
    ],
  },
  phoneCase,
);

// 加入skus
phoneCase.skus = [phoneCaseAndroid];
