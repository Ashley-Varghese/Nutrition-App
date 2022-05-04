module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    "vue"
    ],
    transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest"
    },
    testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
    preset: '@vue/cli-plugin-unit-jest'

  }