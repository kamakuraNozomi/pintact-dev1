const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.u_name = !isEmpty(data.u_name) ? data.u_name : "";
  data.u_email = !isEmpty(data.u_email) ? data.u_email : "";
  data.u_pw = !isEmpty(data.u_pw) ? data.u_pw : "";
  data.u_pw2 = !isEmpty(data.u_pw2) ? data.u_pw2 : "";

  if (!Validator.isLength(data.u_name, { min: 2, max: 20 })) {
    errors.u_name = "２０文字以内です";
  }

  if (Validator.isEmpty(data.u_name)) {
    errors.u_name = "名前は必須です";
  }

  if (Validator.isEmpty(data.u_email)) {
    errors.u_email = "メールアドレスは必須です";
  }

  if (!Validator.isEmail(data.u_email)) {
    errors.u_email = "このメールアドレスはしようできません";
  }

  if (Validator.isEmpty(data.u_pw)) {
    errors.u_pw = "パスワードは必須です";
  }

  if (!Validator.equals(data.u_pw, data.u_pw2)) {
    errors.u_pw2 = "パスワードが一致しません";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
