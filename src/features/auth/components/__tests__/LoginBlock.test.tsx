import { vi, describe, test } from 'vitest';

import { renderWithProviders, screen, userEvent } from '@/test/test-utils';

import { MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from '../../schema';
import { LoginBlock } from '../LoginBlock';
describe('Correct path', () => {
  test('should display correct text inputs and button', async () => {
    const onSuccess = vi.fn();
    await renderWithProviders(<LoginBlock onSuccess={onSuccess} />);

    const usernameInput = screen.getByLabelText(/Tên đăng nhập/i);
    const passwordInput = screen.getByLabelText(/Mật khẩu/i);
    const button = screen.getByRole('button', { name: /Đăng nhập/i });

    expect(usernameInput).toBeVisible();
    expect(passwordInput).toBeVisible();
    expect(button).toBeVisible();
  });
});
describe('Error path', () => {
  test('should display error when username is in wrong format', async () => {
    const onSuccess = vi.fn();
    await renderWithProviders(<LoginBlock onSuccess={onSuccess} />);

    // await userEvent.type(screen.getByRole('textbox', { name: 'Tên đăng nhập' }), '');
    await userEvent.click(screen.getByRole('button', { name: 'Đăng nhập' }));

    expect(
      screen.getByText(
        new RegExp(`Tên đăng nhập tối thiểu ${MIN_USERNAME_LENGTH} ký tự.`),
      ),
    ).toBeVisible();
    // expect();
  });

  test('should display error when password is in wrong format', async () => {
    const onSuccess = vi.fn();
    await renderWithProviders(<LoginBlock onSuccess={onSuccess} />);

    await userEvent.click(
      screen.getByRole('button', { name: /toggle password visibility/ }),
    );
    userEvent.type(screen.getByRole('textbox', { name: 'Mật khẩu' }), 'lol');
    await userEvent.click(screen.getByRole('button', { name: 'Đăng nhập' }));

    expect(
      screen.getByText(new RegExp(`Mật khẩu tối thiểu ${MIN_PASSWORD_LENGTH} ký tự.`)),
    ).toBeVisible();
    // expect();
  });
});
