function copyToClipboard() {
  /* 獲取連結元素 */
  const link = document.getElementById("link");
  /* 建立一個輔助元素 */
  const aux = document.createElement("input");
  /* 設置輔助元素的值為連結的href屬性 */
  aux.setAttribute("value", link.href);
  /* 將輔助元素添加到DOM中 */
  document.body.appendChild(aux);
  /* 選擇輔助元素的值 */
  aux.select();
  /* 複製選擇的文本到剪貼板 */
  document.execCommand("copy");
  /* 移除輔助元素 */
  document.body.removeChild(aux);
  /* 修改按鈕文本顯示為已複製 */
  const copyButton = document.getElementById("copyButton");
  copyButton.innerHTML = "Copied";
}