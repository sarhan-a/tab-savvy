let mySaves = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const savedListEl = document.getElementById('saved-list-el');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('mySaves'));

if (leadsFromLocalStorage) {
  mySaves = leadsFromLocalStorage;
  render(mySaves);
}

tabBtn.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    mySaves.push(tabs[0].url);
    localStorage.setItem('mySaves', JSON.stringify(mySaves));
    render(mySaves);
  });
});

function render(leads) {
  let listItems = '';
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
      <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
      </a>
    </li>
  `;
  }
  savedListEl.innerHTML = listItems;
}

deleteBtn.addEventListener('dblclick', function () {
  localStorage.clear();
  mySaves = [];
  render(mySaves);
});

inputBtn.addEventListener('click', function () {
  mySaves.push(inputEl.value);
  inputEl.value = '';

  localStorage.setItem('mySaves', JSON.stringify(mySaves));

  render(mySaves);
});
