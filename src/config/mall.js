import { jianguo3 } from '@/config/jianguo3';
import { earphone } from '@/config/earphone';
import { phoneCase } from '@/config/phone-case';

// 轮播图
export const banners = [
  {
    image: 'https://resource.smartisan.com/resource/3/314web1.png',
    link: '',
  },
];

// 广告位
export const advertises = [
  {
    image: 'https://resource.smartisan.com/resource/0c68fc06c54c2d857a34b3f3a681c351.jpg',
    link: '',
  },
  {
    image: 'https://resource.smartisan.com/resource/6/610400yijiuhuanxin.jpg',
    link: '',
  },
  {
    image: 'https://resource.smartisan.com/resource/06301f3e647b5f4f5bc00e12d5d3f8d1.jpg',
    link: '',
  },
  {
    image: 'https://resource.smartisan.com/resource/6/610400xinpinpeijian.jpg',
    link: '',
  },
];

// 软文
export const articles = [
  {
    title: 'Smartisan OS 3.x',
    desc: '进一步了解新特性',
    image: 'https://resource.smartisan.com/resource/2cbb5df65960435c2f2308ff2a69e683.jpg',
    link: '',
  },
  {
    title: 'Idea Pills',
    desc: '功能宣传视频',
    image: 'https://resource.smartisan.com/resource/cfcf318557370c1e4fe3f4e7bbfdcab3.jpg',
    link: '',
  },
  {
    title: 'One Step',
    desc: '功能宣传视频',
    image: 'https://resource.smartisan.com/resource/m/minibanner_03.jpg',
    link: '',
  },
  {
    title: '坚果 Pro，漂亮的不像实力派',
    desc: '观看产品视频',
    image: 'https://resource.smartisan.com/resource/093b8c4b0af6455b12b7ce824a9df9ad.jpg',
    link: '',
  },
];

// 热卖商品
export const hotsales = [jianguo3, earphone, phoneCase, jianguo3, earphone];

// 分类
export const categorys = [
  {
    title: '手机',
    image: 'https://resource.smartisan.com/resource/8070a2f75bcf97e43cc3a6f5a3a394a0.jpg',
    link: '',
    spus: hotsales,
  },
  {
    title: '配件',
    spus: hotsales,
  },
];

// 活动
export const activities = [
  {
    color: 'blue',
    title: '赠品',
    desc: '附赠运费险',
    spus: [jianguo3],
  },
  {
    color: 'green',
    title: '满减',
    desc: '满100减99',
    spus: [earphone],
  },
  {
    color: 'red',
    title: '直降',
    desc: '全部配件直降8折',
    spus: [phoneCase],
  },
  {
    color: 'yellow',
    title: '包邮',
    desc: '订单金额满99免邮费',
    spus: [jianguo3, earphone, phoneCase],
  },
];
