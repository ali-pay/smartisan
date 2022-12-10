<template>
  <div class="sm-footer">
    <div class="wrapper">
      <div class="top">
        <div class="left">
          <ul v-for="(item, index) in service" :key="index">
            <li class="title">{{ item.title }}</li>
            <li v-for="(element, elementIndex) in item.links" :key="elementIndex">
              <a v-if="!element.extra" :href="element.link">{{ element.title }}</a>
              <a v-else @click.stop="openDialog(element.extra)">{{ element.title }}</a>
            </li>
          </ul>
        </div>
        <div class="right">
          <p class="tel">{{ contactus.title }}</p>
          <p v-for="(item, index) in contactus.tips" :key="index">{{ item }}</p>
          <a class="help" :href="contactus.link">
            <i class="smartisan-icon info-question"></i>
            在线帮助
          </a>
        </div>
      </div>
      <div class="bottom">
        <div class="private">
          <ul>
            <li v-for="(item, index) in copyright" :key="index">
              <a target="_blank" :class="{ copyright: !item.link }" :href="item.link">{{ item.title }}</a>
            </li>
          </ul>
        </div>
        <div class="public">
          <ul>
            <li v-for="(item, index) in beian" :key="index">
              <a target="_blank" :href="item.link">
                <i v-if="item.icon" class="icon-police"></i>
                {{ item.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <t-dialog :visible.sync="visible" :header="false" :footer="false">
      <div class="qrcode">
        <img :src="extra?.image" />
        <p class="tip">{{ extra?.tip }}</p>
      </div>
    </t-dialog>
  </div>
</template>

<script>
import { service, contactus, copyright, beian } from '@/config/footer';

export default {
  name: 'SmFooter',
  data() {
    return {
      service,
      contactus,
      copyright,
      beian,
      extra: null,
      visible: false,
    };
  },
  methods: {
    openDialog(extra) {
      this.extra = extra;
      this.visible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.sm-footer {
  min-width: var(--width);
  background: var(--color-hover);
  border-top: var(--border);

  a {
    color: var(--font-color-1);

    &:hover {
      color: var(--color-blue);
    }
  }

  .wrapper {
    .top {
      display: flex;
      justify-content: space-between;
      padding: 5rem 0 2rem;
      border-bottom: var(--border);

      .left {
        display: flex;

        ul {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-width: 13rem;

          .title {
            margin-bottom: 1rem;
            font-weight: bold;
            color: var(--font-color-2);
          }
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .tel {
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--color-blue);
        }

        .help {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 2.5rem;
          padding: 0 2rem;
          margin-top: 1rem;
          font-weight: bold;
          color: var(--color-blue);
          background: var(--color-linear);
          border: var(--border);
          border-radius: var(--radius);

          &:hover {
            background: var(--color-hover);
          }

          &:active {
            background: var(--color-gray);
          }

          .smartisan-icon {
            margin-right: 0.2rem;
            font-size: 1.3rem;
            font-weight: normal;
          }
        }
      }
    }

    .bottom {
      padding: 2rem 0;

      ul {
        display: flex;

        li {
          padding-right: 1rem;
          margin-right: 1rem;
          border-right: var(--border);

          &:last-child {
            padding-right: 0;
            margin-right: 0;
            border-right: none;
          }

          .copyright {
            font-family: SmartisanMaquette;
            color: var(--font-color-0);
            cursor: default;
          }
        }
      }

      .public {
        margin-top: 1.2rem;

        a {
          display: flex;
          color: var(--font-color-0);

          &:hover {
            color: var(--color-blue);
          }
        }

        .icon-police {
          width: 20px;
          height: 20px;
          margin-top: -5px;
          margin-right: 5px;
          background-image: url('@/assets/images/footer/icon-police.png');
          background-repeat: no-repeat;
          background-size: contain;
        }
      }
    }
  }
}

.qrcode {
  height: 25rem;
  text-align: center;

  img {
    width: 20rem;
    height: 20rem;
  }

  .tip {
    font-size: var(--font-size-xxl);
    font-weight: bold;
  }
}
</style>
