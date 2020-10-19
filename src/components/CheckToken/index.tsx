import React, { useEffect } from 'react';
import api from '../../services/api';
import { useParams, useHistory } from "react-router-dom";

interface checkToken {
    setEmail: (p: string) => void;
    setTokenVerificado: (p: boolean) => void;
    setErro: (p: string) => void;
}

const CheckToken: React.FC<checkToken> = ({setEmail, setTokenVerificado, setErro}) => {
    let { token } = useParams();
    
    function parseJwt (token: string) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return JSON.parse(jsonPayload);
    };

    async function checkToken() {
        await api.get('esqueciasenha', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(() => {
            setTokenVerificado(true);
            setEmail(parseJwt(token).email);
        }).catch((error) => {
            if (error.response.status === 410) {
                setErro("Parece que este link expirou. Não se preocupe, você pode solicitar um novo aqui.");                           
            }else{
                console.log(error);
            }
        })
    }

    useHistory().replace("/esqueciasenha/");

    useEffect(() => {
        checkToken();
    },[])

    return null;
}

export default CheckToken;