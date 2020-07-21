<template>
  <div>
    <Navbar></Navbar>
    <transition name="page" mode="out-in">
        <slot>
          <router-view />
        </slot>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
