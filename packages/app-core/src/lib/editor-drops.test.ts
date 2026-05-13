import { describe, expect, it } from 'vitest'
import {
  formatImportedAssetsForInsertion,
  importedAssetForExistingVaultAsset
} from './editor-drops'

describe('editor drop helpers', () => {
  it('turns an existing vault asset into embed markdown', () => {
    expect(
      importedAssetForExistingVaultAsset({
        path: 'media/zennotes logo.png',
        name: 'zennotes logo.png',
        kind: 'image',
        siblingOrder: 0,
        size: 42,
        updatedAt: 1
      })
    ).toEqual({
      path: 'media/zennotes logo.png',
      name: 'zennotes logo.png',
      kind: 'image',
      markdown: '![[media/zennotes logo.png]]'
    })
  })

  it('keeps dropped media tight when inserting on an empty editor line', () => {
    expect(
      formatImportedAssetsForInsertion(
        [
          {
            path: 'media/zennotes logo.png',
            name: 'zennotes logo.png',
            kind: 'image',
            markdown: '![[media/zennotes logo.png]]'
          }
        ],
        '\n',
        ''
      )
    ).toBe('![[media/zennotes logo.png]]\n')
  })

  it('separates dropped media from surrounding prose without adding an extra trailing blank line', () => {
    expect(
      formatImportedAssetsForInsertion(
        [
          {
            path: 'media/zennotes logo.png',
            name: 'zennotes logo.png',
            kind: 'image',
            markdown: '![[media/zennotes logo.png]]'
          }
        ],
        't',
        ''
      )
    ).toBe('\n\n![[media/zennotes logo.png]]\n')
  })
})
