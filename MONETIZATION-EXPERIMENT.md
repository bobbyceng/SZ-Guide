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

2026-10-11 回看：同一日期范围查看下方全部 SubID 的点击、订单、佣金，以及对应页面的访问和点击。首个完整观察区间采用 10-05–10-10，10-04 上线当天另列，因包含旧版本流量和自己的验收访问。没有订单时先检查是否有购买意向点击、Airalo／Kiwitaxi 是否在网站完成购买；不要把小样本零订单直接解释为产品失败。

收入到账有延迟，分别记录点击、订单、待确认佣金与 Paid。有真实收入后再把结果写进简历；当前只能描述搭建与追踪机制。未创建定时任务。

## 2026-10-04：高意向页面与酒店、接送扩展

GSC 2026-09-02–29 共 99 次点击，其中地铁 24、DiDi 22；先接已有读者的通信需求，不为 APEC 重写全站或承诺收入。

### 新增追踪入口

以下五条在同一项目 564243 的后台生成；原景点链接 `n4ZpJqIc` 保留。

| 位置 | SubID | 链接 | 目标 |
|---|---|---|---|
| DiDi 正文通信段 | szg_didi_saily | https://saily.tpm.li/A9kzybYc | Saily China eSIM |
| 地铁正文导航段 | szg_metro_saily | https://saily.tpm.li/100xGny5 | Saily China eSIM |
| 全站及分类酒店推荐卡 | szg_site_hotels | https://klook.tpm.li/SadvaPhz | Klook 深圳酒店搜索 |
| APEC 住宿正文区域表之后 | szg_apec_hotels | https://klook.tpm.li/W6wk18ZL | Klook 深圳酒店搜索 |
| 深圳机场正文预订接机段 | szg_airport_transfer | https://kiwitaxi.tpm.li/RLn5T82s | 深圳机场到深圳接送产品 |

`szg_site_hotels` 汇总不同推荐卡，不能单凭这个 SubID 分辨每篇来源。正文入口有单独 SubID，可结合页面分析；不在追踪参数写访客个人资料。

### 已核实的后台条件与库存边界

- [Klook 已有联盟计划](https://app.travelpayouts.com/programs/137/about?source=564243)无需重新申请。后台新闻显示酒店佣金临时提高到 **8%，适用至 2026-12-31 的合资格预订**，自动生效；总览 cookie 为 7–30 天，订单在客户完成预订使用后才 Paid。首次安装／重装 App、品牌 Kreator 优惠码、全额 Klook Credits 等有归因或计佣限制，不按「点击即收入」解释。
- [Klook 深圳酒店产品页](https://www.klook.com/en-MY/destination/c23301-shenzhen/3-hotel/)实际显示福田香格里拉、深圳温德姆至尊等。**未验证 APEC 日期房量或实时价**，不声称入住任意一家或保证附近有房。酒店卡不再用未经确认的 Booking 联盟状态承诺计佣；普通编辑内容中的平台比较保留。
- [Kiwitaxi 现有计划](https://app.travelpayouts.com/programs/1/about?source=564243)后台显示 9–11%、30 天 cookie，桌面／手机**网页**可计佣，App 不计佣；行程完成 14 天后 Paid，品牌营销优惠码订单有排除。未改账户设置、未接受新协议。
- 深圳机场到深圳的产品页有车型、价格与预订入口。正文定位为更贵的提前安排选项，提醒核对实际酒店、日期、等候、行李与取消条款，不保证司机或具体日期供给。
- Welcome Pickups 链接工具虽可用，本轮不新增入口；已有一个核实的接送渠道即可。Nomad、Booking 状态仍未确认。

### 内容与验收范围

- DiDi、地铁正文各一个 Saily 入口，披露佣金关系与未亲测；同时取消「漫游一定被防火墙挡住」和「WiFi 不能预约车」的过度概括，已有合适漫游的读者未必需要另买。
- 过关页及 APEC 中枢修正美国 30 天免签错误、停留起算与 ABTC 预先批准条件，补官方来源。APEC 住宿页修正涉外资质门槛说法及过期订房建议，更新相应事实台账。
- 内链核对发现通用住宿指南也有同一涉外资质错误，已一并修正并补台账，避免跳转后政策相互矛盾；区域推荐未重写。
- 本地生产构建通过；lint 0 错误、2 条原有首页图片警告（排除 T7 AppleDouble 附属文件）。检查 15 篇指南生成的酒店短链均有 sponsored 标记，4 个新增正文入口唯一、披露与更新日期正确；美国免签、停留起算、ABTC、酒店登记及过期日期的修正均在生成 HTML 中生效。
- 浏览器验收 APEC 酒店短链落在深圳酒店列表，带联盟 partner 766893；接送短链带 Travelpayouts 归因参数到达机场—深圳路线与车型报价页。接送供应商曾出现 ERR_CONNECTION_RESET，重试后正常，不把一次请求成功当作永久稳定性保证。正式部署验收结果在发布后追加。自己点击短链只属于验收，不算获客或收入。

网站功能提交 `a494147` 已推送至 main，Vercel success；部署记录：https://vercel.com/charliezengs-projects/szguide/D1u3Thguog9hNHpxSM3TQbxwLNuV 。正式网站 DiDi、地铁、APEC 住宿、深圳机场、香港过关及 APEC 中枢六页的 HTML 均通过新入口、sponsored、披露和对应事实修正检查；浏览器也确认 APEC 正文与推荐卡短链正常，Drive 附加了页面归因参数，原短链路径保留。

通用住宿指南的同类政策修正已通过后续生产构建与生成 HTML 检查，随本段验收记录一同提交发布。
