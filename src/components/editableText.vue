<template>
<div @click="handleClick">
        <div ref="me" contenteditable  @blur="handleDone" @keydown.enter="handleDone" @keypress.stop="handleKeyPress"  v-text="content" v-show="editing"></div>
        <span v-text="content" class="editable" v-if="!editing">{tag} {content} </span>
    </div>
</template>
<script>
export default {
  props: {
      tag:{
          type:String,
          default:'h1'
      },
      content: {
          type: String,
          default:""
      },
    
    maxLength: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      editing: false,
    };
  },
  methods: {
    handleInput() {},
    handleKeyPress(e) {
      //console.log('handleKeyPress')
      if (e.target.innerText.length >= this.maxLength) {
        e.preventDefault();
        return;
      }
    },
    handleClick() {
      this.editing = true;
      setTimeout(() => {
        this.$refs.me.focus();
      }, 10);
    },
    handleDone(e) {
      this.$emit("EditingVal", e.target.innerText);
      this.editing = false;
    },
  },
};
</script>
