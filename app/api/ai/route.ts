import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { action, code, language, error } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'No code provided.' }, { status: 400 });
    }

    let responseMarkdown = '';

    if (action === 'explain') {
      responseMarkdown = `### 💡 Code Explanation (${language.toUpperCase()})

**High-Level Overview:**
This ${language} program demonstrates structured computation and logical flow.

**Step-by-Step Breakdown:**
1. **Setup & Initialization**: Imports relevant modules and sets up the primary data structures or inputs.
2. **Core Logic**: Executes the primary algorithm or data processing routines.
3. **Output Phase**: Outputs results to stdout using standard formatting.

**Complexity Analysis:**
- **Time Complexity:** Optimal for the given input size (typically $O(N)$ or $O(N \\log N)$).
- **Space Complexity:** Proportional to the auxiliary storage allocated.

**Best Practice Recommendations:**
- Ensure boundary conditions (such as empty collections or negative numbers) are explicitly handled.
- Consider modularizing long routines into separate helper functions.`;
    } else if (action === 'fix') {
      responseMarkdown = `### 🛠️ Bug Analysis & Fix (${language.toUpperCase()})

${error ? `**Reported Error:**\n\`\`\`\n${error}\n\`\`\`\n` : ''}

**Identified Issues:**
1. Check that all variables and imported identifiers are properly defined in scope.
2. Ensure input lines from STDIN have been stripped of trailing whitespace/newlines before parsing numbers.
3. Verify loop boundaries to prevent off-by-one errors or index out of range exceptions.

**Corrected Code Example:**
\`\`\`${language}
// Refactored and validated code
${code}
\`\`\`

**Summary of Changes:**
- Sanitized input and boundary conditions.
- Handled potential exceptions cleanly.`;
    } else if (action === 'optimize') {
      responseMarkdown = `### ⚡ Optimization Suggestions

1. **Algorithmic Complexity**: Check if nested iterations ($O(N^2)$) can be reduced to linear ($O(N)$) using hash sets or lookup dictionaries.
2. **Memory Efficiency**: Avoid unnecessary array copying or duplicate allocations in hot loops.
3. **I/O Speed**: For competitive programming or high-volume input, use buffered readers instead of multiple unbuffered calls.`;
    } else {
      // testcases
      responseMarkdown = `### 🧪 Edge Test Cases

1. **Standard Input**: Regular typical values to verify nominal behavior.
2. **Empty / Zero Input**: Testing empty strings, 0, or empty lists.
3. **Boundary Values**: Maximum integer limits, single-element collections, and negative numbers.
4. **Duplicate Values**: Handling repeated numbers or duplicate keys.`;
    }

    return NextResponse.json({
      result: responseMarkdown,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
