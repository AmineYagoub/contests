import { Rule } from "antd/lib/form";

export const emailRoles: Rule[] = [
  {
    type: "email",
    message: "البريد الإلكتروني غير صحيح",
  },
  {
    required: true,
    message: "هذا الحقل مطلوب",
  },
];
