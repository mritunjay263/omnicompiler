import { EXTRA_LANGUAGES } from './extraLanguages';
export interface LanguageTemplate {
  name: string;
  description: string;
  code: string;
  stdin?: string;
}

export interface LanguageDocSection {
  title: string;
  content: string;
  codeSnippet?: string;
}

export interface LanguageConfig {
  id: string;
  name: string;
  category: 'popular' | 'programming' | 'web' | 'database' | 'scripting';
  extension: string;
  monacoLang: string;
  defaultFileName: string;
  defaultCode: string;
  defaultStdin?: string;
  version: string;
  icon: string;
  badge?: string;
  templates: LanguageTemplate[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  overview: string;
  stdinHelp: string;
  syntaxHelp: LanguageDocSection[];
  supportedLibraries?: { name: string; description: string }[];
}

export const LANGUAGES: Record<string, LanguageConfig> = {
  python: {
    id: 'python',
    name: 'Python',
    category: 'popular',
    extension: '.py',
    monacoLang: 'python',
    defaultFileName: 'main.py',
    version: '3.12',
    icon: '🐍',
    defaultCode: `# Python 3 Online Compiler & Runner
import sys

def greet(name):
    return f"Hello, {name}! Welcome to OmniCompiler."

print("=== Python 3 Playground ===")
user_name = "Developer"
print(greet(user_name))

# Sample calculation
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [n for n in numbers if n % 2 == 0]
print(f"Even numbers: {evens}")
print(f"Sum of evens: {sum(evens)}")
`,
    defaultStdin: 'Alice\n25',
    templates: [
      {
        name: 'Hello World',
        description: 'Basic print statement and variables',
        code: `print("Hello, World!")\nname = "Pythonista"\nprint(f"Happy coding, {name}!")\n`,
      },
      {
        name: 'STDIN Input Example',
        description: 'Read inputs from stdin',
        stdin: 'World\n42',
        code: `import sys\n\nprint("Reading input from STDIN:")\nname = sys.stdin.readline().strip()\nage = sys.stdin.readline().strip()\nprint(f"Hello {name}, you entered age {age}!")\n`,
      },
      {
        name: 'Two Sum Problem (LeetCode #1)',
        description: 'Optimal hash map solution with O(n) time complexity',
        code: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

numbers = [2, 7, 11, 15]
target = 9
indices = two_sum(numbers, target)
print(f"Nums: {numbers}, Target: {target}")
print(f"Indices: {indices}")
print(f"Values: {numbers[indices[0]]} + {numbers[indices[1]]} = {target}")
`,
      },
      {
        name: 'Binary Search Algorithm',
        description: 'Optimal search in sorted array O(log n)',
        code: `def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nnumbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\ntarget = 23\nresult = binary_search(numbers, target)\nprint(f"Array: {numbers}")\nprint(f"Element {target} found at index: {result}")\n`,
      },
      {
        name: 'Fibonacci Sequence',
        description: 'Generate Fibonacci numbers with memoization',
        code: `def fibonacci(n, memo={}):\n    if n in memo:\n        return memo[n]\n    if n <= 1:\n        return n\n    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)\n    return memo[n]\n\nprint("First 15 Fibonacci Numbers:")\nfibs = [fibonacci(i) for i in range(15)]\nprint(fibs)\n`,
      },
      {
        name: 'Quick Sort',
        description: 'Divide and conquer sorting algorithm',
        code: `def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)\n\nunsorted = [64, 34, 25, 12, 22, 11, 90]\nprint(f"Unsorted: {unsorted}")\nprint(f"Sorted:   {quicksort(unsorted)}")\n`,
      },
    ],
    seo: {
      title: 'Python Online Compiler & Interpreter - Free Code Runner',
      description: 'Write, run, debug, and share Python code online with OmniCompiler. Supports Python 3, stdin inputs, data science algorithms, and fast execution.',
      keywords: ['python online compiler', 'python interpreter online', 'run python 3', 'python code runner', 'python ide online'],
    },
    overview: 'Python is a high-level, interpreted programming language created by Guido van Rossum and released in 1991. Known for its clean syntax and readability, Python powers everything from web applications and automated scripting to artificial intelligence, machine learning, and data science.',
    stdinHelp: 'You can supply user input to your Python programs using the STDIN tab. When your program invokes `input()` or `sys.stdin.readline()`, it consumes lines specified in the STDIN input box.',
    syntaxHelp: [
      {
        title: 'Conditional Statements (if / elif / else)',
        content: 'Python uses clean indentation to group statements based on logical conditions.',
        codeSnippet: `score = 85\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelse:\n    print("Grade: C")`,
      },
      {
        title: 'For Loops & Iteration',
        content: 'Iterate over collections, ranges, or custom iterators seamlessly.',
        codeSnippet: `fruits = ["Apple", "Banana", "Cherry"]\nfor idx, fruit in enumerate(fruits, start=1):\n    print(f"{idx}. {fruit}")`,
      },
      {
        title: 'Dictionaries & List Comprehensions',
        content: 'Idiomatic data structures make transformations fast and concise.',
        codeSnippet: `users = {"alice": 28, "bob": 34, "carol": 22}\nadults = {k: v for k, v in users.items() if v >= 25}\nprint(adults)`,
      },
    ],
    supportedLibraries: [
      { name: 'Standard Library', description: 'math, sys, os, json, itertools, collections, re, datetime, random' },
      { name: 'NumPy', description: 'High-performance multi-dimensional array processing' },
      { name: 'Pandas', description: 'Data structures and analysis tools for tabular data' },
      { name: 'Scikit-learn', description: 'Machine learning algorithms and data pre-processing' },
      { name: 'SciPy', description: 'Scientific computation and numerical optimization routines' },
    ],
  },

  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    category: 'popular',
    extension: '.js',
    monacoLang: 'javascript',
    defaultFileName: 'index.js',
    version: 'ES2024 / Node 22',
    icon: '⚡',
    defaultCode: `// JavaScript Online Runner & Playground
console.log("=== JavaScript Playground ===");

function calculateStats(items) {
  const sum = items.reduce((acc, val) => acc + val, 0);
  const avg = sum / items.length;
  const max = Math.max(...items);
  const min = Math.min(...items);
  return { sum, avg, max, min };
}

const numbers = [12, 45, 67, 89, 34, 23, 90];
console.log("Dataset:", numbers);
console.log("Statistics:", calculateStats(numbers));

// Async/Await demonstration
async function simulateAsyncWork() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Async task resolved successfully!"), 100);
  });
}

