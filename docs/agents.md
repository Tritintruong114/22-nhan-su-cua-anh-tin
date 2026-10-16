# Agent Registry

## Status legend
- **Bound**: explicit inbound channel route exists.
- **Cron**: has one or more active scheduled routines.
- **Unbound**: no explicit inbound route observed; may still be manually invoked or called internally.
- **Role inference**: based on agent identity/name and workspace artefacts; requires owner confirmation before being treated as a formal responsibility contract.

| # | Agent ID | Display identity | Model | Runtime status | Observed / inferred responsibility |
|---:|---|---|---|---|---|
| 1 | `main` | main | toc/auto | Default gateway agent | Owner assistant / general orchestrator |
| 2 | `ai-agent-trainer` | ai-agent-trainer | merido/auto | Unbound | Agent training and improvement specialist |
| 3 | `hypo-agent` | hypo-agent | toc/auto | Unbound | Experimental/hypothesis agent |
| 4 | `agent-hoc-tieng-trung` | Agent học tiếng trung | toc/auto | Unbound | Chinese-learning assistant |
| 5 | `clawexperts-monitoring` | ClawExperts Monitoring | toc/auto | Cron | B2B pipeline monitoring and weekly operational review |
| 6 | `b2b-strategic` | B2B Strategic | toc/auto | Unbound | B2B strategy specialist |
| 7 | `youtube-agent` | YouTube Agent | toc/auto | **Bound + Cron** | YouTube analytics, market scan, content intelligence |
| 8 | `seo-agent` | Super SEO Agent | default toc/auto | Unbound | SEO workflow specialist |
| 9 | `nhan-vien-du-lich` | Nhân Viên Du Lịch | toc/auto | Unbound | Travel assistant |
| 10 | `ai-creative-studio` | Agent Sáng tạo | default toc/auto | Unbound | Creative production specialist |
| 11 | `hr-assistant` | HR Assistant | toc/auto | Unbound | HR workflow specialist |
| 12 | `mobile-ua` | Mobile UA | toc/auto | **Cron** | XinChao/mobile user acquisition and Facebook content experiments |
| 13 | `tro-ly-tai-chinh` | Trợ lý tài chính | toc/auto | Unbound | Personal finance assistant |
| 14 | `product-manager-xin-chao` | Product Manager Xin Chào | toc/auto | Unbound | XinChao product manager |
| 15 | `tro-ly-productivity` | Trợ lý productivity | toc/auto | Unbound | Productivity assistant |
| 16 | `tro-ly-sach` | Trợ Lý Sách | toc/auto | Unbound | Book/reading assistant |
| 17 | `nhan-vien-chien-luoc` | Nhân viên chiến lược | toc/auto | Unbound | Strategic planning assistant |
| 18 | `tro-ly-kinh-te-hoc-hanh-vi` | Trợ lý kinh tế học hành vi | toc/auto | Unbound | Behavioural economics assistant |
| 19 | `thu` | thu | toc/auto | Unbound | Zalo assist operational agent; restricted tools |
| 20 | `b2b-assistant` | B2B Assistant | toc/auto | Unbound | B2B execution assistant |
| 21 | `hoc-ve-nang-luong` | Học về năng lượng | toc/auto | Unbound | Energy-learning assistant |
| 22 | `sales-agent-multi-channel` | Trợ lý cửa hàng | default toc/auto | Cron | Privileged sales operations/manager agent |
| 23 | `staff` | Nhân viên bán hàng | default toc/auto | **Bound** | Customer-facing multi-channel sales worker |

## Critical separation: `staff` vs `sales-agent-multi-channel`

| Dimension | `staff` | `sales-agent-multi-channel` |
|---|---|---|
| Exposure | Facebook Messenger, Zalo OA, Web Widget | No explicit public inbound binding |
| Tool policy | Minimal: catalog lookup, product lookup/search, order capture, escalation and lead notification | Full profile plus operations, reporting, settings and governance actions |
| Correct responsibility | Answer shoppers, identify needs, collect order details, notify/escalate | Configure the shop, judge conversations, monitor operations, read orders/analytics, manage policy and owner operations |
| Architecture rule | Must remain low-privilege and sandboxed | Must not receive arbitrary public customer input directly |

This is the strongest existing workforce pattern in the installation and should become the template for future public-worker vs manager-agent separation.

## Missing registry fields to complete per agent

For every agent, the owner needs to fill the following fields before it qualifies as “live workforce”:

- Core job-to-be-done and non-goals.
- Customer/operator identity and trust tier.
- Input channels and exact routing match.
- Allowed tools, data sources and write permissions.
- Human approval / escalation thresholds.
- Structured output location and retention policy.
- KPI/SLA and evaluation dataset.
- Owner, on-call owner and kill switch.
