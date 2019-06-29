<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Email"
      v-model="email"
      :rules="emailRules"
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      required
    ></v-text-field>
    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>


<script>
export default {
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
  }),
  methods: {
    async submit() {
      const res = await this.$http.post('/users/login', {
        email: this.email,
        password: this.password,
      });
      window.localStorage.setItem('auth', res.data.token);
      this.$swal('Great!', 'You are ready to start!', 'success');
      this.$router.push({ name: 'Home' });
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
