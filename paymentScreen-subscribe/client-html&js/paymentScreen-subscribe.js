function processSubscribe() {
    var clientKey = 'test_ck_P9BRQmyarYgzvyllMklN3J07KzLN';
    var tossPayments = TossPayments(clientKey);

    var amount = 1000;
    function billing(method, requestJson) {
      console.log(requestJson);
      tossPayments.requestBillingAuth(method, requestJson)
        .catch(function (error) {
          if (error.code === "USER_CANCEL") {
            alert('유저가 취소했습니다.');
          } else {
            alert(error.message);
          }
        });
    }

    var successUrl = window.location.origin + "/success";
    var failUrl = window.location.origin + "/fail";

    var jsons = {
      "card": {
        // customerKey에는 가맹점에서 가지고 있는 고객 식별키를 넣어주세요.
        // 다른 사용자가 이 값을 알게 되면 악의적으로 사용할 수 있어 자동 증가하는 숫자는 안전하지 않습니다. UUID와 같이 충분히 무작위적인 고유 값으로 생성해주세요.
        "customerKey": "test_customer_key",
        "successUrl": successUrl,
        "failUrl": failUrl
      }
    }  
}

document.addEventListener("DOMContentLoaded", function() {
    // 결제하기 버튼에 클릭 이벤트 추가
    const payButton = document.getElementById("button_payment");
    payButton.addEventListener("click", function() {
        processSubscribe(); // 결제 처리 메소드 호출
    });
});