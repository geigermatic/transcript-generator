# Eval harness

- Put .txt/.md transcripts in ./transcripts (file name = transcript_id)
- Add QA pairs to ./qa.jsonl with fields: transcript_id, question, answer, unanswerable (optional)

Run baseline:


cd /Users/jg/transcript-generator/app
npm run eval:baseline


Output: writes ../eval/baseline.json with JSON validity/coverage and QA EM/F1 metrics.
