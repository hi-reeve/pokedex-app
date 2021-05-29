import React from "react";
import { Navbar } from "./components/ui/Navbar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
    Switch,
    BrowserRouter as Router,
    Route,
    Redirect,
} from "react-router-dom";
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
});
import "./App.css";
import Home from "./pages/Home";
import MyPokemon from "./pages/MyPokemon";
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
