// The API we're using for grabbing metadata about each cryptocurrency
// https://www.cryptocompare.com/api/
let CRYPTOCOMPARE_API_URI = "https://www.cryptocompare.com";

// The API we're using for grabbing cryptocurrency prices.
// found at: https://coinmarketcap.com/api/
let COINMARKETCAP_API_URI = "https://api.coinmarketcap.com";

// The number of milliseconds (ms) when we should update our currency
// charts = one minute
let UPDATE_INTERVAL = 60 * 1000;

let app = new Vue({
  el: "#app",
  data: {
    coins: [],
    coinData: {}
  },
  methods: {

    getCoinData: function() {
      let self = this;
      axios.get(CRYPTOCOMPARE_API_URI + "/api/data/coinlist")
        .then((resp) => {
          this.coinData = resp.data.Data;
          this.getCoins();
        })
        .catch((err) => {
          this.getCoins();
          console.log(err);
        });
    },

    getCoins: function() {
      let self = this;

      axios.get(COINMARKETCAP_API_URI + "/v1/ticker/?limit=10")
        .then((resp) => {
          this.coins = resp.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    getCoinImage: function(symbol) {
      symbol = (symbol === "MIOTA" ? "IOT" : symbol);
      symbol = (symbol === "VERI" ? "VRM" : symbol);
    },

    getColor: (num) => {
      return num > 0 ? "color:green;" : "color:red;";
    },
  },
  created: function() {
    this.getCoinData();
  }
});


setInterval(() =>{
  app.getCoinData();
}, UPDATE_INTERVAL);
