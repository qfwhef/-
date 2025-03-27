# Cloudflare配置指南

本文档介绍如何在Cloudflare中配置D1数据库并与Pages项目绑定，以支持扫雷游戏的胜利统计功能。

## 创建D1数据库

1. 登录Cloudflare控制台: https://dash.cloudflare.com/
2. 在左侧菜单中，选择**Workers & Pages**
3. 在左侧导航栏中点击**D1**
4. 点击页面右上角的**创建数据库**按钮
5. 输入数据库名称: `minesweeper_stats`，然后点击**创建**

## 初始化数据库表

1. 在新创建的数据库页面中，点击**查询**标签
2. 在SQL编辑器中输入以下SQL语句创建表并初始化数据:

```sql
-- 创建统计表
CREATE TABLE win_statistics (
  id INTEGER PRIMARY KEY,
  total_wins INTEGER DEFAULT 0,
  last_updated TEXT
);

-- 插入初始记录
INSERT INTO win_statistics (id, total_wins, last_updated) 
VALUES (1, 0, CURRENT_TIMESTAMP);
```

3. 点击**运行**按钮执行SQL

## 将数据库绑定到Pages项目

1. 在Cloudflare控制台左侧菜单点击**Workers & Pages**
2. 点击**Pages**标签
3. 找到并点击您的扫雷游戏项目
4. 在项目设置中，点击**函数**标签
5. 确保**Functions**功能已启用
6. 在**D1数据库绑定**部分点击**添加绑定**按钮
7. 填写绑定表单:
   - 变量名称: `DB`
   - 选择您刚才创建的 `minesweeper_stats` 数据库
8. 点击**保存**按钮

## 部署项目

1. 确保您的代码已经包含了以下新文件:
   - functions/api/stats.js
   - functions/api/record-win.js
   - functions/_routes.json
   - 修改后的index.html
2. 将代码推送到与Cloudflare Pages关联的代码仓库
3. Cloudflare会自动检测更改并部署您的站点

## 验证功能

完成部署后，访问您的网站并测试以下功能:
1. 页面加载时应该显示"全球玩家已取得 X 次胜利"
2. 成功完成一局游戏后，胜利次数应该增加

如果遇到问题，可以在Cloudflare控制台的**函数日志**中查看错误信息。 