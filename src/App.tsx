import React from "react";
import { Navbar } from "./components/ui/Navbar";
import { ApolloProvider } from "@apollo/client";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MyPokemon from "./pages/MyPokemon";
import { client } from "@/graphql";
import PokemonDetail from "./pages/PokemonDetail";
function App() {
    
    return (
        <>
            <div className="app">
                <ApolloProvider client={client}>
                    <Router>
                        <Navbar />
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/pokemon/:name">
                                <PokemonDetail />
                            </Route>
                            <Route exact path="/my-pokemon">
                                <MyPokemon />
                            </Route>
                        </Switch>
                    </Router>
                </ApolloProvider>
            </div>
        </>
    );
}

export default App;