simulateAsyncWork().then(console.log);
`,
    defaultStdin: 'Developer\nJavaScript',
    templates: [
      {
        name: 'Hello World',
        description: 'Basic JavaScript console output',
        code: `console.log("Hello, World!");\nconst framework = "React & Node.js";\nconsole.log(\`Powering modern web apps with \${framework}\`);\n`,
      },
      {
        name: 'Array Methods Mastery',
        description: 'Map, filter, reduce, and find',
        code: `const products = [\n  { id: 1, name: "Laptop", price: 999, inStock: true },\n  { id: 2, name: "Mouse", price: 49, inStock: true },\n  { id: 3, name: "Monitor", price: 299, inStock: false },\n  { id: 4, name: "Keyboard", price: 89, inStock: true }\n];\n\nconst available = products.filter(p => p.inStock);\nconst totalValue = available.reduce((sum, p) => sum + p.price, 0);\nconsole.log("Available Products:", available.map(p => p.name));\nconsole.log(\`Total Stock Value: $\${totalValue}\`);\n`,
      },
      {
        name: 'Two Sum Problem (LeetCode #1)',
        description: 'Optimal Map-based hash table lookup O(n)',
        code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

const nums = [2, 7, 11, 15];
const target = 9;
const result = twoSum(nums, target);
console.log("Input Array:", nums, "Target:", target);
console.log("Solution Indices:", result);
console.log(\`Values: \${nums[result[0]]} + \${nums[result[1]]} = \${target}\`);
`,
      },
      {
        name: 'Debounce & Throttle Implementation',
        description: 'Classic frontend interview problem',
        code: `function debounce(func, delay) {\n  let timeoutId;\n  return function (...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => func.apply(this, args), delay);\n  };\n}\n\nconst logMsg = debounce((text) => console.log("Debounced:", text), 50);\nlogMsg("Event 1");\nlogMsg("Event 2");\nlogMsg("Event 3 - Only this fires!");\n`,
      },
    ],
    seo: {
      title: 'JavaScript Online Compiler & Node.js Runner - OmniCompiler',
      description: 'Run JavaScript and Node.js online. Test ES6+ features, async/await, modern algorithms, and APIs with zero setup.',
      keywords: ['javascript online compiler', 'run javascript online', 'nodejs online compiler', 'javascript playground', 'js runner'],
    },
    overview: 'JavaScript is the ubiquitous programming language of the modern web and full-stack development. Running in modern browsers and server environments like Node.js and Bun, JavaScript provides event-driven, non-blocking asynchronous execution.',
    stdinHelp: 'In Node.js, stdin is captured via `process.stdin` or `fs.readFileSync(0, "utf-8")`. Enter your inputs in the STDIN tab before clicking Run.',
    syntaxHelp: [
      {
        title: 'Modern Destructuring & Spread Syntax',
        content: 'Unpack objects and arrays with clean, declarative syntax.',
        codeSnippet: `const user = { id: 1, username: "dev_hero", role: "admin" };\nconst { username, ...meta } = user;\nconsole.log(username, meta);`,
      },
      {
        title: 'Promises & Async / Await',
        content: 'Handle asynchronous operations without callback pyramids.',
        codeSnippet: `const fetchData = async () => {\n  return { status: 200, data: "Success" };\n};\nconst res = await fetchData();\nconsole.log(res);`,
      },
    ],
  },

  cpp: {
    id: 'cpp',
    name: 'C++',
    category: 'popular',
    extension: '.cpp',
    monacoLang: 'cpp',
    defaultFileName: 'main.cpp',
    version: 'C++20 / Clang',
    icon: '⚙️',
    defaultCode: `// C++ 20 Online Compiler
#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>

int main() {
    std::cout << "=== C++ 20 Online Compiler ===" << std::endl;
    
    std::vector<int> numbers = {10, 25, 4, 89, 42, 67, 19};
    std::cout << "Original vector: ";
    for (int n : numbers) std::cout << n << " ";
    std::cout << std::endl;
    
    std::sort(numbers.begin(), numbers.end());
    std::cout << "Sorted vector:   ";
    for (int n : numbers) std::cout << n << " ";
    std::cout << std::endl;
    
    int sum = std::accumulate(numbers.begin(), numbers.end(), 0);
    std::cout << "Sum of elements: " << sum << std::endl;
    
    return 0;
}
`,
    defaultStdin: '10 20',
    templates: [
      {
        name: 'Hello World',
        description: 'Standard C++ Hello World with iostream',
        code: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World from C++!" << std::endl;\n    return 0;\n}\n`,
      },
      {
        name: 'STDIN Input (cin)',
        description: 'Read two numbers and print their sum',
        stdin: '45 55',
        code: `#include <iostream>\n\nint main() {\n    int a, b;\n    if (std::cin >> a >> b) {\n        std::cout << a << " + " << b << " = " << (a + b) << std::endl;\n    } else {\n        std::cout << "Please provide two integers in STDIN!" << std::endl;\n    }\n    return 0;\n}\n`,
      },
      {
        name: 'Two Sum Problem (LeetCode #1)',
        description: 'Optimal hash map solution using std::unordered_map O(n)',
        code: `#include <iostream>
#include <vector>
#include <unordered_map>

std::vector<int> twoSum(const std::vector<int>& nums, int target) {
    std::unordered_map<int, int> numMap;
    for (int i = 0; i < nums.size(); ++i) {
        int complement = target - nums[i];
        if (numMap.find(complement) != numMap.end()) {
            return {numMap[complement], i};
        }
        numMap[nums[i]] = i;
    }
    return {};
}

int main() {
    std::vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    std::vector<int> result = twoSum(nums, target);
    
    std::cout << "Target: " << target << std::endl;
    if (!result.empty()) {
        std::cout << "Indices: [" << result[0] << ", " << result[1] << "]" << std::endl;
        std::cout << "Values: " << nums[result[0]] << " + " << nums[result[1]] << " = " << target << std::endl;
    }
    return 0;
}
`,
      },
      {
        name: 'Binary Search Tree (BST)',
        description: 'Node insertion and in-order traversal',
        code: `#include <iostream>\n\nstruct Node {\n    int val;\n    Node* left;\n    Node* right;\n    Node(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nNode* insert(Node* root, int val) {\n    if (!root) return new Node(val);\n    if (val < root->val) root->left = insert(root->left, val);\n    else root->right = insert(root->right, val);\n    return root;\n}\n\nvoid inorder(Node* root) {\n    if (!root) return;\n    inorder(root->left);\n    std::cout << root->val << " ";\n    inorder(root->right);\n}\n\nint main() {\n    Node* root = nullptr;\n    int vals[] = {50, 30, 20, 40, 70, 60, 80};\n    for (int v : vals) root = insert(root, v);\n    std::cout << "BST Inorder Traversal: ";\n    inorder(root);\n    std::cout << std::endl;\n    return 0;\n}\n`,
      },
    ],
    seo: {
      title: 'C++ Online Compiler & Runner (C++20/C++17) - OmniCompiler',
      description: 'Write, compile, and run C++ code online with instant execution. High performance, Clang/GCC compiler support, STL algorithms, and stdin support.',
      keywords: ['c++ online compiler', 'run c++ online', 'cpp online ide', 'c++ 20 online compiler', 'compile cpp online'],
    },
    overview: 'C++ is a high-performance, statically-typed, compiled general-purpose programming language created by Bjarne Stroustrup. It provides low-level memory manipulation alongside high-level object-oriented and generic programming abstractions.',
    stdinHelp: 'C++ reads inputs using `std::cin`. You can provide multiple space-separated or newline-separated values inside the STDIN tab.',
    syntaxHelp: [
      {
        title: 'Vectors and STL Containers',
        content: 'Standard Template Library (STL) provides robust, dynamic containers and algorithms.',
        codeSnippet: `#include <vector>\n#include <iostream>\n\nstd::vector<int> v = {1, 2, 3};\nv.push_back(4);\nfor (auto x : v) std::cout << x << " ";`,
      },
    ],
  },

  c: {
    id: 'c',
    name: 'C',
    category: 'popular',
    extension: '.c',
    monacoLang: 'c',
    defaultFileName: 'main.c',
    version: 'C17 / Clang',
    icon: '🔷',
    defaultCode: `// C Language Online Compiler
#include <stdio.h>
#include <stdlib.h>

int main() {
    printf("=== C Online Compiler ===\\n");
    
    int numbers[] = {12, 34, 54, 2, 3};
    int n = sizeof(numbers) / sizeof(numbers[0]);
    int sum = 0;
    
    printf("Array elements: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", numbers[i]);
        sum += numbers[i];
    }
    printf("\\nSum = %d\\n", sum);
    printf("Average = %.2f\\n", (float)sum / n);
    
    return 0;
}
`,
    defaultStdin: '24 76',
    templates: [
      {
        name: 'Hello World',
        description: 'Standard C hello world',
        code: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}\n`,
      },
      {
        name: 'Pointers & Dynamic Memory',
        description: 'malloc, free, and pointer arithmetic',
        code: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n = 5;\n    int *arr = (int*)malloc(n * sizeof(int));\n    if (!arr) return 1;\n    \n    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 10;\n    printf("Dynamically allocated array: ");\n    for (int i = 0; i < n; i++) printf("%d ", *(arr + i));\n    printf("\\n");\n    \n    free(arr);\n    return 0;\n}\n`,
      },
    ],
    seo: {
      title: 'C Online Compiler & GCC/Clang Runner - OmniCompiler',
      description: 'Free online C compiler and runner. Write, compile, and debug C programs with standard input support, memory pointers, and instant output.',
      keywords: ['c online compiler', 'run c online', 'c language online', 'c ide', 'compile c code'],
    },
    overview: 'C is one of the foundational procedural programming languages created by Dennis Ritchie in 1972 at Bell Labs. It remains the backbone of operating systems, embedded systems, drivers, and high-performance computing.',
    stdinHelp: 'C reads standard input using `scanf()` or `fgets()`. Enter the inputs sequentially in the STDIN tab before executing.',
    syntaxHelp: [
      {
        title: 'Reading Input with scanf',
        content: 'Format specifiers like %d and %s read from stdin.',
        codeSnippet: `int age;\nprintf("Enter age: ");\nscanf("%d", &age);\nprintf("Age is %d\\n", age);`,
      },
    ],
  },

  java: {
    id: 'java',
    name: 'Java',
    category: 'popular',
    extension: '.java',
    monacoLang: 'java',
    defaultFileName: 'Main.java',
    version: 'Java 21 LTS',
    icon: '☕',
    defaultCode: `// Java Online Compiler & Runner
import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Java 21 Online Compiler ===");
        
        List<String> languages = Arrays.asList("Java", "Kotlin", "Scala", "Groovy");
        System.out.println("JVM Languages: " + languages);
        
        int[] scores = {95, 82, 88, 74, 91};
        double average = Arrays.stream(scores).average().orElse(0.0);
        System.out.printf("Average Score: %.2f%n", average);
        
        System.out.println("Status: Java executed successfully!");
    }
}
`,
    defaultStdin: 'OmniCompiler 2026',
    templates: [
      {
        name: 'Hello World',
        description: 'Standard Java Main class',
        code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n`,
      },
      {
        name: 'Scanner Input (STDIN)',
        description: 'Read user inputs with java.util.Scanner',
        stdin: 'John 25',
        code: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String name = sc.next();\n            int age = sc.nextInt();\n            System.out.println("Hello " + name + ", age: " + age);\n        } else {\n            System.out.println("Please provide input in the STDIN tab.");\n        }\n    }\n}\n`,
      },
    ],
    seo: {
      title: 'Java Online Compiler & IDE (Java 21) - OmniCompiler',
      description: 'Write, compile, and run Java code online. Supports Java 21, Scanner stdin, collections, object-oriented programming, and multi-file projects.',
      keywords: ['java online compiler', 'run java online', 'java ide online', 'compile java 21', 'java code runner'],
    },
    overview: 'Java is an object-oriented, class-based programming language built on the principle of "Write Once, Run Anywhere" (WORA). It is the backbone of enterprise backends, Android development, and massive distributed platforms.',
    stdinHelp: 'Java reads inputs via `java.util.Scanner(System.in)` or `BufferedReader`. Specify your inputs in the STDIN tab.',
    syntaxHelp: [
      {
        title: 'Classes and Methods',
        content: 'All Java execution starts from public static void main.',
        codeSnippet: `public class Calculator {\n    public static int add(int a, int b) { return a + b; }\n}`,
      },
    ],
  },

  html: {
    id: 'html',
    name: 'HTML/CSS/JS',
    category: 'web',
    extension: '.html',
    monacoLang: 'html',
    defaultFileName: 'index.html',
    version: 'HTML5 / CSS3 / ES6',
    icon: '🌐',
    defaultCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OmniCompiler Web Studio</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 30px;
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .card {
      background: rgba(30, 41, 59, 0.7);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 32px;
      max-width: 480px;
      text-align: center;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
    }
    h1 {
      margin-top: 0;
      background: linear-gradient(to right, #38bdf8, #818cf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    button {
      background: #4f46e5;
      color: white;
      border: none;
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-top: 16px;
    }
    button:hover {
      background: #4338ca;
      transform: translateY(-2px);
    }
    #counter {
      font-size: 28px;
      font-weight: bold;
      color: #38bdf8;
      margin-top: 12px;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Web Studio Live Preview</h1>
    <p>Edit HTML, CSS, and JavaScript in real-time. Changes are rendered instantly in this sandboxed frame!</p>
    <div id="counter">Clicks: 0</div>
    <button id="btn">Click Me!</button>
  </div>

  <script>
    let count = 0;
    const btn = document.getElementById("btn");
    const display = document.getElementById("counter");

    btn.addEventListener("click", () => {
      count++;
      display.textContent = "Clicks: " + count;
      console.log("Button clicked, count is now:", count);
    });
  </script>
</body>
</html>
`,
    templates: [
      {
        name: 'Responsive Landing Card',
        description: 'Modern glassmorphic card with gradient and interactive JS',
        code: `<!-- Responsive Card Demo -->\n<div style="font-family:sans-serif; text-align:center; padding:40px; background:#090d16; color:#fff; border-radius:12px;">\n  <h2 style="color:#60a5fa;">Interactive Web Preview</h2>\n  <p>Test HTML/CSS/JS components instantly!</p>\n</div>\n`,
      },
      {
        name: 'Canvas Particle Animation',
        description: 'HTML5 Canvas with 2D animated particles',
        code: `<!DOCTYPE html>\n<html>\n<body style="margin:0; overflow:hidden; background:#050505;">\n<canvas id="c"></canvas>\n<script>\nconst c = document.getElementById("c");\nconst ctx = c.getContext("2d");\nc.width = window.innerWidth;\nc.height = window.innerHeight;\nlet particles = Array.from({length: 40}, () => ({\n  x: Math.random() * c.width, y: Math.random() * c.height,\n  vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,\n  r: Math.random() * 4 + 2\n}));\nfunction loop() {\n  ctx.clearRect(0, 0, c.width, c.height);\n  ctx.fillStyle = "#38bdf8";\n  particles.forEach(p => {\n    p.x += p.vx; p.y += p.vy;\n    if (p.x < 0 || p.x > c.width) p.vx *= -1;\n    if (p.y < 0 || p.y > c.height) p.vy *= -1;\n    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();\n  });\n  requestAnimationFrame(loop);\n}\nloop();\n</script>\n</body>\n</html>\n`,
      },
    ],
    seo: {
      title: 'HTML, CSS & JavaScript Online Editor & Live Preview - OmniCompiler',
      description: 'Live online HTML5, CSS3, and JavaScript code runner. Write code and see instant split-screen preview, inspect console logs, and share snippets.',
      keywords: ['html online editor', 'html css js runner', 'web playground', 'html live preview', 'frontend runner'],
    },
    overview: 'HTML, CSS, and JavaScript constitute the core tri-part technology stack of the World Wide Web. This environment provides real-time in-browser sandboxed rendering with interactive console inspection.',
    stdinHelp: 'HTML/CSS/JS runs directly in an isolated browser iframe sandbox. Use the Preview tab to see visual output and the Console tab to view console.log statements.',
    syntaxHelp: [
      {
        title: 'DOM Manipulation',
        content: 'Interact with HTML elements using standard JavaScript APIs.',
        codeSnippet: `const el = document.querySelector("#title");\nel.style.color = "cyan";`,
      },
    ],
  },

  sql: {
    id: 'sql',
    name: 'SQL (SQLite / MySQL)',
    category: 'database',
    extension: '.sql',
    monacoLang: 'sql',
    defaultFileName: 'queries.sql',
    version: 'SQL Standard / SQLite 3',
    icon: '🗄️',
    defaultCode: `-- SQL Online Playground & Database Runner
-- 1. Create a sample schema
CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    salary REAL NOT NULL,
    hired_year INTEGER NOT NULL
);

-- 2. Insert test records
INSERT INTO employees (name, department, salary, hired_year) VALUES
('Alice Chen', 'Engineering', 125000, 2021),
('Bob Martin', 'Design', 95000, 2022),
('Charlie Ross', 'Engineering', 140000, 2019),
('Diana Prince', 'Product', 115000, 2020),
('Evan Wright', 'Marketing', 85000, 2023),
('Fiona Gallagher', 'Engineering', 132000, 2022);

-- 3. Query high earners grouped by department
SELECT 
    department,
    COUNT(*) AS total_staff,
    ROUND(AVG(salary), 2) AS avg_salary,
    MAX(salary) AS max_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;

-- 4. Select detailed employee listings
SELECT id, name, department, salary, hired_year 
FROM employees 
WHERE salary >= 100000;
`,
    templates: [
      {
        name: 'E-Commerce Orders & Customers',
        description: 'Multi-table schema with JOIN queries',
        code: `CREATE TABLE customers (id INT PRIMARY KEY, name TEXT, country TEXT);\nCREATE TABLE orders (order_id INT PRIMARY KEY, customer_id INT, amount REAL);\n\nINSERT INTO customers VALUES (1, 'Alice', 'USA'), (2, 'Bob', 'UK'), (3, 'Charlie', 'Canada');\nINSERT INTO orders VALUES (101, 1, 250.00), (102, 1, 45.50), (103, 2, 120.00);\n\nSELECT c.name, c.country, SUM(o.amount) AS total_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nGROUP BY c.id;\n`,
      },
      {
        name: 'Window Functions (ROW_NUMBER & RANK)',
        description: 'Advanced SQL analytics with window functions',
        code: `CREATE TABLE sales (rep TEXT, region TEXT, amount INT);\nINSERT INTO sales VALUES \n('Alice', 'East', 5000), ('Bob', 'East', 7000), \n('Charlie', 'West', 4000), ('Diana', 'West', 9000);\n\nSELECT rep, region, amount,\n       RANK() OVER (PARTITION BY region ORDER BY amount DESC) as regional_rank\nFROM sales;\n`,
      },
    ],
    seo: {
      title: 'SQL Online Compiler & Database Runner (SQLite, MySQL, Postgres) - OmniCompiler',
      description: 'Write, execute, and visualize SQL queries online. Interactive table output, pre-seeded schemas, JOINs, aggregations, and zero server setup.',
      keywords: ['sql online compiler', 'run sql queries online', 'sqlite online runner', 'mysql online editor', 'sql playground'],
    },
    overview: 'SQL (Structured Query Language) is the domain-specific language used for managing and querying relational database management systems (RDBMS). OmniCompiler executes queries with interactive visual table rendering and column inspection.',
    stdinHelp: 'SQL execution produces tabulated result sets. Run queries sequentially (DDL: CREATE/INSERT, DML: SELECT) to view tabular data in the Table View tab.',
    syntaxHelp: [
      {
        title: 'Basic SELECT & WHERE',
        content: 'Filter data based on comparison expressions.',
        codeSnippet: `SELECT name, price FROM products WHERE price > 50 ORDER BY price DESC;`,
      },
      {
        title: 'JOIN Operations',
        content: 'Combine rows from two or more tables based on a related column.',
        codeSnippet: `SELECT u.name, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id;`,
      },
    ],
  },

  rust: {
    id: 'rust',
    name: 'Rust',
    category: 'programming',
    extension: '.rs',
    monacoLang: 'rust',
    defaultFileName: 'main.rs',
    version: 'Rust 1.78+',
    icon: '🦀',
    defaultCode: `// Rust Online Compiler
fn main() {
    println!("=== Rust Online Compiler ===");
    
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8];
    let squared_evens: Vec<i32> = numbers
        .iter()
        .filter(|&&x| x % 2 == 0)
        .map(|&x| x * x)
        .collect();
        
    println!("Original: {:?}", numbers);
    println!("Squared Evens: {:?}", squared_evens);
    
    let sum: i32 = squared_evens.iter().sum();
    println!("Sum of squares: {}", sum);
}
`,
    templates: [
      {
        name: 'Hello World',
        description: 'Standard Rust hello world',
        code: `fn main() {\n    println!("Hello, World from Rust!");\n}\n`,
      },
    ],
    seo: {
      title: 'Rust Online Compiler & Playground - OmniCompiler',
      description: 'Compile and run Rust code online with zero installation. Features Rust standard library, iterators, pattern matching, and instant execution.',
      keywords: ['rust online compiler', 'run rust online', 'rust playground', 'compile rust code'],
    },
    overview: 'Rust is a systems programming language focused on memory safety, concurrency, and zero-cost abstractions without garbage collection.',
    stdinHelp: 'Rust reads inputs via `std::io::stdin()`. Supply inputs in the STDIN tab before clicking Run.',
    syntaxHelp: [
      {
        title: 'Pattern Matching with match',
        content: 'Exhaustive pattern matching ensures every possibility is handled safely.',
        codeSnippet: `let val = 42;\nmatch val {\n    1 => println!("One"),\n    42 => println!("Answer to everything!"),\n    _ => println!("Other"),\n}`,
      },
    ],
  },

  go: {
    id: 'go',
    name: 'Go',
    category: 'programming',
    extension: '.go',
    monacoLang: 'go',
    defaultFileName: 'main.go',
    version: 'Go 1.22+',
    icon: '🐹',
    defaultCode: `// Go Online Compiler
