import { LanguageConfig } from './languages';

export const EXTRA_LANGUAGES: Record<string, LanguageConfig> = {
  kotlin: {
    id: 'kotlin',
    name: 'Kotlin',
    category: 'programming',
    extension: '.kt',
    monacoLang: 'kotlin',
    defaultFileName: 'Main.kt',
    version: 'Kotlin 1.9',
    icon: '🎯',
    badge: 'Popular',
    defaultCode: `// Kotlin Online Compiler & Runner
import java.util.Scanner

fun main() {
    println("=== Kotlin Online Compiler ===")
    
    val languages = listOf("Kotlin", "Java", "Scala", "Swift")
    println("Modern Languages: $languages")
    
    val scores = listOf(98, 85, 92, 79, 95)
    val average = scores.average()
    println("Average Score: $average")
    
    println("Status: Kotlin executed successfully!")
}
`,
    defaultStdin: 'OmniCompiler 2026',
    templates: [
      {
        name: 'Hello World',
        description: 'Standard Kotlin main function',
        code: `fun main() {\n    println("Hello, World!")\n}\n`,
      },
      {
        name: 'Scanner Input (STDIN)',
        description: 'Read inputs from STDIN in Kotlin',
        stdin: 'KotlinDev 24',
        code: `import java.util.Scanner\n\nfun main() {\n    val scanner = Scanner(System.\`in\`)\n    if (scanner.hasNext()) {\n        val name = scanner.next()\n        val age = scanner.nextInt()\n        println("Hello $name, age: $age")\n    } else {\n        println("Please provide input in STDIN tab.")\n    }\n}\n`,
      },
      {
        name: 'Data Class & Filter',
        description: 'Idiomatic Kotlin data classes and functional operations',
        code: `data class Developer(val name: String, val skills: List<String>, val yearsExp: Int)\n\nfun main() {\n    val devs = listOf(\n        Developer("Alice", listOf("Kotlin", "Android"), 5),\n        Developer("Bob", listOf("Kotlin", "Spring"), 7),\n        Developer("Charlie", listOf("Swift", "iOS"), 4)\n    )\n    val kotlinDevs = devs.filter { "Kotlin" in it.skills }\n    println("Kotlin Developers: " + kotlinDevs.map { it.name })\n}\n`,
      },
    ],
    seo: {
      title: 'Kotlin Online Compiler & IDE - OmniCompiler',
      description: 'Write, compile, and run Kotlin code online. Supports Kotlin 1.9, JVM standard library, data classes, and Scanner stdin.',
      keywords: ['kotlin online compiler', 'run kotlin online', 'kotlin ide online', 'compile kotlin', 'kotlin runner'],
    },
    overview: 'Kotlin is a modern, cross-platform, statically typed language developed by JetBrains. It is Google\'s preferred language for Android app development.',
    stdinHelp: 'Kotlin on the JVM reads inputs via `java.util.Scanner(System.`in`)` or `readLine()` in the STDIN tab.',
    syntaxHelp: [
      {
        title: 'Null Safety',
        content: 'Kotlin type system is aimed at eliminating NullPointerException.',
        codeSnippet: `val name: String? = null\nprintln(name?.length ?: 0)`,
      },
    ],
  },
  swift: {
    id: 'swift',
    name: 'Swift',
    category: 'programming',
    extension: '.swift',
    monacoLang: 'swift',
    defaultFileName: 'main.swift',
    version: 'Swift 5.9',
    icon: '🦅',
    defaultCode: `// Swift Online Compiler & Runner
import Foundation

print("=== Swift 5.9 Online Compiler ===")

let languages = ["Swift", "Objective-C", "Rust", "C++"]
print("Languages: \\(languages)")

struct User {
    let name: String
    let role: String
}

let dev = User(name: "Omni Developer", role: "iOS Architect")
print("User: \\(dev.name) | Role: \\(dev.role)")
print("Status: Swift executed successfully!")
`,
    defaultStdin: 'SwiftUser',
    templates: [
      {
        name: 'Hello World',
        description: 'Basic Swift program',
        code: `print("Hello, World!")\n`,
      },
      {
        name: 'Read STDIN',
        description: 'Read user inputs from standard input',
        stdin: 'Alice',
        code: `if let line = readLine() {\n    print("Hello, \\(line)!")\n} else {\n    print("No input provided.")\n}\n`,
      },
    ],
    seo: {
      title: 'Swift Online Compiler & Runner - OmniCompiler',
      description: 'Run Swift code online in your browser. Supports Swift 5.9, Foundation, structs, closures, and standard input.',
      keywords: ['swift online compiler', 'run swift online', 'swift ide online', 'swift playground'],
    },
    overview: 'Swift is a powerful, intuitive programming language created by Apple for building apps for iOS, Mac, Apple TV, and Apple Watch.',
    stdinHelp: 'Swift reads user inputs using the `readLine()` function from Foundation.',
    syntaxHelp: [
      {
        title: 'Optional Unwrapping',
        content: 'Safely unwrap values using `if let` or `guard let`.',
        codeSnippet: `if let value = optionalVal { print(value) }`,
      },
    ],
  },
  dart: {
    id: 'dart',
    name: 'Dart',
    category: 'programming',
    extension: '.dart',
    monacoLang: 'dart',
    defaultFileName: 'main.dart',
    version: 'Dart 3.2',
    icon: '🎯',
    defaultCode: `// Dart Online Compiler & Runner
import 'dart:io';

void main() {
  print('=== Dart 3.2 Online Compiler ===');
  
  final numbers = [1, 2, 3, 4, 5];
  final squares = numbers.map((n) => n * n).toList();
  print('Numbers: $numbers');
  print('Squares: $squares');
  
  print('Status: Dart executed successfully!');
}
`,
    defaultStdin: 'FlutterDev',
    templates: [
      {
        name: 'Hello World',
        description: 'Simple Dart program',
        code: `void main() {\n  print('Hello, World!');\n}\n`,
      },
    ],
    seo: {
      title: 'Dart Online Compiler & Runner - OmniCompiler',
      description: 'Write, compile, and run Dart code online. Ideal for Flutter developers testing algorithms and standard libraries.',
      keywords: ['dart online compiler', 'run dart online', 'dart playground', 'flutter dart online'],
    },
    overview: 'Dart is a client-optimized language for fast apps on any platform, powering Flutter for cross-platform mobile and web applications.',
    stdinHelp: 'Dart reads inputs from `stdin.readLineSync()` via the `dart:io` library.',
    syntaxHelp: [
      {
        title: 'Records & Pattern Matching',
        content: 'Dart 3 features first-class records and pattern matching expressions.',
        codeSnippet: `final (name, age) = ('Bob', 30);\nprint('$name is $age');`,
      },
    ],
  },
  scala: {
    id: 'scala',
    name: 'Scala',
    category: 'programming',
    extension: '.scala',
    monacoLang: 'scala',
    defaultFileName: 'Main.scala',
    version: 'Scala 3.3',
    icon: '🔴',
    defaultCode: `// Scala 3 Online Compiler
object Main {
  def main(args: Array[String]): Unit = {
    println("=== Scala 3 Online Compiler ===")
    val fruits = List("Apple", "Banana", "Cherry")
    val lengths = fruits.map(_.length)
    println(s"Fruits: $fruits")
    println(s"Lengths: $lengths")
    println("Status: Scala executed successfully!")
  }
}
`,
    defaultStdin: 'ScalaUser',
    templates: [
      {
        name: 'Hello World',
        description: 'Scala 3 main method',
        code: `object Main {\n  def main(args: Array[String]): Unit = {\n    println("Hello, World!")\n  }\n}\n`,
      },
    ],
    seo: {
      title: 'Scala Online Compiler & IDE - OmniCompiler',
      description: 'Compile and run Scala 3 online. Supports functional programming, object-oriented constructs, and JVM execution.',
      keywords: ['scala online compiler', 'run scala online', 'scala 3 playground', 'scala ide online'],
    },
    overview: 'Scala combines object-oriented and functional programming in one concise, high-level language on the JVM.',
    stdinHelp: 'Scala reads STDIN using `scala.io.StdIn.readLine()` or Java Scanner.',
    syntaxHelp: [
      {
        title: 'Pattern Matching',
        content: 'Match expressions against algebraic data types.',
        codeSnippet: `val res = x match { case 1 => "one"; case _ => "other" }`,
      },
    ],
  },
  r: {
    id: 'r',
    name: 'R',
    category: 'programming',
    extension: '.r',
    monacoLang: 'r',
    defaultFileName: 'main.r',
    version: 'R 4.3',
    icon: '📊',
    defaultCode: `# R Online Compiler & Data Analysis
cat("=== R Statistical Computing ===\\n")

scores <- c(92, 85, 88, 95, 78, 89)
mean_score <- mean(scores)
sd_score <- sd(scores)

cat(sprintf("Mean Score: %.2f\\n", mean_score))
cat(sprintf("Standard Deviation: %.2f\\n", sd_score))
cat("Summary:\\n")
print(summary(scores))
`,
    defaultStdin: '42',
    templates: [
      {
        name: 'Statistical Summary',
        description: 'Vector statistics and summary in R',
        code: `x <- rnorm(100, mean = 50, sd = 10)\nsummary(x)\n`,
      },
    ],
    seo: {
      title: 'R Online Compiler & Statistical Runner - OmniCompiler',
      description: 'Run R code online for statistics, data analysis, and mathematical modeling without installing R or RStudio.',
      keywords: ['r online compiler', 'run r online', 'r script runner', 'r data science playground'],
    },
    overview: 'R is a language and environment for statistical computing, data analysis, and graphical representation.',
    stdinHelp: 'R reads standard input via `readLines(file("stdin"), n = 1)`.',
    syntaxHelp: [
      {
        title: 'Vectors and Matrices',
        content: 'Vectors are created with the `c()` combine function.',
        codeSnippet: `vec <- c(1, 2, 3, 4)\nmat <- matrix(vec, nrow=2)`,
      },
    ],
  },
  lua: {
    id: 'lua',
    name: 'Lua',
    category: 'scripting',
    extension: '.lua',
    monacoLang: 'lua',
    defaultFileName: 'main.lua',
    version: 'Lua 5.4',
    icon: '🌙',
    defaultCode: `-- Lua Online Compiler & Runner
print("=== Lua 5.4 Online Playground ===")

local player = {
    name = "Hero",
    health = 100,
    skills = {"Slash", "Fireball", "Shield"}
}

print("Player: " .. player.name .. " (Health: " .. player.health .. ")")
print("Skills: ")
for i, skill in ipairs(player.skills) do
    print("  " .. i .. ". " .. skill)
end
`,
    defaultStdin: 'OmniPlayer',
    templates: [
      {
        name: 'Hello World',
        description: 'Standard Lua print',
        code: `print("Hello, World!")\n`,
      },
    ],
    seo: {
      title: 'Lua Online Compiler & Runner - OmniCompiler',
      description: 'Execute Lua scripts online with instant output. Ideal for game developers (Roblox, Love2D) and script authors.',
      keywords: ['lua online compiler', 'run lua online', 'lua runner', 'lua playground'],
    },
    overview: 'Lua is a powerful, efficient, lightweight, embeddable scripting language widely used in video games, web servers, and embedded systems.',
    stdinHelp: 'Lua reads from standard input using `io.read()`.',
    syntaxHelp: [
      {
        title: 'Tables',
        content: 'Tables are the sole data structuring mechanism in Lua.',
        codeSnippet: `local dict = { key = "value", count = 10 }`,
      },
    ],
  },
  perl: {
    id: 'perl',
    name: 'Perl',
    category: 'scripting',
    extension: '.pl',
    monacoLang: 'perl',
    defaultFileName: 'main.pl',
    version: 'Perl 5.38',
    icon: '🐪',
    defaultCode: `#!/usr/bin/env perl
use strict;
use warnings;

print "=== Perl Online Runner ===\\n";

my @languages = ("Perl", "Python", "Ruby");
print "Languages: " . join(", ", @languages) . "\\n";

my $text = "OmniCompiler: The Fast Polyglot IDE";
if ($text =~ /(Omni\\w+)/) {
    print "Extracted: $1\\n";
}
`,
    defaultStdin: 'PerlInput',
    templates: [
      {
        name: 'Hello World',
        description: 'Basic Perl script',
        code: `use strict;\nuse warnings;\nprint "Hello, World!\\n";\n`,
      },
    ],
    seo: {
      title: 'Perl Online Compiler & Script Runner - OmniCompiler',
      description: 'Run Perl 5 code online. Supports regular expressions, arrays, hashes, and text parsing with sub-second execution.',
      keywords: ['perl online compiler', 'run perl online', 'perl ide online', 'perl regex playground'],
    },
    overview: 'Perl is a high-level, general-purpose, interpreted programming language with unmatched regular expression processing capabilities.',
    stdinHelp: 'Perl reads lines with the diamond operator `<STDIN>`.',
    syntaxHelp: [
      {
        title: 'Regex Matching',
        content: 'Match and substitute strings with `=~`.',
        codeSnippet: `if ($str =~ /^hello/i) { print "matches"; }`,
      },
    ],
  },
  haskell: {
    id: 'haskell',
    name: 'Haskell',
    category: 'programming',
    extension: '.hs',
    monacoLang: 'haskell',
    defaultFileName: 'Main.hs',
    version: 'GHC 9.6',
    icon: 'λ',
    defaultCode: `-- Haskell GHC Online Compiler
module Main where

fib :: Int -> Integer
fib 0 = 0
fib 1 = 1
fib n = fib (n - 1) + fib (n - 2)

main :: IO ()
main = do
    putStrLn "=== Haskell Pure Functional Playground ==="
    let nums = [1..10]
    let evens = filter even nums
    putStrLn $ "Evens: " ++ show evens
    putStrLn $ "Fibonacci(10): " ++ show (fib 10)
`,
    defaultStdin: 'HaskellIO',
    templates: [
      {
        name: 'Hello World',
        description: 'Pure functional Hello World',
        code: `main :: IO ()\nmain = putStrLn "Hello, World!"\n`,
      },
    ],
    seo: {
      title: 'Haskell Online Compiler & GHC Runner - OmniCompiler',
      description: 'Compile and run Haskell code online with GHC. Supports pure functions, monads, type inference, and lazy evaluation.',
      keywords: ['haskell online compiler', 'run haskell online', 'ghc online', 'haskell playground'],
    },
    overview: 'Haskell is an advanced, purely functional programming language with strong static typing, type inference, and lazy evaluation.',
    stdinHelp: 'Haskell reads user inputs using `getLine` in the `IO` monad.',
    syntaxHelp: [
      {
        title: 'List Comprehensions',
        content: 'Create lists declaratively.',
        codeSnippet: `[x * 2 | x <- [1..5], x > 2]`,
      },
    ],
  },
  elixir: {
    id: 'elixir',
    name: 'Elixir',
    category: 'programming',
    extension: '.exs',
    monacoLang: 'elixir',
    defaultFileName: 'main.exs',
    version: 'Elixir 1.16',
    icon: '💧',
    defaultCode: `# Elixir Online Playground
defmodule Greeter do
  def run do
    IO.puts("=== Elixir Concurrent Runner ===")
    numbers = [1, 2, 3, 4, 5]
    doubled = Enum.map(numbers, fn x -> x * 2 end)
    IO.inspect(doubled, label: "Doubled Numbers")
  end
end

Greeter.run()
`,
    defaultStdin: 'ElixirUser',
    templates: [
      {
        name: 'Hello World',
        description: 'Elixir IO.puts script',
        code: `IO.puts("Hello, World!")\n`,
      },
    ],
    seo: {
      title: 'Elixir Online Compiler & Runner - OmniCompiler',
      description: 'Run Elixir scripts online. Built for scalable and maintainable applications on the Erlang BEAM virtual machine.',
      keywords: ['elixir online compiler', 'run elixir online', 'elixir playground', 'beam online'],
    },
    overview: 'Elixir is a dynamic, functional language designed for building scalable and maintainable applications on the Erlang BEAM VM.',
    stdinHelp: 'Elixir reads STDIN via `IO.gets("")`.',
    syntaxHelp: [
      {
        title: 'Pipe Operator',
        content: 'Pass values sequentially through functions using `|>`',
        codeSnippet: `"hello" |> String.upcase() |> IO.puts()`,
      },
    ],
  },
  clojure: {
    id: 'clojure',
    name: 'Clojure',
    category: 'programming',
    extension: '.clj',
    monacoLang: 'clojure',
    defaultFileName: 'main.clj',
    version: 'Clojure 1.11',
    icon: '🌀',
    defaultCode: `;; Clojure Online Runner
(println "=== Clojure Online Compiler ===")

(defn factorial [n]
  (reduce * (range 1 (inc n))))

(println "Factorial of 6 is:" (factorial 6))

(def users [{:name "Alice" :role :admin}
            {:name "Bob" :role :dev}])

(println "User names:" (map :name users))
`,
    defaultStdin: 'ClojureInput',
    templates: [
      {
        name: 'Hello World',
        description: 'Standard Clojure println',
        code: `(println "Hello, World!")\n`,
      },
    ],
    seo: {
      title: 'Clojure Online Compiler & Lisp REPL - OmniCompiler',
      description: 'Run Clojure code online. A modern, dynamic, and functional dialect of Lisp on the Java platform.',
      keywords: ['clojure online compiler', 'run clojure online', 'clojure repl', 'lisp online'],
    },
    overview: 'Clojure is a modern Lisp for the Java Virtual Machine offering immutability by default and software transactional memory.',
    stdinHelp: 'Clojure reads STDIN with `(read-line)`.',
    syntaxHelp: [
      {
        title: 'Functions',
        content: 'Define functions using the `defn` macro.',
        codeSnippet: `(defn add [a b] (+ a b))`,
      },
    ],
  },
  groovy: {
    id: 'groovy',
    name: 'Groovy',
    category: 'scripting',
    extension: '.groovy',
    monacoLang: 'groovy',
    defaultFileName: 'Main.groovy',
    version: 'Groovy 4.0',
    icon: '🍸',
    defaultCode: `// Groovy Online Compiler & Script Runner
println "=== Apache Groovy Online Playground ==="

def list = ["Groovy", "Kotlin", "Java"]
println "Languages: " + list.join(', ')

def squares = (1..5).collect { it * it }
println "Squares: " + squares
`,
    defaultStdin: 'GroovyDev',
    templates: [
      {
        name: 'Hello World',
        description: 'Simple Groovy print',
        code: `println "Hello, World!"\n`,
      },
    ],
    seo: {
      title: 'Groovy Online Compiler & Runner - OmniCompiler',
      description: 'Run Apache Groovy scripts online. Dynamic, powerful language with seamless Java integration and concise syntax.',
      keywords: ['groovy online compiler', 'run groovy online', 'apache groovy runner'],
    },
    overview: 'Apache Groovy is a powerful, multi-faceted language for the Java platform that enhances developer productivity.',
    stdinHelp: 'Groovy reads STDIN with `System.in.newReader().readLine()`.',
    syntaxHelp: [
      {
        title: 'Closures',
        content: 'Groovy closures are first-class code blocks.',
        codeSnippet: `[1, 2, 3].each { println it }`,
      },
    ],
  },
  assembly: {
    id: 'assembly',
    name: 'Assembly (NASM)',
    category: 'programming',
    extension: '.asm',
    monacoLang: 'nasm',
    defaultFileName: 'main.asm',
    version: 'NASM x86_64',
    icon: '⚙️',
    defaultCode: `; NASM x86_64 Assembly Online Compiler
global _start

section .data
    msg db "=== Assembly (x86_64) Online Compiler ===", 10
    len equ $ - msg

section .text
_start:
    ; sys_write(stdout=1, msg, len)
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
    mov rdx, len
    syscall

    ; sys_exit(0)
    mov rax, 60
    xor rdi, rdi
    syscall
`,
    defaultStdin: '',
    templates: [
      {
        name: 'Hello World (Syscall)',
        description: 'x86_64 Linux 64-bit syscalls',
        code: `global _start\n\nsection .data\n    msg db 'Hello, World!', 10\n    len equ $ - msg\n\nsection .text\n_start:\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, msg\n    mov rdx, len\n    syscall\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall\n`,
      },
    ],
    seo: {
      title: 'Assembly (x86_64 NASM) Online Compiler - OmniCompiler',
      description: 'Compile and run NASM Assembly code online. Learn x86_64 Linux syscalls, registers, and low-level computer architecture.',
      keywords: ['assembly online compiler', 'nasm online', 'x86_64 assembly runner', 'compile assembly online'],
    },
    overview: 'Assembly language is a low-level programming language that directly instructs a computer hardware processor.',
    stdinHelp: 'Assembly reads inputs via the `sys_read` syscall (`rax=0, rdi=0`).',
    syntaxHelp: [
      {
        title: 'Registers',
        content: 'rax (accumulator), rdi (first arg), rsi (second arg), rdx (third arg).',
        codeSnippet: `mov rax, 60\nxor rdi, rdi\nsyscall`,
      },
    ],
  },
  fortran: {
    id: 'fortran',
    name: 'Fortran',
    category: 'programming',
    extension: '.f90',
    monacoLang: 'fortran',
    defaultFileName: 'main.f90',
    version: 'GFortran 90/95',
    icon: '📐',
    defaultCode: `! Fortran 90 Online Compiler
program main
    implicit none
    integer :: i, n = 5
    integer :: factorial = 1
    
    print *, "=== Fortran 90 Numerical Playground ==="
    do i = 1, n
        factorial = factorial * i
    end do
    print *, "Factorial of 5 is:", factorial
end program main
`,
    defaultStdin: '',
    templates: [
      {
        name: 'Hello World',
        description: 'Standard Fortran print statement',
        code: `program hello\n    print *, "Hello, World!"\nend program hello\n`,
      },
    ],
    seo: {
      title: 'Fortran Online Compiler - OmniCompiler',
      description: 'Compile and run Fortran 90/95 code online. High-performance numerical computing and scientific calculations.',
      keywords: ['fortran online compiler', 'run fortran online', 'gfortran online'],
    },
    overview: 'Fortran is a domain-specific language for high-performance numerical weather prediction, computational physics, and finance.',
    stdinHelp: 'Fortran reads inputs via `read(*, *) variable`.',
    syntaxHelp: [
      {
        title: 'Arrays',
        content: 'Fortran features 1-based native multidimensional arrays.',
        codeSnippet: `real, dimension(10) :: a\na = 0.0`,
      },
    ],
  },
  cobol: {
    id: 'cobol',
    name: 'COBOL',
    category: 'programming',
    extension: '.cob',
    monacoLang: 'cobol',
    defaultFileName: 'main.cob',
    version: 'GnuCOBOL 2.2',
    icon: '🏛️',
    defaultCode: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-WORLD.
       PROCEDURE DIVISION.
           DISPLAY "=== COBOL Online Compiler ===".
           DISPLAY "Hello, Enterprise Banking World!".
           STOP RUN.
`,
    defaultStdin: '',
    templates: [
      {
        name: 'Hello World',
        description: 'Standard COBOL program structure',
        code: `       IDENTIFICATION DIVISION.\n       PROGRAM-ID. HELLO.\n       PROCEDURE DIVISION.\n           DISPLAY "Hello, World!".\n           STOP RUN.\n`,
      },
    ],
    seo: {
      title: 'COBOL Online Compiler - OmniCompiler',
      description: 'Run COBOL programs online in your browser. Practice enterprise business logic and mainframe computing.',
      keywords: ['cobol online compiler', 'run cobol online', 'gnucobol online runner'],
    },
    overview: 'COBOL is a compiled English-like computer programming language designed for business use in banking, finance, and enterprise.',
    stdinHelp: 'COBOL reads input using the `ACCEPT variable.` verb.',
    syntaxHelp: [
      {
        title: 'Divisions',
        content: 'COBOL code is split into IDENTIFICATION, ENVIRONMENT, DATA, and PROCEDURE divisions.',
        codeSnippet: `IDENTIFICATION DIVISION.\nPROGRAM-ID. APP.`,
      },
    ],
  },
  pascal: {
    id: 'pascal',
    name: 'Pascal',
    category: 'programming',
    extension: '.pas',
    monacoLang: 'pascal',
    defaultFileName: 'main.pas',
    version: 'Free Pascal 3.2',
    icon: '📜',
    defaultCode: `// Free Pascal Online Compiler
program Main;
var
  i, sum: integer;
begin
  writeln('=== Pascal Online Compiler ===');
  sum := 0;
  for i := 1 to 10 do
    sum := sum + i;
  writeln('Sum of 1 to 10 is: ', sum);
  writeln('Status: Pascal executed successfully!');
end.
`,
    defaultStdin: '',
    templates: [
      {
        name: 'Hello World',
        description: 'Standard Pascal writeln',
        code: `program Hello;\nbegin\n  writeln('Hello, World!');\nend.\n`,
      },
    ],
    seo: {
      title: 'Pascal Online Compiler - OmniCompiler',
      description: 'Write, compile, and run Pascal code online with Free Pascal compiler (FPC). Great for learning algorithms.',
      keywords: ['pascal online compiler', 'free pascal online', 'run pascal online'],
    },
    overview: 'Pascal is an imperative and procedural programming language designed by Niklaus Wirth to encourage structured programming.',
    stdinHelp: 'Pascal reads inputs via `readln(variable)`.',
    syntaxHelp: [
      {
        title: 'Variables',
        content: 'Declare variables in the `var` block.',
        codeSnippet: `var\n  name: string;\n  count: integer;`,
      },
    ],
  },
  erlang: {
    id: 'erlang',
    name: 'Erlang',
    category: 'programming',
    extension: '.erl',
    monacoLang: 'erlang',
    defaultFileName: 'solution.erl',
    version: 'Erlang/OTP 26',
    icon: '🔴',
    defaultCode: `-module(solution).
-export([start/0]).

factorial(0) -> 1;
factorial(N) when N > 0 -> N * factorial(N - 1).

start() ->
    io:format("=== Erlang OTP Online Compiler ===~n"),
    Result = factorial(6),
    io:format("Factorial of 6 is ~p~n", [Result]),
    io:format("Status: Erlang executed successfully!~n").
`,
    defaultStdin: '',
    templates: [
      {
        name: 'Hello World',
        description: 'Basic Erlang module and function',
        code: `-module(solution).\n-export([start/0]).\n\nstart() ->\n    io:format("Hello, World!~n").\n`,
      },
    ],
    seo: {
      title: 'Erlang Online Compiler & Runner - OmniCompiler',
      description: 'Compile and run Erlang programs online. Experience lightweight actor concurrency and high-availability systems.',
      keywords: ['erlang online compiler', 'run erlang online', 'erlang otp playground'],
    },
    overview: 'Erlang is a general-purpose, concurrent, functional programming language designed for massive scale and fault-tolerant telecom backends.',
    stdinHelp: 'Erlang reads lines with `io:get_line("")`.',
    syntaxHelp: [
      {
        title: 'Pattern Matching',
        content: 'Functions use pattern matching on arguments.',
        codeSnippet: `area({circle, R}) -> 3.14 * R * R;`,
      },
    ],
  },
  react: {
    id: 'react',
    name: 'React',
    category: 'web',
    extension: '.jsx',
    monacoLang: 'javascript',
    defaultFileName: 'App.jsx',
    version: 'React 19',
    icon: '⚛️',
    badge: 'Framework',
    defaultCode: `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: '#0284c7' }}>React 19 Online Playground</h1>
      <p style={{ color: '#64748b' }}>Interactive front-end component runner with instant live preview.</p>
      
      <div style={{ margin: '2rem auto', padding: '1.5rem', maxWidth: '300px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 1rem' }}>Count: {count}</p>
        <button 
          onClick={() => setCount(c => c + 1)}
          style={{ background: '#0284c7', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
        >
          Increment +
        </button>
      </div>
    </div>
  );
}
`,
    defaultStdin: '',
    templates: [
      {
        name: 'Counter Component',
        description: 'React state hook counter',
        code: `import React, { useState } from 'react';\n\nexport default function Counter() {\n  const [val, setVal] = useState(10);\n  return (\n    <div style={{ padding: 20 }}>\n      <h2>Counter: {val}</h2>\n      <button onClick={() => setVal(v => v + 1)}>+1</button>\n      <button onClick={() => setVal(v => v - 1)} style={{ marginLeft: 10 }}>-1</button>\n    </div>\n  );\n}\n`,
      },
    ],
    seo: {
      title: 'React Online Compiler & Playground - OmniCompiler',
      description: 'Run React 19 JSX components online with instant live preview. Build interactive UI widgets without node_modules setup.',
      keywords: ['react online compiler', 'run react online', 'react playground', 'react jsx runner online'],
    },
    overview: 'React is the world\'s most popular library for web and native user interfaces. Test hooks, components, and state in real-time.',
    stdinHelp: 'React renders live in the Preview tab.',
    syntaxHelp: [
      {
        title: 'Hooks',
        content: 'Use useState and useEffect to manage state and lifecycles.',
        codeSnippet: `const [state, setState] = useState(initialVal);`,
      },
    ],
  },
  vue: {
    id: 'vue',
    name: 'Vue.js',
    category: 'web',
    extension: '.html',
    monacoLang: 'html',
    defaultFileName: 'index.html',
    version: 'Vue 3.4',
    icon: '💚',
    badge: 'Framework',
    defaultCode: `<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; padding: 2rem; text-align: center; background: #fafafa; }
    .card { background: white; padding: 2rem; border-radius: 12px; max-width: 400px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    button { background: #42b883; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }
  </style>
</head>
<body>
  <div id="app" class="card">
    <h2 style="color: #42b883">{{ title }}</h2>
    <p>Message: {{ message }}</p>
    <button @click="count++">Count: {{ count }}</button>
  </div>

  <script>
    const { createApp, ref } = Vue;
    createApp({
      setup() {
        const title = ref('Vue 3 Online Playground');
        const message = ref('Reactive components in your browser!');
        const count = ref(0);
        return { title, message, count };
      }
    }).mount('#app');
  </script>
</body>
</html>
`,
    defaultStdin: '',
    templates: [
      {
        name: 'Reactive Counter',
        description: 'Vue 3 Composition API reactive state',
        code: `<!-- Vue 3 Template -->\n<div id="app">\n  <h1>{{ count }}</h1>\n  <button @click="count++">Add</button>\n</div>\n`,
      },
    ],
    seo: {
      title: 'Vue 3 Online Compiler & Playground - OmniCompiler',
      description: 'Write and test Vue 3 apps online with instant live preview. Supports Composition API, templates, and reactive state.',
      keywords: ['vue online compiler', 'run vue online', 'vue 3 playground', 'vue js runner online'],
    },
    overview: 'Vue.js is an approachable, performant, and versatile framework for building web user interfaces.',
    stdinHelp: 'Vue runs directly in the Preview tab.',
    syntaxHelp: [
      {
        title: 'Reactivity',
        content: 'Declare reactive state with ref() or reactive().',
        codeSnippet: `const count = ref(0);`,
      },
    ],
  },
  markdown: {
    id: 'markdown',
    name: 'Markdown',
    category: 'web',
    extension: '.md',
    monacoLang: 'markdown',
    defaultFileName: 'README.md',
    version: 'GFM Spec',
    icon: '📝',
    defaultCode: `# OmniCompiler Markdown Playground

Welcome to the **OmniCompiler** live Markdown editor!

## Features
- [x] Sub-second preview rendering
- [x] Full GitHub Flavored Markdown (GFM)
- [x] Multi-language code snippets
- [ ] Direct export to HTML & PDF

### Quick Code Example:
\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`

> "Code is like humor. When you have to explain it, it's bad." – Cory House
`,
    defaultStdin: '',
    templates: [
      {
        name: 'Project README',
        description: 'Professional GitHub repository README structure',
        code: `# Project Name\n\nShort project description.\n\n## Installation\n\`\`\`bash\nnpm install\n\`\`\`\n`,
      },
    ],
    seo: {
      title: 'Markdown Online Editor & Live Preview - OmniCompiler',
      description: 'Write, format, and preview GitHub Flavored Markdown online with instant split-pane preview.',
      keywords: ['markdown online editor', 'preview markdown online', 'markdown compiler', 'gfm editor'],
    },
    overview: 'Markdown is a lightweight markup language with plain-text formatting syntax designed to be converted to HTML.',
    stdinHelp: 'Markdown live preview updates in real-time in the Preview tab.',
    syntaxHelp: [
      {
        title: 'Links and Images',
        content: '[Link text](url) and ![Alt](url)',
        codeSnippet: `[OmniCompiler](https://omnicompilerlabs.vercel.app)`,
      },
    ],
  },
};
