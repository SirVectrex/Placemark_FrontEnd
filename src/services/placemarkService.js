import axios from "axios";

export class PlacemarkService {
    baseUrl = "";
    loggedIn = false;

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async login(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            this.loggedIn = true;
            console.log("LOGIN IS TRUE!")
            if (response.data.success) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    async logout() {
        axios.defaults.headers.common["Authorization"] = "";
        this.loggedIn = false;
    }

    async signup(firstName, lastName, email, password) {
        try {
            const userDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            };
            console.log(userDetails)
            await axios.post(this.baseUrl + "/api/adduser", userDetails);
            return true;
        } catch (error) {
            return false;
        }
    }
}