import store from '@/store'

export default async (to, from, next) => {
  try {
    await store.dispatch('fetchContact')
  } catch (e) { }

  next()
}
