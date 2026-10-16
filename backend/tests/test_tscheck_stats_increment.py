"""Criterion: Stats endpoint reflects total dispatches (delta-based, not absolute)."""


def test_stats_increments_by_one_on_dispatch(client):
    before = client.get("/greetings/stats")
    assert before.status_code == 200, before.text
    total_before = before.json()["total"]

    dispatch = client.post("/greetings/english/dispatch")
    assert dispatch.status_code == 200, dispatch.text

    after = client.get("/greetings/stats")
    assert after.status_code == 200, after.text
    total_after = after.json()["total"]

    assert total_after == total_before + 1, (
        f"expected total to increase by 1, got before={total_before} after={total_after}"
    )
