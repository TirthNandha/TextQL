from fastapi import FastAPI
from pydantic import BaseModel
from model import generate_sql_from_text
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def say_hi():
    return {"success": True}


class BodyItem(BaseModel):
    enrollment: int
    name: str
    surname: str
    about: str | None = None
    cgpa: float | float = 0.00


@app.get("/ask")
async def ask_question(question: str):
    # print("in q")
    # print("Item: ", question)
    # print(question)
    print("Method called")
    res = generate_sql_from_text(question)
    # generated_sql = generate_sql_from_text(prompt)
    print(res)
    return {"sql": res}
