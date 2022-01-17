let timer;
const addTableRow = () => {
  const html = `
    <tr>
      <td>
        <div class="name-cell">
          <input type="text" class="form-control" placeholder="Name" aria-label="Name">
        </div>
      </td>
      <td>
        <div class="wage-cell">
          <input type="text" class="form-control" placeholder="0.00" aria-label="wage">
        </div>
      </td>
      <td class="align-middle">
        <div class="cpp-cell">$0.00</div>
      </td>
      <td>
      <button class="btn btn-danger" onclick="this.closest('tr').remove()">
        <i class="fas fa-trash"></i>
      </button>
      </td>
    </tr>`;

  const rowCount = document.querySelectorAll("#people tr").length;
  const newRow = document.getElementById("people").insertRow(rowCount - 1);
  newRow.innerHTML = html;
};

function resetClock() {
  clearInterval(timer);
  document.getElementById('time').textContent = "00:00:00";
}

const pausePlayClock = () => {
  const icon = document.getElementById("pause-play-icon");
  const button = document.getElementById("pause-play-button");

  if(icon.classList.contains("fa-pause")) {
    icon.className = "fa fa-play";
    button.className = "btn btn-success";
    clearInterval(timer);
  } else {
    icon.className = "fa fa-pause";
    button.className = "btn btn-dark";
    timer = setInterval(addSecond, 1000);
  }
};

function addSecond() {
  const time = document.getElementById("time");
  const displayTime = time.textContent.split(":");
  let seconds = displayTime.reduce((a, b) => +a + +b);

  seconds++;

  displayTime[0] = Math.floor(seconds / 3600);
  displayTime[1] = Math.floor((seconds - displayTime[0] * 3600) / 60);
  displayTime[2] = seconds - (displayTime[1] * 60 + displayTime[0] * 3600);

  displayTime.forEach((el, i) => (displayTime[i] = el < 10 ? "0" + el : el));
  time.textContent = displayTime.join(":");

  updateCosts(seconds);
}

function updateCosts(seconds) {
  let currentTotal = 0;

  [...document.querySelectorAll(".wage-cell")].forEach((el, i) => {
    const wage = +document.querySelectorAll(".wage-cell>input")[i].value;
    const currentCost = ((wage / 3600) * seconds).toFixed(2);
    document.querySelectorAll(".cpp-cell")[i].textContent = `$${currentCost}`;
    currentTotal += +currentCost;
  });
  
  document.getElementById("total-cost").textContent = "$" + currentTotal.toFixed(2);
}

addTableRow();
