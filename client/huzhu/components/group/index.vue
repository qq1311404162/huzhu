<template>
  <view>
    <view
      :style="{ color: titleColor }"
      class="weui-cells__title"
      v-html="title"
      v-if="title"
    />
    <view class="weui-cells">
      <slot/>
    </view>
  </view>
</template>

<script>
import create from '../utils/create'
export default create({
  name: 'group',
  props: {
    title: String,
    titleColor: String
  }
})
</script>