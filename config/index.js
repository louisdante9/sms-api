require("dotenv").config();

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL"
  },
  test: {
    use_env_variable: "DATABASE_URL_TESTS"
  },
  production: { 
    use_env_variable: "DATABASE_URL"
  }
};