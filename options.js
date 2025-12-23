// 保存ボタンのクリックイベント
document.getElementById("save-button").addEventListener("click", () => {
    const zoomLevel = parseFloat(document.getElementById("zoom-level").value);
  
    if (zoomLevel >= 1) {
      // 倍率を保存
      chrome.storage.sync.set({ zoomLevel }, () => {
        document.getElementById("status").textContent = "保存しました!";
        setTimeout(() => {
          document.getElementById("status").textContent = "";
        }, 2000);
      });
    } else {
      document.getElementById("status").textContent = "倍率は1以上を指定してください。";
    }
  });
  
  // ページ読み込み時に現在の倍率を表示
  document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(["zoomLevel"], (result) => {
      if (result.zoomLevel) {
        document.getElementById("zoom-level").value = result.zoomLevel;
      }
    });
  });
  
  // マウスホイールで<input>の値を変更
  document.getElementById("zoom-level").addEventListener("wheel", (event) => {
    event.preventDefault(); // デフォルトのスクロール動作を無効化
  
    const input = event.target;
    const step = parseFloat(input.step) || 0.1; // step属性が指定されていない場合は0.1を使用
    const min = parseFloat(input.min) || 1; // min属性が指定されていない場合は1を使用
  
    let value = parseFloat(input.value) || min;
  
    // ホイールの方向に応じて値を増減
    if (event.deltaY < 0) {
      value += step; // 上方向スクロールで増加
    } else {
      value -= step; // 下方向スクロールで減少
    }
  
    // 最小値を下回らないようにする
    value = Math.max(value, min);
  
    input.value = value.toFixed(2); // 小数点以下2桁に丸める
  });