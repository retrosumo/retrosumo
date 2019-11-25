import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Post, { PostShow } from "./components/Post";
import Profile from "./components/Profile";

export const Router = () => {
    let location = useLocation();

    const background = location.state && location.state.background;

    return (
        <>
            <Switch location={background || location}>
                <Route exact path="/" component={Post} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/post/:id" component={PostShow} />
            </Switch>

            {background && <Route path="/post/:id" component={PostShow} />}
        </>
    );
};

export default Router;
