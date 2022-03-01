## 本项目基于vue-element-template

## 需求
在使用el-table时，表格高度自适应（不出现双滚动条，仅body有滚动条），滚动到表头的位置时自动吸附在顶部
## 实现方法/原理
1、通过监听滚动事件、获取表头的高度，位置，在特定的情况下修改el-table-header的style属性
2、由于考虑到使用keep-alive，所以每个表格组件都需要加一个唯一的class值，用于获取当前唯一的表格的dom
3、**因为项目使用了vue2.0版本，考虑到便捷性，采用了mixins混入方案，只测试vue2.0，不建议使用全局混入**

## 效果图 
在线预览地址：https://lsz579.github.io/element-table-sticky/
![在这里插入图片描述](https://img-blog.csdnimg.cn/17224287eec2440ea1c899d459aaaff1.gif#pic_center)
## 使用方法
1.设置滚动的节点
sticky-table.js文件

```bash
scrollClass:'.main-container',//设置滚动的body
```
layout内容滚动
```bash
.main-container {
  height: 100vh !important;
  overflow: auto;
  background-color: rgba(231, 231, 231, 0.575);
}
```
2.引入并注入sticky-table mixins,设置当前表格组件的父元素class，即parent
headerWidth是用于生成自定义表格滚动条的（固定在底部，详情看git上的例子）
```bash
import stacky from '@/utils/table-sticky'
export default{
 	mixins: [stacky],
 	data() {
	   return {
	     tableColumns: [],
	     tableData: [],
	     headerWidth: 0,
	     parent: 'self-table',
	   }
  },
}
```
3. 暴露出来的方法，可直接this.xx调用，大多数用于动态修改表头或者拖动的时候，需要更新表格样式

| 方法名  | 说明 |
|--|--|
| clearListener | 清空sticky监听事件，页面卸载等情况使用 |
| updateFixedRight | 更新右侧固定栏样式 |
| headerDragend | 拖拽改变表头宽度，更新表格宽度，或有表格改动时导致的样式错乱使用 |
| setScrollXWidth |用于更新tableWidth，headerWidth，制作虚拟滚动条|
|clearFixedStyle | 清除固定顶部的样式|


**当前只为了实现功能需求，由于时间仓促，并没有做太多的优化，后期有时间会进行一下性能上的优化**

文章不做太多的详述，完整例子已上传到gitHub,地址 https://github.com/LSZ579/element-table-sticky.git
，欢迎各位大佬提bug，和修改意见，如觉得有帮助，请给一个start

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-admin-template.git

# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```
