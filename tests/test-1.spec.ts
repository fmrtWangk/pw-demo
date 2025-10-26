import fs from 'fs';
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  const url = await fs.readFileSync('./url.txt', 'utf-8');
  await page.goto(url);
  await page.waitForTimeout(100);
  const isJryxVisible = await page.getByRole('link', { name: '进入游戏' }).isVisible();
  if (isJryxVisible) {
    await page.getByRole('link', { name: '进入游戏' }).click();
  } else {
    await page.getByRole('link', { name: '返回游戏' }).click();
  }
  await page.waitForTimeout(100);
  await page.getByRole('link', { name: '三界' }).click();
  await page.waitForTimeout(100);
  await page.getByRole('link', { name: '【进入仙界】' }).click();
  await page.waitForTimeout(100);
  await page.getByRole('link', { name: '【领工资】' }).click();
  await page.waitForTimeout(100);
  console.log(await page.content());
  await page.getByRole('link', { name: '返回游戏' }).click();
  await page.waitForTimeout(100);
  await page.getByRole('link', { name: '福利' }).click();
  await page.waitForTimeout(100);
  await page.getByRole('link', { name: '每日福利' }).click();
  await page.waitForTimeout(100);
  await page.getByRole('link', { name: '兑换', exact: true }).click();
});
