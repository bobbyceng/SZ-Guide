# 2026-10-22 · braces 补丁与反馈窗口复查

## P084：本次复查完成，修复仍待上游

- 当晚实读 [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)：受影响版本仍为 ≤3.0.3，Patched versions 为 None，公告最后更新于10/02。[上游 issue #70](https://github.com/micromatch/braces/issues/70) 仍为 Open；维护者10/05质疑该漏洞的适用前提，但这不等于已发布修复或公告撤销。
- `npm config get registry` 为 `https://registry.npmjs.org/`；`npm view braces version dist-tags time --json` 返回最新版本及 latest 标签均为3.0.3，发布时间2024-05-21。GitHub Releases为空，因此用npm正式发布信息确认可安装版本，不仅凭 Releases 页判断。
- `npm ls braces micromatch fast-glob @next/eslint-plugin-next eslint-config-next --all` 成功，当前链仍为 eslint-config-next@16.4.1 → @next/eslint-plugin-next@16.4.1 → fast-glob@3.3.1 → micromatch@4.0.8 → braces@3.0.3；与 package-lock.json 一致。
- 无已发布补丁，本轮不改 package／lock、不 force 升降级、不重跑构建及全套测试。10/15的生产扫描0项、全量5个high包项、13份运行追踪检查只是[历史证据](2026-10-15-security-release-check.md)，本次没有重跑 audit 或运行追踪，不将旧结果冒充今天的扫描，也不据此声称零风险。

## P077：反馈接收情况

- 当晚登录 Formspree，只读检查 Overview、Inbox、Spam。Overview仍为近30天3次提交，图表标注 Timezone: UTC；Inbox仍为10/12本地 SELF_TEST及10/10读者反馈，Spam仍为10/12正式 SELF_TEST及8月旧邀约。未发现10/13–19或10/20之后新提交。
- 两条 SELF_TEST继续排除；没有提交测试、导出个人信息、读取邮箱线程或改变套餐。

## P077：日期与PV已推进，严格分母仍未完成

- Vercel Analytics日期面板本次确认选中 `Local (Asia/Shanghai)`。通过界面填写 Start `Oct 13, 2026 12:00 AM`、End `Oct 19, 2026 11:59 PM`，Apply后标题为 `Oct 13 - 19`。只改临时查询条件，没有改账户时区设置。
- 页面生成的[查询链接](https://vercel.com/charliezengs-projects/szguide/analytics?from=1791820800&to=1792425540&tab=total)记录 `from=1791820800`、`to=1792425540`；结束参数落在北京时间10/19 23:59:00，尚未核实服务是否覆盖最后一分钟，因此不声称已经获得严格完整自然日分母。
- 选择 Page Views 后，等待页面卡片更新，再次导航同一查询确认：Production、主域及另外2个hostnames的合计为 **1,149 PV**；Visitors为792、Bounce Rate为80%，均为平台口径，未剔除本人／潜在自动访问，不报792位真实游客。不能与10/20的默认Last 7 Days窗口拼接为增长。
- 同窗口页面卡片明确标为 PAGE VIEWS：华强北274、香港到深圳198、APEC178、地铁79、DiDi53、首页48、香港机场到深圳48。这里只是卡片显示的前7行，不能相加当全部攻略PV。
- Hostnames切换尝试后仍显示原页面列表，未取得主域筛选结果；未取得完整攻略列表／汇总，未核最后一分钟的统计边界，也无反馈入口实际曝光数据。因此继续保留P077缺口，不计算反馈率或表单完成率，不据0新提交判断入口无效。下次从上述查询续接，先解决主域、完整攻略PV与边界，避免重读默认7天数据。

## 边界

- 仅本仓库 operations 留证，不改共享 memory／pending，不关闭 P084／P077。未改网站正文、外发、push、部署或定时任务；机场中转补缺仍保留10/20决策卡状态。
- 已关闭本轮创建的两个后台标签，保留用户原标签。本轮无代码或依赖变更，无需构建测试；仅检查记录内容和差异，不新增变更日志、知识规则或定时任务。
