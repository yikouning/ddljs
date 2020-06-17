'use strict';
const sequelize = require('./src/sequelize');
const sjhb_1_8 = require('./src/index');
// async function start() {
  // (async function () {

    async function aaa(sequelize){
      const sjhbCountry = new sjhb_1_8(sequelize);
      console.log(sjhbCountry);
    }

  // }
// }start();
// })();