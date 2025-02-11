import { useState } from 'react';

function User() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return {name, setName, email, setEmail, password, setPassword, showPassword,
        togglePasswordVisibility,
    };
}

export default User;
