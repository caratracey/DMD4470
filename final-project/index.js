new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: function() {
      return {
        tasks: [
            {
                content:"This is my first tweet ever!",
                username: "caratracey",
                likes:["joelsalisbury","caratracey", "dan"]
            },
            {
                content:"It's so sunny and nice outside!",
                username: "caratracey",
                likes:["joelsalisbury","caratracey", "dan"]
            },

        ]
      }
  },

    methods:{
      addTask(){
        console.log('hi')
      }
    }
  })

