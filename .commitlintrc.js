const types = [
  // 影响构建系统或外部依赖项的更改(e.g: `gulp`, `broccoli`, `npm`)
  'build',
  // 对我们的 CI 配置文件和脚本的更改(e.g: `Travis`, `Circle`, `BrowserStack`, `SauceLabs`)
  'ci',
  // 仅文档更改
  'docs',
  // 新功能
  'feat',
  // 错误修复
  'fix',
  // 代码更改可提高性能
  'perf',
  // 重构，既不修正错误也不增加功能的代码更改
  'refactor',
  // 还原先前的提交
  'revert',
  // 不会影响代码含义的更改(空格，格式，缺少分号等)
  'style',
  // 添加缺失的测试或更正现有的测试
  'test',
  // 其他不会影响 `src`或 测试文件的更改
  'chore',
];
module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [2, 'always', types],
  },
};
