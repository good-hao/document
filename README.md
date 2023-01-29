yarn install



在yarn.lock中找到 Browserslist 和 caniuse-lite 给删除掉（如果已删除，不用再次删除），然后 更新依赖包yarn upgrade caniuse-lite browserslist



搜索到项目中文件：\node_modules\stylus\lib\nodes\index.js ,代码最前面加入一下：

exports.lineno = null;
exports.column = null;
exports.filename = null;



yarn dev

yarn build







