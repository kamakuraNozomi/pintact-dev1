const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};
  data.text = !isEmpty(data.m_url) ? data.m_url : "";

  if (Validator.isEmpty(data.m_url)) {
    errors.m_url = "ムービーのURLを入力してください。";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
