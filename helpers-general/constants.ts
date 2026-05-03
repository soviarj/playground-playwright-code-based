import { MAIN_URL } from "./urls";

export const ADMIN_USER = process.env.BANK_ADMIN_USER_NAME!;
export const ADMIN_PWD = process.env.BANK_ADMIN_USER_PASSWORD!;
export const VIEWER_USER = process.env.BANK_READONLY_USER_NAME!;
export const VIEWER_PWD = process.env.BANK_READONLY_USER_PASSWORD!;
export const WRONG_USER = "wrong"
export const WRONG_PWD = "wrong123"
export const BANK_URL = MAIN_URL + '/bank';
export const FORMS_URL = MAIN_URL + '/practice/forms';