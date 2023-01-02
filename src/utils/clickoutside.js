/* eslint-disable prefer-spread */
// 源码：https://github.com/ElemeFE/element/blob/dev/src/utils/clickoutside.js

import { on } from './dom.js';

const nodeList = [];
const ctx = '@@clickoutsideContext';

let startClick;
let seed = 0;

on(document, 'mousedown', (e) => {
  startClick = e;
});

on(document, 'mouseup', (e) => {
  nodeList.forEach((node) => node[ctx].documentHandler(e, startClick));
});

function createDocumentHandler(el, binding, vnode) {
  return (mouseup = {}, mousedown = {}) => {
    if (
      !vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      el === mouseup.target ||
      vnode.context?.popperElm?.contains(mouseup.target) ||
      vnode.context?.popperElm?.contains(mousedown.target)
    )
      return;

    const { methodName } = el[ctx];
    if (binding.expression && methodName && vnode.context[methodName]) {
      vnode.context[methodName]();
    } else if (el[ctx].bindingFn) el[ctx].bindingFn();
  };
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
export default {
  bind(el, binding, vnode) {
    nodeList.push(el);
    const id = seed++;
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value,
    };
  },

  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
  },

  unbind(el) {
    const len = nodeList.length;

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[ctx];
  },
};
