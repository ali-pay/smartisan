<template>
  <div class="wrapper">
    <div class="list">
      <div class="avatar">
        <img v-if="user.avatar" :src="user.avatar" />
        <i v-else />
      </div>
      <p class="nickname">{{ user.nickname }}</p>
      <ul>
        <router-link
          v-for="item in links"
          :key="item.title"
          :to="item.to"
          :class="{ active: route.includes(item.to) }"
          tag="li"
        >
          {{ item.title }}
        </router-link>
      </ul>
    </div>
    <router-view class="container" />
  </div>
</template>

<script>
export default {
  name: 'User',
  computed: {
    links() {
      return [
        { title: '我的订单', to: '/mall/user/order' },
        { title: '售后服务', to: '/mall/user/support' },
        { title: '我的优惠', to: '/mall/user/coupon' },
        { title: '账户资料', to: '/mall/user/information' },
        { title: '收货地址', to: '/mall/user/address' },
      ];
    },
    route() {
      return this.$route.path;
    },
    user() {
      return this.$store.state.user.info;
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  gap: 2rem;

  .container {
    flex: 1;
    height: max-content;
  }

  .list {
    position: sticky;
    top: 2.5rem;
    width: 15rem;
    height: max-content;
    margin: 2.5rem auto;
    overflow: hidden;
    background: var(--color-white);
    border: var(--border);
    border-radius: var(--radius-xl);
    // box-shadow: var(--shadow-large);

    .avatar {
      position: relative;
      width: 10rem;
      height: 10rem;
      margin: 1.5rem auto;

      i,
      img {
        display: block;
        width: 100%;
        height: 100%;
      }

      i {
        background-image: url('@/assets/images/header/avatar-default.png');
        background-repeat: no-repeat;
        background-size: contain;
      }
    }

    .nickname {
      margin-bottom: 1rem;
      font-size: var(--font-size-xxxl);
      font-weight: bold;
      color: var(--font-color-2);
      text-align: center;
    }

    ul {
      display: block;

      li {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 4rem;
        font-size: var(--font-size-xl);
        color: var(--font-color-2);
        cursor: pointer;
        border-top: var(--border-list);

        &:hover,
        &.active {
          color: var(--color-white);
          background: linear-gradient(#7097ee, #4c75e6);
          border-top: none;
        }
      }
    }
  }
}
</style>
