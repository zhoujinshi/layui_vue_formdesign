<template>
  <div class="layui-row">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
      <legend>{{title}}</legend>
    </fieldset>
    <form class="layui-form" action="" lay-filter="form1">
      <div class="layui-form-item" v-for="(form,index) in formDesign" :key="index" :index="index">
        <div v-for="(item,index2) in form.item" :key="index2" :index2="index2">
          <label class="layui-form-label">{{item.label}}</label>
          <div :class="[form.row === 1 ? 'layui-input-block' : 'layui-input-inline']">
            <div v-if="item.type === 'hidden' || (!edit && item.type !== 'approve' && item.type !== 'archive')">
              <div class="layui-form-mid"><span>{{item.value}}</span><input type="hidden" :name="item.name" :value="item.value" class="input-hidden"></div>
            </div>
            <div v-else-if="item.type === 'select'">
              <select :name="item.name" :lay-verify="item.verify">
                <option value="">请选择</option>
                <option :value="option.value" v-for="option in item.option" :key="option.id">{{option.text}}</option>
              </select>
            </div>
            <div v-else-if="item.type === 'checkbox'">
              <input v-for="option in item.option" :key="option.id" type="checkbox" :name="option.name" :title="option.text">
            </div>
            <div v-else-if="item.type === 'switch'">
              <input type="checkbox" :name="item.name" lay-skin="switch">
            </div>
            <div v-else-if="item.type === 'radio'">
              <input v-for="option in item.option" :key="option.id" type="radio" :name="item.name" :value="option.value"
                :title="option.text" checked>
            </div>
            <div v-else-if="item.type === 'textarea'">
              <textarea :name="item.name" :placeholder="item.placeholder" :lay-verify="item.verify" class="layui-textarea"></textarea>
            </div>
            <div v-else-if="item.type === 'date'">
              <input type="text" :name="item.name" :lay-verify="item.verify" :placeholder="item.format" :format="item.format"
                :datetype="item.datetype" autocomplete="off" class="layui-input date">
            </div>
            <div v-else-if="item.type === 'approve' && !item.read">
              <div class="layui-input-block" style="margin-left:0px;">
                <input type="radio" :name="item.name" value="agree" title="同意">
                <input type="radio" :name="item.name" value="reject" title="拒绝">
              </div>
              <div class="layui-input-block" style="margin-left:0px;">
                <textarea :name="item.name+'_note'" placeholder="请输入审批意见" class="layui-textarea"></textarea>
              </div>
              <div class="layui-input-block" style="margin-left:0px;">
                <select lay-filter="remarks">
                  <option value="">经常批语</option>
                  <option value="小伙子不错">小伙子不错</option>
                </select>
              </div>
            </div>
            <div v-else-if="item.type === 'approve' && item.read">
              <div class="layui-input-block" style="margin-left:0px;">
                <div class="layui-form-mid"><span>{{item.value}}</span><input type="hidden" :name="item.name" class="input-hidden"></div>
              </div>
              <div class="layui-input-block" style="margin-left:0px;">
                <div class="layui-form-mid"><span>{{item.value}}</span><input type="hidden" :name="item.name+'_note'" class="input-hidden"></div>
              </div>
            </div>
            <div v-else-if="item.type === 'archive' && !item.read">
              <div class="layui-input-block" style="margin-left:0px;">
                <input type="radio" :name="item.name" value="archive" title="归档">
              </div>
              <div class="layui-input-block" style="margin-left:0px;">
                <textarea :name="item.name+'_note'" placeholder="请输入归档备注" class="layui-textarea"></textarea>
              </div>
            </div>
            <div v-else-if="item.type === 'archive' && item.read">
              <div class="layui-input-block" style="margin-left:0px;">
                <div class="layui-form-mid"><span>{{item.value}}</span><input type="hidden" :name="item.name" class="input-hidden"></div>
              </div>
              <div class="layui-input-block" style="margin-left:0px;">
                <div class="layui-form-mid"><span>{{item.value}}</span><input type="hidden" :name="item.name+'_note'" class="input-hidden"></div>
              </div>
            </div>
            <div v-else>
              <input :type="item.type" :name="item.name" :lay-verify="item.verify" :placeholder="item.placeholder" autocomplete="off" class="layui-input">
            </div>
          </div>
        </div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="button" v-if="edit">立即提交</button>
          <button class="layui-btn" lay-submit lay-filter="button" v-if="!edit">保存</button>
          <button type="reset" class="layui-btn layui-btn-primary" v-if="edit">重置</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
// import {
//   saveToLocal,
//   loadFromLocal
// } from '@/common/js/localStore'
let layui = window.layui
let layer = layui.layer
let $ = layui.jquery
let ewoo = window.ewoo
export default {
  name: 'Main',
  data: () => {
    return {
      title: '在线表单',
      edit: false,
      formDesign: [],
      formValue: {}
    }
  },
  created () {
    let _this = this
    _this.title = this.$route.query.title
    if (typeof _this.$route.query.edit !== 'undefined') {
      this.edit = true
    }

    let index = layer.load(1, {
      shade: [0.1, '#fff'] // 0.1透明度的白色背景
    })

    // ***获取表单
    let postValue = {}
    postValue._ukey = ewoo.appConf.getUserKey()
    postValue.formId = _this.$route.query.formId
    if (typeof _this.$route.query.valueId !== 'undefined') {
      postValue.valueId = _this.$route.query.valueId
    }
    setTimeout(function () {
      $.ajax(ewoo.appConf.getMicsUrl('/flow/flowWork/getForm'), {
        type: 'post',
        data: postValue,
        timeout: 1500,
        dataType: 'json',
        success: (results, textStatus, jqXHR) => {
          if (
            typeof results.data === 'undefined' ||
          typeof results.data.formJson === 'undefined'
          ) {
            layer.msg('配置错误，请联系管理员')
          } else {
            _this.formDesign = results.data.formJson
            _this.formValue = results.data.findOne
          }

          setTimeout(function () {
            layui.use(['form', 'layedit', 'laydate'], () => {
              var form = layui.form
              var laydate = layui.laydate

              // ***提交表单
              form.on('submit(button)', data => {
                data.field._ukey = ewoo.appConf.getUserKey()
                data.field.code = _this.$route.query.formId
                if (_this.$route.query.valueId !== 'undefined') {
                  data.field.id = _this.$route.query.valueId
                }
                $.ajax(ewoo.appConf.getMicsUrl('/flow/flowWork/submit'), {
                  type: 'post',
                  data: data.field,
                  async: false,
                  dataType: 'json',
                  success: (results, textStatus, jqXHR) => {
                    ewoo.popWin.close(true)
                  }
                })
                return false
              })

              window.lay('.date').each(function () {
                laydate.render({
                  elem: this,
                  trigger: 'click',
                  format: $(this).attr('format'),
                  type: $(this).attr('datetype')
                })
              })

              form.on('select(remarks)', function (data) {
                $(data.elem)
                  .parent()
                  .prev()
                  .find('textarea')
                  .val(data.value)
              })

              form.val('form1', _this.formValue)

              window.lay('.input-hidden').each(function () {
                let text = $(this).val()
                if (text === 'agree') text = '已同意'
                if (text === 'reject') text = '已拒绝'
                if (text === 'archive') text = '已归档'
                $(this).prev().text(text)
              })

              form.render()

              layer.close(index)
            })
          }, 5)
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
          layer.msg('微服加载失败，请重试')
        }
      })
    }, 0)
  },
  mounted () {
  },
  methods: {}
}
</script>
