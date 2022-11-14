import React, {useEffect} from "react";

import {Route, Switch, useLocation} from "react-router-dom";
import Header from "../../layout/header/header";
import Main from "../../layout/body/main";
import Latest from "../latest/latest";
import Upcoming from "../upcoming/upcoming";
import Person from "../movies/aboutMovie/movieList/person/person";
import SearchBlock from "../search/searchBlock/searchBlock";
import AboutMovie from "../movies/aboutMovie/aboutMovie";

function Router() {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return(
      <>
          <Header/>
          <Switch>
              <Route path="/" component={Main} exact/>
              <Route path="/popular" component={Main} exact/>
              <Route path="/latest" component={Latest}/>
              <Route path="/upcoming" component={Upcoming}/>
              <Route path="/person/:id" component={Person}/>
              <Route path="/search/:query" component={SearchBlock}/>}
              <Route path="/:id" component={AboutMovie}/>
          </Switch>
      </>
    )
}

export default Router;