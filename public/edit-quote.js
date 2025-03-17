const editButton = document.getElementById("edit-quote");
const newQuoteContainer = document.getElementById("new-quote2");

editButton.addEventListener("click", () => {
  const quote = document.getElementById("quote2").value;
  const person = document.getElementById("person2").value;
  const id = document.getElementById("id2").value;

  fetch(`/api/quotes/${id}?quote=${quote}&person=${person}`, {
    method: "PUT",
  })
    .then((response) => {
      response.json();
    })
    .then(({ quote }) => {
      const newQuote = document.createElement("div");
      newQuote.innerHTML = `
    <h3>Congrats, your quote was updated!</h3>
    <div class="quote-text">${quote.quote}</div>
    <div class="attribution">- ${quote.person}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `;
      newQuoteContainer.appendChild(newQuote);
    });
});
