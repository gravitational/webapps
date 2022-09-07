# Using Styled Components

We've created a custom wrapper on top of `styled-components` that allows for use of modifiers from `styled-system` to be
composed whilst the typings from the modifier are persisted to the component.

This means that we get automatic type safety when using anything from `styled-system`.

## What does this mean for me?

We now have full typings for the theme! This means you can't use theme properties that do not exist.

Most of the components from the design system are also now typed, so you'll get autocompletion when filling in props.

Instead of importing from `styled-components` (which will provide a linting error), you should import `design/styled`.

You'll also need to provide typings for any styled components that take extra props.

## The new API

### Normal usage

The API works the same if you're not using anything from `styled-system`, such as

```typescript jsx
import styled from 'design/styled';

const Container = styled.div`
  background: red;
`;

function Home() {
  return (
    <Container>
      I am a container
    </Container>
  );
}
```

### Typed usage

If you need custom props in your styled component, you should make an `interface` and provide it to the styled component definition.

```typescript jsx
import styled from 'design/styled';

interface ContainerProps {
  isRed: boolean;
}

const Container = styled.div<ContainerProps>`
  background: ${(p) => p.isRed ? 'red' : 'blue'};
`;

function Home() {
  const [isRed, setIsRed] = useState(true);
  
  return (
    <Container isRed={isRed} onClick={() => setIsRed(!isRed)}>
      I am a container
    </Container>
  );
}
```

This will offer you type completion - you'll get an autocomplete hint for `isRed` when accessing the props in the component.

### Composing with `styled-system`

`design/styled` also exports the most used `styled-system` modifiers, such as `height`, `width`, etc.

You would compose these like so:

```typescript jsx
import styled, { height, width, padding } from 'design/styled';

const Container = styled.div([height, width, padding])`
  background: red;
`;

function Home() {
  return (
    <Container pt={5} width={100} height={650}> // all of these props are typed
      I am a container
    </Container>
  )
}
```

If you need to have custom props, you'd provide them in a similar way to the example above.

```typescript jsx
import styled, { height, width, padding } from 'design/styled';

interface ContainerProps {
  isRed: boolean;
}

const Container = styled.div([height, width, padding])<ContainerProps>`
  background: ${(p) => p.isRed ? 'red' : 'blue'};
`;

function Home() {
  const [isRed, setIsRed] = useState(true);
  
  return (
    <Container 
      isRed={isRed} 
      onClick={() => setIsRed(!isRed)}
      pt={5} 
      width={100}
      height={650}
    >
      I am a container
    </Container>
  );
}
```

If you need to style an existing component and also include modifiers from `styled-system`, you can do this:

```typescript jsx
import styled, { height, width, padding } from 'design/styled';

interface ContainerProps {
  isRed: boolean;
}

const Container = styled.div([padding])<ContainerProps>`
  background: ${(p) => p.isRed ? 'red' : 'blue'};
`;

const Wrapper = styled(Container, [height, width])`
  border: 1px solid green;
`;

function Home() {
  const [isRed, setIsRed] = useState(true);
  
  return (
    <Wrapper 
      isRed={isRed} 
      onClick={() => setIsRed(!isRed)}
      pt={5} 
      width={100}
      height={650}
    >
      I am a wrapper
    </Wrapper>
  );
}
```

**NOTE** We do not expose `space` from `styled-system`. Instead, use `margin` and `padding`. For some reason `space` would mess up the autocompletion in IDEs.
