export default {
  addCount(state, payload){
    payload.count++
  },
  addCart(state, payload){
    payload.checked = true/*给个默认值为选中状态,后面想取掉就取反就可以*/
    payload.count = 1
    state.cartList.push(payload)
  }

}
