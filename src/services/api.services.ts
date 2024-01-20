const apiURL = "https://skanolkar.bsite.net/api/Users";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signUp = async (formData: any) => {
    // Replace 'https://your-api-endpoint.com/signup' with your actual API endpoint
    const response = await fetch(`${apiURL}/registration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error('Signup failed');
    }

    return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signIn = async (formData: any) => {
    // Replace 'https://your-api-endpoint.com/signup' with your actual API endpoint
    const response = await fetch(`${apiURL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error('Signin failed');
    }

    return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyOTP = async (formData: any) => {
    // Replace 'https://your-api-endpoint.com/signup' with your actual API endpoint
    const response = await fetch(`${apiURL}/verifyotp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error('API failed');
    }

    return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUsers = async () => {
    // Replace 'https://your-api-endpoint.com/signup' with your actual API endpoint
    const response = await fetch(`${apiURL}/getallusers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('API failed');
    }

    return response.json();
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteUser = async (formData: any) => {
    // Replace 'https://your-api-endpoint.com/signup' with your actual API endpoint
    const response = await fetch(`${apiURL}/deleteuser`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error('API failed');
    }

    return response.json();
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUser = async (formData: any) => {
    // Replace 'https://your-api-endpoint.com/signup' with your actual API endpoint
    const response = await fetch(`${apiURL}/updateuser`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error('API failed');
    }

    return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addUser = async (formData: any) => {
    // Replace 'https://your-api-endpoint.com/signup' with your actual API endpoint
    const response = await fetch(`${apiURL}/adduser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error('API failed');
    }

    return response.json();
};




