const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.u_email = !isEmpty(data.u_email) ? data.u_email : "";
  data.u_pw = !isEmpty(data.u_pw) ? data.u_pw : "";

  // if (!Validator.isEmpty(data.u_email)) {
  //   errors.u_email = "このメールアドレスは使用できません";
  // }
  if (Validator.isEmpty(data.u_email)) {
    errors.u_email = "メールアドレスを入力してください";
  }
  if (Validator.isEmpty(data.u_pw)) {
    errors.u_pw = "パスワードを入力してください";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
