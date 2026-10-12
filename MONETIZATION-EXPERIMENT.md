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


## 2026-10-11：首轮回看（后台只读）

本次从本人已登录 Chrome 读取 GSC 与 Travelpayouts；只调整报表筛选并运行一次 GSC 实际网址测试，未请求编入索引、修改账户/收款方式、发邮件、下单或部署。数据截至日期不同，不能混成同一漏斗。

### GSC 网络搜索：2026-09-09–10-06

131 点击、9,302 曝光、CTR 1.4%、平均排名 8.7；界面显示上次更新 52 小时前。三个月报告为 204 点击、约 1.9 万曝光、CTR 1.1%、平均排名 13.6（2026-07-07–10-06）。用户第一张截图是多模态搜索的 0 点击/7 曝光，不能当网络搜索或全站总量。当前报告还不能衡量 10-09 视觉改版。

| 文章 | 点击 | 曝光 |
|---|---:|---:|
| huaqiangbei-electronics-guide | 40 | 2353 |
| shenzhen-metro-guide | 34 | 1810 |
| didi-shenzhen-guide | 20 | 2294 |
| alipay-wechat-pay-setup | 13 | 1088 |
| where-to-stay-apec-2026-shenzhen | 10 | 158 |
| shopping-in-shenzhen | 5 | 96 |
| hong-kong-to-shenzhen | 4 | 566 |
| shenzhen-airport-to-city | 1 | 305 |
| best-esim-for-shenzhen | 1 | 294 |
| hong-kong-airport-to-shenzhen | 1 | 261 |

华强北与地铁合计 74/131，约 56.5%。查询表只显示部分查询，不能把可见关键词点击相加当全部流量。

### Travelpayouts Performance：2026-10-05–10-10

All programs 报告总计 15 点击；Pending/Canceled/Confirmed 均 0，Earnings/Potential earnings 均 $0。Airalo 8、Klook 5、Saily 2；后台标注排除 bot，不等于排除了自己的验收点击。10-09 有上线验收，无法逐条区分自测与访客。后台仍显示需要设置收款方式的提示，本轮未填财务资料。

| SubID | 点击 |
|---|---:|
| szg_payment_airalo | 8 |
| szg_site_hotels | 4 |
| szg_esim_saily | 1 |
| szg_site_saily | 1 |
| site | 1 |

其他实验 SubID 未出现有点击行；不能把一个短区间的小样本零订单解释为产品失败。

Content analytics 同区间只列 2 页，总计 23 Visits / 18 Unique visits / 3 Clicks / 0 Bookings：240 小时过境页 14/13/2，eSIM 页 9/6/1。总独立访问与逐页独立访问不可直接相加；它仅覆盖工具报告到的页面，与 Performance 的 15 点击不一致，原因未核实（本报告页可选品牌只列 Saily/Klook）。不可拿 GSC 的 131 搜索点击、Content analytics 的 18 独立访问和 Performance 的 15 点击直接计算全站转化率。

### 收录核实与当前可用性

- 索引总览更新到 10-04：14 已收录、6 未收录。已抓取未收录是 APEC 总指南及通用住宿；已发现未收录是 240 小时过境；404 是 `/jp/`，没有据此新增日语站或盲目重定向。
- 10-11 网址检查：APEC 总指南仍未收录，Google 显示上次抓取 09-15 15:50:04。实际网址测试 10-11 09:03（界面时间）通过，显示可抓取、可编入索引；不等于已收录，也不证明所有内容事实准确。
- 通用住宿网址检查仍为已抓取未收录，上次抓取 06-11，允许抓取/索引，声明与 Google 选择 canonical 均为自身；显示站点地图临时处理错误。240 小时页单独检查却显示 Google 无法识别网址，与 10-04 汇总分类有差异，保留原读数，不强行统一。
- 三页正式 HTML 均 HTTP 200、自指 canonical、未见 HTML robots noindex；正式 sitemap.xml HTTP 200，含 19 个 URL，包含这三页，APEC lastmod 10-09、住宿 10-04、240 小时 09-23。未检查历史爬虫抓取环境或全量响应头。

### 下一步判断（尚未实施）

1. APEC 前先检查上述重要未收录页面的内容区分与内链、站点地图后台状态；当前 APEC 无已发现的实时抓取障碍，可在确认页面后请求重新索引，不保证收录。
2. 华强北/地铁是已有流量资产，后续优先按具体查询意图优化；APEC 住宿已获 10 点击，适合维护实际出行决策内容，不能因单条查询或平均排名就盲改标题。
3. 支付页 Airalo 有 8 次记录点击，可先检查推荐与购买路径匹配；无需仅凭零单增加联盟入口或更换供应商。
4. 机场下降提醒须比较同一口径的查询/排名/日期，当前不判定技术故障。全站流量来源还可用 Vercel Analytics 补充，本轮未读取。


## 2026-10-11：按首轮数据实施的改动

