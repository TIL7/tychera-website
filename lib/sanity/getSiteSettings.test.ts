import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { sanitizeEmail } from './getSiteSettings'

describe('sanitizeEmail', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('wrong-domain email → returns canonical email and emits warning', () => {
    const result = sanitizeEmail('admin@tycherainvestments.com')

    expect(result).toBe('contact@tycherainvest.com')
    expect(console.warn).toHaveBeenCalledOnce()
  })

  it('correct-domain email → returns original value unchanged', () => {
    const result = sanitizeEmail('contact@tycherainvest.com')

    expect(result).toBe('contact@tycherainvest.com')
    expect(console.warn).not.toHaveBeenCalled()
  })

  it('undefined input → returns canonical fallback email', () => {
    const result = sanitizeEmail(undefined)

    expect(result).toBe('contact@tycherainvest.com')
    expect(console.warn).not.toHaveBeenCalled()
  })
})
