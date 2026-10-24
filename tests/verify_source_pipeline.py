import urllib.request
import json
import time

time.sleep(2)

base = "http://localhost:3000"

# 1. Test HTML routes
html_routes = [
    "/study/today",
    "/admin/sources",
    "/admin/question-bank/imports",
    "/admin/question-bank/review",
    "/admin/question-bank/coverage"
]

print("--- Testing HTML Routes ---")
for route in html_routes:
    req = urllib.request.Request(f"{base}{route}")
    with urllib.request.urlopen(req) as resp:
        status = resp.status
        body = resp.read().decode('utf-8')
        assert status == 200, f"Route {route} failed with {status}"
        print(f"[PASS] {route} returned HTTP 200 (length: {len(body)})")

# 2. Test API Routes
print("\n--- Testing API Routes ---")
# Sources API
req = urllib.request.Request(f"{base}/api/sources")
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    assert data["success"] is True
    print(f"[PASS] /api/sources returned {len(data['data'])} registered sources")

# Coverage API
req = urllib.request.Request(f"{base}/api/ingestion/coverage")
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    assert data["success"] is True
    cov = data["data"]
    print(f"[PASS] /api/ingestion/coverage: Ingested={cov['totalIngested']}, Approved={cov['totalApproved']}, UnderReview={cov['totalUnderReview']}")

# Daily Practice Generation API
post_data = json.dumps({
    "userId": "student_current",
    "examTrackId": "general_bcs",
    "professionalStream": "general",
    "practiceMode": "mixed",
    "questionCount": 5
}).encode('utf-8')

req = urllib.request.Request(f"{base}/api/practice/daily", data=post_data, headers={'Content-Type': 'application/json', 'x-user-id': 'student_dr_rahim'}, method='POST')
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    assert data["success"] is True
    pset = data["data"]
    print(f"[PASS] /api/practice/daily created session {pset['id']} with {len(pset['questions'])} questions")

# Submit answer API
first_q = pset['questions'][0]['question']
sub_data = json.dumps({
    "action": "submit_answer",
    "questionId": first_q['id'],
    "selectedOptionId": first_q.get('correctAnswerId') or 'A',
    "timeSpentSeconds": 12
}).encode('utf-8')

req = urllib.request.Request(f"{base}/api/practice/{pset['id']}", data=sub_data, headers={'Content-Type': 'application/json', 'x-user-id': 'student_dr_rahim'}, method='POST')
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    assert data["success"] is True
    assert data["data"]["isCorrect"] is True
    print(f"[PASS] /api/practice/{pset['id']} evaluated answer: isCorrect={data['data']['isCorrect']}")

print("\nALL VERIFICATIONS PASSED SUCCESSFULLY!")
