import Vue from 'vue';
import ElVue from './Dialog.vue';

const ElConstructor = Vue.extend(ElVue);

let instance;
let dialog;

const defaultCallback = (action) => {
  const { callback, resolve, reject } = dialog;
  if (callback) callback(action);
  if (resolve && ['confirm'].includes(action)) resolve(action);
  if (reject && ['cancel'].includes(action)) reject(action);
  instance.visible = false;
};

const initInstance = () => {
  instance = new ElConstructor({
    el: document.createElement('div'),
  });
  document.body.appendChild(instance.$el);
  instance.callback = defaultCallback;
};

const openDialog = () => {
  if (!instance) initInstance();
  const { options } = dialog;
  for (const prop in options) {
    if (options.hasOwnProperty(prop)) {
      instance[prop] = options[prop];
    }
  }
  if (options.callback === undefined) {
    instance.callback = defaultCallback;
  }
  instance.visible = true;
};

const Dialog = (options) => {
  return new Promise((resolve, reject) => {
    dialog = {
      options,
      resolve,
      reject,
    };
    openDialog();
  });
};

Dialog.alert = (title, message) => {
  return Dialog({
    title,
    message,
    type: 'alert',
    cancel: false,
  });
};

Dialog.confirm = (title, message) => {
  return Dialog({
    title,
    message,
    type: 'confirm',
  });
};

Dialog.danger = (title, message) => {
  return Dialog({
    title,
    message,
    type: 'danger',
    confirmColor: 'red',
  });
};

export default Dialog;
