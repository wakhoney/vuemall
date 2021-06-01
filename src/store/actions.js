/*当我们开发中有异步操作时, 就可以给异步操作包装一个Promise*/

export default {
  addCart(context,payload){/*这里的context相当于上下文,这里相当是store*/
        /*使用Promise我们可以用同步的方式写异步代码。其实Promise在实际的应用中往往起到代理的作用。
    例如，我们像我们发出请求调用服务器数据，由于网络延时原因，我们此时无法调用到数据，我们可以
    接着执行其它任务，等到将来某个时间节点服务器响应数据到达客户端，我们即可使用promise自带的
    一个回调函数来处理数据。*/
    return new Promise((resolve, reject) => {

      //判断是否存在要加入购物车的商品
      let oldProduct = null;
      for (let item of context.state.cartList){
        if(item.iid === payload.iid){
          oldProduct = item;
        }
      }

      //判断oldProduct,如果true,那么count+1; false 就count=1 并且加入到cartList: []中
      if (oldProduct){/*在 JavaScript 里，可以直接将变量名放在if后面的括号里*/
        /*oldProduct.count += 1*/ /*oldProduct.count += 1和js中let count +=1  oldProduct.add count */
        context.commit("addCount",oldProduct)
        resolve('这里表示成功时购物车有数据内部调用resolve')
      }else {
        /*payload.count = 1无法跟踪*/
        context.commit("addCart",payload)
        resolve('这里表示成功时若购物车没数据就调用resolve')
      }

    })

  }
}
