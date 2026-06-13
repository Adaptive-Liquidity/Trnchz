```markdown
# Trnchz Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the Trnchz TypeScript codebase. It covers file organization, code style, import/export patterns, commit message habits, and testing strategies. By following these guidelines, contributors can maintain consistency and quality across the project.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `userProfile.ts`, `dataFetcher.ts`

### Import Style
- Use **relative imports** for modules within the project.
  - Example:
    ```typescript
    import { fetchData } from './dataFetcher';
    ```

### Export Style
- Use **named exports**.
  - Example:
    ```typescript
    // In userProfile.ts
    export function getUserProfile(id: string) { ... }

    // In another file
    import { getUserProfile } from './userProfile';
    ```

### Commit Messages
- Freeform style, no enforced prefixes.
- Average commit message length: ~61 characters.
- Example:
  ```
  Add user authentication logic to login page
  ```

## Workflows

### Adding a New Feature
**Trigger:** When implementing a new feature or module  
**Command:** `/add-feature`

1. Create a new file using camelCase naming.
2. Write your TypeScript code, using named exports.
3. Use relative imports for any dependencies.
4. Write corresponding tests in a `.test.ts` file.
5. Commit changes with a clear, descriptive message.

### Writing Tests
**Trigger:** When adding or updating functionality  
**Command:** `/write-test`

1. Create a test file named `featureName.test.ts` alongside the feature.
2. Implement tests using the project's preferred (unknown) testing framework.
3. Ensure all named exports are covered by tests.
4. Run tests to verify correctness.

### Refactoring Code
**Trigger:** When improving or reorganizing existing code  
**Command:** `/refactor`

1. Update file names to camelCase if necessary.
2. Ensure all imports are relative and exports are named.
3. Update or add tests as needed.
4. Commit with a message describing the refactor.

## Testing Patterns

- Test files follow the pattern: `*.test.ts`
- Tests are colocated with the code they test.
- The specific testing framework is not detected; follow standard TypeScript testing practices.
- Example test file:
  ```typescript
  // userProfile.test.ts
  import { getUserProfile } from './userProfile';

  describe('getUserProfile', () => {
    it('returns correct user data', () => {
      // test implementation
    });
  });
  ```

## Commands
| Command        | Purpose                                        |
|----------------|------------------------------------------------|
| /add-feature   | Start the workflow for adding a new feature    |
| /write-test    | Guide for writing and organizing tests         |
| /refactor      | Steps for refactoring code and maintaining style|
```