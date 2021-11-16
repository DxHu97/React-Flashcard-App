import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import AddCard from "../Components/AddCard"
import CreateDeck from "../Components/CreateDeck"
import Deck from "../Components/Deck"
import EditCard from "../Components/EditCard"
import EditDeck from "../Components/EditDeck"
import Study from "../Components/Study"
import {Route, Switch} from "react-router-dom"
import Home from "../Components/Home"

function Layout() {
  return (
      <div>
          <Header />
          <div className="container">
              <Switch>
                  <Route exact path="/">
                      <Home />
                  </Route>
                  <Route path="/decks/new">
                      <CreateDeck />
                  </Route>
                  <Route exact path="/decks/:deckId">
                      <Deck />
                  </Route>
                  <Route path="/decks/:deckId/study">
                      <Study />
                  </Route>
                  <Route path="/decks/:deckId/edit">
                      <EditDeck />
                  </Route>
                  <Route path="/decks/:deckId/cards/new">
                      <AddCard />
                  </Route>
                  <Route path="/decks/:deckId/cards/:cardId/edit">
                      <EditCard />
                  </Route>
                  <NotFound />
              </Switch>
          </div>
      </div>
  );
}

export default Layout;
