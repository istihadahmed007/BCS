import urllib.request
import json

def test_endpoints():
    print("==================================================")
    print("VERIFYING P0 LIVE HTTP ENDPOINTS & WORKFLOWS")
    print("==================================================")

    # 1. UI Pages
    pages = [
        ("http://localhost:3000/admin/sources", "Source Registry Page"),
        ("http://localhost:3000/mistake-notebook", "Mistake Notebook Page"),
        ("http://localhost:3000/study/today", "Daily Practice Page"),
    ]
    for url, label in pages:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as res:
            assert res.status == 200
            content = res.read().decode("utf-8")
            print(f"[PASS] {label} (HTTP 200, length: {len(content)} bytes)")

    # 2. Source Registry API
    req = urllib.request.Request("http://localhost:3000/api/sources", headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        assert res.status == 200
        data = json.loads(res.read().decode("utf-8"))
        assert data.get("success") is True
        assert isinstance(data.get("data"), list)
        stats = data.get("stats")
        print(f"[PASS] Sources API GET (Total sources: {len(data['data'])}, Verified: {stats['verifiedSources']}, Awaiting Review: {stats['awaitingReviewSources']})")

    # 3. Mistake Notebook API (GET)
    user_id = "student_dr_rahim"
    req = urllib.request.Request(f"http://localhost:3000/api/mistake-notebook?userId={user_id}", headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        assert res.status == 200
        data = json.loads(res.read().decode("utf-8"))
        assert data.get("success") is True
        assert isinstance(data.get("data"), list)
        items = data.get("data")
        stats = data.get("stats")
        print(f"[PASS] Mistake Notebook API GET (User: {user_id}, Total mistakes: {len(items)}, Due for review: {stats['dueForReview']})")
        sample_id = items[0]["id"] if items else None

    # 4. Mistake Notebook API (POST new mistake)
    new_mistake_payload = json.dumps({
        "userId": user_id,
        "questionId": "q-bng-001",
        "userSelectedOption": "D",
        "errorType": "misread_question",
        "candidateNotes": "পরীক্ষার হলে দ্রুত পড়তে গিয়ে নেতিবাচক শব্দ খেয়াল করিনি।",
    }).encode("utf-8")

    req = urllib.request.Request(
        "http://localhost:3000/api/mistake-notebook",
        data=new_mistake_payload,
        headers={"Content-Type": "application/json", "x-user-id": user_id}
    )
    with urllib.request.urlopen(req) as res:
        assert res.status == 200
        resp_data = json.loads(res.read().decode("utf-8"))
        assert resp_data.get("success") is True
        created_id = resp_data["data"]["id"]
        print(f"[PASS] Mistake Notebook API POST: Successfully created/updated mistake entry {created_id}")

    # 5. Mistake Notebook API (PATCH update notes & status)
    patch_payload = json.dumps({
        "userId": user_id,
        "candidateNotes": "সংশোধিত নোট: ণ-ত্ব বিধানের নিয়মগুলো বিশেষ করে মনে রাখতে হবে।",
        "errorType": "forgotten_fact",
        "resolved": False,
    }).encode("utf-8")

    req = urllib.request.Request(
        f"http://localhost:3000/api/mistake-notebook/{created_id}",
        data=patch_payload,
        headers={"Content-Type": "application/json", "x-user-id": user_id},
        method="PATCH"
    )
    with urllib.request.urlopen(req) as res:
        assert res.status == 200
        patch_res = json.loads(res.read().decode("utf-8"))
        assert patch_res.get("success") is True
        assert patch_res["data"]["candidateNotes"].startswith("সংশোধিত নোট")
        print(f"[PASS] Mistake Notebook API PATCH: Successfully updated notes and error classification")

    # 6. Mistake Notebook API (POST practice drill)
    practice_payload = json.dumps({
        "userId": user_id,
        "examTrackId": "special_bcs_health_51_2026",
        "professionalStream": "assistant_surgeon",
        "questionCount": 5
    }).encode("utf-8")

    req = urllib.request.Request(
        "http://localhost:3000/api/mistake-notebook/practice",
        data=practice_payload,
        headers={"Content-Type": "application/json", "x-user-id": user_id}
    )
    with urllib.request.urlopen(req) as res:
        assert res.status == 200
        practice_res = json.loads(res.read().decode("utf-8"))
        assert practice_res.get("success") is True
        drill_questions = practice_res["data"]["questions"]
        print(f"[PASS] Mistake Notebook Drill Generator: Successfully generated practice set with {len(drill_questions)} questions")

    # 7. Navigation Links Verification
    req = urllib.request.Request("http://localhost:3000", headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        home_html = res.read().decode("utf-8")
        assert "/admin/sources" in home_html, "Home page must link to /admin/sources"
        assert "/mistake-notebook" in home_html, "Home page must link to /mistake-notebook"
        print("[PASS] Navigation: Home page contains working links to /admin/sources and /mistake-notebook")

    print("==================================================")
    print("ALL LIVE P0 TESTS & WORKFLOWS VERIFIED SUCCESSFULLY!")
    print("==================================================")

if __name__ == "__main__":
    test_endpoints()
