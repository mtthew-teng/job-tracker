from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import jobs
from app.auth import router as auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(jobs.router)

@app.get("/")
def home():
    return {"message": "Job Application Tracker API is running"}
