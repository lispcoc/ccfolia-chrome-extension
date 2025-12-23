// デフォルトの設定
let zoomLevel = 2;
let enableZoom = true;

// 拡大倍率と有効状態を`chrome.storage`から取得
chrome.storage.sync.get(["zoomLevel", "enableZoom"], (result) => {
  if (result.zoomLevel) {
    zoomLevel = result.zoomLevel;
  }
  if (result.enableZoom !== undefined) {
    enableZoom = result.enableZoom;
  }
});

// `chrome.storage`の変更を監視してリアルタイムで設定を更新
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "sync") {
    if (changes.zoomLevel) {
      zoomLevel = changes.zoomLevel.newValue;
    }
    if (changes.enableZoom) {
      enableZoom = changes.enableZoom.newValue;
    }
  }
  console.log(zoomLevel, enableZoom)
});

// モーダル要素を作成
const modal = document.createElement("div");
modal.style.position = "fixed";
modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
modal.style.display = "none";
modal.style.justifyContent = "center";
modal.style.alignItems = "center";
modal.style.zIndex = "1000000";

document.body.appendChild(modal);

// モーダル内の画像要素を作成
const modalImage = document.createElement("img");
modalImage.style.height = "360px"; // 縦サイズを360pxに固定
modalImage.style.objectFit = "contain"; // 画像の比率を維持
modal.appendChild(modalImage);

document.addEventListener("mouseover", (event) => {
  if (!enableZoom) return; // 拡大が無効の場合は処理を中断
  const target = event.target;

  // 対象画像のフィルタリング
  if (
    target.tagName === "IMG"
    &&
    target.classList.contains("MuiAvatar-img")
    //(target.id === filterId || target.classList.contains(filterClass))
  ) {
    // モーダルに画像を表示
    modalImage.src = target.src;

    // モーダルを一時的に表示して幅を取得
    modal.style.display = "flex";
    modal.style.width = "auto"; // モーダルの幅を画像に合わせる
    modal.style.height = "auto"; // モーダルの高さを画像に合わせる

    // モーダルの位置を設定
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const modalHeight = modal.offsetHeight; // モーダルの幅を取得
    const modalWidth = modal.offsetWidth; // モーダルの幅を取得
    modal.style.top = `${mouseY - modalHeight}px`;
    modal.style.left = `${mouseX - modalWidth}px`; // 右端をマウス位置に合わせる
  }
});

document.addEventListener("mouseout", (event) => {
  if (!enableZoom) return; // 拡大が無効の場合は処理を中断
  const target = event.target;

  // 対象画像のフィルタリング
  if (
    target.tagName === "IMG"
    &&
    target.classList.contains("MuiAvatar-img")
    //(target.id === filterId || target.classList.contains(filterClass))
  ) {
    modal.style.display = "none";
  }
});