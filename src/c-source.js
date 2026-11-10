export function extractFunctionSource(source, symbol) {
  let searchFrom = 0;
  while (searchFrom < source.length) {
    const symbolIndex = source.indexOf(symbol, searchFrom);
    if (symbolIndex < 0) return null;

    const before = source[symbolIndex - 1] ?? '';
    const after = source[symbolIndex + symbol.length] ?? '';
    if ((before && /[A-Za-z0-9_]/.test(before)) || (after && /[A-Za-z0-9_]/.test(after))) {
      searchFrom = symbolIndex + symbol.length;
      continue;
    }

    const openParen = source.indexOf('(', symbolIndex + symbol.length);
    if (openParen < 0) return null;

    let parenDepth = 0;
    let closeParen = -1;
    for (let index = openParen; index < source.length; index += 1) {
      if (source[index] === '(') parenDepth += 1;
      if (source[index] === ')') {
        parenDepth -= 1;
        if (parenDepth === 0) {
          closeParen = index;
          break;
        }
      }
    }
    if (closeParen < 0) return null;

    let braceStart = closeParen + 1;
    while (/\s/.test(source[braceStart] ?? '')) braceStart += 1;
    if (source[braceStart] !== '{') {
      searchFrom = symbolIndex + symbol.length;
      continue;
    }

    let start = source.lastIndexOf('\n', symbolIndex);
    start = start < 0 ? 0 : start + 1;
    let braceDepth = 0;
    let inString = false;
    let quote = '';
    let escaped = false;

    for (let index = braceStart; index < source.length; index += 1) {
      const value = source[index];

      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (value === '\\') {
          escaped = true;
        } else if (value === quote) {
          inString = false;
        }
        continue;
      }

      if (value === '"' || value === "'") {
        inString = true;
        quote = value;
        continue;
      }

      if (value === '{') braceDepth += 1;
      if (value === '}') {
        braceDepth -= 1;
        if (braceDepth === 0) return source.slice(start, index + 1).trim();
      }
    }
    return null;
  }
  return null;
}
