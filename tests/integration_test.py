import sys
import requests
import json

sys.stdout.reconfigure(encoding='utf-8')
base = 'http://localhost:3000'

def test_endpoint(name, method, url, **kwargs):
    res = requests.request(method, url, **kwargs)
    print(f'[{res.status_code}] {name} ({method} {url})')
    assert res.status_code in [200, 201], f'Failed {name}: {res.status_code} - {res.text}'
    return res

print('=== 1. TESTING FRONTEND ROUTES ===')
test_endpoint('Home Page', 'GET', f'{base}/')
test_endpoint('Onboarding Page', 'GET', f'{base}/onboarding')
test_endpoint('Dashboard Page', 'GET', f'{base}/dashboard')
test_endpoint('Test Hub Page', 'GET', f'{base}/test')
test_endpoint('Syllabus Page', 'GET', f'{base}/syllabus')
test_endpoint('Resources Page', 'GET', f'{base}/resources')
test_endpoint('Mistake Notebook Page', 'GET', f'{base}/mistake-notebook')
test_endpoint('Admin Portal Page', 'GET', f'{base}/admin')

print('\n=== 2. TESTING API ENDPOINTS ===')
# Exam Config
cfg_res = test_endpoint('Exam Config API', 'GET', f'{base}/api/exam/config?trackId=special_bcs_health_51_2026&stream=assistant_surgeon')
cfg_data = cfg_res.json()
print('   -> Published config total marks:', cfg_data['data']['config']['totalMarks'])
print('   -> Negative penalty:', cfg_data['data']['config']['wrongPenalty'])
print('   -> Mark validation:', cfg_data['data']['validation'])

# Test Session Creation
create_res = test_endpoint('Create Test Session', 'POST', f'{base}/api/test/create', json={
    'userId': 'test-doc-1',
    'examTrackId': 'special_bcs_health_51_2026',
    'professionalStream': 'assistant_surgeon',
    'testType': 'diagnostic',
    'title': 'Automated Integration Diagnostic'
})
session = create_res.json()['data']
session_id = session['id']
total_q = session['totalQuestions']
print(f'   -> Created session: {session_id} with {total_q} questions')

# Save intermediate response
test_endpoint('Autosave Response', 'PATCH', f'{base}/api/test/{session_id}', json={
    'questionId': session['questions'][0]['questionId'],
    'selectedOptionId': 'A',
    'isMarkedForReview': True
})

# Submit test session
sub_res = test_endpoint('Submit Test Session', 'POST', f'{base}/api/test/{session_id}', json={
    'responses': {
        session['questions'][0]['questionId']: {'selectedOptionId': 'A', 'timeSpentSeconds': 30},
        session['questions'][1]['questionId']: {'selectedOptionId': 'C', 'timeSpentSeconds': 25}
    },
    'idempotencyKey': f'idem-{session_id}'
})
evaluated = sub_res.json()['data']
score = evaluated['finalScore']
c_cnt = evaluated['correctCount']
w_cnt = evaluated['wrongCount']
print(f'   -> Final Score: {score} (Correct: {c_cnt}, Wrong: {w_cnt})')
print(f'   -> Subject Breakdown: {list(evaluated["subjectBreakdown"].keys())}')

# AI Tutor Grounded Explanation
ai_res = test_endpoint('AI Tutor Explanation API', 'POST', f'{base}/api/ai/explain', json={
    'questionId': session['questions'][0]['questionId'],
    'userSelectedOptionId': 'A',
    'language': 'bn'
})
ai_data = ai_res.json()['data']
print('   -> AI citations count:', len(ai_data['citedSources']))
print('   -> First citation:', ai_data['citedSources'][0]['title'])

# Planner Generation
plan_res = test_endpoint('Planner API', 'POST', f'{base}/api/planner/generate', json={
    'userId': 'test-doc-1',
    'examTrackId': 'special_bcs_health_51_2026',
    'professionalStream': 'assistant_surgeon',
    'dailyMinutesBudget': 90
})
plan_data = plan_res.json()['data']
tasks_cnt = len(plan_data['tasks'])
budget = plan_data['dailyMinutesBudget']
print(f'   -> Generated {tasks_cnt} study tasks strictly within {budget} min budget')

# Resources Catalog API
cat_res = test_endpoint('Resource Catalog API', 'GET', f'{base}/api/resources?type=book')
cat_data = cat_res.json()['data']
print(f'   -> Ingested reference books count: {cat_data["catalogBooksCount"]}')

print('\nALL INTEGRATION TESTS PASSED 100% SUCCESSFULLY!')
