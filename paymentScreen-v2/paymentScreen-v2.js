async function processPaymentV2() {
    var userData = {
        "customerKey" : 'CUSTOMER_' + Math.random().toString(36).substr(2, 9),
        "name" : "홍길동",
        "email" : "customer@example.com",
        "phone" : "010-1234-5678"
    };

    // 여기에 토스페이먼츠 API 연동 코드 추가 가능
    await registerNewUser(userData);
}

//https://github.com/tosspayments/tosspayments-sample/blob/main/express-javascript/public/payment/checkout.html
async function registerNewUser(userData) {
    const clientKey = 'test_ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    const customerKey = 'CUSTOMER_' + Math.random().toString(36)
    const tosspayments = TossPayments(clientKey);
    const payment = tosspayments.payment({
        customerKey,
    });
    await requestPayment(payment);
}

// ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
// @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
async function requestPayment(payment) {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    let selectedPaymentMethod = 'CARD';
    let amount = {
        value: 1000,
        currency: "KRW",
    };

    successUrl = "http://tistory.com";
    failUrl = "http://google/com";

    switch (selectedPaymentMethod) {
        case "CARD":
        await payment.requestPayment({
            method: "CARD", // 카드 및 간편결제
            amount,
            orderId: generateRandomString(),
            orderName: "토스 티셔츠 외 2건",
            successUrl: successUrl, // 결제 요청이 성공하면 리다이렉트되는 URL
            failUrl: failUrl, // 결제 요청이 실패하면 리다이렉트되는 URL
            customerEmail: "customer123@gmail.com",
            customerName: "김토스",
            customerMobilePhone: "01012341234",
            card: {
            useEscrow: false,
            flowMode: "DEFAULT",
            useCardPoint: false,
            useAppCardOnly: false,
            },
        });
        case "TRANSFER":
        await payment.requestPayment({
            method: "TRANSFER", // 계좌이체 결제
            amount,
            orderId: generateRandomString(),
            orderName: "토스 티셔츠 외 2건",
            successUrl: successUrl,
            failUrl: failUrl,
            customerEmail: "customer123@gmail.com",
            customerName: "김토스",
            customerMobilePhone: "01012341234",
            transfer: {
            cashReceipt: {
                type: "소득공제",
            },
            useEscrow: false,
            },
        });
        case "VIRTUAL_ACCOUNT":
        await payment.requestPayment({
            method: "VIRTUAL_ACCOUNT", // 가상계좌 결제
            amount,
            orderId: generateRandomString(),
            orderName: "토스 티셔츠 외 2건",
            successUrl: successUrl,
            failUrl: failUrl,
            customerEmail: "customer123@gmail.com",
            customerName: "김토스",
            customerMobilePhone: "01012341234",
            virtualAccount: {
            cashReceipt: {
                type: "소득공제",
            },
            useEscrow: false,
            validHours: 24,
            },
        });
        case "MOBILE_PHONE":
        await payment.requestPayment({
            method: "MOBILE_PHONE", // 휴대폰 결제
            amount,
            orderId: generateRandomString(),
            orderName: "토스 티셔츠 외 2건",
            successUrl: successUrl,
            failUrl: failUrl,
            customerEmail: "customer123@gmail.com",
            customerName: "김토스",
            customerMobilePhone: "01012341234",
        });
        case "CULTURE_GIFT_CERTIFICATE":
        await payment.requestPayment({
            method: "CULTURE_GIFT_CERTIFICATE", // 문화상품권 결제
            amount,
            orderId: generateRandomString(),
            orderName: "토스 티셔츠 외 2건",
            successUrl: successUrl,
            failUrl: failUrl,
            customerEmail: "customer123@gmail.com",
            customerName: "김토스",
            customerMobilePhone: "01012341234",
        });
        case "FOREIGN_EASY_PAY":
        await payment.requestPayment({
            method: "FOREIGN_EASY_PAY", // 해외 간편결제
            amount: {
            value: 100,
            currency: "USD",
            },
            orderId: generateRandomString(),
            orderName: "토스 티셔츠 외 2건",
            successUrl: successUrl,
            failUrl: failUrl,
            customerEmail: "customer123@gmail.com",
            customerName: "김토스",
            customerMobilePhone: "01012341234",
            foreignEasyPay: {
            provider: "PAYPAL",
            country: "KR",
            },
        });
    }
}

function generateRandomString() {
    return window.btoa(Math.random()).slice(0, 20);
}



document.addEventListener("DOMContentLoaded", function() {
    // 결제하기 버튼에 클릭 이벤트 추가
    const payButton = document.getElementById("payButton");
    payButton.addEventListener("click", async function() {
        await processPaymentV2(); // 결제 처리 메소드 호출
    });
});
