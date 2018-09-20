<template>
  <div class="layui-row">
    <div class="layui-col-xs12 layui-col-md8">
      <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
        <legend>表单集合演示</legend>
      </fieldset>
      <form class="layui-form" action="">
        <div class="layui-form-item">
          <label class="layui-form-label">输入框</label>
          <div class="layui-input-block">
            <input type="text" name="title" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码框</label>
          <div class="layui-input-inline">
            <input type="password" name="password" required lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
          </div>
          <div class="layui-form-mid layui-word-aux">辅助文字</div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">选择框</label>
          <div class="layui-input-block">
            <select name="city" lay-verify="required">
                <option value=""></option>
                <option value="0">北京</option>
                <option value="1">上海</option>
                <option value="2">广州</option>
                <option value="3">深圳</option>
                <option value="4">杭州</option>
              </select>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">复选框</label>
          <div class="layui-input-block">
            <input type="checkbox" name="like[write]" title="写作">
            <input type="checkbox" name="like[read]" title="阅读" checked>
            <input type="checkbox" name="like[dai]" title="发呆">
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">开关</label>
          <div class="layui-input-block">
            <input type="checkbox" name="switch" lay-skin="switch">
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">单选框</label>
          <div class="layui-input-block">
            <input type="radio" name="sex" value="男" title="男">
            <input type="radio" name="sex" value="女" title="女" checked>
          </div>
        </div>
        <div class="layui-form-item layui-form-text">
          <label class="layui-form-label">文本域</label>
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
    <div class="layui-col-xs6 layui-col-md4">
      <div style="padding: 20px; background-color: #F2F2F2;">
        <div class="layui-row layui-col-space15">
          <div class="layui-col-md12">
            <div class="layui-card">
              <div class="layui-card-header" v-on:click="greet">标题1</div>
              <div class="layui-card-header" v-on:click="greet">标题2</div>
              <div class="layui-card-header" v-on:click="greet">标题3</div>
              <div class="layui-card-header" v-on:click="greet">标题4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let layui = window.layui
let layer = layui.layer
let $ = layui.jquery
export default {
  name: 'Main',
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
  },
  methods: {
    greet: function (event) {
      layer.open({
        type: 2,
        title: $(event.target).text(),
        area: ['700px', '450px'],
        fixed: false, // 不固定
        maxmin: true,
        content: '/#/setting'
      })
    }
  }
}
</script>
