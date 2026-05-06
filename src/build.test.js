/**
 * @jest-environment node
 */

const fs = require('fs');
const path = require('path');

describe('Build folder', () => {
  test('build/index.html 파일이 존재', () => {
    const indexPath = path.join(__dirname, '..', '..', 'build', 'index.html');
    expect(fs.existsSync(indexPath)).toBe(true);
  });
});