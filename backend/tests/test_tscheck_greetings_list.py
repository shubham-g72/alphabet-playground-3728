"""Criterion: Greeting pills are loaded from the backend API, not hardcoded."""

EXPECTED_IDS = {"english", "spanish", "japanese", "french", "python", "rust"}


def test_greetings_list_returns_six(client):
    resp = client.get("/greetings")
    assert resp.status_code == 200, resp.text
    data = resp.json()
    assert len(data) == 6, f"expected 6 greetings, got {len(data)}: {data}"
    ids = {g["id"] for g in data}
    assert ids == EXPECTED_IDS, f"ids mismatch: {ids}"
    python_entry = next(g for g in data if g["id"] == "python")
    assert python_entry["mono"] is True
    assert python_entry["text"] == 'print("Hello, World!")'
