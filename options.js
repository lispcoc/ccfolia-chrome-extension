// 拡大倍率の変更イベント
document.getElementById("zoom-level").addEventListener("input", () => {
  const zoomLevel = parseFloat(document.getElementById("zoom-level").value);
  chrome.storage.sync.set({ zoomLevel }, () => {
    const status = document.getElementById("status");
    status.textContent = "拡大倍率を即時反映しました。";
    setTimeout(() => {
      status.textContent = "";
    }, 1000);
  });
});

// 拡大有効・無効の変更イベント
document.getElementById("enable-zoom").addEventListener("change", () => {
  const enableZoom = document.getElementById("enable-zoom").checked;
  chrome.storage.sync.set({ enableZoom }, () => {
    const status = document.getElementById("status");
    status.textContent = "拡大設定を即時反映しました。";
    setTimeout(() => {
      status.textContent = "";
    }, 1000);
  });
});

// ページ読み込み時に現在の設定を反映
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["zoomLevel", "enableZoom"], (result) => {
    if (result.zoomLevel !== undefined) {
      document.getElementById("zoom-level").value = result.zoomLevel;
    }
    if (result.enableZoom !== undefined) {
      document.getElementById("enable-zoom").checked = result.enableZoom;
    }
  });
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
