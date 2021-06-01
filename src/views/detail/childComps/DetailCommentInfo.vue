<template>
  <div v-if="Object.keys(commentInfo).length !==0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>

    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>

    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>

      <div class="info-imgs">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/util';
export default {
name: "DetailCommentinfo",
  props: {
    commentInfo:{
      type: Object,
      default(){
        return{}
      }
    }
  },
  computed: {
    comment(){
      return Object.keys(this.commentInfo).length && this.commentInfo.list && this.commentInfo.list[0];
    }
  },
  /*过滤器:就像豆浆,过滤后成豆奶,属性拿到信息后转变成我们想要的数据的一种格式化*/
  filters:{

    showDate(value) {
      // 将传入的date准换为时间对象，时间挫是秒钟,而Date要求传进去的是毫秒,所有 *1000 是为了将秒转成毫秒；
     const date = new Date(value *1000);
      return formatDate(date,'yyyy-MM-dd hh:mm:ss')
    }

  }

}
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;/*border-bottom缩写属性设置一个声明中所有底部边框属性*/
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,0.1);/*border-bottom缩写属性设置一个声明中所有底部边框属性*/
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 10px;/*右外边距*/
    font-size: 13px;
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;/*给div元素添加圆角的边框*/
  }
  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p{
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {/*这种样式表示: .info-other下还有一个样式.date*/
    margin-right: 8px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
