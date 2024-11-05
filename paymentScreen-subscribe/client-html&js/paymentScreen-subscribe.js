var clientKey = 'test_ck_P9BRQmyarYgzvyllMklN3J07KzLN';
var secretKey = base64('test_sk_BX7zk2yd8ynZbvQRJqPY3x9POLqK:')
var tossPayments;

function init() {
  tossPayments = TossPayments(clientKey);
}

function processSubscribe() {
  init();
  if (!tossPayments) { // tossPayments가 초기화되지 않았을 경우 처리
    console.error("TossPayments 객체가 초기화되지 않았습니다.");
    return;
  }
  console.log("TossPayments 객체가 초기화 되었습니다.");

  var amount = 1000;
  var successUrl = "https://google.com";
  var failUrl = "https://tistory.com";

  var jsons = {
    "card": {
      // customerKey에는 가맹점에서 가지고 있는 고객 식별키를 넣어주세요.
      // 다른 사용자가 이 값을 알게 되면 악의적으로 사용할 수 있어 자동 증가하는 숫자는 안전하지 않습니다. UUID와 같이 충분히 무작위적인 고유 값으로 생성해주세요.
      "customerKey": "test_customer_key",
      "successUrl": successUrl,
      "failUrl": failUrl,
      "amount": amount,
    }
  };  

  billing('카드', jsons.card);
}

function billing(method, requestJson) {
  console.log(requestJson);
  tossPayments.requestBillingAuth(method, requestJson)
    .then(function (response) {
      console.log("결제 요청 성공");
    })
    .catch(function (error) {
      if (error.code === "USER_CANCEL") {
        alert('유저가 취소했습니다.');
      } else {
        alert(error.message);
      }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // 결제하기 버튼에 클릭 이벤트 추가
    const payButton = document.getElementById("button_payment");
    payButton.addEventListener("click", function() {
        processSubscribe(); // 결제 처리 메소드 호출
    });
});