<template>
  <div class="header" :class="themeColor">
    <div class="wrapper">
      <a class="logo" href="/"></a>
      <ul>
        <li><a class="active" @click.stop="changeColor()">切换主题颜色</a></li>
        <li v-for="(item, index) in links" :key="index">
          <a :href="item.link" :class="{ active: item.title === link }">{{ item.title }}</a>
        </li>
      </ul>
      <div class="menus">
        <div class="user">
          <a class="icon" href="/user"></a>
          <div v-if="user" class="container">
            <div class="list">
              <div class="avatar">
                <img v-if="user.avatar" :src="user.avatar" />
                <i v-else></i>
              </div>
              <p class="nickname">{{ user.nickname }}</p>
              <ul>
                <li class="order"><a href="/user/order">我的订单</a></li>
                <li class="support"><a href="/user/support">售后服务</a></li>
                <li class="coupon"><a href="/user/coupon">我的优惠</a></li>
                <li class="information"><a href="/user/information">账户资料</a></li>
                <li class="address"><a href="user/address">收货地址</a></li>
                <li class="logout"><a href="/user/logout">退出</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { links } from '@/config/header';

export default {
  name: 'SmHeader',
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

    ul {
      display: flex;
      margin: 0 auto;

      li {
        margin-right: 3rem;

        &:last-child {
          margin-right: 0;
        }

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
          padding-top: 20px;
        }

        .list {
          width: 15rem;
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
              width: 100%;
              height: 44px;
              line-height: 44px;

              a {
                position: relative;
                display: list-item;
                padding-left: 55px;
                color: var(--font-color-2);
                border-top: var(--border-list);

                &:hover {
                  background-color: var(--color-hover);
                }

                &::before {
                  position: absolute;
                  top: 13px;
                  left: 20px;
                  width: 20px;
                  height: 20px;
                  content: '';
                  background-image: url('@/assets/images/header/menus.png');
                  background-repeat: no-repeat;
                }
              }

              &:last-child a:hover {
                border-radius: 0 0 var(--radius-xl) var(--radius-xl);
              }

              &.order a::before {
                background-position: 0 -43px;
              }

              &.support a::before {
                background-position: -20px -43px;
              }

              &.coupon a::before {
                background-position: -20px -83px;
              }

              &.information a::before {
                background-position: 0 -63px;
              }

              &.address a::before {
                background-position: -20px -63px;
              }

              &.logout a::before {
                background-position: 0 -84px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
