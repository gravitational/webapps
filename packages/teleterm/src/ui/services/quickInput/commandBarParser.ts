import { createToken, Lexer, CstParser, IToken, EOF } from 'chevrotain';
import { AutocompleteToken } from './types';

// Lexer

const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});
const TshSsh = createToken({ name: 'TshSsh', pattern: /tsh\s+ssh/ });
//const LoginAndHost = createToken({name: "LoginAndHost", pattern: /[a-z0-9_][a-z0-9_-]*@\S*/i})
// const Login = createToken({name: "Login", pattern: /[a-z0-9_][a-z0-9_-]*/i})
// const CredentialWord = createToken({
//   name: 'CredentialWord',
//   pattern: /[^@\s]+/,
// });
const Word = createToken({ name: 'Word', pattern: /[^\s]+/ });
const At = createToken({ name: 'At', pattern: /@/ });

const allTokens = [TshSsh, WhiteSpace, At, Word];

// Labels only affect error messages and Diagrams.
At.LABEL = '@';

const CommandBarLexer = new Lexer(allTokens, {
  positionTracking: 'onlyOffset',
});

// Parser

export default class CommandBarParser extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  command = this.RULE('command', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.tshSsh) },
      { ALT: () => this.SUBRULE(this.otherCommand) },
    ]);
  });

  otherCommand = this.RULE('otherCommand', () => {
    while (this.LA(1).tokenType !== EOF) {
      this.CONSUME(Word);
    }
  });

  // TODO(ravicious): Support arbitrary command at the end.
  tshSsh = this.RULE('tshSsh', () => {
    this.CONSUME(TshSsh);
    this.OPTION(() => {
      this.SUBRULE(this.loginAndHost);
    });
  });

  loginAndHost = this.RULE('loginAndHost', () => {
    this.CONSUME1(Word);
  });
}

function toAutocompleteToken(token: IToken): AutocompleteToken {
  return {
    value: token.image,
    startIndex: token.startOffset,
  };
}

const parserInstance = new CommandBarParser();

const BaseCstVisitor = parserInstance.getBaseCstVisitorConstructor();

class CommandBarVisitor extends BaseCstVisitor {
  constructor() {
    super();

    this.validateVisitor();
  }

  command(ctx) {
    return this.visit(ctx.tshSsh) || this.visit(ctx.otherCommand);
  }

  private otherCommand(ctx) {
    return {
      kind: 'other-command',
      token: ctx.Word.map(word => word.image).join(' '),
    };
  }

  private tshSsh(ctx) {
    const credentials = this.visit(ctx.loginAndHost) || {};

    return {
      kind: 'tsh.ssh',
      ...credentials,
    };
  }

  // TODO(ravicious): Handle inputs like foo@bar@baz. They're not necessarily valid, but we don't
  // want to lose the text that was in the input.
  private loginAndHost(ctx): {
    login: AutocompleteToken;
    host?: AutocompleteToken;
    at?: AutocompleteToken;
  } {
    const word = ctx.Word[0];
    const [login, host] = word.image.split('@', 2);
    const loginOffset = word.startOffset;
    const loginToken = { value: login, startIndex: loginOffset };
    const hostToken = !!host && {
      value: host,
      startIndex: loginOffset + login.length + 1, // Account for the @ sign.
    };
    const atToken = word.image.indexOf('@') !== -1 && {
      value: '@',
      startIndex: loginOffset + login.length,
    };

    return {
      login: loginToken,
      host: hostToken,
      at: atToken,
    };
  }
}

const visitorInstance = new CommandBarVisitor();

export function toAst(input) {
  const lexResult = CommandBarLexer.tokenize(input);
  parserInstance.input = lexResult.tokens;
  const cst = parserInstance.command();

  if (parserInstance.errors.length > 0) {
    // TODO: Remove this?
    console.error(parserInstance.errors);
    throw new Error(
      'Issue while parsing:\n' + parserInstance.errors[0].message
    );
  }

  const ast = visitorInstance.visit(cst);
  return ast;
}
