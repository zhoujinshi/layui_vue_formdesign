<template>
  <div class="layui-row">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
      <legend>布局设置</legend>
    </fieldset>
    <form class="layui-form" action="" lay-filter="formTest">
      <div class="layui-form-item">
        <label class="layui-form-label">布局几栏</label>
        <div class="layui-input-block">
          <select name="row" lay-verify="required">
            <option value="1">一栏</option>
            <option value="2">二栏</option>
          </select>
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
import {
  saveToLocal,
  loadFromLocal
} from '@/common/js/localStore'
let layui = window.layui
export default {
  name: 'Setting',
  data () {
    return {
      index: 0,
      formdesign: {}
    }
  },
  created () {
    let _formdesign = loadFromLocal(0, 'formdesign', false)
    if (_formdesign !== false) {
      this.formdesign = _formdesign[this.$route.query.index]
    }
    this.index = parent.layer.getFrameIndex(window.name)
  },
  mounted () {
    let _this = this
    layui.use('form', function () {
      var form = layui.form
      // 监听提交
      form.on('submit(formDemo)', function (data) {
        _this.formdesign.row = parseInt(data.field.row)
        let _formdesign = loadFromLocal(0, 'formdesign', false)
        _formdesign[_this.$route.query.index] = _this.formdesign
        saveToLocal(0, 'formdesign', _formdesign)
        parent.layer.close(_this.index)
        return false
      })
      form.render()

      form.val('formTest', {
        'row': _this.formdesign.row
      })
    })
  }
}

</script>
