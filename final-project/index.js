var app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: function () {
    return {
      my_username: "caratracey",
      tweets: [],
      new_tweet: "",
      retweet: ""
    }
  },

  methods: {
    getTweetsFromFirestore() {

      // connect to the "tweets" collection in firestore
      db.collection("tweets").orderBy("timestamp", "desc")

        // watch for a new "version" of the tweets collection
        .onSnapshot((querySnapshot) => {

          // empty the tweets array
          this.tweets = [];

          // loop through the new collection
          querySnapshot.forEach((doc) => {
            // reference to our local copy
            var list = this.tweets;

            // reference to the current document in firestore
            var tweet = doc.data();
            var numberOfLikes = tweet.likes.length;

            // check to see if tweet.likes contains the current logged in user.
            var isLiked = tweet.likes.find((str) => str === this.my_username);

            // add the current tweet to the list
            list.push(
              {
                id: doc.id,
                content: tweet.content,
                likes: tweet.likes,
                timestamp: tweet.timestamp,
                username: tweet.username,
                numberOfLikes: numberOfLikes,
                isLiked: isLiked
              }
            )
          });
        });
    },

    likeTweet: function (docID) {
      var docRef = db.collection("tweets").doc(docID);


      return docRef
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(this.my_username),
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },


    unlikeTweet: function (docID) {
      var docRef = db.collection("tweets").doc(docID);

      return docRef
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(this.my_username),
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    
    addNewTweet: function () {
      // get the current value of new_tweet
      var new_tweet_text = this.new_tweet;
      var active_username = this.my_username;
      db.collection("tweets").add({
        username: active_username,
        content: new_tweet_text,
        timestamp: new Date(),
        likes: [],
      })
        .then(() => {
          console.log("Document successfully written!");
          this.new_tweet = "";
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },


    reTweet: function () {
      // get the current value of new_tweet
      var new_tweet_text = this.retweet;
      var active_username = this.my_username;
      db.collection("tweets").add({
        username: active_username,
        content: retweet,
        timestamp: new Date(),
        likes: [],
      })
        .then(() => {
          console.log("Document successfully written!");
          this.retweet = "";
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  },


  mounted() {
    this.getTweetsFromFirestore();
  }
})


