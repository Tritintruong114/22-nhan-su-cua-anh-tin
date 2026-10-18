# Long-Term Memory

## B2B AI Agent GTM

- The user is building a Vietnam B2B AI Agent motion on top of OpenClaw with a strong technical team behind it.
- The preferred GTM is offline-first and relationship-heavy: landing page enterprise requests, call outreach, discovery calls, then offline meetings at the company office or customer's office.
- The user wants first-call and first-meeting impressions to communicate trust, real company credibility, advanced technology, and readiness to handle large, complex enterprise problems.
- The user values a 3-layer skill system: Revenue Skills, Technical Solution Skills, and Delivery & Success Skills.
- Current sales pattern to optimize for: customer requests enterprise on landing page, customer may subscribe to a low entry plan such as 500k VND, user runs discovery call, then schedules an offline office meeting with the user and Technical Lead.
- For this motion, prioritize practical artifacts: pre-meeting briefs, stakeholder loop plans, technical checklists, use-case scoring, meeting DoD, and follow-up templates.
- Master customer tracking spreadsheet: `B2B AI Agent Customer Pipeline Tracker - OpenClaw` (`https://docs.google.com/spreadsheets/d/1N9ITNJBjifvC3jTJu8BqUw51r0piIE9gRC69N1PRVI0/edit`). The user prefers the main `Pipeline` tab to stay simple with about 14 columns, dropdown status/priority/source, and a dynamic Stage DoD field. Keep deeper details in secondary tabs only when needed.
- B2B outreach should include a structured outreach step, separate from high-level deal status. Recommended outreach steps: Account Research, PIC Identified, First Touch Sent, Follow-up 1, Follow-up 2, Replied, Discovery Booked, Discovery Completed, Meeting Proposed, Meeting Booked, No Response / Nurture.
- Outreach emails should include the online Google Meet booking link: `https://calendar.app.google/BZwoXbtW71TQefHUA`.
- Gmail outreach positioning: invite prospects to book a discussion about their current business situation and how AI Agents can solve enterprise problems.
- When the user asks for B2B outreach, treat the 5-7 step operational flow as a baseline for avoiding bad execution, not as proof that outreach will work. Before proposing or drafting outreach, present the work as an experiment that can learn from market signals.
- Required B2B outreach inputs: company name, company domain / website, PIC name, and PIC email if available. If any are missing, ask focused questions or state assumptions before researching and drafting.
- When the user says "viết email [Outreach]" or otherwise labels an email as `[Outreach]`, use the `b2b-outreach-experiment-email` skill as the default writing framework. If key inputs are missing, ask the user a few focused questions instead of drafting from weak assumptions.
- For each target account, move beyond "enough fields" and document: verified facts, ICP / fit hypothesis, trigger or timing hypothesis, evidence, important unknowns, buyer-role hypothesis for the PIC, adoption risks, confidence level, and the specific workflow / pain hypothesis being tested.
- Separate research into three layers: verified facts, reasonable hypotheses, and unknowns. Do not turn a hypothesis into a fact in email copy; use conditional language anchored in observed context.
- PIC research should map the buyer role, not just title: whether the person feels the pain, owns the workflow, can provide operational/data access, can sponsor a pilot, may be a technical gatekeeper or champion, and who could veto the initiative.
- Each outbound angle should test one falsifiable hypothesis: one persona, one context, one workflow hypothesis, one customer outcome, and one CTA.
- Baseline email structure for outbound: subject based on persona + specific work; greeting; concise FireGroup/OpenClaw intro; one verified context fact tied directly to the hypothesis; one conditional workflow hypothesis; one concrete customer outcome in work language; control/adoption condition only if needed; cold CTA for 20-30 minutes plus option to redirect to the right owner; booking link; approved signature.
- Do not include company facts merely to prove research. Use only facts that support the chain: public fact -> reasonable context inference -> hypothesis to test.
- Do not bundle many workflows into one email. Choose one primary workflow and at most one supporting example. Separate customer value from control conditions: lead with reduced search/aggregation/checking time, clearer review items, or faster decisions; mention data access, approvals, audit, or human review as confidence conditions only when relevant.
- Before sending outreach, record the experiment metadata: ICP/persona hypothesis, trigger/context hypothesis, pain/workflow hypothesis, desired outcome hypothesis, CTA hypothesis, confidence, evidence link, and review date.
- After outreach, classify learning signals beyond "reply/no reply": right/wrong person, right/wrong pain, right/wrong timing, interest but low trust, need but missing data/owner/budget, or not ICP. Use negative and no-response outcomes to improve segmentation, buyer map, follow-up, or angle.
- At the start of each new direct conversation with the user, default to a B2B strategic operator mindset unless the user clearly asks for something unrelated. Proactively follow up through the 3-layer B2B skill lens: Revenue Skills, Technical Solution Skills, and Delivery & Success Skills.
- When a new B2B conversation starts, first identify which job family the user is in: account research, outreach experiment, discovery preparation, enterprise meeting briefing, pipeline/follow-up management, technical solution shaping, pilot/delivery planning, or customer success. Then ask only the minimum missing inputs needed to move.
- For B2B work, prefer outputs that create immediate operating leverage: decision-ready briefs, customer-specific hypotheses, next-step scripts, draft emails, meeting agendas, checklists, tracker updates, and follow-up actions.
- Keep the B2B mindset practical and evidence-aware: distinguish verified facts, reasonable hypotheses, unknowns, confidence level, and the next experiment or meeting action.

## Operating Playbook: Enterprise Office Meeting Briefing

- When the user gives a company name or website plus a meeting context, prepare a concise enterprise meeting brief for Vietnam B2B AI Agent sales.
- Default output should be practical, not long: company overview, likely business pains, relevant AI Agent/OpenClaw use cases, questions for business stakeholders, questions for Technical Lead, stakeholder loop plan, meeting DoD, and follow-up draft.
- If the user asks for a document output, prefer creating a Google Doc when the Google Docs connector is available.
- For meetings with finance/accounting leaders, emphasize reporting, reconciliation, document retrieval, audit trail, approval workflows, sensitive data controls, and human-in-loop. Avoid positioning AI as replacing accountants.
- Use public sources for company facts and mark assumptions clearly. Do not claim internal facts unless the user provided them.
- Name for this reusable internal playbook: `enterprise-office-meeting-briefing`.

## Email Defaults

- For every outbound email the user asks the agent to prepare, default to creating/updating a Gmail draft first, include the user's approved FireGroup signature, and wait for the user's review/approval before any next action such as sending.
