const ipcRenderer = window.require("electron").ipcRenderer;

import {
  SEARCH_QUEST_TEMPLATES,
  COUNT_QUEST_TEMPLATES,
  PAGINATE_QUEST_TEMPLATES,
  STORE_QUEST_TEMPLATE,
  FIND_QUEST_TEMPLATE,
  UPDATE_QUEST_TEMPLATE,
  DESTROY_QUEST_TEMPLATE,
  CREATE_QUEST_TEMPLATE,
  COPY_QUEST_TEMPLATE,
} from "./../constants";

export default {
  namespaced: true,
  state() {
    return {
      refresh: true,
      credential: {
        ID: undefined,
        LogTtitle: undefined,
      },
      pagination: {
        page: 1,
        size: 50,
        total: 0,
      },
      questTemplates: [],
      questTemplate: {},
    };
  },
  actions: {
    searchQuestTemplates({ commit }, payload) {
      return new Promise((resolve) => {
        ipcRenderer.send(SEARCH_QUEST_TEMPLATES, payload);
        ipcRenderer.on(SEARCH_QUEST_TEMPLATES, (event, response) => {
          commit(SEARCH_QUEST_TEMPLATES, response);
          resolve();
        });
      });
    },
    countQuestTemplates({ commit }, payload) {
      return new Promise((resolve) => {
        ipcRenderer.send(COUNT_QUEST_TEMPLATES, payload);
        ipcRenderer.on(COUNT_QUEST_TEMPLATES, (event, response) => {
          commit(COUNT_QUEST_TEMPLATES, response);
          resolve();
        });
      });
    },
    paginateQuestTemplates({ commit }, payload) {
      return new Promise((resolve) => {
        commit(PAGINATE_QUEST_TEMPLATES, payload.page);
        resolve();
      });
    },
    storeQuestTemplate({ commit }, payload) {
      return new Promise((resolve) => {
        ipcRenderer.send(STORE_QUEST_TEMPLATE, payload);
        ipcRenderer.on(STORE_QUEST_TEMPLATE, () => {
          commit("UPDATE_REFRESH_OF_QUEST_TEMPLATE", true);
          resolve();
        });
      });
    },
    findQuestTemplate({ commit }, payload) {
      return new Promise((resolve) => {
        ipcRenderer.send(FIND_QUEST_TEMPLATE, payload);
        ipcRenderer.on(FIND_QUEST_TEMPLATE, (event, response) => {
          commit(FIND_QUEST_TEMPLATE, response);
          resolve();
        });
      });
    },
    updateQuestTemplate({ commit }, payload) {
      return new Promise((resolve) => {
        ipcRenderer.send(UPDATE_QUEST_TEMPLATE, payload);
        ipcRenderer.on(UPDATE_QUEST_TEMPLATE, () => {
          commit("UPDATE_REFRESH_OF_QUEST_TEMPLATE", true);
          resolve();
        });
      });
    },
    destroyQuestTemplate(context, payload) {
      return new Promise((resolve) => {
        ipcRenderer.send(DESTROY_QUEST_TEMPLATE, payload);
        ipcRenderer.on(DESTROY_QUEST_TEMPLATE, () => {
          resolve();
        });
      });
    },
    createQuestTemplate({ commit }, payload) {
      return new Promise((resolve) => {
        ipcRenderer.send(CREATE_QUEST_TEMPLATE, payload);
        ipcRenderer.on(CREATE_QUEST_TEMPLATE, (event, response) => {
          commit(CREATE_QUEST_TEMPLATE, response);
          resolve();
        });
      });
    },
    copyQuestTemplate(context, payload) {
      return new Promise((resolve) => {
        ipcRenderer.send(COPY_QUEST_TEMPLATE, payload);
        ipcRenderer.on(COPY_QUEST_TEMPLATE, () => {
          resolve();
        });
      });
    },
    resetCredential({ commit }) {
      return new Promise((resolve) => {
        commit("RESET_CREDENTIAL_OF_QUEST_TEMPLATE");
        resolve();
      });
    },
  },
  mutations: {
    [SEARCH_QUEST_TEMPLATES](state, questTemplates) {
      state.questTemplates = questTemplates;
    },
    [COUNT_QUEST_TEMPLATES](state, total) {
      state.pagination.total = total;
    },
    [PAGINATE_QUEST_TEMPLATES](state, page) {
      state.pagination.page = page;
    },
    [FIND_QUEST_TEMPLATE](state, questTemplate) {
      state.questTemplate = questTemplate;
    },
    [CREATE_QUEST_TEMPLATE](state, questTemplate) {
      state.questTemplate = questTemplate;
    },
    UPDATE_REFRESH_OF_QUEST_TEMPLATE(state, refresh) {
      state.refresh = refresh;
    },
    RESET_CREDENTIAL_OF_QUEST_TEMPLATE(state) {
      state.credential = {
        ID: undefined,
        LogTitle: undefined,
      };
    },
  },
};
