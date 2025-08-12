# Eval harness

- inbox/: drop raw files (.txt/.md/.docx/.srt/.vtt) — bootstrap converts and generates QA
- transcripts/: auto-generated plain text used by the runner (file name = transcript_id)
- qa.jsonl: auto-appended QA pairs per transcript (can also be edited manually)

Bootstrap and run baseline:

```
cd /Users/jg/transcript-generator/app
npm run eval:bootstrap    # processes files in ../eval/inbox
npm run eval:baseline
```

Output: writes ../eval/baseline.json with JSON validity/coverage and QA EM/F1 metrics.
