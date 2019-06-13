const app = new Vue({
  el: '#app',
  template: '#ejemplo',
  data: {
    showTable: false,
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
    sortTable: function (n) {
      console.log("Este es el parametro", n)
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("myTable");
      switching = true;
      dir = "asc"; 
      while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch= true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount ++;      
        } else {
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    },
    getTweets: function () {
      this.showTable = true;
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