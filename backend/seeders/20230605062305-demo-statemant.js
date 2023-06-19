import defanse_housing from "../uploads"
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      
      return queryInterface.bulkInsert('Statements', [
        {
          category: "Սպասարկում",
          companyName: "Coffeeshop",
          profession: "Գանձապահ",
          description: "Coffeeshop Company սրճարանների ցանցին անհրաժեշտ է գանձապահ",
          skills: "Պատվերների ձևակերպում Դրամարկղային գործառույթների իրականացում",
          salary: "100000 ՀՀ դրամ",
          jobType: "Լրիվ դրույթ",
          experience: "Աշխատանքային փորձը պարտադիր չէ",
          location: "Երևան",
          image: defanse_housing,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Արտադրություն, Գործառնություն, Գործադիր, Մենեջմենթ",
          companyName: "Երևանի Ոսկերչական Ֆաբրիկա ՍՊԸ",
          profession: "Արտադրամասի ղեկավար",
          description: "Ընկերության ծավալների մեծացմամբ պայմանավորված՝ Երևանի Ոսկերչական Ֆաբրիկան փնտրում է Արտադրամասի ղեկավարի, ով կոորդինացնելու է ձեռագործ արտադրության աշխատանքը։",
          skills: "Բարձրագույն կրթություն Ռուսերենի լավ իմացություն, ինչպես գրավոր, այնպես էլ բանավոր MS Office փաթեթի իմացություն Պատասխանատվության բարձր զգացում, ազնվություն, պարտաճանաչ մոտեցում աշխատանքին Արտադրական պրոցեսների վերաբերյալ գիտելիքներ Արտադրության ղեկավարի հաստիքում աշխատանքային փորձը պարտադիր է",
          salary: "200000-300000 ՀՀ դրամ",
          jobType: "Լրիվ դրույթ",
          experience: "Նվազագույնը 2 տարվա շխատանքային փորձը պարտադիր է",
          location: "Երևան",
          image: defanse_housing,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Առողջապահություն, Բժշկություն",
          companyName: "Վարդանանց ԲԿ",
          profession: "Բուժքույր",
          description: "Բուժքո՞ւյր եք և ցանկանում եք գնահատված լինել Ձեր աշխատանքում, ստանալ դինամիկ աճող բարձր աշխատավարձ, ուրեմն այս առաջարկը հենց Ձեզ համար է։ «Վարդանանց» նորարարական բժշկության կենտրոնն ունի բուժքույրերի թափուր հաստիքներ (տեղերը սահմանափակ են):",
          salary: "80000-120000 ՀՀ դրամ",
          jobType: "Լրիվ դրույթ",
          experience: "Սկսնակ, Միջին",
          location: "Երևան",
          image: defanse_housing,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Statemants', null, {});
  }
};
