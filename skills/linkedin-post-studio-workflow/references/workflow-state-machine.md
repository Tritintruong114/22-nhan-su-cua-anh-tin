# Workflow state machine

```text
BRIEFED
  -> ANGLES_READY
  -> COPY_READY
  -> VISUAL_BRIEF_READY
  -> ASSETS_READY
  -> RENDERED
  -> QA_PASSED
  -> USER_APPROVAL_REQUIRED
  -> PUBLISH_READY
  -> PUBLISHED
  -> LEARNING_RECORDED
```

Revision paths:

- COPY_READY -> ANGLES_READY when the thesis or audience changes.
- RENDERED -> VISUAL_BRIEF_READY when format/template changes.
- QA_FAILED -> RENDERED when only layout/asset fixes are needed.
- Any pre-publish state -> USER_APPROVAL_REQUIRED after revision.

Terminal states:

- BLOCKED: missing required input, provider, or unsafe/uncertain asset.
- CANCELLED: user stops the run.
