<template>
  <div class="layui-row">
    <!-- <div class="layui-col-xs12 layui-col-md8"> -->
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
      <legend>在线表单设计</legend>
    </fieldset>
    <form class="layui-form" action="" lay-filter="formTest">
      <div class="layui-form-item" v-for="(form,index) in formdesign" :key="index" :index="index">
        <!-- <div class="setting">
          <div class="layui-btn layui-btn-normal layui-btn-xs" v-on:click="layoutSet($event,index)"><i class="layui-icon">&#xe620;</i>设置</div>
        </div> -->
        <div v-for="(item,index2) in form.item" :key="index2" :index2="index2">
          <label class="layui-form-label">{{item.label}}</label>
          <div :class="[form.row === 1 ? 'layui-input-block' : 'layui-input-inline']">
            <div v-if="item.type === 'select'">
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
              <textarea :name="item.name" :placeholder="item.placeholder" class="layui-textarea"></textarea>
            </div>
            <div v-else-if="item.type === 'date'">
              <input type="text" :name="item.name" :lay-verify="item.verify" :placeholder="item.format" :format="item.format"
                :datetype="item.datetype" autocomplete="off" class="layui-input date">
            </div>
            <div v-else>
              <input :type="item.type" :name="item.name" :lay-verify="item.verify" :placeholder="item.placeholder"
                autocomplete="off" class="layui-input">
            </div>
            <!-- <div class="operation">
              <div class="layui-btn layui-btn-normal layui-btn-xs" v-on:click="inputSet($event,index)"><i class="layui-icon">&#xe642;</i>编辑</div>
              <div class="layui-btn layui-btn-danger layui-btn-xs" v-on:click="inputSet($event,index)"><i class="layui-icon">&#xe640;</i>删除</div>
            </div> -->
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
    <!-- </div>
    <div class="layui-col-xs6 layui-col-md4">
      <div style="padding: 20px; background-color: #F2F2F2;">
        <div class="layui-row layui-col-space15">
          <div class="layui-col-md12">
            <div class="layui-card">
              <blockquote class="layui-elem-quote layui-quote-nm">新增项目</blockquote>
              <div class="layui-card-header" v-on:click="inputSet">输入框</div>
              <div class="layui-card-header" v-on:click="inputSet">时间框</div>
              <div class="layui-card-header" v-on:click="inputSet">选项卡</div>
              <div class="layui-card-header" v-on:click="inputSet">复选框</div>
              <div class="layui-card-header" v-on:click="inputSet">开关</div>
              <div class="layui-card-header" v-on:click="inputSet">单选</div>
              <div class="layui-card-header" v-on:click="inputSet">备注</div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
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
  props: {
    seller: {
      type: Object
    }
  },
  data: () => {
    return {
      formdesign: []
    }
  },
  created () {
    let _this = this
    // ***获取表单
    $.ajax(ewoo.appConf.getMicsUrl('/flow/flowFrom/getOne') + '?_ukey=' + ewoo.appConf.getUserKey() + '&formId=' + this.$route
      .query.formId, {
      type: 'get',
      async: false,
      dataType: 'json',
      success: (results, textStatus, jqXHR) => {
        _this.formdesign = results.items
      }
    })
  },
  mounted () {
    layui.use(['form', 'layedit', 'laydate'], () => {
      var form = layui.form
      var laydate = layui.laydate
      form.on('submit(formDemo)', (data) => {
        // ***提交表单
        $.ajax(ewoo.appConf.getMicsUrl('/flow/flowFrom/submit') + '?_ukey=' + ewoo.appConf.getUserKey(), {
          type: 'post',
          data: data.field,
          async: false,
          dataType: 'json',
          success: (results, textStatus, jqXHR) => {
            layer.msg(JSON.stringify(results))
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
      // ***加载表单值
      $.ajax(ewoo.appConf.getMicsUrl('/flow/flowFrom/getValue') + '?_ukey=' + ewoo.appConf.getUserKey() + '&todoId=' + this.$route.query.todoId, {
        type: 'get',
        async: false,
        dataType: 'json',
        success: (results, textStatus, jqXHR) => {
          form.val('formTest', results.items)
        }
      })
      // form.render()
    })
  },
  methods: {
    inputSet: (event, index) => {
      // let _this = this
      layer.open({
        type: 2,
        title: $(event.target).text(),
        area: ['700px', '710px'],
        fixed: false, // 不固定
        maxmin: false,
        content: '#/inputSet?index=' + index,
        end: () => {
          // _this.formdesign = loadFromLocal(0, 'formdesign', [])
        }
      })
    },
    layoutSet: (event, index) => {
      // let _this = this
      layer.open({
        type: 2,
        title: $(event.target).text(),
        area: ['700px', '250px'],
        fixed: false, // 不固定
        maxmin: false,
        content: '#/layoutSet?index=' + index,
        end: () => {
          // _this.formdesign = loadFromLocal(0, 'formdesign', [])
        }
      })
    }
  }
}

</script>
<style lang="css">
  .layui-form-item .layui-input-inline,
  .layui-form-item .layui-input-block,
  .layui-form-item {
    position: relative;
  }

  .layui-form-item .operation {
    position: absolute;
    top: 0px;
    right: 0px;
    display: none;
  }

  .layui-form-item .layui-input-inline:hover .operation,
  .layui-form-item .layui-input-block:hover .operation {
    display: block;
  }

  .layui-form-item .setting {
    position: absolute;
    top: 0px;
    left: 25px;
    display: none;
    z-index: 1
  }

  .layui-form-item:hover .setting,
  .layui-form-item:hover .setting {
    display: block;
  }

</style>
