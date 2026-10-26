import { expect, test } from '@playwright/test'
test('list orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await expect(
    page.getByRole('cell', { name: 'Ana Silva', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'João Pereira', exact: true }),
  ).toBeVisible()
})
test('paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Próxima página' }).click()

  await expect(
    page.getByRole('cell', { name: 'Karen Ribeiro', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'Vitória Cardoso', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Última página' }).click()

  await expect(
    page.getByRole('cell', { name: 'order-231', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'order-240', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Página anterior' }).click()

  await expect(
    page.getByRole('cell', { name: 'order-221', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'order-230', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Primeira página' }).click()

  await expect(
    page.getByRole('cell', { name: 'Ana Silva', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'João Pereira', exact: true }),
  ).toBeVisible()
})
test('filter by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page.getByPlaceholder('ID do pedido').fill('order-11')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  await expect(
    page.getByRole('cell', { name: 'order-11', exact: true }),
  ).toBeVisible()
})

test('filter by customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page.getByPlaceholder('Nome do cliente').fill('Karen Ribeiro')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  await expect(page.getByRole('cell', { name: 'Karen Ribeiro' })).toHaveCount(
    10,
  )
})

test('filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page.getByRole('combobox').click()
  await page.getByLabel('Pendente').click()

  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  await expect(page.getByRole('cell', { name: 'Pendente' })).toHaveCount(2)
})

test('keep order details and status consistent with the list', async ({
  page,
}) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  const row = page
    .getByRole('row')
    .filter({ has: page.getByRole('cell', { name: 'order-1', exact: true }) })
  await expect(row.getByText('R$ 42,00')).toBeVisible()
  await row.getByRole('button', { name: 'Detalhes do pedido' }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByText('Ana Silva')).toBeVisible()
  await expect(dialog.getByText('Pizza Marguerita')).toBeVisible()
  await expect(dialog.getByText('Pendente', { exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await row.getByRole('button', { name: 'Aprovar', exact: true }).click()
  await expect(row.getByText('Em preparo', { exact: true })).toBeVisible()
  await row.getByRole('button', { name: 'Detalhes do pedido' }).click()
  await expect(dialog.getByText('Em preparo', { exact: true })).toBeVisible()
})
