import React, { useContext, useRef } from "react";
import { Navbar } from "./components/ui/Navbar";
import { Switch, HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MyPokemon from "./pages/MyPokemon";
import PokemonDetail from "./pages/PokemonDetail";
import { ToastContext } from "./context/ToastContext";
import { createPortal } from "react-dom";
import { SimpleToast } from "./components/toast/Toast";
import { CSSTransition } from "react-transition-group";
function App() {
    const body = document.querySelector("body") as HTMLBodyElement;
    const toastContext = useContext(ToastContext);
    const nodeRef = useRef<HTMLDivElement>(null);
    return (
        <div className="app">
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
            {createPortal(
                <CSSTransition
                    in={toastContext.visible}
                    classNames="toast"
                    timeout={300}
					nodeRef={nodeRef}
					unmountOnExit
                >
                    <SimpleToast
                        ref={nodeRef}
                        onClick={() => toastContext.closeToast()}
                    >
                        {toastContext.message}
                    </SimpleToast>
                </CSSTransition>,
                body
            )}
        </div>
    );
}

export default App;
