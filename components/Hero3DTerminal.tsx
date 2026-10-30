'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Check, Terminal, Sparkles, Copy, ArrowRight, Layers } from 'lucide-react';

interface CodeSample {
  lang: string;
  name: string;
  ext: string;
  icon: string;
  code: string;
  output: string;
  time: string;
  memory: string;
}

const SAMPLES: CodeSample[] = [
  {
    lang: 'python',
    name: 'Python 3.12',
    ext: '.py',
    icon: '🐍',
    code: `# Competitive Programming: Two Sum in Python
def two_sum(nums, target):
    lookup = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in lookup:
            return [lookup[complement], i]
        lookup[num] = i
    return []

numbers = [2, 7, 11, 15]
target = 9
print(f"Indices: {two_sum(numbers, target)}")
print("Status: Execution completed in 14ms.")`,
    output: `Indices: [0, 1]
Status: Execution completed in 14ms.`,
    time: '14ms',
    memory: '3.4 MB',
  },
  {
    lang: 'rust',
    name: 'Rust 1.82',
    ext: '.rs',
    icon: '🦀',
    code: `// High-Performance Concurrency in Rust
fn main() {
    let mut scores = vec![98, 85, 92, 74, 95];
    scores.sort();
    
    let median = scores[scores.len() / 2];
    println!("Sorted Scores: {:?}", scores);
    println!("Median Score: {}", median);
    println!("Zero memory overhead & fearless concurrency.");
}`,
    output: `Sorted Scores: [74, 85, 92, 95, 98]
Median Score: 92
Zero memory overhead & fearless concurrency.`,
    time: '8ms',
    memory: '2.1 MB',
  },
  {
    lang: 'java',
    name: 'Java 21 LTS',
    ext: '.java',
    icon: '☕',
    code: `// Modern Java 21 Record & Streams
import java.util.*;

public class Main {
    record Dev(String name, String lang) {}
    
    public static void main(String[] args) {
        var devs = List.of(
            new Dev("Mritunjay", "Rust/Java"),
            new Dev("Alex", "Python"),
            new Dev("Sarah", "Go")
        );
        devs.forEach(d -> System.out.println("Developer: " + d.name() + " -> " + d.lang()));
    }
}`,
    output: `Developer: Mritunjay -> Rust/Java
Developer: Alex -> Python
Developer: Sarah -> Go`,
    time: '42ms',
    memory: '14.2 MB',
  },
  {
    lang: 'react',
    name: 'React 19',
    ext: '.jsx',
    icon: '⚛️',
    code: `import React, { useState } from 'react';

export default function Counter() {
  const [likes, setLikes] = useState(128);
  return (
    <div className="p-4 text-center font-sans">
      <h2 className="text-sky-400 font-bold">Interactive Component</h2>
      <button onClick={() => setLikes(l => l + 1)} className="mt-2 px-4 py-2 bg-indigo-600 rounded-lg text-white">
        Stars: {likes}
      </button>
    </div>
  );
}`,
    output: `Compiled React 19 JSX Component in Browser.
DOM Ready: Interactive virtual DOM mounted in 6ms.`,
    time: '6ms',
    memory: '3.8 MB',
  },
];

export function Hero3DTerminal() {
  const [activeTab, setActiveTab] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const sample = SAMPLES[activeTab];

  const handleSimulateRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 280);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 select-none">
      {/* Ambient 3D Glow Orbs */}
      <div className="absolute -top-12 left-1/4 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute -bottom-10 right-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 3D Tilted Card Container */}
      <div
        style={{
          transform: 'perspective(1200px) rotateX(2.5deg)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
        }}
        className="relative rounded-3xl border border-slate-700/60 bg-slate-950/90 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl overflow-hidden hover:rotate-0"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/70">
          {/* macOS Traffic Lights */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
            <span className="ml-2 text-xs font-mono text-slate-400 font-semibold hidden sm:inline">
              omnicompiler-cloud-vm
            </span>
          </div>

          {/* Interactive Language Selector Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {SAMPLES.map((s, idx) => (
              <button
                key={s.lang}
                onClick={() => {
                  setActiveTab(idx);
                  setHasRun(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === idx
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Copy code snippet"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <Link
              href={`/${sample.lang}`}
              className="hidden sm:flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium ml-1"
            >
              <span>Open in Studio</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Code & Terminal Body */}
        <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed text-slate-200">
          <pre className="overflow-x-auto text-slate-300 whitespace-pre font-mono leading-6">
            <code>{sample.code}</code>
          </pre>

          {/* Interactive Live Run Bar */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
            <button
              onClick={handleSimulateRun}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {isRunning ? (
                <>
                  <div className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Compiling...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Snippet</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Isolated MicroVM</span>
              </span>
              <span>Latency: <strong className="text-slate-200">{sample.time}</strong></span>
              <span>Memory: <strong className="text-slate-200">{sample.memory}</strong></span>
            </div>
          </div>

          {/* Simulated Terminal Output Box */}
          {hasRun && (
            <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 text-xs animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mb-1 font-sans uppercase tracking-wider">
                <Terminal className="w-3 h-3 text-emerald-400" />
                <span>Console Output (Exit Code 0)</span>
              </div>
              <pre className="whitespace-pre-wrap font-mono text-slate-200">{sample.output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero3DTerminal;
