from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import http.client
import json
import base64

app = FastAPI()

# 토스페이먼츠 API 키 및 엔드포인트 설정
BILLING_API_URL = "https://api.tosspayments.com/v2/billing/subscriptions"

@app.get("/")
async def root():
    return {"message": "Hello World"}

# TossPayments API 호출을 위한 설정
CLIENT_KEY = 'test_ck_P9BRQmyarYgzvyllMklN3J07KzLN'
SECRET_KEY = 'test_sk_BX7zk2yd8ynZbvQRJqPY3x9POLqK'

@app.post("/process_payment/")
async def process_payment(card_number: str, expiration_year: str, expiration_month: str, card_password: str, customer_identity_number: str, customer_key: str):
    conn = http.client.HTTPSConnection("api.tosspayments.com")

    payload = json.dumps({
        "cardNumber": card_number,
        "cardExpirationYear": expiration_year,
        "cardExpirationMonth": expiration_month,
        "cardPassword": card_password,
        "customerIdentityNumber": customer_identity_number,     #생년월일 6자리
        "customerKey": customer_key
    })

    # Basic Authentication 헤더 생성
    auth_header = f"Basic {base64.b64encode(f'{SECRET_KEY}:'.encode()).decode()}"

    headers = {
        'Authorization': auth_header,
        'Content-Type': "application/json"
    }

    try:
        conn.request("POST", "/v1/billing/authorizations/card", payload, headers)
        res = conn.getresponse()
        data = res.read()

        if res.status != 200:
            raise HTTPException(status_code=res.status, detail=data.decode("utf-8"))

        response_data = json.loads(data.decode("utf-8"))
    
        # billingKey 추출
        billing_key = response_data.get("billingKey")
        print("billingKey:", billing_key)

        # JSONResponse로 반환
        return JSONResponse(content=response_data)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))