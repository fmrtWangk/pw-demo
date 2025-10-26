import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  if (fs.existsSync(authFile)) return;
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(process.env.LOGIN_URL);
  await page.getByRole('textbox', { name: '请输入你的账号' }).fill(process.env.LOGIN_USERNAME);
  await page.getByRole('textbox', { name: '请输入你的密码' }).fill(process.env.LOGIN_PASSWORD);
  await page.getByRole('button', { name: '登录游戏' }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  // End of authentication steps.

  await page.getByRole('link', { name: '【问道宗】（7区）' }).click();
  await page.getByRole('link', { name: '【开启游戏之旅】' }).click();
  await page.context().storageState({ path: authFile });
  await page.getByRole('link', { name: '进入游戏' }).click();
  await fs.writeFileSync('./url.txt', page.url());
});
