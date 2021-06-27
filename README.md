## npx
Node 8.2/npm 5.2.0 以上版本提供**npx**命令，可以运行在开始安装webpack package中的二进制文件(即 ./node_modules/.bin/webpack)

Bundle: 由许多不同的模块生成，包含已经经过加载和编译过程的源文件的最终版本。

npx webpack --config [ 文件名 ]
    --config 选项可以传递任何名称的配置文件。需要拆分成多个文件复杂配置是非常有用的

> 处理css， style-loader 和 css-loader 结合使用

## webpack 自动编辑代码
1. webpack watch mode（webpack 观察模式）
    - package.json scripts 添加 "watch": "webpack --watch"
    - 缺点：看到修改后的实际效果，你需要刷新浏览器。

2. webpack-dev-server
    - 提供一个简单的web server，并且具有live reloading（实时重新加载）功能。
    - 需要下载 npm install --save-dev webpack-dev-server
    - package.json scripts 添加 "start": "webpack-dev-server --open"
> webpack-dev-server 在编译之后不会写入到任何输入文件。而是将bundle文件保留在内存中，然后将serve到server中，就好像它们是挂载到server跟路径上的真是文件一样。如果你的页面希望在其他不同路径中找到bundle文件，则可以通过dev server配置中的publicPath选项进行修改。

3. webpack-dev-middleware
    - 是一个封装器（wrapper），它可以把webpack处理过的文件发送到一个server。webpack-dev-server在内部使用了它，然而它可以作为一个单独的package来使用，以便需求进行更多自定义设置。下面是一个webapck-dev-middleware配合express server的实例。
    - 需要自己写一个server

## 模块热替换（HMR）
    HMR（hot module replacement）它允许在运行时更新所有类型的模块，而[无需完全刷新]

## tree shaking
用于描述移除JavaScript上下文中的未引用代码（dead-code）。它依赖于ES2015模块语法的[静态结构]特性，例如 import 和 export。
- 通过package.json 的 "sideEffects" 属性作为标记，向compiler提供提示，表明项目中那些文件是“pure（纯的ES2015模块）”，由此可以安全的删除文件中未使用的部分。

## 生产环境
[webpack-merge] 链接数组和合并对象创建新对象的函数。如果遇到函数，它将执行它们，通过算法运行结果，然后再次将返回值包装在函数中。
> 限制：不支持promise

## 代码分离
- 常用的代码分离方法有三种：
    1. 入口起点：使用entry配置手动的分离代码。
        - 缺点：
            1. 如果入口chunk之间包含一些重复的模块，那些重复模块会被引入到各个bundle中。
            2. 这种方法不够灵活，并且不能动态的将核心应用程序逻辑中的代码拆分出来。
        - 防止重复
            使用SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的 entry chunk 中，或者提取到一个新生成的 chunk
    2. 防止重复：使用SplitChunksPlugin去重和分离chunk。
    3. 动态导入：通过模块中内联函数调用来分离代码。

##### 小提示：在任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量。
##### 注意：避免在生产中使用 inline-xxx 和 eval-xxx，因为它们会增加bundle体积大小，并降低整体性能。

## 插件
[HtmlWebpackPlugin] 简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的webpack bundle非常有用。

[clean-webpack-plugin] 清理插件