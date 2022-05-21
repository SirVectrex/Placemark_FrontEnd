import axios from "axios";
import { loggedin } from "./stores.js"


export class PlacemarkService {
    baseUrl = "";
    loggedIn = false;

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getPois(){
        try {
            // api/getPlacemarks
            const response = await axios.get(this.baseUrl + "/api/getPlacemarks");
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async login(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            loggedin.set(true);
            console.log("LOGGED IN!")
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
        loggedin.set(false);
        console.log("LOGGED OUT!")
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
            await axios.post(this.baseUrl + "/api/addUser", userDetails);
            return true;
        } catch (error) {
            return false;
        }
    }
}