new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: function() {
      return {
        app_title:"Fun Vuetify App",
        
      
      }
    },
    methods:{
      addTask(){
        console.log('hi')
      }
    }
  })