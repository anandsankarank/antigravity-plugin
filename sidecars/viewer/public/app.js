const viewer = document.getElementById('viewer');
const fileSelect = document.getElementById('file-select');
const toggleBtn = document.getElementById('toggle-view-btn');
const refreshBtn = document.getElementById('refresh-btn');
const rawEditor = document.getElementById('raw-editor');
const viewerContainer = document.getElementById('viewer-container');
const activeFileLabel = document.getElementById('active-file-label');

let currentFile = '';
let isRawMode = false;

async function loadFileList() {
  try {
    const res = await fetch('/api/list');
    if (!res.ok) return;
    const data = await res.json();
    fileSelect.innerHTML = '<option value="">Select a .mdui file from workspace...</option>';
    (data.files || []).forEach(f => {
      const opt = document.createElement('option');
      opt.value = f;
      opt.textContent = f;
      if (f === currentFile) opt.selected = true;
      fileSelect.appendChild(opt);
    });
  } catch (err) {
    console.warn('Could not load file list', err);
  }
}

async function loadFile(filePath) {
  if (!filePath) return;
  try {
    const res = await fetch(`/api/file?path=${encodeURIComponent(filePath)}`);
    if (!res.ok) throw new Error('Failed to load file');
    const content = await res.text();
    currentFile = filePath;
    activeFileLabel.textContent = filePath;
    fileSelect.value = filePath;

    // Update <a-mdui> component
    viewer.setAttribute('content', content);
    rawEditor.value = content;
  } catch (err) {
    console.error('Error loading file:', err);
    activeFileLabel.textContent = `Error loading ${filePath}`;
  }
}

fileSelect.addEventListener('change', () => {
  if (fileSelect.value) {
    loadFile(fileSelect.value);
  }
});

refreshBtn.addEventListener('click', () => {
  if (currentFile) {
    loadFile(currentFile);
  } else if (fileSelect.value) {
    loadFile(fileSelect.value);
  } else {
    loadFileList();
  }
});

toggleBtn.addEventListener('click', () => {
  isRawMode = !isRawMode;
  if (isRawMode) {
    viewerContainer.style.display = 'none';
    rawEditor.style.display = 'block';
    toggleBtn.textContent = 'Preview';
  } else {
    // Sync any edits back to preview
    viewer.setAttribute('content', rawEditor.value);
    rawEditor.style.display = 'none';
    viewerContainer.style.display = 'block';
    toggleBtn.textContent = 'Raw';
  }
});

rawEditor.addEventListener('input', () => {
  if (isRawMode) {
    viewer.setAttribute('content', rawEditor.value);
  }
});

// Initialization
const params = new URLSearchParams(window.location.search);
const targetFile = params.get('file');

loadFileList().then(() => {
  if (targetFile) {
    loadFile(targetFile);
  } else if (fileSelect.options.length > 1) {
    // Select first available file
    loadFile(fileSelect.options[1].value);
  }
});

