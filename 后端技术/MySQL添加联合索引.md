# MySQL添加联合索引

在 MySQL 中，联合索引（Composite Index）是指在多个列上创建的索引。联合索引可以提高多列查询的性能，特别是在涉及到多个列的 WHERE 子句或 JOIN 操作时。

下面是如何在 MySQL 中创建联合索引的步骤和示例。

### 创建联合索引

假设有一个表 `atwol_error_history`，你想要在 `dfv_value` 和 `vehicle_id` 两列上创建联合索引。

#### 创建表和添加数据（示例）

```sql
CREATE TABLE atwol_error_history (
  dfv_value VARCHAR(255) DEFAULT NULL COMMENT '故障报错的值',
  dfc_name VARCHAR(255) DEFAULT NULL COMMENT '故障名称',
  vehicle_id VARCHAR(255) DEFAULT NULL COMMENT '车辆id',
  atwol_error_id VARCHAR(255) DEFAULT NULL COMMENT 'atwol_error表ID',
  start_time DATETIME DEFAULT NULL COMMENT '开始时间',
  end_time DATETIME DEFAULT NULL COMMENT '结束时间',
  show_time DATETIME DEFAULT NULL COMMENT '生效时间',
  is_new INT(5) DEFAULT 0 COMMENT '是否为最新配置(0.否；1.是)',
  is_show INT(5) DEFAULT NULL COMMENT '是否生效(0.未生效; 1.已生效)',
  PRIMARY KEY (dfv_value, vehicle_id) -- 假设联合主键
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='错误信息对应历史记录表';
```

#### 创建联合索引

```sql
CREATE INDEX idx_dfv_vehicle ON atwol_error_history (dfv_value, vehicle_id);
```

### 使用联合索引的查询示例

当你有一个查询需要在 `dfv_value` 和 `vehicle_id` 上进行过滤时，联合索引将提高查询性能。

#### 查询示例

```sql
SELECT *
FROM atwol_error_history
WHERE dfv_value = 'some_value' AND vehicle_id = 'some_vehicle_id';
```

### 联合索引的使用规则

1. **最左前缀原则**：联合索引可以用于查询中包含的所有列，或者最左侧的几列。例如，索引 `(dfv_value, vehicle_id)` 可以用于 `dfv_value` 或 `(dfv_value, vehicle_id)` 的查询，但是不能单独用于 `vehicle_id` 的查询。
2. **覆盖索引**：如果索引包含了查询需要的所有列，查询可以直接从索引中获取数据，而不需要回表查询。

### 删除联合索引

如果你需要删除已创建的联合索引，可以使用以下命令：

```sql
DROP INDEX idx_dfv_vehicle ON atwol_error_history;
```

### 实践中的优化

创建联合索引时需要考虑查询模式，以确保索引能够有效地提高性能。在创建索引前，可以使用 `EXPLAIN` 命令来分析查询的执行计划，判断是否需要联合索引。

#### 使用 EXPLAIN 分析查询

```sql
EXPLAIN SELECT * 
FROM atwol_error_history
WHERE dfv_value = 'some_value' AND vehicle_id = 'some_vehicle_id';
```

通过 `EXPLAIN` 的输出，可以看到查询是否使用了索引，以及索引的使用情况，从而决定是否需要创建或调整联合索引。

### 例子：结合联合索引的优化查询

基于你前面的查询需求，假设你希望在 `breakdown` 表的 `dfc_value` 和 `vehicle_id` 列上创建联合索引，以优化 JOIN 操作，可以这样做：

```sql
CREATE INDEX idx_dfc_vehicle ON breakdown (dfc_value, vehicle_id);
```

这样，当你在 `breakdown` 表上进行类似以下的查询时，索引会提高查询性能：

```sql
SELECT *
FROM breakdown
LEFT JOIN atwol_error_history 
  ON breakdown.dfc_value = atwol_error_history.dfv_value 
 AND breakdown.vehicle_id = atwol_error_history.vehicle_id
 AND atwol_error_history.is_show = 1
 AND breakdown.version_date BETWEEN atwol_error_history.start_time AND IFNULL(atwol_error_history.end_time, NOW());
```

通过这些步骤和示例，你可以有效地创建和使用联合索引来优化 MySQL 查询性能。
