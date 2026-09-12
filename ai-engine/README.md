# Silent Guardian AI - Python AI Engine (Optional Module)

This optional FastAPI service implements the **Prototype Explainable Risk Engine** using Python.

> **Note**: For the primary hackathon demo, the Node.js/Express server already includes this risk engine built-in, so Python is NOT required to run the main application. This folder is provided for teams and judges who wish to inspect or benchmark the standalone Python AI microservice.

## Quick Start

### 1. Create Virtual Environment & Install Requirements
```bash
cd ai-engine
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Run the Service
```bash
uvicorn risk_engine:app --host 0.0.0.0 --port 8000 --reload
```

Interactive Swagger Docs available at: `http://localhost:8000/docs`

### 3. Test Prediction
```bash
curl -X POST http://localhost:8000/predict-risk \
  -H "Content-Type: application/json" \
  -d '{
    "audio_distress": true,
    "movement_suspicious": true,
    "location_risk": "high",
    "stalking_pattern": true,
    "user_sos": false
  }'
```

**Sample Output**:
```json
{
  "risk_score": 87,
  "risk_level": "HIGH",
  "factors": [
    "Distress acoustic frequency signature detected",
    "Abnormal pace deviation & rapid evasive velocity",
    "High-risk location: isolated transit underpass",
    "Stalking pattern: repeated proximity trajectory detected"
  ],
  "recommendation": "High threat level. Human verification triggered and location broadcast primed.",
  "timestamp": "2026-09-05T15:35:00.000000Z"
}
```