- 维护已有流量资产：华强北标题／描述聚焦市场与首次到访，补第一站决策表；地铁标题／卡片聚焦卡、票价与路线。URL 与原发表日不改；修改日显示具体到日。
- 官方纠错：240 小时过境入境／出境口岸分开、允许区域与路线条件明确；新皇岗 10/12 06:30 计划开放及旅检切换，首页增加入口；地铁 9/10 全闸机外卡升级同步到机场、香港机场和行程页。各事实台账记录来源与本次复核边界。
- 未收录重点页：APEC 加入出行准备顺序和十月交通更新，普通住宿增加摘要并区别 APEC 酒店指南，过境页重写为具体口岸和路线判断；相关已有文章增加内链。
- 支付页改正实名绑定步骤与外卡个人转账限制，保留手机号短信、已有漫游与兼容性提示；Airalo 卡去掉固定 $4 价格和 Budget Pick，改为查看当前中国套餐与网页购买。不新增品牌排名或联盟短链。
- **Vercel Web Analytics 已实际启用 Hobby included 套餐**：50,000 events/月，免费、无自定义事件。后台已不显示 Demo Data／Enable 按钮，刚启用时为 0 visitors、0 page views；不能补过去访问量，发布后的事件验收见下文。未购买 Pro、未修改收款方式。
- GSC 站点地图后台 10/11：`/sitemap.xml` 状态成功、发现 19 页、上次读取 10/5；没有因为旧网址检查的临时错误就重新提交站点地图。
- 本地检查覆盖 19 页、15 篇指南、786 个站内链接、226 个锚点引用、62 个 sponsored 追踪链接实例、22 个本地图像 URL；canonical、自指文章 Schema、HowTo 链接与 19 条 sitemap 正常。废弃不存在的 HowTo #step-N 片段，步骤链接指向原页面。
- 浏览器检查 1710px 桌面与 390px 页面视口；过境页和 APEC 路线表未出现页面横向溢出。此为预览自测，不能算获客。
- ESLint 之前把移动硬盘的 `._*` macOS 附属文件当源代码；仅补忽略规则，源码检查 0 错误。生产构建与类型检查通过；上线和抓取请求的实际结果见下方发布验收。

### 后续观察口径

10/11 的 Airalo 跳转与本地预览为自己的验收。发布日及发布验收也须单列，不以自测增长解释外部访客。至少等一个完整观察区间再比同日期长度的页面／查询数据、品牌 SubID 点击与订单；不因曝光上涨或一次表单好评宣称收入或获客结果。

值得补的原创素材：新皇岗开放后 Line 7 Exit F／B2 到旅检大厅的连续指路照片、实际指示牌、无个人信息的排队情形。官方计划开放不等于作者已到现场；未承诺五分钟通关、最短步行或固定排队时间。

### 本轮发布验收

- 木安明确选择“上线，并继续提交 Google 重新抓取”后，网站功能提交 `b1880a6c68f9abc8afe1a57510f54676ca55f187` 已推送 `origin/main`。Vercel production **Ready**，源提交 b1880a6；部署记录：https://vercel.com/charliezengs-projects/szguide/BKtqS1J4KQurtoCvWgtDWmNv9vSx 。
- 正式站复检 19 页／15 篇指南、786 站内链接、226 锚点引用、62 sponsored 追踪链接实例、22 本地图像 URL、19 条 sitemap，通过。浏览器确认首页十月皇岗入口、皇岗计划日期、地铁全闸机摘要、支付规则与 Airalo 新卡片生效；不声称每个旧正文事实已全面重新核对。
- Vercel Analytics 2.0.1 的 production 脚本和 `/view` 请求实际 HTTP 200。后台已显示非演示的页面访问记录（本轮读取为 4 visitors / 5 page views）；包含验收访问与测试，来源／设备读数不能据此认定真实获客或增长。
- GSC 已分别回执 APEC 总指南 `/guides/apec-2026-shenzhen-visitor-guide`、通用住宿 `/guides/where-to-stay-in-shenzhen`、240 小时过境 `/guides/china-240-hour-visa-free-transit`：“已请求编入索引，已将网址添加到优先抓取队列中”。三页请求均已完成；此时网址检查仍显示未收录，不宣称已收录。没有重复提交同一页，没有提交原有成功 sitemap。

## 2026-10-12：Nomad 合作与反馈存储核实

- impact 当前 Active Contracts 与实际 Terms 页面确认Nomad合同有效；8/25欢迎邮件只作历史线索，当前结论来自重新登录后的有效后台。
- 普通内容推荐已准备中国套餐追踪链接 `https://lotusflareinc.pxf.io/rExqRv`，落地 `www.nomadesim.com/china-eSIM`；subId1=`szg_site_nomad`，共用标签不区分正文和推荐卡。没有新签约或申请。合同与付款边界见 `ledger/nomad-affiliate.md`。
- eSIM正文及支付／华强北／240小时过境推荐卡共4个现有位置换链接，商业披露同步，Markdown链接标记sponsored；不按佣金调整排名，不新增亲测、套餐价格或性能保证。
- 本地构建、类型检查、ESLint与19页检查通过；4个Nomad链接实例精确URL、sponsored/noopener/noreferrer、new-tab及eSIM披露检查通过。链接落地验收共2次自测，排除获客；没有订单或佣金结果。
- W8与财务设置仍待本人处理。有效推广合作不等于可以立即提现，Creator测试套餐合作仍未核实。
- Formspree正式SELF_TEST实际存入Spam；本地SELF_TEST和既有读者在Inbox。近30天3条中2条为自测，不报3位用户；邮件没出现不代表数据丢失，具体垃圾判定理由未显示。保持反垃圾设置，运营同时检查Inbox/Spam，留意30天存档期限。详细证据见 `operations/2026-10-12-feedback-pilot.md`。
