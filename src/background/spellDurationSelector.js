import { ipcMain } from "electron";

import {
  SEARCH_SPELL_DURATIONS_FOR_SELECTOR,
  COUNT_SPELL_DURATIONS_FOR_SELECTOR,
  GLOBAL_MESSAGE_BOX,
  GLOBAL_MESSAGE,
} from "../constants";

const { knex } = require("../libs/mysql");

ipcMain.on(SEARCH_SPELL_DURATIONS_FOR_SELECTOR, (event, payload) => {
  let queryBuilder = knex()
    .select()
    .from("foxy.dbc_spell_duration");
  if (payload.ID) {
    queryBuilder = queryBuilder.where("ID", "like", `%${payload.ID}%`);
  }
  if (payload.Duration) {
    queryBuilder = queryBuilder.where(
      "Duration",
      "like",
      `%${payload.Duration}%`
    );
  }
  queryBuilder = queryBuilder
    .limit(50)
    .offset(payload.page != undefined ? (payload.page - 1) * 50 : 0);

  queryBuilder
    .then((rows) => {
      event.reply(SEARCH_SPELL_DURATIONS_FOR_SELECTOR, rows);
    })
    .catch((error) => {
      event.reply(`${SEARCH_SPELL_DURATIONS_FOR_SELECTOR}_REJECT`, error);
      event.reply(GLOBAL_MESSAGE_BOX, JSON.stringify(error));
    })
    .finally(() => {
      event.reply(GLOBAL_MESSAGE, queryBuilder.toString());
    });
});

ipcMain.on(COUNT_SPELL_DURATIONS_FOR_SELECTOR, (event, payload) => {
  let queryBuilder = knex()
    .count("* as total")
    .from("foxy.dbc_spell_duration");
  if (payload.ID) {
    queryBuilder = queryBuilder.where("ID", "like", `%${payload.ID}%`);
  }
  if (payload.Duration) {
    queryBuilder = queryBuilder.where(
      "Duration",
      "like",
      `%${payload.Duration}%`
    );
  }

  queryBuilder
    .then((rows) => {
      event.reply(COUNT_SPELL_DURATIONS_FOR_SELECTOR, rows[0].total);
    })
    .catch((error) => {
      event.reply(`${COUNT_SPELL_DURATIONS_FOR_SELECTOR}_REJECT`, error);
      event.reply(GLOBAL_MESSAGE_BOX, JSON.stringify(error));
    })
    .finally(() => {
      event.reply(GLOBAL_MESSAGE, queryBuilder.toString());
    });
});