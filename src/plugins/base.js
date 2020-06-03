

export default {
  methods: {
    $img (name) {
      return name? require(`../assets/image/${name}`) : ''
    }
  }
}