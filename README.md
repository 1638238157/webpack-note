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

## 模块热替换（HMR）（需要在次巩固学习）
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
    ```js
        optimization:{
            splitChunks:{
                chunks: 'all'
            }   
        }
    ```
    3. 动态导入：通过模块中内联函数调用来分离代码。
        1. import() 语法。import()调用会在内部用到promises。旧版浏览器需要使用（es6-promise或promise-polyfill）进行兼容。
        2. webpack特定的 require.ensure。
- 预取、预加载模块（prefetch/preload module）*（还没有亲自尝试）

##### 小提示：在任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量。
##### 注意：避免在生产中使用 inline-xxx 和 eval-xxx，因为它们会增加bundle体积大小，并降低整体性能。

## 懒加载
> 小提示： 注意当调用ES6模块的import()方法（引入模块）时，必须指向模块的 .default 值，因为它才是promise被处理后返回的实际的module对象。

## 缓存
    浏览器会缓存资源，我们在部署新版本的时候，不更改资源文件名，浏览器可以能会认为它没有更新，就会使用缓存版本。
    通过配置webpack编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求新的文件。
### 输出文件的文件名（output filename）
设置 [contenthash] 将根据资源内容创建出唯一hash。当资源内容发生变化时，[contenthash]也会发生变化。
```js
output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
}
```
### 提取引导模板
将第三方库，提取到单独vendor chunk文件中，是比较推荐的做法，因为它们很少向本地的源代码那样频繁修改。
利用clien的长效缓存机制，命中缓存来消除请求，并减少向server获取资源，同时还能保证client代码和server代码版本一致。
通过使用 SplitChunksPlugin 插件的 cacheGroups 选项来实现。
```js
optimization:{
    runtimeChunk: 'single',
    splitChunks:{
        cacheGroups:{
            vendor:{
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all'
            }
        }
    }
}
```
### 模块标识符
每个module.id 会默认的基于解析顺序(resolve order)进行增量。当解析顺序发生变化，ID也会随之变化。- 
- 两个插件可以解决
    1. NameModulesPlugin 将使用模块的路径，而不是一个数字标识符（identifier）。可读性高，执行时间长。
    2. HashedModuleIdsPlugin 推荐用于生产环境构建
        ```js
            plugins:[
                new webpack.HashedModuleIdsPlugin
            ]
        ```
## 插件
[HtmlWebpackPlugin] 简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的webpack bundle非常有用。

[clean-webpack-plugin] 清理插件

[mini-css-extract-plugin] 用于将css从主应用程序中分离。

[bundle-loader] 用于分离代码和延迟加载生成的bundle。

[promise-loader] 类似于 bundle-loader，但是使用了promise API。