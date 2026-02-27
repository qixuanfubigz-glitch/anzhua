# Vercel 部署说明

本地正常、Vercel 上不生效时，按下面逐项检查。

## 1. 环境变量（推荐）

在 Vercel 项目 **Settings → Environment Variables** 里添加：

- **Name**: `NEXT_PUBLIC_VERCEL_URL`  
- **Value**: 填你的 Vercel 域名，例如 `your-app.vercel.app`（不要加 `https://`）  
- 或直接复用 Vercel 提供的 `VERCEL_URL`（在 Build 里能看到）

这样首屏就会显示正确的 `irm https://你的域名/setup.ps1 | iex`，即使用户还没执行 JS 也能复制到对的命令。

## 2. 确认 setup.ps1 能访问

部署完成后在浏览器打开：

```
https://你的域名.vercel.app/setup.ps1
```

- 若能看到整段 PowerShell 脚本（纯文本），说明脚本托管正常。  
- 若是 404，检查仓库里是否有 **`public/setup.ps1`**，且已提交并触发最新一次部署。

## 3. 确认构建成功

在 Vercel 的 **Deployments** 里点进最新一次部署，看 **Building** 是否成功、无报错。若有报错，把错误信息贴出来再排查。

## 4. 浏览器控制台

在 Vercel 上的页面按 F12 打开开发者工具 → **Console**，看是否有红色报错（如 JS 报错、跨域、资源加载失败等）。有的话把报错内容记下来。

## 5. 清除缓存后重试

有时是旧版本缓存：在 Vercel 的 **Deployments** 里对该次部署点 **Redeploy**，或浏览器用无痕/清除缓存后再打开页面。

---

**常见原因小结**：  
- 没设 `NEXT_PUBLIC_VERCEL_URL` → 首屏命令可能是占位域名，复制后需手动改；设了之后会直接显示正确命令。  
- `public/setup.ps1` 未提交或路径不对 → 访问 `/setup.ps1` 会 404，PowerShell 的 `irm` 会失败。  
- 构建失败或前端报错 → 页面白屏或样式/按钮异常，按上面 3、4 步查构建日志和 Console。
