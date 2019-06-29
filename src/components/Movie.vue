<template>
  <v-layout row wrap>
    <v-flex xs4 v-model="movie">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ movie.name }}</div>
            <span class="grey--text">{{ movie.release_year }} ‧ {{ movie.genre }}</span>
          </div>
        </v-card-title>
        <h6 class="card-title" v-if="current_user" @click="rate">Rate this movie</h6>
        <v-card-text>
          {{ movie.description }}
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="purple">Rate this movie</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from 'vue';
import StarRating from 'vue-star-rating';

const wrapper = document.createElement('div');
// shared state
const state = {
  note: 0,
};
// crate component to content
const RatingComponent = Vue.extend({
  data() {
    return { rating: 0 };
  },
  watch: {
    rating(newVal) { state.note = newVal; },
  },
  template: `
 <div class="rating">
 How was your experience getting help with this issues?
 <star-rating v-model="rating" :show-rating="false"></star-rating>
 </div>`,
  components: { 'star-rating': StarRating },
});
const component = new RatingComponent().$mount(wrapper);

export default {
  name: 'Movie',
  data: () => ({
    movie: {},
    current_user: true,
  }),
  methods: {
    async fetchMovie() {
      const res = await this.$http.get(`/movies/${this.$route.params.id}`);
      this.movie = res.data.movie;
    },
    async rate() {
      this.$swal({
        content: component.$el,
        buttons: {
          confirm: {
            value: 0,
          },
        },
      }).then(async () => {
        const res = await this.$http.post(`/movies/rate/${this.$route.params.id}`);
        this.$swal(`Thank you for rating! ${res.state.note}`, 'success');
      }).catch((err) => {
        const message = err.response.data.message;
        this.$swal('Oh oo!', `${message}`, 'error');
      });
    },
  },
  mounted() {
    this.fetchMovie();
  },
};
</script>
