import { test, expect } from '@playwright/test';

test.describe('Trang chủ và Đăng nhập', () => {
  test('Nút đăng nhập hiển thị và có thể mở Modal Đăng Nhập', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Check if Navbar contains the Login button
    const loginBtn = page.getByRole('button', { name: 'Đăng nhập' });
    await expect(loginBtn).toBeVisible();

    // Click the login button
    await loginBtn.click();

    // Verify the login modal appears
    const modalHeading = page.getByRole('heading', { name: 'Đăng nhập', exact: true }).first();
    await expect(modalHeading).toBeVisible();

    // The modal should have Email and Password inputs
    await expect(page.getByPlaceholder('example@email.com')).toBeVisible();
    await expect(page.getByPlaceholder('Tối thiểu 8 ký tự')).toBeVisible();
  });

  test('Luồng chuyển tab sang Đăng ký', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();

    // Switch to Register tab
    const registerTab = page.getByRole('button', { name: 'Đăng ký miễn phí' });
    await registerTab.click();

    // Expect Full Name input to appear
    await expect(page.getByPlaceholder('Nguyễn Văn A')).toBeVisible();
    
    // Fill out the registration form
    await page.getByPlaceholder('Nguyễn Văn A').fill('Nguyễn Văn Test');
    await page.getByPlaceholder('example@email.com').fill('test@gmail.com');
    await page.getByPlaceholder('Tối thiểu 8 ký tự').fill('test123456');

    // Click create account
    await page.getByRole('button', { name: 'Tạo tài khoản' }).click();

    // Expect genre selection step to appear
    const genreHeading = page.getByRole('heading', { name: 'Chọn thể loại yêu thích' });
    await expect(genreHeading).toBeVisible();
  });
});
