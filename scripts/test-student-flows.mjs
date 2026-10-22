import http from 'http';

function fetchUrl(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('--- STARTING STUDENT JOURNEY ROUTE AND API TESTS ---');
  
  // 1. Pages
  const pages = [
    { path: '/dashboard', label: 'Dashboard Page' },
    { path: '/study/today', label: 'Today Study & Active Recall' },
    { path: '/mistake-notebook', label: 'Mistake Notebook & Active Retry' },
    { path: '/question-bank', label: 'Question Bank & Daily Challenge' },
    { path: '/syllabus', label: 'Syllabus Explorer' },
  ];

  for (const p of pages) {
    const res = await fetchUrl(p.path);
    console.log(`[PAGE] ${p.label} (${p.path}) -> Status: ${res.statusCode}, Body size: ${res.body.length} bytes`);
    if (res.statusCode !== 200) {
      throw new Error(`Page ${p.path} returned non-200 status ${res.statusCode}`);
    }
  }

  // 2. APIs
  const apis = [
    { path: '/api/questions/daily-challenge', label: 'Daily Challenge 5-Question Set' },
    { path: '/api/practice/daily', label: 'Daily Practice Session Generator' },
    { path: '/api/mistake-notebook', label: 'Mistake Notebook API' },
  ];

  for (const a of apis) {
    const res = await fetchUrl(a.path);
    console.log(`[API] ${a.label} (${a.path}) -> Status: ${res.statusCode}`);
    if (res.statusCode !== 200) {
      throw new Error(`API ${a.path} returned non-200 status ${res.statusCode}`);
    }
    const json = JSON.parse(res.body);
    if (a.path === '/api/questions/daily-challenge') {
      console.log(`       Daily Challenge Questions Count: ${json.questions?.length}`);
      if (!json.questions || json.questions.length === 0) {
        throw new Error('Daily challenge returned 0 questions!');
      }
    } else if (a.path === '/api/practice/daily') {
      console.log(`       Daily Practice Questions Count: ${json.questions?.length}`);
      if (!json.questions || json.questions.length === 0) {
        throw new Error('Daily practice returned 0 questions!');
      }
    } else if (a.path === '/api/mistake-notebook') {
      const count = json.data ? json.data.length : (json.mistakes ? json.mistakes.length : 0);
      console.log(`       Mistake Notebook Items Count: ${count}`);
    }
  }

  console.log('--- ALL PAGES AND APIS VERIFIED AND WORKING PROPERLY ---');
}

runTests().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
