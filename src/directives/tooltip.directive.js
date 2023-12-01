import M from "../../node_modules/materialize-css/dist/js/materialize.min";

export default {
  mounted(el, value) {
    M.Tooltip.init(el, {html: value.value, position: 'bottom'})
  },
  beforeUnmount(el) {
    const tooltip = M.Tooltip.getInstance(el)

    if(tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}