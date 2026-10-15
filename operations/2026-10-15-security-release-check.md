# 2026-10-15 · 发布前依赖修复与检查

## 授权与发现

用户明确要求检查错误及安全问题，检查后上线。原定两篇APEC交通更新的发布检查发现生产依赖10项已知告警（1 critical、6 high、3 moderate），因此先修复，不将构建通过视为安全结论。扫描结果表示命中已知依赖公告，不表示网站已经被攻击。

## 修复

- Next.js 16.2.6 → 16.4.1，eslint-config-next同步16.4.1；image-size → 2.0.4，更新锁文件内可兼容修复的传递依赖。不运行`npm audit fix --force`降级框架检查工具。
- 旧gray-matter默认引入js-yaml 3.x／argparse／sprintf-js且无合适的非破坏修复。替换为yaml 2.9.1读取仓库内YAML元数据，保留Markdown正文；不启用可执行JavaScript元数据引擎，禁止YAML别名展开，缺少或无效头部显式报错。
- 新增`npm run test:content`：检查元数据类型、正文分隔符、BOM/CRLF、错误YAML／重复键／非映射拒绝、别名拒绝和全部实际攻略。另以替换前的解析结果逐一比对16篇攻略，所有元数据及正文字节内容一致；临时基线不作为网站用户数据存储。

## 检查结果与边界

- 修复后`npm audit --omit=dev`：0项已知漏洞（info/low/moderate/high/critical均为0）。`npm run lint`、构建和TypeScript通过，5项解析测试通过。
- 全量npm audit仍报5个high包项，来自同一条开发依赖链：eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces。[上游公告GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)标明braces≤3.0.3无修复版，触发为攻击者提供深度嵌套的glob表达式。本项目仅在本地／构建代码检查中处理仓库文件，不接收访客glob。13个Next运行产物追踪文件均未包含这些依赖；保留风险记录，不把全量告警改写成零，也不删除检查工具掩盖告警。
- 全站20页、16指南、873内链、255锚点、23图片URL、20站点地图URL通过。4处Nomad原追踪链接、披露、sponsored及新窗口安全属性通过。
- 当前新增文件及正文未发现密钥模式、可执行script、javascript:或onerror。只检查本次变更，不据此声称整个代码库完全安全。
- GSC安全问题页面当时显示“未检测到任何问题”，与依赖扫描分开记录，不当作完整渗透测试。
- 升级后浏览器桌面1710px／手机390px页面无横向溢出，APEC公告可读；点击匿名反馈选择后表单正常展开，未提交。localhost资源检查发现Vercel Analytics路径404和Travelpayouts远端配置403，正式站需区分复核，不将本地第三方统计失败当作页面正文失败。正式发布结果随后补入交通更新记录。未发送新Formspree测试、未做用户真实支付，不改套餐或账户权限。

## 后续复用

发布检查分别记录生产依赖、开发工具、构建／页面行为和外部平台状态。修复可用的依赖问题，明确未修复项是否进入线上运行链；不要为清空扫描结果盲目force降级、关闭工具或声称“绝对安全”。下一次依赖维护复查braces上游修复版；本条不创建后台监控或承诺自动提醒。
