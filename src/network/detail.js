import {request} from "network/request";

export function getDetail(iid) {
  return request({/*有return时,调用时才得到结果,不然就在这里执行了*/
    url: '/detail',
    params: {
      iid
    }
  })
}


export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice

  }
}

export class Shop {
  constructor(shopInfo) {
    this.log = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}


export class GoodsParam{
  constructor(info, rule){
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.tables = rule.tables;
  }
}


export function getRecommend(){
  return request(
    {
      url:'/recommend'
    }
  )
}
