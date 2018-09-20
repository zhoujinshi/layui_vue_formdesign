<template>
  <div class="layui-row">
    <div class="layui-col-xs12 layui-col-md8">
      <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
        <legend>表单集合演示</legend>
      </fieldset>
      <form class="layui-form" action="" lay-filter="formTest">
        <div class="layui-form-item" v-for="form in formdesign" :key="form.id">
          <div v-for="item in form.item" :key="item.id">
            <label class="layui-form-label">{{item.label}}</label>
            <div :class="[form.row==1 ? 'layui-input-block' : 'layui-input-inline']">
              <div v-if="item.type === 'select'">
                <select :name="item.name" :lay-verify="item.verify">
                  <option value="">請選擇</option>
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
                <textarea :name="item.name" :placeholder="item.placeholder" class="layui-textarea"></textarea>
              </div>
              <div v-else-if="item.type === 'date'">
                <input type="text" name="date" lay-verify="date" :placeholder="item.format" :format="item.format"
                  :datetype="item.datetype" autocomplete="off" class="layui-input date">
              </div>
              <div v-else>
                <input :type="item.type" :name="item.name" :lay-verify="item.verify" :placeholder="item.placeholder"
                  autocomplete="off" class="layui-input">
              </div>
            </div>
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
              <blockquote class="layui-elem-quote layui-quote-nm">新增项目</blockquote>
              <div class="layui-card-header" v-on:click="greet">输入框</div>
              <div class="layui-card-header" v-on:click="greet">时间框</div>
              <div class="layui-card-header" v-on:click="greet">选项卡</div>
              <div class="layui-card-header" v-on:click="greet">复选框</div>
              <div class="layui-card-header" v-on:click="greet">开关</div>
              <div class="layui-card-header" v-on:click="greet">单选</div>
              <div class="layui-card-header" v-on:click="greet">备注</div>
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
  data: function () {
    return {
      formdesign: [{
        row: 1,
        item: [{
          label: '标题1',
          name: 'title',
          type: 'text',
          verify: 'required',
          placeholder: '请输入标题1'
        }]
      },
      {
        row: 2,
        item: [{
          label: '输入框',
          name: 'title',
          type: 'text',
          verify: 'required',
          placeholder: '请输入标题2'
        }, {
          label: '日期',
          name: 'date',
          type: 'date',
          verify: 'required',
          datetype: 'date',
          format: 'yyyy年MM月dd日'
        }]
      }, {
        row: 2,
        item: [{
          label: '选项卡',
          name: 'title',
          type: 'select',
          verify: 'required',
          placeholder: '请输入标题1',
          option: [{
            text: '長沙',
            value: '0'
          }, {
            text: '北京',
            value: '0'
          }, {
            text: '天津',
            value: '0'
          }, {
            text: '上海',
            value: '0'
          }, {
            text: '重慶',
            value: '0'
          }]
        }]
      }, {
        row: 1,
        item: [{
          label: '复选框',
          name: 'title',
          type: 'checkbox',
          verify: 'required',
          placeholder: '请输入标题1',
          option: [{
            text: '長沙',
            name: 'checkbox1'
          }, {
            text: '北京',
            name: 'checkbox2'
          }, {
            text: '天津',
            name: 'checkbox3'
          }, {
            text: '上海',
            name: 'checkbox4'
          }, {
            text: '重慶',
            name: 'checkbox5'
          }]
        }]
      }, {
        row: 2,
        item: [{
          label: '时分',
          name: 'date1',
          type: 'date',
          verify: 'required',
          datetype: 'time',
          format: '北京时间：HH点mm分'
        }]
      }, {
        row: 2,
        item: [{
          label: '月份',
          name: 'date2',
          type: 'date',
          verify: 'required',
          datetype: 'month',
          format: 'yyyy年M月'
        }]
      }, {
        row: 1,
        item: [{
          label: '开关',
          name: 'switch',
          type: 'switch',
          verify: 'required',
          placeholder: '请输入标题3'
        }]
      }, {
        row: 1,
        item: [{
          label: '单选',
          name: 'sex',
          type: 'radio',
          verify: 'required',
          placeholder: '请输入标题1',
          option: [{
            text: '男',
            value: '1'
          }, {
            text: '女',
            value: '2'
          }, {
            text: '保密',
            value: '3'
          }]
        }]
      }, {
        row: 1,
        item: [{
          label: '备注',
          name: 'desc',
          type: 'textarea',
          verify: 'required',
          placeholder: '请输入标题3'
        }]
      }
      ]
    }
  },
  mounted () {
    layui.use(['form', 'layedit', 'laydate'], function () {
      var form = layui.form
      var laydate = layui.laydate
      // 监听提交
      form.on('submit(formDemo)', function (data) {
        layer.msg(JSON.stringify(data.field))
        return false
      })
      form.render()
      window.lay('.date').each(function () {
        laydate.render({
          elem: this,
          trigger: 'click',
          format: $(this).attr('format'),
          type: $(this).attr('datetype')
        })
      })
      form.val('formTest', {
        'title': '唯一',
        'sex': '2',
        'checkbox1': true,
        'checkbox4': true,
        'switch': true,
        'desc': '我爱jinge'
      })
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
