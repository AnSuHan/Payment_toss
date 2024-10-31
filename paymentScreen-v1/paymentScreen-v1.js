function processPayment() {
    // 여기에 토스페이먼츠 API 연동 코드 추가
    var tossPayments = TossPayments('test_ck_P9BRQmyarYgzvyllMklN3J07KzLN'); // 발급받은 API 키로 초기화      //API 개별 연동 키 - 클라이언트 키   

    tossPayments.requestPayment('카드', {
        amount: 1000, // 결제 금액 (단위: 원)
        orderId: 'order-id-1234', // 주문 ID (유니크한 값)
        orderName: '테스트 상품', // 상품명
        successUrl: 'https://glorygem-diary.tistory.com/', // 결제 성공 후 리다이렉트 URL
        failUrl: 'https://tistory.com/', // 결제 실패 후 리다이렉트 URL
    }).then(function(response) {
        // 결제 성공 후 처리
        console.log('결제 성공:', response);
        alert("결제가 처리되었습니다."); // 결제 처리 알림
    }).catch(function(error) {
        // 결제 실패 처리
        console.error('결제 실패:', error);
        alert("결제가 실패되었습니다."); // 결제 처리 알림
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // 결제하기 버튼에 클릭 이벤트 추가
    const payButton = document.getElementById("button_payment");
    payButton.addEventListener("click", function() {
        processPayment(); // 결제 처리 메소드 호출
    });
});