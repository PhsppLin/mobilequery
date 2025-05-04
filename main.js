
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const clearButton = document.getElementById("clearButton");
    const resultContainer = document.getElementById("resultContainer");
    const updateTime = document.getElementById("updateTime");

    let jsonData = [];

    // 讀取 JSON 資料
    fetch("mobilequery_data.json")
        .then((res) => res.json())
        .then((data) => {
            jsonData = data;

            // 顯示更新時間
            const metaDate = data.find(item => item.metadata);
            if (metaDate) {
                updateTime.textContent = metaDate.metadata;
            }
        })
        .catch((err) => {
            console.error("讀取 JSON 失敗", err);
            updateTime.textContent = "未知";
        });

    // 搜尋功能
    searchButton.addEventListener("click", () => {
        const keyword = searchInput.value.trim().toLowerCase();
        if (!keyword) return;

        const results = jsonData.filter(item =>
            item.name && item.name.toLowerCase().includes(keyword)
        );

        renderResults(results);
    });

    // 清除功能
    clearButton.addEventListener("click", () => {
        searchInput.value = "";
        resultContainer.innerHTML = "";
    });

    // 渲染結果
    function renderResults(results) {
        resultContainer.innerHTML = "";
        results.forEach(item => {
            const block = document.createElement("div");
            block.className = "result-block";
            block.innerHTML = `
                <strong>選取手機：</strong> ${item.name} <br>
                空機價：${item.price} &nbsp;&nbsp;&nbsp; 保險：${item.insurance || "-"}
            `;
            resultContainer.appendChild(block);
        });
    }
});
