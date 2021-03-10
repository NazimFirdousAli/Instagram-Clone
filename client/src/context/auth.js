import React, { createContext, useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom';
import AUTH_TOKEN from '../Components/constants';

const USER = gql`
query{
    data: loggedInUser{
        name
        email
        phonenumber
        avatar
    }
}
`


const { Provider, Consumer } = createContext()

export const withAuthContext = Component => props => (
    <Consumer>{value => <Component {...value} {...props} />}</Consumer>
)

export default function AuthProvider({ children }) {
    const history = useHistory();     //////////////////////FOR HISTORY///////////////////////
    const [state, setState] = useState({})
    const [refetchUser, { loading }] = useLazyQuery(USER, {
        fetchPolicy: 'no-cache',
        onCompleted: ({ data }) => {
            setState(prev => ({ ...prev, user: { ...data } }))
        },
        onError: ({ message }) => {
            console.log(message);
            if (message.indexOf("Session Expired" !== -1)) {
                localStorage.removeItem(AUTH_TOKEN)
                history.push('/')
            }
        }
    });
    useEffect(() => {
        refetchUser();
    }, [])
    return (
        <Provider value={{
            ...state,
            refetchUser,
            userDataLoading: loading,
            setState,
        }}>
            {children}
        </Provider>
    )
}