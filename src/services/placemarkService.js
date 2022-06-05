import axios from "axios";
import { loggedin, SelectedPOI , isAdmin, currentUserName} from "./stores.js"
import {src_url_equal} from "svelte/internal";



export class PlacemarkService {
    baseUrl = "";
    loggedIn = false;
    username = "";


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
                },
                creationuser: this.username
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

    async promoteUser(id) {
        try {
            const response = axios.post(this.baseUrl + "/api/promoteToAdmin/" + id);
            // console.log(response)
        }
        catch (error) {
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
            console.log(this.baseUrl)
            const response = await axios.get(this.baseUrl + "/api/getPlacemarkbyID/" + id);
            console.log(response)
            return response.data;
        }
        catch (error) {
            console.log(error);
            return null;
        }

    }

    async getCategoryStats(){
        try {
            const response = await axios.get(this.baseUrl + "/api/getPlacemarkStats");
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async addImage(id, formdata){
        try {

            let test = await axios.post(this.baseUrl + "/api/addImage/" + id , formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            /*
             old version for one photo only
            let success = await axios.post(this.baseUrl + "/api/uploadimage/" + id , formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

             */
            return true;

        } catch (error) {
            console.log(error)
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
                this.username = response.data.username;
                console.log("LOGGED IN!")
                console.log(response.data)
                currentUserName.set(response.data.username);

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
        currentUserName.set(null);
        console.log("LOGGED OUT!")
    }

    async signup(firstName, lastName, username, email, password) {
        try {
            const userDetails = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password,
            };
            await axios.post(this.baseUrl + "/api/addUser", userDetails);
            // console.log("User created!");
            return true;
        } catch (error) {
            return false;
        }
    }
}
export  const placemarkService = new PlacemarkService("https://wahi-backend.herokuapp.com");