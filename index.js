// CADASTRAR CONTATO

function registerContact(event) {
  event.preventDefault();

  const name = document.getElementById("nameInput").value.trim();
  const cpf = document.getElementById("cpfInput").value.trim();
  const birthDate = document.getElementById("dobInput").value.trim();
  const address = document.getElementById("addressInput").value.trim();

  let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

  if (registrations.some((registration) => registration.cpf === cpf)) {
    alert("Este CPF já está cadastrado.");
    return;
  }

  registrations.push({ name, cpf, birthDate, address });
  localStorage.setItem("registrations", JSON.stringify(registrations));

  console.log(registrations);

  event.target.reset();

  alert("Contato salvo com sucesso!");
}

document.getElementById("contactForm").addEventListener("submit", (event) => {
  registerContact(event);
});

// EXIBIR CONTATOS

function createCard(registration) {
  const card = document.createElement("div");
  card.className = "card mt-3";
  const cardContent = `
    <div class="card-body">
      <h5 class="card-title text-primary">${registration.name}</h5>
      <p class="card-text">CPF: ${registration.cpf}</p>
      <p class="card-text">Data de Nascimento: ${registration.birthDate}</p>
      <p class="card-text">Endereço: ${registration.address}</p>
    </div>
  `;

  card.innerHTML = cardContent;
  return card;
}

function showRegistrations() {
  const cardContainer = document.getElementById("cardContainer");
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

  console.log(registrations);

  for (let registration of registrations) {
    const card = createCard(registration);
    cardContainer.appendChild(card);
  }
}

document.getElementById("btnShow").addEventListener("click", () => {
  showRegistrations();
});

// BUSCAR CONTATO

function searchRegistration() {
  const cpf = prompt("Digite o CPF do contato que deseja buscar:").trim();
  const registrations = JSON.parse(localStorage.getItem("registrations")) || [];

  const registration = registrations.find(
    (registration) => registration.cpf === cpf
  );
  if (!registration) {
    alert("Contato não encontrado.");
    return;
  }

  alert(`Contato encontrado:
    Nome: ${registration.name}
    CPF: ${registration.cpf}
    Data de Nascimento: ${registration.birthDate}
    Endereço: ${registration.address}`);
}

document.getElementById("btnSearch").addEventListener("click", () => {
  searchRegistration();
});

// DELETAR CONTATO

function deleteRegistration() {
  const cpf = prompt("Digite o CPF do contato que deseja deletar:").trim();
  let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

  const index = registrations.findIndex((registration) => registration.cpf === cpf);
  if (index === -1) {
    alert("Contato não encontrado.");
    return;
  }

  registrations.splice(index, 1);
  localStorage.setItem("registrations", JSON.stringify(registrations));

  alert("Contato deletado com sucesso!");
}

document.getElementById("btnDelete").addEventListener("click", () => {
  deleteRegistration();
});
