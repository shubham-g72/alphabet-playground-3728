"""Criterion: Backend returns 404 for unknown greeting id."""


def test_get_unknown_greeting_404(client):
    resp = client.get("/greetings/nope")
    assert resp.status_code == 404, resp.text
    assert resp.json().get("detail") == "greeting not found"


def test_dispatch_unknown_greeting_404(client):
    resp = client.post("/greetings/nope/dispatch")
    assert resp.status_code == 404, resp.text
    assert resp.json().get("detail") == "greeting not found"
