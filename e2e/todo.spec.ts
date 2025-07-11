import { test, expect } from '@playwright/test';

test.describe('Todo Application E2E Tests', () => {
  // Use a unique prefix for all tasks in this test suite run
  const testRunPrefix = `test-${Math.random().toString(36).slice(2, 7)}`;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Helper to create a task item locator with a unique title
  const getTaskItem = (page: any, title: string) => {
    return page.locator(`[data-testid="task-item-container"]:has-text("${title}")`);
  };

  // Helper to create a new task
  const createTask = async (page: any, title: string, content?: string, dueDate?: string) => {
    await page.getByRole('button', { name: 'Add Task' }).click();
    // Wait for the modal to appear
    const modal = page.getByRole('heading', { name: 'Add Task' });
    await expect(modal).toBeVisible({ timeout: 240000 });

    await page.getByPlaceholder('Title').fill(title);
    if (content) {
      await page.getByPlaceholder('Content (optional)').fill(content);
    }
    if (dueDate) {
      await page.getByLabel('Due Date').fill(dueDate);
    }
    await page.getByRole('button', { name: 'Save' }).click();
    // Wait for the modal to disappear
    await expect(modal).not.toBeVisible({ timeout: 240000 });
  };

  test('should create a new todo item', async ({ page }) => {
    const title = `${testRunPrefix}-create`;
    const content = 'This is a test todo item.';
    await createTask(page, title, content);

    const taskItem = getTaskItem(page, title);
    await expect(taskItem).toBeVisible();
    // Expand the task to see the content
    await taskItem.getByText(title).click();
    await expect(taskItem.getByText(content)).toBeVisible();
  });

  test('should mark a todo item as completed', async ({ page }) => {
    const title = `${testRunPrefix}-mark`;
    await createTask(page, title);

    const taskItem = getTaskItem(page, title);
    await expect(taskItem).toBeVisible();

    // Mark as completed
    await taskItem.getByRole('checkbox').check();

    // Verify in Completed list
    await page.getByRole('button', { name: 'Completed' }).click();
    await expect(taskItem).toBeVisible();

    // Verify in All list
    await page.getByRole('button', { name: 'All' }).click();
    await expect(taskItem).toBeVisible();
    await expect(taskItem.getByText(title)).toHaveCSS('text-decoration-line', 'line-through');
  });

  test('should filter todo items by status', async ({ page }) => {
    const activeTitle1 = `${testRunPrefix}-filter-active-1`;
    const activeTitle2 = `${testRunPrefix}-filter-active-2`;
    const completedTitle1 = `${testRunPrefix}-filter-completed-1`;

    await createTask(page, activeTitle1);
    await createTask(page, completedTitle1);
    const completedTask = getTaskItem(page, completedTitle1);
    await completedTask.getByRole('checkbox').check();
    await createTask(page, activeTitle2);

    const activeTask1 = getTaskItem(page, activeTitle1);
    const activeTask2 = getTaskItem(page, activeTitle2);

    // Filter by Active
    await page.getByRole('button', { name: 'Active' }).click();
    await expect(activeTask1).toBeVisible();
    await expect(activeTask2).toBeVisible();
    await expect(completedTask).not.toBeVisible();

    // Filter by Completed
    await page.getByRole('button', { name: 'Completed' }).click();
    await expect(completedTask).toBeVisible();
    await expect(activeTask1).not.toBeVisible();
    await expect(activeTask2).not.toBeVisible();

    // Filter by All
    await page.getByRole('button', { name: 'All' }).click();
    await expect(activeTask1).toBeVisible();
    await expect(activeTask2).toBeVisible();
    await expect(completedTask).toBeVisible();
  });

  test('should delete a todo item', async ({ page }) => {
    const title = `${testRunPrefix}-delete`;
    await createTask(page, title);

    const taskItem = getTaskItem(page, title);
    await expect(taskItem).toBeVisible();

    // Delete the todo
    await taskItem.getByRole('button', { name: 'Delete task' }).click();

    // Verify it's no longer visible
    await expect(taskItem).not.toBeVisible();
  });

  test('should cancel adding a todo item', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Task' }).click();
    await expect(page.getByRole('heading', { name: 'Add Task' })).toBeVisible(); // Modal is open
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByRole('heading', { name: 'Add Task' })).not.toBeVisible(); // Modal is closed
    await expect(page.getByPlaceholder('Title')).not.toBeVisible(); // Input fields are gone
  });

  test('should not save a todo with an empty title', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Task' }).click();
    await page.getByPlaceholder('Content (optional)').fill('Content without title');
    await page.getByRole('button', { name: 'Save' }).click();

    // Modal should still be visible as save was not successful
    await expect(page.getByRole('heading', { name: 'Add Task' })).toBeVisible();
    await expect(page.getByText('Content without title')).toBeVisible(); // Content should still be there
  });

  test('should add a todo with a due date', async ({ page }) => {
    const title = `${testRunPrefix}-due-date`;
    await createTask(page, title, undefined, '2025-12-31');

    const taskItem = getTaskItem(page, title);
    await expect(taskItem).toBeVisible();
    await expect(taskItem.getByText(/due: 12\/31\/2025/i)).toBeVisible();
  });

  test('should expand and collapse task content', async ({ page }) => {
    const title = `${testRunPrefix}-expand`;
    const content = 'This is some detailed content.';
    await createTask(page, title, content);

    const taskItem = getTaskItem(page, title);
    await expect(taskItem).toBeVisible();

    // Content should not be visible initially
    await expect(taskItem.getByText(content)).not.toBeVisible();

    // Click on the task title to expand
    await taskItem.getByText(title).click();
    await expect(taskItem.getByText(content)).toBeVisible();

    // Click again to collapse
    await taskItem.getByText(title).click();
    await expect(taskItem.getByText(content)).not.toBeVisible();
  });
});
