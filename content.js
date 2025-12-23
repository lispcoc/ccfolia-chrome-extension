// 対象とする画像のフィルタ条件 (idやクラス名で指定)
const filterId = "target-image"; // idが"target-image"の画像のみ対象
const filterClass = "zoomable"; // クラス名が"zoomable"の画像も対象

// デフォルトの拡大倍率
let zoomLevel = 2;

// 拡大倍率を`chrome.storage`から取得
chrome.storage.sync.get(["zoomLevel"], (result) => {
  if (result.zoomLevel) {
    zoomLevel = result.zoomLevel;
  }
});

// `chrome.storage`の変更を監視してリアルタイムで倍率を更新
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "sync" && changes.zoomLevel) {
    zoomLevel = changes.zoomLevel.newValue;
  }
});

// 画像をクリックしたときの拡大・縮小処理
document.addEventListener("mouseover", (event) => {
    const target = event.target;
  
    // 対象画像のフィルタリング
    if (
      target.tagName === "IMG"
      // &&
      //(target.id === filterId || target.classList.contains(filterClass))
    ) {
      // 拡大・縮小の切り替え
      if (target.style.transform === `scale(${zoomLevel})`) {
        target.style.transform = "scale(1)";
        target.style.transition = "transform 0.3s";
      } else {
        target.style.transform = `scale(${zoomLevel})`;
        target.style.transition = "transform 0.3s";
      }
    }
  });
  document.addEventListener("mouseout", (event) => {
    const target = event.target;
  
    // 対象画像のフィルタリング
    if (
      target.tagName === "IMG"
      // &&
      //(target.id === filterId || target.classList.contains(filterClass))
    ) {
      // 拡大・縮小の切り替え
      if (target.style.transform === `scale(${zoomLevel})`) {
        target.style.transform = "scale(1)";
        target.style.transition = "transform 0.3s";
      } else {
        target.style.transform = `scale(${zoomLevel})`;
        target.style.transition = "transform 0.3s";
      }
    }
  });