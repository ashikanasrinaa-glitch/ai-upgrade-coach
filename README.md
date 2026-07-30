# AI Upgrade Coach

A small tool that turns a task you're stuck on at work into an AI-assisted
workflow — powered by Claude.

## What it does

Tell it your role and one task that eats up your time. It hands back:

- **Why it matters** — a quick line on how this task connects to staying
  sharp and relevant at work
- **The workflow** — a short, step-by-step way to do the task with AI help
  instead of doing it manually
- **Ready-to-copy prompts** — real prompts you can paste straight into
  Claude (or another AI tool) to get started immediately

## How to use it

1. Enter your role (e.g. "operations coordinator," "teacher," "marketing assistant")
2. Describe one task that takes up too much of your time
3. Click **Build my upgrade**
4. Copy the prompts and try them in your own AI tool of choice

## Why this exists

Most workplaces are quietly rebuilding around AI. This tool is a first step
toward not getting left behind — a quick, practical taste of what
AI-assisted work actually looks like, tailored to your own job.

## Tech notes

Built with a plain HTML/JS frontend and a small serverless backend that
calls the Anthropic API. See `HOW-TO-DEPLOY.md` for setup instructions.
