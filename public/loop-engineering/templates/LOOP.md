# LOOP.md 模板

## 1. Identity

- Loop 名称：
- Owner：
- 当前成熟度：L1 Report-only / L2 Human-approved / L3 Bounded autonomy
- 最后评审日期：
- Kill Switch：

## 2. Objective

### Goal

<!-- 一个可判定的结果，不要写宽泛愿望。 -->

### Done When

- [ ] 验收条件 1
- [ ] 验收条件 2
- [ ] 必要检查全部通过
- [ ] 最终状态已由独立证据确认

### Out of Scope

- 

## 3. Trigger

- 类型：manual / schedule / event / heartbeat
- Cadence 或事件：
- 去重键：
- 同一任务是否允许并发：否

## 4. Inputs

- 需求来源：
- 项目说明 / Skill：
- 状态文件：
- 外部系统：
- Ground Truth：

## 5. Selection Policy

1. 先检查当前环境是否健康。
2. 读取状态和最近运行记录。
3. 只选择一个最高优先级、可在单轮验证的任务。
4. 命中风险规则时停止并升级给人。

## 6. Execution Policy

- 允许读取：
- 允许写入：
- 禁止修改：
- 网络访问：
- 可用工具 / MCP：
- 隔离方式：worktree / container / sandbox
- 分支命名：

## 7. Verification

按顺序执行：

1. 编译 / 类型检查：
2. 单元测试：
3. 集成 / E2E：
4. 静态与安全检查：
5. 独立 Reviewer Rubric：
6. 人工检查点：

实现 Agent 不得删除、弱化或修改基线评估器，除非任务本身明确要求且经人工批准。

## 8. Persistence

每轮结束必须更新：

- `STATE.md`
- `RUN_LOG.md`
- 任务清单状态
- Git Commit 或明确记录为何没有 Commit

## 9. Stop Conditions

### Success

- 所有 Done When 条件有证据证明。

### Failure / Escalation

- 最大轮数：
- 最大运行时间：
- 最大 Token / 金额：
- 连续无进展轮数：
- 相同错误最大次数：
- 风险目录 / 操作：
- 认证或权限错误：立即停止

## 10. Human Gates

以下操作必须人工批准：

- [ ] 合并 PR
- [ ] 发布或部署
- [ ] 数据库迁移
- [ ] 删除数据
- [ ] 权限、安全、支付或密钥相关修改
- [ ] 修改 Loop 自身的权限、验证器或停止条件

## 11. Observability

每轮记录：Run ID、触发原因、输入版本、选择理由、工具调用摘要、Diff、验证结果、成本、耗时、停止原因。

## 12. Rollback

- 最近已知良好状态：
- 回滚命令 / 流程：
- 事故联系人：

