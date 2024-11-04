from fastapi import FastAPI, HTTPException
import httpx

app = FastAPI()

# 토스페이먼츠 API 키 및 엔드포인트 설정
TOSS_API_KEY = "test_ck_P9BRQmyarYgzvyllMklN3J07KzLN"
BILLING_API_URL = "https://api.tosspayments.com/v2/billing/subscriptions"

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/subscribe")
async def subscribe(customer_key: str, billing_key: str, amount: float):
    headers = {
        "Authorization": f"Bearer {TOSS_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # 결제 요청 데이터
    data = {
        "customerKey": customer_key,
        "billingKey": billing_key,
        "amount": amount,
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(BILLING_API_URL, headers=headers, json=data)
        
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.json())