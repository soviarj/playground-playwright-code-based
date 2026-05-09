import { ADMIN_USER, ADMIN_PWD, WRONG_USER, WRONG_PWD, VIEWER_USER, VIEWER_PWD } from "../helpers-general/constants";

export const users = {
  ADMIN_USER: {
    username: ADMIN_USER,
    password: ADMIN_PWD,
  },

  WRONG_USER: {
    username: WRONG_USER,
    password: WRONG_PWD,
  },

  VIEWER_USER: {
    username: VIEWER_USER,
    password: VIEWER_PWD,
  }
} as const;