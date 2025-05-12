let array = [];
const container = document.getElementById('array-container');
const inputsDiv = document.getElementById('array-inputs');

function createInputFields() {
    inputsDiv.innerHTML = '';
    const sizeInput = document.getElementById('array-size');
    const size = parseInt(sizeInput.value);
  
    if (isNaN(size) || size < 1 || size > 100) {
      alert("Array size must be between 1 and 100.");
      return;
    }
  
    for (let i = 0; i < size; i++) {
      const input = document.createElement('input');
      input.type = 'number';
      input.min = '1';
      input.placeholder = `#${i + 1}`;
      input.value = Math.floor(Math.random() * 91) + 10;
      inputsDiv.appendChild(input);
    }
  }
  
  
  function submitArray() {
    const inputs = inputsDiv.getElementsByTagName('input');
    array = [];
    for (let input of inputs) {
      const val = parseInt(input.value);
      if (isNaN(val) || val < 1) {
        alert("Please enter positive numbers only.");
        return;
      }
      array.push(val);
    }
    renderBars();
  }  

  function renderBars(highlight = -1) {
    container.innerHTML = '';
    array.forEach((val, i) => {
      const bar = document.createElement('div');
      bar.classList.add('bar');
      bar.style.height = `${val * 3}px`;
      if (i === highlight) bar.style.background = '#FFA55D';
      container.appendChild(bar);
    });
  }
  

async function mergeSort(arr, left, right) {
  if (left >= right) return;
  const mid = Math.floor((left + right) / 2);
  await mergeSort(arr, left, mid);
  await mergeSort(arr, mid + 1, right);
  await merge(arr, left, mid, right);
  renderBars();
}

async function merge(arr, left, mid, right) {
  const L = arr.slice(left, mid + 1);
  const R = arr.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;

  while (i < L.length && j < R.length) {
    if (L[i] <= R[j]) {
      arr[k++] = L[i++];
    } else {
      arr[k++] = R[j++];
    }
    renderBars(k - 1);
    await sleep(100);
  }

  while (i < L.length) {
    arr[k++] = L[i++];
    renderBars(k - 1);
    await sleep(100);
  }

  while (j < R.length) {
    arr[k++] = R[j++];
    renderBars(k - 1);
    await sleep(100);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