package main

import (
	"fmt"
	"strings"
)

func main() {
	fmt.Println("=== Go Online Compiler ===")
	
	names := []string{"gopher", "golang", "concurrency", "channels"}
	for i, name := range names {
		fmt.Printf("%d: %s\\n", i+1, strings.ToUpper(name))
	}
	
	fmt.Println("Status: Go executed successfully!")
}
`,
    templates: [
      {
        name: 'Hello World',
        description: 'Standard Go main function',
        code: `package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World from Go!")\n}\n`,
      },
    ],
    seo: {
      title: 'Go (Golang) Online Compiler & Runner - OmniCompiler',
      description: 'Write, compile, and run Golang code online with fast execution. Supports Goroutines, slices, standard library, and stdin inputs.',
      keywords: ['go online compiler', 'golang runner', 'run go online', 'go ide'],
    },
    overview: 'Go is an open-source programming language developed by Google that makes it easy to build simple, reliable, and efficient software.',
    stdinHelp: 'Go reads standard input using `fmt.Scan()` or `bufio.NewScanner(os.Stdin)`.',
    syntaxHelp: [
      {
        title: 'Structs and Methods',
        content: 'Define custom types with receiver functions.',
        codeSnippet: `type User struct { Name string }\nfunc (u User) Greet() { fmt.Println("Hi", u.Name) }`,
      },
    ],
  },

  csharp: {
    id: 'csharp',
    name: 'C#',
    category: 'programming',
    extension: '.cs',
    monacoLang: 'csharp',
    defaultFileName: 'Program.cs',
    version: '.NET 8 / C# 12',
    icon: '🎯',
    defaultCode: `// C# Online Compiler
using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        Console.WriteLine("=== C# Online Compiler (.NET 8) ===");
        
        var numbers = new List<int> { 5, 12, 8, 33, 21, 6 };
        var evens = numbers.Where(n => n % 2 == 0).OrderBy(n => n).ToList();
        
        Console.WriteLine("Even numbers ordered: " + string.Join(", ", evens));
        Console.WriteLine("Sum: " + numbers.Sum());
    }
}
`,
    templates: [
      {
        name: 'Hello World',
        description: 'Standard C# console program',
        code: `using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World from C#!");\n    }\n}\n`,
      },
    ],
    seo: {
      title: 'C# Online Compiler (.NET 8) - OmniCompiler',
      description: 'Run C# code online. Supports LINQ, object-oriented principles, .NET 8 features, and stdin input with zero installation.',
      keywords: ['c# online compiler', 'csharp runner', 'run c# online', 'dotnet online'],
    },
    overview: 'C# is a modern, object-oriented, and type-safe programming language developed by Microsoft for the .NET platform.',
    stdinHelp: 'C# uses `Console.ReadLine()` to read inputs from the STDIN tab.',
    syntaxHelp: [
      {
        title: 'LINQ Query Syntax',
        content: 'Declarative queries over collections in C#.',
        codeSnippet: `var query = from num in numbers where num > 10 select num * 2;`,
      },
    ],
  },

  php: {
    id: 'php',
    name: 'PHP',
    category: 'programming',
    extension: '.php',
    monacoLang: 'php',
    defaultFileName: 'index.php',
    version: 'PHP 8.3',
    icon: '🐘',
    defaultCode: `<?php
// PHP Online Compiler
echo "=== PHP 8.3 Online Compiler ===\n";

$fruits = ["Apple", "Banana", "Cherry", "Date"];
$upperFruits = array_map('strtoupper', $fruits);

echo "Fruits: " . implode(", ", $upperFruits) . "\n";

$data = [
    "user" => "Admin",
    "role" => "Developer",
    "active" => true
];
echo "JSON Output: " . json_encode($data, JSON_PRETTY_PRINT) . "\n";
?>
`,
    templates: [
      {
        name: 'Hello World',
        description: 'Standard PHP hello world',
        code: `<?php\necho "Hello, World from PHP!\\n";\n?>\n`,
      },
    ],
    seo: {
      title: 'PHP Online Compiler & Interpreter (PHP 8.3) - OmniCompiler',
      description: 'Run PHP scripts online. Test PHP 8 syntax, arrays, JSON functions, regex, and algorithms with instant execution.',
      keywords: ['php online compiler', 'run php online', 'php runner', 'php online editor'],
    },
    overview: 'PHP is a popular general-purpose scripting language that is especially suited to web development and server-side processing.',
    stdinHelp: 'PHP reads inputs via `fgets(STDIN)` or `readline()`. Enter lines in the STDIN tab.',
    syntaxHelp: [
      {
        title: 'Associative Arrays',
        content: 'Key-value maps in PHP.',
        codeSnippet: `$person = ["name" => "Sarah", "city" => "Seattle"];\necho $person["name"];`,
      },
    ],
  },

  ruby: {
    id: 'ruby',
    name: 'Ruby',
    category: 'programming',
    extension: '.rb',
    monacoLang: 'ruby',
    defaultFileName: 'main.rb',
    version: 'Ruby 3.3',
    icon: '💎',
    defaultCode: `# Ruby Online Compiler
puts "=== Ruby Online Compiler ==="

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
cubes = numbers.select(&:even?).map { |n| n ** 3 }

puts "Even numbers cubed: #{cubes}"
puts "Sum: #{cubes.sum}"
`,
    templates: [
      {
        name: 'Hello World',
        description: 'Standard Ruby hello world',
        code: `puts "Hello, World from Ruby!"\n`,
      },
    ],
    seo: {
      title: 'Ruby Online Compiler & Interactive Runner - OmniCompiler',
      description: 'Run Ruby code online. Test blocks, enumerables, OOP classes, and gems with zero setup.',
      keywords: ['ruby online compiler', 'run ruby online', 'ruby code runner', 'ruby ide'],
    },
    overview: 'Ruby is a dynamic, open source programming language with a focus on simplicity and productivity, created by Yukihiro "Matz" Matsumoto.',
    stdinHelp: 'Ruby reads inputs using `gets.chomp` or `STDIN.read`.',
    syntaxHelp: [
      {
        title: 'Blocks and Enumerable',
        content: 'Iterate effortlessly using Ruby blocks.',
        codeSnippet: `["a", "b", "c"].each_with_index { |item, idx| puts "#{idx}: #{item}" }`,
      },
    ],
  },

  bash: {
    id: 'bash',
    name: 'Bash',
    category: 'scripting',
    extension: '.sh',
    monacoLang: 'shell',
    defaultFileName: 'script.sh',
    version: 'GNU bash 5.2',
    icon: '🐚',
    defaultCode: `#!/bin/bash
# Bash Online Shell Runner
echo "=== Bash Shell Scripting ==="
echo "Operating System: $(uname -s)"
echo "Current Date: $(date)"

COUNT=5
echo "Counting down:"
for (( i=$COUNT; i>0; i-- )); do
    echo "T-minus $i..."
done
echo "Lift off! Bash executed successfully."
`,
    templates: [
      {
        name: 'Hello World',
        description: 'Basic bash script',
        code: `#!/bin/bash\necho "Hello, World from Bash!"\n`,
      },
    ],
    seo: {
      title: 'Bash Online Compiler & Shell Script Runner - OmniCompiler',
      description: 'Run Bash shell scripts online. Test Linux CLI commands, loops, conditionals, and variables in a secure sandbox.',
      keywords: ['bash online compiler', 'run bash script online', 'shell script runner', 'linux terminal online'],
    },
    overview: 'Bash (Bourne Again SHell) is the standard command language and Unix shell interpreter for Linux and macOS.',
    stdinHelp: 'Read user inputs inside bash using the `read` command from the STDIN tab.',
    syntaxHelp: [
      {
        title: 'Variables and Loops',
        content: 'Standard shell loops and string interpolation.',
        codeSnippet: `for file in *.txt; do echo "File: $file"; done`,
      },
    ],
  },

  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    category: 'programming',
    extension: '.ts',
    monacoLang: 'typescript',
    defaultFileName: 'index.ts',
    version: 'TS 5.5',
    icon: '📘',
    defaultCode: `// TypeScript Online Playground
interface User {
  id: number;
  name: string;
  role: 'admin' | 'developer' | 'guest';
}

function printUserDetails(user: User): string {
  return \`User #\${user.id}: \${user.name} (\${user.role.toUpperCase()})\`;
}

const team: User[] = [
  { id: 101, name: "Ada Lovelace", role: "admin" },
  { id: 102, name: "Alan Turing", role: "developer" },
];

console.log("=== TypeScript Runner ===");
team.forEach(member => console.log(printUserDetails(member)));
`,
    templates: [
      {
        name: 'Generic Function',
        description: 'Type-safe generics example',
        code: `function firstOrNull<T>(items: T[]): T | null {\n  return items.length > 0 ? items[0] : null;\n}\nconsole.log(firstOrNull([10, 20, 30]));\nconsole.log(firstOrNull(["alpha", "beta"]));\n`,
      },
    ],
    seo: {
      title: 'TypeScript Online Compiler & Sandbox - OmniCompiler',
      description: 'Compile and execute TypeScript online with instant type checking, interfaces, generics, and ESNext support.',
      keywords: ['typescript online compiler', 'run typescript online', 'ts playground', 'typescript runner'],
    },
    overview: 'TypeScript extends JavaScript by adding types to the language, catching errors early in development.',
    stdinHelp: 'TypeScript runs in Node.js; inputs are read via `fs.readFileSync(0, "utf-8")` or `process.stdin`.',
    syntaxHelp: [
      {
        title: 'Type Guards',
        content: 'Narrow types safely using TypeScript predicates.',
        codeSnippet: `function isString(val: unknown): val is string { return typeof val === "string"; }`,
      },
    ],
  },
  ...EXTRA_LANGUAGES,
};

export const POPULAR_LANGUAGE_IDS = [
  'python',
  'javascript',
  'html',
  'cpp',
  'java',
  'c',
  'sql',
  'typescript',
  'rust',
  'go',
  'csharp',
  'php',
  'ruby',
  'bash',
  'kotlin',
  'swift',
  'react',
  'dart',
  'vue',
  'scala',
  'r',
  'lua',
  'perl',
  'haskell',
  'assembly',
  'fortran',
  'cobol',
  'pascal',
  'erlang',
  'markdown',
];

export function getLanguageConfig(id: string): LanguageConfig | null {
  if (!id) return null;
  return LANGUAGES[id.toLowerCase()] || null;
}
