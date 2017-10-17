// @flow
import { reduce, match, type ASTNode, BabelTypeError } from '../src/index';

const reducer = (path, context, reduce) => match(path.node, {
  Program() {
    let results = [];

    for (let item of path.get('body')) {
      if (path.type === 'ExportNamedDeclaration' || path.type === 'ExportDefaultDeclaration') {
        results = results.concat(reduce(item, context));
      }
    }

    results;
  },

  ExportNamedDeclaration() {
    // ...
  },

  ExportDefaultDeclaration() {
    // ...
  },

  else() {
    throw new BabelTypeError(context.ast, path.node, `Missing reducer for ${path.node.type}`);
  },
});

export default function getExports(ast: ASTNode) {
  return reduce(ast, reducer, { ast });
}
