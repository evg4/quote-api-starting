const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log("Server listening");
});

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  const quoteToSend = { quote: randomQuote };
  res.send(quoteToSend);
});

app.get("/api/quotes", (req, res, next) => {
  if (req.query.person) {
    let person = req.query.person;
    let newArr = [];
    quotes.forEach((quote) => {
      if (quote.person == person) {
        newArr.push(quote);
      }
    });
    res.send({ quotes: newArr });
  } else {
    res.send({ quotes: quotes });
  }
});

app.post("/api/quotes", (req, res, next) => {
  if (req.query.person && req.query.quote) {
    const indexOfQuote = quotes.findIndex(
      (quote) => quote.id == req.query.quote
    );
    if (indexOfQuote == -1) {
      quotes.push(req.query);
      res.send({ quote: req.query });
    } else {
      res.status(400).send("Quote already exists in database");
    }
  } else {
    console.log("error");
    res.status(404).send("Unable to add quote");
  }
});

app.put("/api/quotes/:id", (req, res, next) => {
  const quoteId = req.params.id;
  const updates = req.query;
  //add the id back into the quotes object as a number
  updates.id = Number(quoteId);
  const indexOfQuote = quotes.findIndex((quote) => quote.id == quoteId);
  if (indexOfQuote !== -1) {
    quotes[indexOfQuote] = updates;
    res.send(updates);
  } else {
    res.status(404).send("Quote not found");
  }
});

app.delete("/api/quotes/:id", (req, res, next) => {
  const quoteId = req.params.id;
  const indexOfQuote = quotes.findIndex((quote) => quote.id == quoteId);
  const quoteToDelete = quotes.splice(indexOfQuote, 1);
  //quotes array has now had 1 element removed at index indexOfQuote
  //send back quote that was removed
  res.send(quoteToDelete);
});
