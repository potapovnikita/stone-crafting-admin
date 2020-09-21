import Vue from 'vue'

const fieldHoc = (component) => {
  const originalProps = component.props || [];

  return Vue.component('fieldHoc', {
    render(createElement) {
      return createElement(component, {
        props: {
          ...originalProps,
        }
      })
    },
    props: {
      ...originalProps,
    },
    data() {
      return {

      }
    },
    methods: {
      handleChange() {

      }
    },
    mounted() {

    },
    beforeDestroy() {

    }
  })
}

export default fieldHoc;