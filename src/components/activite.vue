<template>
  <h2>Activité</h2>
  <Loader v-if="!loaded" />
  <div v-else>
    <h6>
      <router-link
        :to="{ name: 'titre', params: { id: activite.titre.slug } }"
        class="cap-first"
      >
        {{ activite.titre.nom }}
      </router-link>
    </h6>

    <Preview
      :key="activite.id"
      :activite="activite"
      :route="{ name: 'titreActivite', id: activite.slug }"
      class="mb"
    />
  </div>
</template>

<script>
import Loader from './_ui/loader.vue'
import Preview from './activite/preview.vue'

export default {
  components: { Loader, Preview },

  computed: {
    activite() {
      return this.$store.state.titreActivite.element
    },

    user() {
      return this.$store.state.user.element
    },

    loaded() {
      return !!this.activite
    }
  },

  watch: {
    '$route.params.id': function (id) {
      if (this.$route.name === 'activite' && id) {
        this.get()
      }
    },

    user: 'get'
  },

  created() {
    this.get()
  },

  beforeUnmount() {
    this.$store.commit('titreActivite/reset')
  },

  methods: {
    async get() {
      await this.$store.dispatch('titreActivite/get', this.$route.params.id)
    }
  }
}
</script>
