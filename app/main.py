from fastapi import FastAPI
from app.routes import jobs
from app.auth import router as auth_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(jobs.router)

@app.get("/")
def home():
    return {"message": "Job Application Tracker API is running"}
