<template>
  <LoginComp/>
</template>
<script>
// @ is an alias to /src
import LoginComp from "@/components/LoginComp.vue";

export default {
  name: "login",
  async created() {
    await this.domainPath();
  },
  components: {
    LoginComp
  },
  computed: {
    exchangeNameDomain: {
      set(val) {
        this.$store.commit("setDomainPath", val);
      },
      get() {
        return this.$store.state.exchangeNameDomain;
      }
    },
    client_id: {
      set(val) {
        this.$store.commit("setCognito_clientID", val);
      },
      get() {
        return this.$store.state.cognito_clientID;
      }
    }
  },
  methods: {
    async domainPath() {
      var pathArray = window.location.hostname.split(".");
      var finalPath = pathArray[0];
      this.$store.commit("setDomainPath", finalPath);
      if (pathArray.length >= 2) {
        await this.$store.dispatch("getCognitoCredentials");
        this.makeUrlAndRedirect();
      }
    },
    makeUrlAndRedirect() {
      if (!localStorage.getItem("userJwt")) {
        var fullUrl = window.location.href;
        var redirectUrl = fullUrl.slice(0, -8); // needs to be changed
        window.location.href = `https://exchange${
          this.exchangeNameDomain
        }.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=${
          this.client_id
        }&redirect_uri=${redirectUrl}`;
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>
