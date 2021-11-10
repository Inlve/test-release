/**
 * 语义化发布 配置选项
 * @see https://semantic-release.gitbook.io/semantic-release/usage/configuration#configuration
 */
module.exports = {
  branches: ['master', 'next'],
  plugins: [
    /**
     * @see https://semantic-release.gitbook.io/semantic-release/usage/plugins#default-plugins
     * 插件 @semantic-release/commit-analyzer @semantic-release/release-notes-generator @semantic-release/npm @semantic-release/github
     * 默认已提供
     */
    /** 用于提取分析提交消息 */
    [
      '@semantic-release/commit-analyzer',
      {
        // 使用 `angular` 的预设
        preset: 'angular',
        /**
         * 类型是 `docs`, scope是 `README` 的提交将与 `patch` 发布相关联
         * 类型是 `refactor` 的提交将与 `patch` 发布相关联
         * 类型是 `style` 的提交将与 `patch` 发布相关联
         */
        releaseRules: [
          { type: 'docs', scope: 'README', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'style', release: 'patch' },
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
        },
      },
    ],
    /** 生成发布日志 */
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'angular',
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
        },
        writerOpts: {
          commitsSort: ['subject', 'scope'],
        },
      },
    ],
    /** 输出更改日志 */
    [
      '@semantic-release/changelog',
      {
        // 更改日志的输出文件
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/git',
      {
        // 提交更改的文件
        assets: ['package.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/github',
      {
        // 要发布的文件
        assets: 'dist/**',
      },
    ],
  ],
};
