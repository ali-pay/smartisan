<template>
  <div class="wrapper">
    <!-- 轮播图 -->
    <sm-box>
      <t-swiper class="banners" :duration="300" :interval="2000">
        <t-swiper-item v-for="(item, index) in banners" :key="index">
          <a :href="item.link"><img :src="item.image" /></a>
        </t-swiper-item>
      </t-swiper>
    </sm-box>
    <!-- 广告位 -->
    <sm-box>
      <div class="advertises">
        <div v-for="(item, index) in advertises" :key="index" class="item">
          <img :src="item.image" />
          <a class="item-hover" :href="item.link"></a>
        </div>
      </div>
    </sm-box>
    <!-- 热卖商品 -->
    <sm-box title="热卖商品" :page-total="hotsales.length / 4" @page-change="onPageChange">
      <div ref="hotsales" class="hotsales">
        <sm-product v-for="(item, index) in hotsales" :key="index" :spu="item" class="item"></sm-product>
      </div>
    </sm-box>
    <!-- 分类 -->
    <sm-box v-for="(item, index) in categorys" :key="index" :title="item.title">
      <div class="category">
        <div v-if="item.image" class="img">
          <a :href="item.link"><img :src="item.image" /></a>
        </div>
        <sm-product v-for="(spu, i) in item.spus" :key="i" :spu="spu" class="item"></sm-product>
      </div>
    </sm-box>
    <!-- 软文 -->
    <sm-box title="论坛精选" button-text="前往论坛" button-link="https://bbs.smartisan.com/forum.php">
      <div class="articles">
        <div v-for="(item, index) in articles" :key="index" class="item">
          <img :src="item.image" />
          <p class="title">{{ item.title }}</p>
          <p class="desc">{{ item.desc }}</p>
          <a class="link" :href="item.link">阅读全文<i class="smartisan-icon gt" /></a>
        </div>
      </div>
    </sm-box>
  </div>
</template>

<script>
import { banners, advertises, hotsales, categorys, articles } from '@/config/mall';

export default {
  name: 'Mall',
  data() {
    return {
      banners,
      advertises,
      hotsales,
      categorys,
      articles,
    };
  },
  methods: {
    onPageChange(val) {
      this.$refs.hotsales.style = `transform: translate(-${val - 1}00%);transition: all 0.3s;`;
    },
  },
};
</script>

<style lang="less" scoped>
.hover-shadow {
  &:hover {
    box-shadow: var(--shadow-inset);
    transition: all 0.2s ease-out;
  }
}

.item-hover {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .hover-shadow();
}

// TODO 边框的实现方式需要重构
.item {
  position: relative;
  box-sizing: border-box;
  min-width: 25%;
  max-width: 25%;
  cursor: pointer;
  border-right: var(--border-list);
  border-bottom: var(--border-list);
  .hover-shadow();
}

.advertises,
.hotsales,
.articles {
  display: flex;
  flex-wrap: wrap;

  .item {
    border-bottom: none;

    &:nth-child(4n) {
      border-right: none;
    }
  }
}

.banners {
  height: 550px;
}

.advertises {
  img {
    height: 100%;
  }
}

.hotsales {
  flex-wrap: nowrap;
}

.category {
  display: flex;
  flex-wrap: wrap;

  .img {
    .item();

    min-width: 50%;
    max-width: 50%;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.articles {
  .item {
    padding: 2.5rem;
    cursor: default;
    box-shadow: none;
    transition: none;

    img {
      border: var(--border-list);
      border-radius: var(--radius-l);
    }

    .title {
      margin-top: 1rem;
      overflow: hidden;
      font-size: var(--font-size-l);
      font-weight: bold;
      color: var(--font-color-3);
      text-overflow: ellipsis;
      word-break: keep-all;
      white-space: nowrap;
    }

    .desc {
      margin: 1rem 0;
    }
  }
}
</style>
