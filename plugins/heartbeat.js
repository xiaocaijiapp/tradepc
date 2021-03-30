export default function ({ store }) {
  const status = store.getters.loginStatus
  if (status) {
    setInterval(() => {
      store.dispatch('getMailCount')
    }, 180000)
  }
}
