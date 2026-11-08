const bookingForm = document.querySelector("#booking-form");
const bookingStatus = document.querySelector("#booking-status");
const dateInput = bookingForm.elements.data;
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 10);

dateInput.min = localToday;

const requestedService = new URLSearchParams(window.location.search).get("servico");
if (requestedService) {
  const requestedOption = bookingForm.querySelector(
    `input[name="servico"][value="${CSS.escape(requestedService)}"]`
  );
  if (requestedOption) {
    requestedOption.checked = true;
  }
}

bookingForm.addEventListener("change", (event) => {
  if (event.target.name === "servico") {
    bookingStatus.textContent = "";
  }
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) {
    return;
  }

  const formData = new FormData(bookingForm);
  const service = bookingForm.querySelector('input[name="servico"]:checked');
  const date = new Date(`${formData.get("data")}T00:00:00`);
  const formattedDate = new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "long",
  }).format(date);
  const note = formData.get("nota").toString().trim();
  const message = [
    "Olá, Martim! Gostava de pedir esta marcação ao domicílio:",
    "",
    `Serviço: ${service.dataset.label}`,
    `Preço: ${service.dataset.price}`,
    `Dia: ${formattedDate}`,
    `Hora preferida: ${formData.get("hora")}`,
    `Morada: ${formData.get("morada")}`,
    `Nome: ${formData.get("nome")}`,
    `Telemóvel: ${formData.get("telefone")}`,
    ...(note ? [`Nota: ${note}`] : []),
    "",
    "Se for um plano mensal, combinamos os restantes cortes contigo.",
  ].join("\n");
  const whatsappUrl = `https://wa.me/351934335622?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  bookingStatus.replaceChildren(
    document.createTextNode("A mensagem está pronta. Se o WhatsApp não abriu, "),
    Object.assign(document.createElement("a"), {
      href: whatsappUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      textContent: "toca aqui para abrir a conversa",
    }),
    document.createTextNode(". Depois, carrega em Enviar para eu receber o pedido.")
  );
});
