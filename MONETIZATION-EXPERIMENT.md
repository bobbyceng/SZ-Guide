# 2026-10-04 联盟变现验收与首轮调整

目标：先让已有读者的通信需求有可计佣入口，再观察点击与订单。与 APEC SEO 实验分开记录；不以曝光或测试点击代替收入。

## 后台核实

Travelpayouts，项目 Shenzhen-guide（564243），partner 766893。以下为 2026-10-04 登录后台所见，不代表未来条款不变。

- Klook 已有追踪链接：2026-09-01–30 报告为 13 次点击、0 订单、$0 佣金；2026-10-01–04 为 1 次点击、0 订单、$0。点击可能包含自己的测试。
- Saily 和 Airalo 已可使用链接工具；没有再次申请。Nomad、Booking 的审核状态未确认，保持普通链接。
- Saily：15%，30 天 cookie，仅每位客户第一笔订单计佣；未取消的订单购买后 40 天进入 Paid。
- Airalo：12%，30 天 cookie；网站购买可计佣，App 购买不计佣；未取消订单在次月 8 日前进入 Paid。
- Drive 的后台界面读数为 Content analytics 开启、Switch Links 关闭；但正式网站旧页面的 Saily、Airalo 普通链接实际被改写为带 `product_type=linkswitcher` 的联盟跳转。后台读数与线上行为不一致，原因未确认，不能据此断言旧链接不计佣。本轮没有修改这些开关，使用明确生成的短链与 SubID，并核对线上实际链接。
- 收款方式尚未设置。本轮不录入财务资料，也不下测试订单。

## 上线前基线

Content analytics 时间范围为 2026-09-04–10-04：372 次访问、294 次独立访问、5 次追踪点击、0 订单、$0。仅覆盖使用 Travelpayouts 工具的页面，不是全站流量；不能与九月 Klook 报告混为同一口径。

| 页面 | 访问 | 独立访问 | 追踪点击 | 订单 |
|---|---:|---:|---:|---:|
| hong-kong-to-shenzhen | 271 | 229 | 1 | 0 |
| alipay-wechat-pay-setup | 60 | 47 | 2 | 0 |
| 3-day-shenzhen-itinerary | 36 | 27 | 1 | 0 |
| where-to-stay-apec-2026-shenzhen | 5 | 5 | 1 | 0 |

因此先接过关页的通信需求。住宿页样本只有 5 次独立访问，不能凭 20% 点击率认定它更有效。

## 追踪链接

下列四条链接均在 Travelpayouts 项目 564243 的工具中生成。

| 使用位置 | 品牌 | SubID | 追踪链接 | 目标 |
|---|---|---|---|---|
| eSIM 文章正文 | Saily | szg_esim_saily | https://saily.tpm.li/eMiZnQ4q | https://saily.com/esim-china/ |
| eSIM 文章正文 | Airalo | szg_esim_airalo | https://airalo.tpm.li/9zsbHEcd | https://www.airalo.com/china-esim |
| 全站推荐卡、过关推荐与正文 | Saily | szg_site_saily | https://saily.tpm.li/aOtfZGhF | https://saily.com/esim-china/ |
| 支付指南推荐 | Airalo | szg_payment_airalo | https://airalo.tpm.li/DnYqRNx8 | https://www.airalo.com/china-esim |

`szg_site_saily` 合并多个位置，不能用它区分每一张卡或页面；结合 Content analytics 页面报告判断。原 Klook 链接不变。

## 本轮改动与验收

- eSIM 文章接入两家追踪链接与明确披露，修正官网当前价格、有效期及网页购买流程。保留 Nomad 的原有推荐位置和未亲测说明，不按佣金改写排名。
- 过关指南已有通信段落加一个 Saily China 入口，提示兼容性、提前安装以及香港覆盖区别。
- 使用现有推荐组件接入 Saily；支付页 Airalo 入口接追踪。短链在正文中标记 `rel="sponsored noopener noreferrer"`。
- 两个文章链接已在浏览器验证跳转至对应中国套餐页并带联盟参数。这些是自己的验收点击，不是新增获客或订单。
- 本地生产构建通过；排除移动硬盘的 AppleDouble `._*` 附属文件后 lint 为 0 错误、2 条原有首页图片警告。已检查 eSIM、过关、支付三页生成的购买链接与 sponsored 属性，并在浏览器确认 eSIM、过关两页披露和入口。
- 上线日期：2026-10-04。网站提交 `d9aa445` 已推送至 GitHub main；Vercel 状态为 success（Deployment has completed），部署记录：https://vercel.com/charliezengs-projects/szguide/3NLg8eY1RyT9dcnSpN4n4sG8rxcN 。
- 正式网站 eSIM、过关、支付三页的 HTML 已核对：四个预期短链、sponsored 属性与披露正确；浏览器也确认 eSIM 更新和短链已生效。Drive 给短链附加页面与行程参数，原短链路径保留。本轮验收没有购买或产生真实订单。

## 回看方式

2026-10-11 回看：同一日期范围查看四个 SubID 的点击、订单、佣金，以及过关页的访问和点击。首个完整观察区间采用 10-05–10-10，10-04 上线当天另列，因包含旧版本流量和自己的验收访问。没有订单时先检查是否有购买意向点击、Airalo 是否在网站完成购买；不要把小样本零订单直接解释为产品失败。

收入到账有延迟，分别记录点击、订单、待确认佣金与 Paid。有真实收入后再把结果写进简历；当前只能描述搭建与追踪机制。未创建定时任务。
