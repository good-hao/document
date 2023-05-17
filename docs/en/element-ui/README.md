# element-ui

## element-ui-admin与vxe-table集成开发

### 安装篇

安装命令

```
npm install xe-utils vxe-table@next vxe-table-plugin-element@next element-plus
```

在 main.js 里面增加

```
import VXETable from 'vxe-table'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
import 'font-awesome/scss/font-awesome.scss'
import 'xe-utils'
import 'vxe-table/lib/index.css'
```

font-awesome.scss 这个要装否则很多图标无法显示，安装方法

```
npm install less less-loader css-loader style-loader file-loader font-awesome --save
npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/vue-fontawesome
npm install --save @fortawesome/free-solid-svg-icons
```

### 应用篇

使用示例

```
<vxe-table
  height="600"
  :data="tableData"
  :edit-config="{trigger: 'click', mode: 'cell'}">
  <vxe-table-column type="selection" width="60"></vxe-table-column>
  <vxe-table-column type="index" width="60"></vxe-table-column>
  <vxe-table-column field="name" title="ElInput" min-width="140" :edit-render="{name: 'ElInput'}"></vxe-table-column>
  <vxe-table-column field="age" title="ElInputNumber" width="160" :edit-render="{name: 'ElInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
  <vxe-table-column field="sex" title="ElSelect" width="140" :edit-render="{name: 'ElSelect', options: sexList}"></vxe-table-column>
  <vxe-table-column field="region" title="ElCascader" width="200" :edit-render="{name: 'ElCascader', props: {options: regionList}}"></vxe-table-column>
  <vxe-table-column field="date" title="ElDatePicker" width="200" :edit-render="{name: 'ElDatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
  <vxe-table-column field="date1" title="DateTimePicker" width="220" :edit-render="{name: 'ElDatePicker', props: {type: 'datetime', format: 'yyyy-MM-dd HH:mm:ss'}}"></vxe-table-column>
  <vxe-table-column field="date2" title="ElTimeSelect" width="200" :edit-render="{name: 'ElTimeSelect', props: {pickerOptions: {start: '08:30', step: '00:15', end: '18:30'}}}"></vxe-table-column>
  <vxe-table-column field="rate" title="ElRate" width="200" :edit-render="{name: 'ElRate', type: 'visible'}"></vxe-table-column>
  <vxe-table-column field="flag" title="ElSwitch" width="100" :edit-render="{name: 'ElSwitch', type: 'visible'}"></vxe-table-column>
</vxe-table>
```

```
export default {
  data () {
    return {
      tableData: [
        {
          id: 100,
          name: 'test',
          age: 26,
          sex: '1',
          region: ['shenzhen'],
          date: null,
          date1: null,
          date2: null,
          rate: 2,
          flag: true
        }
      ],
      sexList: [
        {
          'label': '男',
          'value': '1'
        },
        {
          'label': '女',
          'value': '0'
        }
      ],
      regionList: [
        {
          'label': '深圳',
          'value': 'shenzhen'
        },
        {
          'label': '广州',
          'value': 'guangzhou'
        }
      ]
    }
  }
}
```

#### 解决 el-card 与 vxe-table同时使用，可能会出现双线问题。

```
<el-row>
          <el-col :span="24" class="tableTest">  
        <!--与 el-card 有冲突，会导致table右侧border线变为双线的问题可以使用如下方式解决-->
            <vxe-table
                border
                highlight-hover-row 
                show-overflow
                :align="allAlign"
                :data="tableData">
                <vxe-table-column type="id" width="60"></vxe-table-column>
                <vxe-table-column field="username" title="姓名"></vxe-table-column>
                <vxe-table-column field="nickName" title="昵称"></vxe-table-column>
                <vxe-table-column field="phone" title="手机"></vxe-table-column>
              </vxe-table>
          </el-col>
      </el-row>

<style scoped>
  .tableTest{
    margin: 0.5px;
  }
</style>

```

