<template>
  <div id="app">
    <div id="nav">
      <table v-if="jwtDecodedToken">
        <tr>
          <td>
            <button @click="logout">Logout</button>
          </td>
        </tr>
        <tr>
          <td colspan="3">Hello World- you have successfully logged in.</td>
        </tr>
        <tr>
          <td>Welcome to “{{ userNameDomain }}” - resolved from URL</td>
        </tr>
        <tr>
          <td>Your name is “ {{ jwtDecodedToken.email }} ”- resolved from Cognito</td>
        </tr>
        <tr>
          <td>Your User Pool is “USER POOL NAME”- resolved from Cognito</td>
        </tr>
        <tr>
          <td>Your IAM Policy is “Policy Name” - resolved from IAM/ Cognito</td>
        </tr>
        <tr>
          <td>COgnito User name fetched from JWT TOken == {{ jwtDecodedToken['cognito:username'] }}</td>
        </tr>
      </table>
    </div>
    <router-view/>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
  created() {
    this.userNameUrl();
    var fullUrl = window.origin;
    if (this.$route.fullPath) {
      var jwtToken = this.$route.fullPath.slice(10, 1000);
      var jwtTokenDecoded = VueJwtDecode.decode(jwtToken);
      this.jwtDecodedToken = jwtTokenDecoded;
      if (jwtTokenDecoded) {
        localStorage.setItem("userJwt", JSON.stringify(jwtTokenDecoded));
      }
      // data = JSON.parse(localStorage.getItem('key') //to read back again JSON
    }
  },
  watch: {
    exchangeNameDomain(newValue) {
      this.exchangeNameDomain = newValue;
    }
  },
  data() {
    return {
      jwtDecodedToken: "",
      userNameDomain: ""
    };
  },
  methods: {
    userNameUrl() {
      var pathArray = window.location.hostname.split(".");
      var finalPath = pathArray[0];
      this.userNameDomain = finalPath;
    },
    logout() {
      localStorage.removeItem("userJwt");
      this.$router.push("/login");
    }
  },
  computed: {
    exchangeNameDomain: {
      set(val) {
        this.$store.commit("setDomainPath", val);
      },
      get() {
        return this.$store.state.exchangeNameDomain;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
