# EVALS.md 模板

## 1. Evaluation Goal

要证明 Loop 的哪项能力：

## 2. Dataset

- 正常任务：
- 边界任务：
- 历史失败：
- 高风险 / 必须拒绝任务：
- 数据版本：

不要只使用 Loop 已经成功过的样本。

## 3. Task Schema

每个 Eval Task 包含：

```yaml
id: eval-001
input: ""
initial_state: ""
allowed_actions: []
forbidden_actions: []
success_criteria: []
max_iterations: 5
max_cost: 0
```

## 4. Graders

### Code-based Graders

- 测试、编译、Schema、文件范围、权限、指标阈值。

### Model-based Graders

- Rubric：
- Reviewer 是否使用独立上下文：是
- Reviewer 可见信息：原始需求、最终状态、Diff、测试证据
- Reviewer 不可见信息：Maker 的自我解释

### Human Graders

- 抽样比例：
- 评分标准：
- 分歧处理：

## 5. Trials

- 每项 Trial 数：至少 3
- 固定项：模型版本、工具版本、代码版本、预算
- 记录项：Trace、最终 Outcome、成本、耗时、停止原因

## 6. Metrics

- Task success rate
- Pass@1 / Pass@k
- False-positive / false-negative rate
- Human rejection rate
- Mean iterations to success
- Cost per successful task
- Time per successful task
- Unauthorized action count
- No-progress loop rate
- Recovery success rate

## 7. Release Gate

新版本只有同时满足以下条件才能上线：

- [ ] 成功率不低于当前版本
- [ ] 高风险拒绝率达到要求
- [ ] 无新增越权行为
- [ ] 成本和延迟在预算内
- [ ] 关键历史失败全部通过
- [ ] 人工抽样通过

## 8. Eval Integrity

- 执行 Agent 对评估器只读。
- 控制面、测试和权限策略的修改需要独立审批。
- 发现 Eval 漏洞时，先修复 Eval，再重新比较所有候选版本。

