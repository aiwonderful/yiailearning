# RUN_LOG.md 模板

每轮追加一条记录；不要覆盖历史。

---

## Run `<run-id>`

- Started at：
- Ended at：
- Trigger：
- Loop version：
- Model / reasoning：
- Branch / worktree：
- Initial commit：

### Observation

- 读取了哪些状态和环境证据：
- 当前未完成项：

### Selection

- 选择的 Task ID：
- 选择理由：
- 未选择其他任务的原因：

### Actions

- 工具调用摘要：
- 修改文件：
- 外部副作用：

### Verification

| Check | Result | Evidence |
|---|---|---|
|  | pass / fail |  |

### Outcome

- Result：success / partial / failed / escalated / no-op
- Final commit：
- State changes：
- Next action：
- Stop reason：

### Cost

- Agent turns：
- Input / output tokens：
- External requests：
- Runtime：
- Estimated cost：

### Human Review

- Reviewer：
- Decision：accepted / rejected / needs changes
- Notes：

