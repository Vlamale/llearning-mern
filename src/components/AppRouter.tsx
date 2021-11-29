import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { authRoutes, routes } from '../router'

const AppRouter = () => {
    const isAuth = useTypedSelector(state => state.user.isAuth)
    
    return (
        <Switch>
            {isAuth && authRoutes.map(({path, Component}) => (
                <Route key={path} path={path} component={Component} exact />
            ))}
            {!isAuth && routes.map(({path, Component}) => (
                <Route key={path} path={path} component={Component} exact />
            ))}
        </Switch>
    )
}

export default AppRouter