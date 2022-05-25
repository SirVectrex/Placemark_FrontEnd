import axios from "axios";
import { loggedin, SelectedPOI , isAdmin} from "./stores.js"



export class PlacemarkService {
    baseUrl = "";
    loggedIn = false;

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getbaseUrl() {
        return this.baseUrl;
    }

    async create(name, description, category, lng, lat) {
        try {
            const placemark = {
                name : name,
                description : description,
                category : category,
                location : {
                    type: "Point",
                    coordinates: [
                        lng,
                        lat
                    ],
                }
            };
            await axios.post(this.baseUrl + "/api/addPlacemark", placemark);
            return true;
        } catch (error) {
            return false;
        }
    }

    async addPhoto(id, image){
        try {
            const photo = {
                id : id,
                image : image
            };
            await axios.post(this.baseUrl + "/api/addPhoto", photo);
            return true;
        } catch (error) {
            return false;
        }
    }

    async deletePOI(id){
        try {
            await axios.delete(this.baseUrl + "/api/deletePlacemark/" + id);
            return true;
        } catch (error) {
            return false;
        }
    }

    async deleteUser(id) {
        try {
            await axios.delete(this.baseUrl + "/api/deleteUser/" + id);
            return true;
        } catch (error) {
            return false;
        }
    }

    async getAllUsers(){
        try {
            const response = await axios.get(this.baseUrl + "/api/getUsers");
            return response.data;
        } catch (error) {
            return null;
        }
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

    async getPoi(id){
        try {
            const response = await axios.get(this.baseUrl + "/api/getPlacemarkbyID/" + id);
            return response.data;
        }
        catch (error) {
            console.log(error);
            return null;
        }

    }

    async giveRating(id, rating){
        try {
            const response = await axios.post(this.baseUrl + "/api/addRating", {id, rating});
            return response.data;
        } catch (error) {
            return false;
        }
    }

    async giveComment(id, comment, username){
        try {
            const response = await axios.post(this.baseUrl + "/api/giveComment", {id, comment, username});
            return response.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async login(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
console.log(response)
            if (response.data.success) {
                loggedin.set(true);
                if (response.data.role === "admin") {
                    isAdmin.set(true);
                }
                else {
                    isAdmin.set(false);
                }
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
        isAdmin.set(false);
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
export  const placemarkService = new PlacemarkService("https://wahi-backend.herokuapp.com");