"""
Silent Guardian AI - Prototype Explainable Risk Engine (FastAPI)
Hackathon prototype service demonstrating multi-signal AI risk scoring.

Run command:
  uvicorn risk_engine:app --host 0.0.0.0 --port 8000 --reload
"""

from typing import List, Optional, Literal
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import datetime

app = FastAPI(
    title="Silent Guardian AI - Risk Engine",
    description="Explainable multi-signal safety analysis service for prototype demonstration.",
    version="1.0.0-hackathon"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RiskInput(BaseModel):
    audio_distress: bool = False
    movement_suspicious: bool = False
    location_risk: Literal["low", "medium", "high"] = "low"
    stalking_pattern: bool = False
    time_risk: bool = False
    user_sos: bool = False

class RiskOutput(BaseModel):
    risk_score: int
    risk_level: str
    factors: List[str]
    recommendation: str
    timestamp: str

@app.get("/health")
def health():
    return {"status": "ok", "service": "Python AI Risk Engine Prototype"}

@app.post("/predict-risk", response_model=RiskOutput)
def predict_risk(data: RiskInput):
    """
    Explainable prototype risk assessment combining acoustic, movement,
    spatio-temporal and trajectory telemetry into a bounded 0-100 risk score.
    """
    score = 10
    factors = []

    if data.audio_distress:
        score += 20
        factors.append("Distress acoustic frequency signature detected")

    if data.movement_suspicious:
        score += 20
        factors.append("Abnormal pace deviation & rapid evasive velocity")

    if data.location_risk == "high":
        score += 20
        factors.append("High-risk location: isolated transit underpass")
    elif data.location_risk == "medium":
        score += 10
        factors.append("Moderate historical report density in vicinity")

    if data.stalking_pattern:
        score += 25
        factors.append("Stalking pattern: repeated proximity trajectory detected")

    if data.time_risk:
        score += 9
        factors.append("Late-night off-hours vulnerability window")

    if data.user_sos:
        score += 35
        factors.append("Direct manual SOS emergency trigger")

    # Bounded between 0 and 100
    score = max(0, min(100, score))

    if score >= 81:
        level = "CRITICAL"
        rec = "Immediate danger indicated. Silent emergency broadcast and guardian dispatch required."
    elif score >= 61:
        level = "HIGH"
        rec = "High threat level. Human verification triggered and location broadcast primed."
    elif score >= 31:
        level = "MEDIUM"
        rec = "Elevated ambient risk. Telemetry frequency increased."
    else:
        level = "LOW"
        rec = "Nominal sensor baseline. Continuous background monitoring active."

    if not factors:
        factors.append("Nominal sensor signals; baseline clear")

    return RiskOutput(
        risk_score=score,
        risk_level=level,
        factors=factors,
        recommendation=rec,
        timestamp=datetime.datetime.utcnow().isoformat() + "Z"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
