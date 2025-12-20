let presets = [];

// JSON読み込み（共有データ）
fetch("presets.json")
  .then(res => res.json())
  .then(data => {
    presets = data.scene_presets;
    renderPresets();
  });

// 表示処理
function renderPresets() {
  const container = document.getElementById("presetContainer");
  container.innerHTML = "";

  presets.forEach(preset => {
    const div = document.createElement("div");
    div.className = "preset";

    div.innerHTML = `
      <h3>${preset.scene_name}</h3>
      <p>作成者：${preset.author}</p>
      <ul>
        ${preset.equipment.map(item => `<li>${item}</li>`).join("")}
      </ul>
    `;

    container.appendChild(div);
  });
}

// プリセット追加（※ローカル表示のみ）
function addPreset() {
  const scene = document.getElementById("sceneName").value;
  const author = document.getElementById("authorName").value;
  const equipmentText = document.getElementById("equipmentList").value;

  if (!scene || !author || !equipmentText) {
    alert("すべて入力してください");
    return;
  }

  const equipment = equipmentText.split("\n");

  presets.push({
    scene_name: scene,
    author: author,
    equipment: equipment
  });

  renderPresets();

  alert("追加されました（※共有するには presets.json を編集して GitHub に push してください）");
}
