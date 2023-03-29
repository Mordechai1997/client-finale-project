export const validPassword = new RegExp(/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/);
export const EmailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const imgRegex = new RegExp(/[\/.](gif|jpg|jpeg|tiff|png)$/i);

export const validForm = (email, password, confirmPassword, fullName) => {
    if (!(email && password && confirmPassword && fullName)) {
        return ({ message: 'The entire form must be completed!', type: 'error' })
    }
    if (!EmailRegex.test(email)) {
        return ({ message: `${email} is not a valid email address.`, type: 'error' })
    }
    console.log(validPassword.test(password))
    if (!validPassword.test(password)) {
        return ({ message: 'Password not strong enough', type: 'error' })
    }
    if (password !== confirmPassword) {
        return ({ message: 'Passwords are not the same', type: 'error' })
    }
    return ({ message: 'success', type: 'success' })
}

export const validPublic = (selected, title, fileName, phone, city, selectedTypeDelivery) => {
    if (!selected) {
        return ({ message: 'Select cagegory!', type: 'error' })
    }
    if (selectedTypeDelivery != 1 && selectedTypeDelivery != 2) {
        return ({ message: 'Select type delivery!', type: 'error' })
    }
    if (!title) {
        return ({ message: 'title is must!', type: 'error' })
    }
    if (fileName && !imgRegex.test(fileName)) {
        return ({ message: 'img must be gif|jpg|jpeg|tiff|png', type: 'error' })
    }
    if (phone.length < 10) {
        return ({ message: 'phone number is not invalid', type: 'error' })
    } if (!city.trim()) {
        return ({ message: 'city is must', type: 'error' })
    }

    return ({ message: 'success', type: 'success' })
}
export const validEmail = (email ) => {
    if (!email) {
        return({ message: 'email must be completed!', type: 'error'});
    }
    if(!EmailRegex.test(email)){
        return({ message: `${email} is not a valid email address.`, type: 'error' })
    }
    return ({ message: 'success', type: 'success' })
}
export const validFullName = (fullName ) => {
    if (!fullName) {
        return({ message: 'email must be completed!', type: 'error'});
    }
    if(fullName.length<2){
        return({ message: `${fullName} is not a valid name.`, type: 'error' })
    }
    return ({ message: 'success', type: 'success' })
}
export const validPhoneNumber = (phoneNumber ) => {
    if (!phoneNumber) {
        return({ message: 'phone number must be completed!', type: 'error'});
    }
    if (phoneNumber.length != 10) {
        return ({ message: 'phone number is not invalid', type: 'error' })
    } 
    return ({ message: 'success', type: 'success' })
}

