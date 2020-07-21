<template>
  <div class="main" id="lunch">
    <div class="loading" v-if="loading">
      <img alt="Loading lunch menu" src="../assets/loading.gif" />
    </div>

    <div class="container">
      <div class="row">
        <div class="col text-center">
          <h4 class="mt-0">Welcome to contact list</h4>
          <p>Do you want contact a person today? Please select your contact</p>
        </div>
      </div>
    </div>

    <div class="bg-main">
      <div class="item">
        <h6>Please select contact list below</h6>
      </div>
      <div class="table-responsive contact">
        <table class="table table-condensed">
          <tbody>
            <tr v-for="(data, index) in contact" :key="index">
              <td>{{data.name}}</td>
              <td>{{data.mobile}}</td>
              <td class="text-right">
                <button type="button" class="btn btn-info btn-sm" v-on:click="selectContact(data, index)" data-toggle="modal" data-target="#modalDetail">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal detail-item fade" tabindex="-1" role="dialog" id="modalDetail" ref="modalDetail">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <span class="modal-title">DETAIL CONTACT</span>
          </div>
          <div class="modal-body">
            <div class="detail-wrap">
              <div class="photo">
                <img src="../assets/add-image.png">
              </div>
              <ul class="desc">
                <li >{{name}}</li>
                <li >{{phone}}</li>
                <li >{{address}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  components: {
    //
  },

  metaInfo () {
    return { title: this.$t('home') }
  },

  data () {
    return {
      loading: false,
      selected: [],
      contact: '',
      name: '',
      phone: '',
      address: ''
    }
  },

  computed: mapGetters({
    data: 'contact/contact'
  }),

  created () {
    // Fill the variable with contact data.
    this.contact = this.data.data
  },

  mounted () {},

  methods: {
    async contactList () {
      this.$store.dispatch('fetchContact', { contact: this.data })

      // Redirect to login.
      this.$router.push({ name: 'detail' })
    },

    async filterRecipes () {
      this.loading = true
      await axios.get('/api/recipes?ingredients=' + this.selected).then(res => {
        this.filter = res.data // response from rest api include into filter
        this.loading = false
      })
        .catch(err => {
          console.log(err)
        })
    },

    selectContact (data, index) {
      this.name = data.name
      this.phone = data.mobile
      this.address = data.address
      console.log('data ' + JSON.stringify(data))
    },

    searchRecipes () {
      this.filterRecipes()
      this.showFilter = true
    },

    removeRecipes (index) {
      this.selected.splice(index, 1)
      this.filter = ''
    },

    processCook (menu, index) {
      this.detailRecipes = menu
      console.log('menu ' + JSON.stringify(menu))
    },

    expiredRecipes (event) {
      if (event) {
        event.preventDefault()
      }
      alert('Can not add expired ingredient')
    },

    closeLoading () {
      // Close loading if any error from rest api
    }
  }
}
</script>
