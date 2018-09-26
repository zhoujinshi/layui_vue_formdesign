<template>
  <div class="layui-row">
      <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
        <legend>输入框设计</legend>
      </fieldset>
    <form class="layui-form" action="">
      <div class="layui-form-item">
        <label class="layui-form-label">显示名称</label>
        <div class="layui-input-block">
          <input type="text" name="title" required lay-verify="required" placeholder="请输入显示名称" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">字段名</label>
        <div class="layui-input-block">
          <input type="text" name="title" required lay-verify="required" placeholder="请输入字段名" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">提示文本</label>
        <div class="layui-input-block">
          <input type="text" name="title" required lay-verify="required" placeholder="请输入提示文本" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">输入框类型</label>
        <div class="layui-input-block">
          <select name="city" lay-verify="required">
            <option value=""></option>
            <option value="0">文本框</option>
            <option value="1">时间框</option>
            <option value="2">选项卡</option>
            <option value="3">复选框</option>
            <option value="4">开关</option>
            <option value="4">单选</option>
            <option value="4">备注</option>
          </select>
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">时间类型</label>
        <div class="layui-input-block">
          <select name="city" lay-verify="required">
            <option value=""></option>
            <option value="year">年选择器|yyyy年</option>
            <option value="month">年月选择器|yyyy年M月</option>
            <option value="date">日期选择器|yyyy年MM月dd日</option>
            <option value="time">时间选择器|HH点mm分</option>
            <option value="datetime">日期时间选择器|yyyy年MM月dd日 HH时mm分</option>
          </select>
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">权限</label>
        <div class="layui-input-block">
          <input type="radio" name="sex" value="0" title="审核人填写">
          <input type="radio" name="sex" value="1" title="填表人填写" checked>
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">参数</label>
        <div class="layui-input-block">
          <input type="checkbox" name="read" title="只读">
          <input type="checkbox" name="write" title="必填">
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">开关</label>
        <div class="layui-input-block">
          <input type="checkbox" name="switch" lay-skin="switch">
        </div>
      </div>
      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">说明</label>
        <div class="layui-input-block">
          <textarea name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>
        </div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
let layui = window.layui
let layer = layui.layer
export default {
  name: 'Setting',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    layui.use('form', function () {
      var form = layui.form
      // 监听提交
      form.on('submit(formDemo)', function (data) {
        layer.msg(JSON.stringify(data.field))
        return false
      })
      form.render()
    })
    layer.msg(this.$route.query.json)
  }
}

</script>
