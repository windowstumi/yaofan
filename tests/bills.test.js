import test from 'node:test'
import assert from 'node:assert/strict'
import { initialBills, eligibleBills, validatePublication, validateHelpAmount } from '../src/data/bills.js'

test('discovery respects category, remaining amount, skipped and completed bills', () => {
  assert.equal(eligibleBills(initialBills, 'all', 10000, [], []).length, 4)
  assert.deepEqual(eligibleBills(initialBills, 'all', 80, [], []).map(b => b.id), ['b1', 'b3'])
  assert.deepEqual(eligibleBills(initialBills, 'rent', 10000, [], []).map(b => b.id), ['b2'])
  assert.deepEqual(eligibleBills(initialBills, 'all', 10000, ['b1', 'b2'], ['b3']).map(b => b.id), ['b4'])
  assert.deepEqual(eligibleBills(initialBills, 'all', 10000, ['b1', 'b2', 'b3', 'b4'], []), [])
  assert.equal(eligibleBills([...initialBills].reverse(), 'all', 10000, [], [], 'latest')[0].id, 'b1')
})

test('publication validates required content, consent and money precision', () => {
  const form = { title: '日子慢慢变好', billName: '生活账单', story: '谢谢你的帮助', amount: '128.50', agreed: true }
  assert.equal(validatePublication(form), '')
  for (const amount of ['0', '-1', '10001', 'NaN', '1.123', 'Infinity', '1e2']) assert.ok(validatePublication({ ...form, amount }))
  for (const amount of ['1', '0.99', '10000', '1.01']) assert.equal(Boolean(validatePublication({ ...form, amount })), amount === '0.99')
  assert.ok(validatePublication({ ...form, title: '  ' }))
  assert.ok(validatePublication({ ...form, agreed: false }))
})

test('help amounts cannot be negative, exceed the remainder or use fractional cents', () => {
  for (const amount of ['0.01', '10', '80', '80.00']) assert.equal(validateHelpAmount(amount, 80), true)
  for (const amount of ['', '0', '-1', '81', '80.001', '0.001', 'NaN', '1e1']) assert.equal(validateHelpAmount(amount, 80), false)
  assert.equal(validateHelpAmount('0.30', 0.1 + 0.2), true)
  assert.equal(validateHelpAmount('0.01', 0), false)
})
