<template>
  <div class="header" :class="themeColor">
    <div class="wrapper">
      <router-link class="logo" to="/"></router-link>
      <ul class="links">
        <li class="link"><a class="active" @click.stop="changeColor">切换主题颜色</a></li>
        <li v-for="(item, index) in links" :key="index" class="link">
          <t-popup placement="bottom" show-arrow>
            <a :href="item.link" :class="{ active: item.title === link }">{{ item.title }}</a>
            <template v-if="item.extra" #content>
              <div class="qrcode">
                <p class="title">{{ item.extra.title }}</p>
                <img :src="item.extra.image" />
                <p class="tip">{{ item.extra.tip }}</p>
              </div>
            </template>
          </t-popup>
        </li>
      </ul>
      <div class="menus">
        <div class="user">
          <router-link class="icon" to="/mall/user"></router-link>
          <div v-if="user" class="container">
            <div class="list">
              <div class="avatar">
                <img v-if="user.avatar" :src="user.avatar" />
                <i v-else />
              </div>
              <p class="nickname">{{ user.nickname }}</p>
              <ul>
                <router-link tag="li" to="/mall/user/order" class="order">
                  <t-icon name="bulletpoint" />我的订单
                </router-link>
                <router-link tag="li" to="/mall/user/support" class="support">
                  <t-icon name="chat" />售后服务
                </router-link>
                <router-link tag="li" to="/mall/user/coupon" class="coupon">
                  <t-icon name="discount" />我的优惠
                </router-link>
                <router-link tag="li" to="/mall/user/information" class="information">
                  <t-icon name="user" />账户资料
                </router-link>
                <router-link tag="li" to="/mall/user/address" class="address">
                  <t-icon name="location" />收货地址
                </router-link>
                <router-link tag="li" to="/mall/user/logout" class="logout">
                  <t-icon name="close-circle" />退出
                </router-link>
              </ul>
            </div>
          </div>
        </div>
        <sm-header-cart />
      </div>
    </div>
  </div>
</template>

<script>
import { links } from '@/config/header';
import SmHeaderCart from './HeaderCart.vue';

export default {
  name: 'SmHeader',
  components: {
    SmHeaderCart,
  },
  data() {
    return {
      links,
    };
  },
  computed: {
    link() {
      return links.find((item) => item.link === window.location.href) || '在线商城';
    },
    themeColor() {
      return this.$store.state.theme.color;
    },
    themeColors() {
      return this.$store.state.theme.colors;
    },
    user() {
      return this.$store.state.user.info;
    },
  },
  methods: {
    // 切换主题颜色
    changeColor() {
      let index = this.themeColors.findIndex((item) => item === this.themeColor) + 1;
      if (index === this.themeColors.length) index = 0;
      this.$store.dispatch('theme/changeColor', { color: this.themeColors[index] });
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  min-width: var(--width);
  background: var(--header-background);
  background-size: contain;
  transition: all 0.6s;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--header-wrapper-height);

    .logo {
      width: var(--header-logo-width);
      height: var(--header-logo-height);
      background: var(--header-logo-image);
      background-repeat: no-repeat;
      background-size: contain;
    }

    .links {
      display: flex;
      gap: 3rem;
      margin: 0 auto;

      .link {
        a {
          font-size: var(--header-font-size);
          color: var(--header-font-color);
          opacity: var(--opacity);

          &:hover,
          &.active {
            opacity: 1;
          }

          &.active {
            font-weight: bold;
          }
        }
      }
    }

    .menus {
      position: relative;
      // TODO 当剔除掉tdesign的轮播图时，需要修改z-index
      z-index: 2;
      display: flex;

      .user {
        .icon {
          display: block;
          width: 1.5rem;
          height: 1.5rem;
          cursor: pointer;
          background-image: var(--header-user-image);
          background-size: contain;

          &:hover {
            // background-image: var(--header-user-image-active);
            opacity: var(--opacity);
          }
        }

        &:hover .container {
          display: block;
        }

        .container {
          position: absolute;
          right: 0;
          display: none;
          padding-top: 1.5rem;
        }

        .list {
          width: 13rem;
          overflow: hidden;
          background: var(--color-white);
          border: var(--border);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-large);

          .avatar {
            position: relative;
            width: 5rem;
            height: 5rem;
            margin: 1.5rem auto 0;

            i,
            img {
              display: block;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }

            i {
              background-image: url('@/assets/images/header/avatar-default.png');
              background-repeat: no-repeat;
              background-size: contain;
            }
          }

          .nickname {
            margin: 1.2rem;
            font-size: var(--font-size-l);
            font-weight: bold;
            text-align: center;
          }

          ul {
            display: block;

            li {
              display: flex;
              gap: 0.5rem;
              align-items: center;
              width: 100%;
              height: 3.5rem;
              padding-left: 3rem;
              cursor: pointer;
              border-top: var(--border-list);

              &:hover {
                color: var(--font-color-2);
                background-color: var(--color-hover);
              }

              .t-icon {
                font-size: 1.3rem;
              }
            }
          }
        }
      }
    }
  }
}

.qrcode {
  padding: 1rem;
  font-weight: bold;
  text-align: center;

  .title {
    color: var(--font-color-2);
  }

  .tip {
    color: var(--color-red);
  }

  img {
    width: 8rem;
    height: 8rem;
    margin: 0.5rem;
  }
}
</style>
