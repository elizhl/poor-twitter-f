const app = new Vue({
  el: '#app',
  template: '#ejemplo',
  data: {
    mostrar: true,
    mensaje: "Poor Man's Twitter",
    tweets: [],
    obj: {
      name: "",
      tweet: ""
    }
  },
  methods: {
    postTweet: function () {
      axios
        .post('http://localhost:8080/tweet/', this.obj)
        .then(response => { 
          this.getTweets()
        })
        .catch(error => {
            console.log(error)
        });
    },
    sortTable: function (param) {
      console.log("Este es el parametro",param)
    },
    getTweets: function () {
      axios
        .get('http://localhost:8080/tweet/')
        .then(response => { 
          this.tweets = response.data
        })
        .catch(error => {
            console.log(error)
        });
    }
  }
})